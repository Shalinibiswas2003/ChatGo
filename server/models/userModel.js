const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please enter your full name"],
        unique: true,
        minlength: 3,
        maxlength: 20
    },
    email: {
        type: String,
        required: [true, "Email id is required"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Enter password"],
        minlength: 5
    },
    isAvatar: {
        type: Boolean,
        default: false
    },
    avatar: {
        type: String,
        default: ""
    }
});

const userModel = mongoose.model("Users", userSchema);

module.exports = { userModel };
