require('dotenv').config();
const express = require("express");
const cors = require("cors");
const db = require("./app/models");

const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

const Role = db.role;

db.mongoose
    .connect(db.url)
    .then(() => {
        console.log("Successfully connected to MongoDB Atlas!");
        initial();
    })
    .catch(err => {
        console.error("Connection error", err);
        process.exit();
    });

app.get("/", (req, res) => {
    res.json({ message: "Welcome to App Receipt application." });
});

require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/recipe.routes')(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

function initial() {
    Role.estimatedDocumentCount()
        .then(count => {
            if (count === 0) {
                new Role({ name: "user" })
                    .save()
                    .then(() => {
                        console.log("added 'user' to roles collection");
                    })
                    .catch(err => {
                        console.log("error adding user role", err);
                    });

                new Role({ name: "admin" })
                    .save()
                    .then(() => {
                        console.log("added 'admin' to roles collection");
                    })
                    .catch(err => {
                        console.log("error adding admin role", err);
                    });
            }
        })
        .catch(err => {
            console.log("error on estimatedDocumentCount", err);
        });
}