const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');

// POST new vote to vote table
router.post("/vote", ({ body }, res) => {
    const errors = inputCheck(body, "voter_id", "candidate_id");
    if (errors) {
        res.status(400).json({ error: errors })
        return;
    }

    const sql = `INSERT INTO votes (voter_id, candidate_id) VALUES (?,?)`;
    const params = [body.voter_id, body.candidate_id]
    db.query(sql, params, (err, result) => { 
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message:"success",
            data: body,
            changes:result.affectedRows
        });
    });
});

// GET vote results
router.get("/votes", (req, res) => {
    const sql = `SELECT c.*, p.name AS party_name, COUNT(candidate_id) AS count
                    FROM votes v
                    LEFT JOIN candidates c ON v.candidate_id = c.id 
                    LEFT JOIN parties p ON c.party_id = p.id
                    GROUP BY candidate_id ORDER BY count DESC;`
    db.query(sql, (err, rows) => {
        if (err) {
            res.json(400).jsonn({ error: err.message });
            return;
        }
        res.json({
            message:"success",
            data: rows
        });
    });
});

module.exports = router;
