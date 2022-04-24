const createRoom = require("../controllers/createRoom");
const deleteRoom = require("../controllers/deleteRoom");
const findRoom = require("../controllers/findRoom");
const getLobbyDetails = require("../controllers/getLobbyDetails");
const joinRoom = require("../controllers/JoinRoom");
const { currentTurn, updateTurn } = require("../controllers/updateRound");
const wordsAndPoints = require("../controllers/wordsAndPoints");
const Room = require("../models/Room");

const SocketHandler = (httpServer) => {
  const io = require("socket.io")(httpServer, {
    cors: {
      origin: [process.env.FRONTEND_URL || "http://localhost:3000"],
    },
  });
  //establising connection to socket
  io.on("connect", (socket) => {
    console.log(`${socket.id} is connected`);

    //event for emitting and receiving drawing data
    socket.on("draw", (data) => {
      socket.to(data.currentRoom).emit("onDraw", { x: data.x, y: data.y });
    });

    //event for repositioning mouse
    socket.on("reposition", (data) => {
      socket
        .to(data.currentRoom)
        .emit("onReposition", { x: data.x, y: data.y });
    });

    socket.on("changeDrawingTool", (data) => {
      socket.to(data.currentRoom).emit("onChangedDrawingTool", {
        property: data.property,
        value: data.value,
      });
    });

    //event for creating room
    socket.on("createRoom", async (data) => {
      let roomCreated = await createRoom(data, socket.id);
      if (roomCreated) {
        socket.emit("onRoomCreated", { status: true, roomCode: data.roomCode });
        socket.join(data.roomCode);
      }
    });

    //event for joining room
    socket.on("joinRoom", async (data) => {
      let roomJoined = await joinRoom({ ...data, socketId: socket.id });
      if (!roomJoined) {
        socket.emit("onRoomJoined", { status: false });
        return;
      }
      socket.join(data.roomCode);
      socket.emit("onRoomJoined", { status: true, roomCode: data.roomCode });
    });

    //event for getting lobby details
    socket.on("getLobbyDetails", async (roomCode) => {
      let roomDetails = await getLobbyDetails(roomCode, socket.id);
      if (!roomDetails) {
        return;
      }
      io.sockets.in(roomCode).emit("onFetchingLobbyDetails", roomDetails);
    });

    socket.on("startGame", async (currentRoom) => {
      let foundRoom = await Room.findOne({ code: currentRoom });
      if (foundRoom.players.length === 1) {
        socket.emit("notEnoughPlayers", "Not Enough Players In the room");
        return;
      }
      foundRoom.matchStarted = true;
      await foundRoom.save();
      io.sockets.in(currentRoom).emit("onStartGame", { status: true });
    });

    //event on fetching current Turn Index
    socket.on("getCurrentPlayerIndex", async ({ roomCode, startAgain }) => {
      let currentRoundDetails = await currentTurn(roomCode, startAgain);
      if (startAgain)
        io.sockets
          .in(roomCode)
          .emit("onGettingCurrentPlayerIndex", currentRoundDetails);
      else socket.emit("onGettingCurrentPlayerIndex", currentRoundDetails);
    });

    //event on updating Turn Index
    socket.on("updateCurrentPlayerIndex", async (roomCode) => {
      let matchStatus = await updateTurn(roomCode, socket.id);
      io.sockets.in(roomCode).emit("onUpdatingCurrentPlayerIndex", matchStatus);
    });

    //event for getting messages and also verifying if the word has been guessed by other players
    socket.on("sendMessage", async ({ message, currentRoom, timeLeft }) => {
      wordsAndPoints(message, currentRoom, timeLeft, socket, io);
    });

    socket.on("findRoom", async (data) => {
      let matchedRoom = await findRoom(data);
      if (typeof matchedRoom === "object") {
        socket.join(matchedRoom.code);
        io.sockets.in(matchedRoom.code).emit("newPlayerJoined", matchedRoom);
        return;
      }
      socket.emit("NoRoomFound", true);
    });

    socket.on("deleteRoomInstance", async (currentRoom) => {
      await deleteRoom(currentRoom);
    });

    //event on disconnect
    socket.on("disconnect", async () => {
      let room = await Room.findOne({
        players: { $elemMatch: { socketId: socket.id } },
      });
      if (!room) return;
      let currentTurnPlayerId = room.players[room.currentTurn].socketId;
      room.players = room.players.filter((player) => {
        return player.socketId !== socket.id;
      });
      await room.save();
      if (room.players.length === 1) {
        io.sockets.in(room.code).emit("onAllPlayersLeft");
        return;
      }
      if (!room.players.length) {
        await Room.deleteOne({ code: room.code });
        return;
      }
      if (currentTurnPlayerId === socket.id) {
        let currentRoundDetails = await currentTurn(room.code);
        io.sockets
          .in(room.code)
          .emit("onGettingCurrentPlayerIndex", currentRoundDetails);
      }
      io.sockets
        .in(room.code)
        .emit("onPlayerLeft", { updatedPlayerList: room.players });
    });
  });
};
module.exports = SocketHandler;
