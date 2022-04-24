const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    message: {
        type: String,
        trim: true,
        required: true,
    },
    socketId: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
}, { timestamps: true });

module.exports = messageSchema