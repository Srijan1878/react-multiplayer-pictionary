const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },
    socketId: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    points: {
        type: Number,
        default: 0
    },
    avatar: {
        type: Number,
        default: 1
    },
}, { timestamps: true });

module.exports = playerSchema