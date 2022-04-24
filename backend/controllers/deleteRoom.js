const Room = require("../models/Room")

const deleteRoom = async (roomCode) => {
    try {
        let room = await Room.findOne({ code: roomCode })
        if (!room) return
        await Room.deleteOne({ code: roomCode })
        return true
    }
    catch (error) {
        return error
    }
}

module.exports = deleteRoom