const mongoose = require("mongoose");
const generateRandomWord = require("../randomWordGenrator");
const messageSchema = require("./Message");
const playerSchema = require("./Player");

const roomSchema = new mongoose.Schema(
  {
    maxParticipants: {
      type: Number,
      default: 2,
    },
    maxRounds: {
      type: Number,
      default: 1,
    },
    roundDuration: {
      type: Number,
      default: 40,
    },
    code: {
      type: String,
      required: true,
      trim: true,
    },
    currentRound: {
      type: Number,
      default: 1,
    },
    currentTurn: {
      type: Number,
      default: 0,
    },
    activeWord: {
      type: String,
      default: generateRandomWord(),
      trim: true,
    },
    creator: {
      type: String,
      required: true,
      trim: true,
    },
    wordGuessers: {
      type: Array,
      default: [],
    },
    matchStarted: {
      type: Boolean,
      default: false,
    },
    roomAccessType: {
      type: String,
      enum: {
        values: ["public", "private"],
        message: "{VALUE} must be either public or private",
      },
      default: "public",
    },
    players: [playerSchema],
    messages: [messageSchema],
  },
  { timestamps: true }
);

const Room = mongoose.model("Room", roomSchema);
module.exports = Room;
