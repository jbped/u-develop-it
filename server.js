const express = require("express");
const mysql = require("mysql2")

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
// db.query(`SELECT * FROM candidates`, (err, rows) => {
//     console.log(rows);
// });

db.query(`SELECT * FROM candidates WHERE id=1`, (err, row) => {
    if (err) {
        console.log(err);
    }
    console.log(row);
});

// db.query(`DELETE FROM candidates WHERE id=?`, 1, (err, result)  => {
//     if (err) {
//         console.log(err);
//     }
//     console.log(result);
// });

app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`The server is running on port ${PORT}`);
});