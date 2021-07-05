const express = require("express");
const db = require("./db/connection");
const apiRoutes = require("./routes/apiRoutes")
const { resourceLimits } = require("worker_threads");

const inputCheck = require("./utils/inputCheck");

const app = express();
const PORT = process.env.PORT || 3001;

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// USE apiRoutes
app.use("/api", apiRoutes);

// DEFAULT response for any NOT FOUND requests
app.use((req, res) => {
    res.status(404).end();
});

// START server after successful db connection
db.connect(err => {
    if (err) throw err;
    console.log("Database connected.")
    app.listen(PORT, () => {
        console.log(`The server is running on port ${PORT}`);
    });
});