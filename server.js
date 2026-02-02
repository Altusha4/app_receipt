require('dotenv').config();
const express = require("express");
const cors = require("cors");
const db = require("./app/models");

const app = express();

app.use(cors());
app.use(express.json());

db.mongoose
    .connect(db.url)
    .then(() => {
        console.log("Successfully connected to MongoDB Atlas!");
    })
    .catch(err => {
        console.error("Connection error", err);
        process.exit();
    });

app.get("/", (req, res) => {
    res.json({ message: "Welcome to App Receipt application." });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});