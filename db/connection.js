const mysql = require("mysql2");

// connect to db
const db = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "JaPe001!",
        database: "election"
    },
    console.log("Success -- Connected to the election database")
);

module.exports = db;