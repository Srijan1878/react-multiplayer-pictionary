import React, { useContext, useEffect, useState } from "react";
import { RoomContext } from "../../../../RoomContext/RoomContext";
import { socketContext } from "../../../../SocketContext/SocketContext";
import Message from "../Message/Message";
import classes from "./Messages.module.css";
import playerGuessed from "../../../../Assets/CorrectAnswer.wav";

const Messages = () => {
  //retrieving socketInstance from context
  const { socketInstance } = useContext(socketContext);
  const { playersInLobby, setPlayersInLobby, IsSoundMuted, messages, setMessages } =
    useContext(RoomContext);

  const playerGuessedAudio = new Audio(playerGuessed);

  useEffect(() => {
    if (!socketInstance) {
      return;
    }
    socketInstance.on("onMessage", ({ messagesData, playersData }) => {
      setMessages((prevMessages) => [...messagesData]);
      if (playersData) {
        if (!IsSoundMuted) playerGuessedAudio.play();
        setPlayersInLobby({
          ...playersInLobby,
          players: playersData,
        });
      }
    });
  }, [socketInstance]);

  return (
    <div className={classes.messagesContainer}>
      {messages?.map((message, index) => (
        <Message singleMessage={message} key={index} />
      ))}
    </div>
  );
};

export default React.memo(Messages);
