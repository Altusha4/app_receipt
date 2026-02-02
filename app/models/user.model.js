module.exports = (mongoose) => {
    const User = mongoose.model(
        "user",
        new mongoose.Schema({
            username: { type: String, required: true },
            email: { type: String, required: true },
            password: { type: String, required: true },
            roles: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "role"
                }
            ]
        }, { timestamps: true })
    );

    return User;
};