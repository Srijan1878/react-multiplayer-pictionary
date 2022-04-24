const Room = require("../models/Room");
const generateRandomWord = require("../randomWordGenrator");

const currentTurn = async (roomCode, startAgain) => {
    try {
        let room = await Room.findOne({ code: roomCode })
        if (!room) {
            return false
        }
        if (startAgain) {
            room.currentTurn = 0
            room.activeWord = generateRandomWord()
            room.currentRound = 1
            room.wordGuessers = []
            await room.save()
        }
        return {
            id: room.players[room.currentTurn % room.players.length].socketId,
            duration: room.roundDuration,
            round: Math.floor(room.currentTurn / room.players.length) + 1,
            word: room.activeWord
        }
    }
    catch (err) {
        return false
    }
}

const updateTurn = async (roomCode) => {
    try {
        let room = await Room.findOne({ code: roomCode })
        if (!room) {
            return false
        }
        let randomWord = generateRandomWord()
        if ((room.currentTurn + 1) < (room.players.length * room.maxRounds)) {
            if (Math.floor(room.currentTurn / room.maxRounds) + 1 > room.currentRound) {
                room.currentRound++
            }
            room.activeWord = randomWord
            room.currentTurn++
            room.wordGuessers = []
            await room.save()
        }
        else {
            return {
                status: 'OVER',
                finalLeaderboard: room.players.sort((a, b) => b.points - a.points)
            }
        }
    }
    catch (err) {
        return false
    }
}

module.exports = { currentTurn, updateTurn };