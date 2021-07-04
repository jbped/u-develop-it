const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use((req,res) => {
    res.status(404).end();
})

app.listen(PORT, () => {
    console.log (`The server is running on port ${PORT}`);
})