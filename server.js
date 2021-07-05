const express = require("express");
const mysql = require("mysql2");

const inputCheck = require("./utils/inputCheck");

const app = express();
const PORT = process.env.PORT || 3001;

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// connect to db
const db = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "JaPe001!",
        database: "election"
    },
    console.log("Success -- Connected to election database")
);


// Create candidate 
const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected)
    VALUES (?,?,?,?)`;
const params = [1, "Ronald", "Firbank", 1];

// db.query(sql, params, (err, result) => {
//     if (err){
//         console.log(err);
//     }
//     console.log(result)
// })

// retrieve all candidates from db
app.get("/api/candidates", (req, res)=> {
    db.query(`SELECT * FROM candidates`, (err, rows) => {
        if(err){
            res.status(500).json({error:err.message});
            return;
        }
        res.json({
            message:"succes",
            data:rows
        });
    });
});

// retreive single candidate from db
app.get("/api/candidate/:id", (req, res) => {
    const id = [req.params.id]
    db.query(`SELECT * FROM candidates WHERE id=?`, id, (err, result) => {
        if (err){ 
            res.status(400).json({error:err.message});
            return;
        }
        res.json({
            message:"success",
            data:result
        });
    });
});

// delete selected user
app.delete("/api/candidate/:id", (req, res) => {
    const id = [req.params.id];
    db.query(`DELETE FROM candidates WHERE id=?`, id, (err, result) => {
        if (err) {
            res.statusMessage(400).json({error:res.message});
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


// create new candidate
app.post("/api/candidate", ({ body }, res) => {
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

app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`The server is running on port ${PORT}`);
});