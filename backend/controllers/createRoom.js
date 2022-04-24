const Room = require("../models/Room")

const createRoom = async (RoomData, userId) => {
    try {
        let newRoom = new Room({
            maxParticipants: RoomData.maxParticipants,
            maxRounds: RoomData.maxRounds,
            roundDuration: RoomData.roundDuration,
            code: RoomData.roomCode,
            roomAccessType: RoomData.roomAccessType,
            creator: userId,
            players: [
                {
                    name: RoomData.playerName,
                    avatar: RoomData.avatar,
                    socketId: userId,
                }
            ]
        })
        await newRoom.save()
        return true
    }
    catch (error) {
        return false
    }
}

module.exports = createRoom