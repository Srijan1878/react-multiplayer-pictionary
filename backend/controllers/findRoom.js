const Room = require("../models/Room")

const findRoom = async (data) => {
    let rooms = await Room.find({ roomAccessType: 'public' })
    if (!rooms.length) {
        return 'No Room Found'
    }
    let optimumRoom = rooms.sort((a, b) => a.players.length - b.players.length)[0]
    if (optimumRoom.players.length === optimumRoom.maxParticipants) {
        return 'No Room Found'
    }
    await optimumRoom.updateOne({
        players: [...optimumRoom.players, {
            name: data.playerName,
            avatar: data.avatar,
            socketId: data.socketId,
        }]
    })
    return {
        players: [...optimumRoom.players, {
            name: data.playerName,
            avatar: data.avatar,
            socketId: data.socketId,
            points: 0
        }],
        total: optimumRoom.maxParticipants,
        matchStarted: optimumRoom.matchStarted,
        creator: optimumRoom.creator,
        code: optimumRoom.code,
        full: optimumRoom.maxParticipants === optimumRoom.players.length + 1
    }
}

module.exports = findRoom