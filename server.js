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
        user:"root",
        password:"JaPe001!",
        database: "election"
    },
    console.log("Success -- Connected to election database")
);

db.query(`SELECT * FROM candidates`, (err, rows) => {
    console.log(rows);
})

app.use((req,res) => {
    res.status(404).end();
})

app.listen(PORT, () => {
    console.log (`The server is running on port ${PORT}`);
})