import React, { useContext, useEffect, useState } from "react";
import classes from "./RoomCode.module.css";
import { socketContext } from "../../../../SocketContext/SocketContext";

export default function RoomCode() {
  const { currentRoom } = useContext(socketContext);
  const [textCopied, setTextCopied] = useState(false);

  const copyTextToClipboard = () => {
    navigator.clipboard.writeText(currentRoom);
    if (textCopied) {
      return;
    }
    setTextCopied(true);
  };

  useEffect(() => {
    if (!textCopied) return;
    setTimeout(() => {
      setTextCopied(false);
    }, 1000);
  }, [textCopied]);

  return (
    <div className={classes.roomCodeContainer}>
      <h2 onClick={copyTextToClipboard}>{currentRoom}</h2>
      <p>{textCopied ? "Copied!" : "Click to copy"}</p>
    </div>
  );
}
