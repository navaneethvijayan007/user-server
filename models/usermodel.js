const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({ 
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true
    },
    phonenumber: {
        type: Number
    },
    password: {
        type: String,
        required: true
    }
});

const users = mongoose.model("users", userSchema);
module.exports = users;