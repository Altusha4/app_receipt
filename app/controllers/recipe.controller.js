const db = require("../models");
const Recipe = db.recipe;

exports.create = (req, res) => {
    const recipe = new Recipe({
        title: req.body.title,
        description: req.body.description,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions,
        category: req.body.category,
        user: req.userId
    });

    recipe.save()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.findAll = (req, res) => {
    Recipe.find()
        .populate("user", "username -_id")
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.findAllMyRecipes = (req, res) => {
    Recipe.find({ user: req.userId })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};