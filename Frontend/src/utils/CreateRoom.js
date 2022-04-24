const createRoom = (roomData, socketInstance, eventName) => {
    let roomCode = Math.random().toString(16).slice(-8).toUpperCase();
    socketInstance.emit(eventName, { ...roomData, roomCode: roomCode });
};

export default createRoom