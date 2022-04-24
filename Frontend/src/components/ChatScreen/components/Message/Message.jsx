import React, { useContext } from "react";
import { socketContext } from "../../../../SocketContext/SocketContext";
import classes from "./Message.module.css";

export default function Message({ singleMessage }) {
  const { socketInstance } = useContext(socketContext);
  return (
    <div
      className={
        singleMessage.socketId === socketInstance.id
          ? classes.myMessageContainer
          : classes.messageContainer
      }
    >
      <p>{singleMessage.message}</p>
      <p>{singleMessage.socketId === socketInstance.id ? "You" : "sender"}</p>
    </div>
  );
}
