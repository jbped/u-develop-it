const express = require("express");
const router = express.Router();
const db = require("../../db/connection");

// retrieve parties
router.get("/api/parties", (req, res) => {
    const sql = `SELECT * FROM parties`;
    db.query(sql, (err, rows) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: "success",
            data: rows
        });
    });
});

// retrieve single party
router.get("/api/party/:id", (req, res) => {
    const sql = `SELECT * FROM parties WHERE id = ?`;
    const id = [req.params.id];
    db.query(sql, id, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        } 
        res.json({
            message: "success",
            data: result
        });
    });
});

// DELETE party
router.delete("/api/party/:id", (req, res) => {
    const sql = `DELETE FROM parties WHERE id = ?`;
    const id = [req.params.id];
    db.query(sql, id, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
        } else if (!result.affectedRows) {
            res.json({
                message:"Party not found."
            });
        }
        else {
            res.json({
                message:"deleted",
                changes:result.affectedRows,
                id: id
            });
        }
    });
});

module.exports = router;