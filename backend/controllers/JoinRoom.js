const Room = require("../models/Room")

const joinRoom = async (data) => {
    try {
        let roomExists = await Room.findOne({ code: data.roomCode })
        if (roomExists) {
            if (roomExists.players.length === roomExists.maxParticipants) {
                return false
            }
            await roomExists.updateOne({
                players: [...roomExists.players, {
                    name: data.playerName,
                    avatar: data.avatar,
                    socketId: data.socketId
                }]
            })
            return true
        }
        else return false
    }
    catch (error) {
        return false
    }
}

module.exports = joinRoom