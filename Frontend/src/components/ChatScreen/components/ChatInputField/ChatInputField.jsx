import React, { useContext } from "react";
import sendLogoSvg from "../../../../Assets/SendLogo";
import { CountdownContext } from "../../../../CountdownContext/CountdownContext";
import { RoomContext } from "../../../../RoomContext/RoomContext";
import { socketContext } from "../../../../SocketContext/SocketContext";
import GameInputField from "../../../GameInputField/GameInputField";
import classes from "./ChatInputField.module.css";

const ChatInputField = ({ noActiveWordDisplay }) => {
  //retrieving data from socket
  const { socketInstance, currentRoom } = useContext(socketContext);
  const { data, setData } = useContext(RoomContext);
  const { countDown } = useContext(CountdownContext);

  const sendMessageHandler = () => {
    if (!data.chatMessage || !data.chatMessage.trim().length) return;
    socketInstance.emit("sendMessage", {
      message: data.chatMessage,
      currentRoom: currentRoom,
      timeLeft: countDown,
    });
    setData({
      ...data,
      chatMessage: "",
    });
  };

  function sendMessageWithEnter(e) {
    if (e.keyCode !== 13) return;
    if (!data.chatMessage?.trim().length) return;
    sendMessageHandler();
  }

  return (
    <div className={classes.ChatInputFieldContainer}>
      <GameInputField
        chat
        styles={{
          border: "2px solid black",
          width: noActiveWordDisplay ? "85%" : "75%",
          maxWidth: noActiveWordDisplay ? "none" : "",
        }}
        placeholder={"Type a message...."}
        name={"chatMessage"}
        onKeyDown={sendMessageWithEnter}
      />
      <div
        className={classes.sendLogoWrapper}
        onClick={sendMessageHandler}
        onKeyDown={sendMessageWithEnter}
      >
        {sendLogoSvg}
      </div>
    </div>
  );
};

export default ChatInputField;
