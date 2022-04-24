const Room = require("../models/Room")

const getLobbyDetails = async (roomCode, userId) => {
    try {
        let validRoom = await Room.findOne({ code: roomCode })
        if (validRoom) {
            if (validRoom.maxParticipants === validRoom.players.length)
                return {
                    players: validRoom.players,
                    total: validRoom.maxParticipants,
                    creator: validRoom.creator,
                    full: true
                }
            return {
                players: validRoom.players,
                total: validRoom.maxParticipants,
                creator: validRoom.creator
            }
        }
        return false
    }
    catch (err) {
        return false
    }
}

module.exports = getLobbyDetails;