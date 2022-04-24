const joinRoom = (data, currentRoom, socketInstance, eventName) => {
    if (currentRoom || !data.roomCode) {
        return
    }
    socketInstance.emit(eventName, data);
};

export default joinRoom