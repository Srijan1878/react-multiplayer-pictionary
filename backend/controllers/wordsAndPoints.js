const { MAX_POINTS, POINTS_MULTIPLIER } = require("../constants/maxPoints");
const Room = require("../models/Room");

const wordsAndPoints = async (message, currentRoom, timeLeft, socket, io) => {
  let roomExists = await Room.findOne({ code: currentRoom });
  if (!roomExists) {
    return;
  }
  if (message.toLowerCase() === roomExists.activeWord.toLowerCase()) {
    //populating database with the player id of the player who guessed the word
    let playerIndex = roomExists.players.findIndex(
      (player) => player.socketId === socket.id
    );
    if (playerIndex === roomExists.currentTurn) return;
    roomExists.players[playerIndex].points += Math.floor(
      MAX_POINTS * (timeLeft / roomExists.roundDuration)
    );
    roomExists.players[
      roomExists.currentTurn % roomExists.players.length
    ].points += POINTS_MULTIPLIER * timeLeft;
    roomExists.wordGuessers.push(socket.id);
    roomExists.messages.push({ message:`Kudos To ${roomExists.players[playerIndex].name}, he guessed it right`, socketId: socket.id });
    await roomExists.save();
    io.sockets.in(currentRoom).emit("onMessage", {
      messagesData: roomExists.messages,
      playersData: roomExists.players,
    });
    if (roomExists.wordGuessers.length === roomExists.players.length - 1) {
      let currentPlayerId =
        roomExists.players[roomExists.currentTurn % roomExists.players.length]
          .socketId;
      io.sockets.in(currentRoom).emit("showLeaderboard", roomExists.players);
      io.to(currentPlayerId).emit("onEveryoneGuessed", true);
    }
    return;
  }
  roomExists.messages.push({ message, socketId: socket.id });
  await roomExists.save();
  io.sockets
    .in(currentRoom)
    .emit("onMessage", { messagesData: roomExists.messages });
};

module.exports = wordsAndPoints;
