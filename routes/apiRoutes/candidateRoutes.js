const express = require("express");
const router = express.Router();
const db = require("../../db/connection");
const inputCheck = require("../../utils/inputCheck");

// retrieve all candidates from db
router.get("/api/candidates", (req, res)=> {
    const sql = `SELECT c.*, p.name
                    AS party_name
                    FROM candidates c
                    LEFT JOIN parties p
                    ON c.party_id = p.id`
    db.query(sql, (err, rows) => {
        if(err){
            res.status(500).json({error: err.message});
            return;
        }
        res.json({
            message:"success",
            data:rows
        });
    });
});

// retreive single candidate from db
router.get("/api/candidate/:id", (req, res) => {
    const id = [req.params.id];
    const sql = `SELECT c.*, p.name
                    AS party_name
                    FROM candidates c
                    LEFT JOIN parties p
                    ON c.party_id = p.id
                    WHERE c.id = ?`
    db.query(sql, id, (err, result) => {
        if (err){ 
            res.status(400).json({error: err.message});
            return;
        }
        res.json({
            message:"success",
            data:result
        });
    });
});

// create new candidate
router.post("/api/candidate", ({ body }, res) => {
    const errors = inputCheck(body, "first_name", "last_name", "industry_connected");
    if(errors){
        res.status(400).json({ error: errors });
        return;
    }
    const sql = `INSERT INTO candidates (first_name, last_name, industry_connected)
        VALUES (?,?,?)`;
    const param = [body.first_name, body.last_name, body.industry_connected];

    db.query(sql, param, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message:"succes",
            data: body
        });
    });
});

// delete selected user
router.delete("/api/candidate/:id", (req, res) => {
    const id = [req.params.id];
    db.query(`DELETE FROM candidates WHERE id=?`, id, (err, result) => {
        if (err) {
            res.statusMessage(400).json({error: res.message});
        } else if (!result.affectedRows){
            res.json({
                message:"Candidate not found."
            });
        } else {
            res.json({
                message:"deleted",
                changes:result.affectedRows,
                id:id
            })
        }
    });
});

// update candidate party affiliation
router.put("/api/candidate/:id",  (req, res) => {
    const errors = inputCheck(req.body, "party_id");
    if (errors){
        res.status(400).json({ error: errors});
        return;
    }
    const sql = `UPDATE candidates SET party_id = ?
                    WHERE id = ?`;
    const id = [req.body.party_id, req.params.id];
    db.query(sql, id, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
        } else if (!result.affectedRows) {
            res.json({
                message:"Candidate not found."
            })
        } else {
            res.json({
                message:"success",
                data:req.body,
                changes:result.affectedRows
            });
        }
    });
});

module.exports = router;