
const roomCreationValidators = (data, type) => {
    if (type === 'create') {
        if (!data || !data.playerName || !data.avatar || data.playerName.trim().length === 0 || !data.roomAccessType) {
            return { error: true, message: 'Please fill all fields' }
        }
        return true
    }
    else {
        if (!data || !data.roomCode || data.roomCode.trim().length === 0 || !data.playerName || !data.avatar || data.playerName.trim().length === 0) {
            return { error: true, message: 'Please fill all fields' }
        }
        return true
    }
}

export const joinRoomValidator = (roomData) => {
    if (!roomData.playerName || !roomData.playerName.trim().length) {
        return { error: true, message: 'Please type a name' }
    }
    return true
}

export default roomCreationValidators;