module.exports = (mongoose) => {
    const Recipe = mongoose.model(
        "recipe",
        new mongoose.Schema({
            title: { type: String, required: true },
            description: String,
            ingredients: [String],
            instructions: String,
            category: String,
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "user"
            }
        }, { timestamps: true })
    );

    return Recipe;
};