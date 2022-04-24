import React, { useContext } from "react";
import { RoomContext } from "../../RoomContext/RoomContext";
import classes from "./GameInputField.module.css";

export default function GameInputField({ placeholder, name, chat, ...props }) {
  const { data, setData } = useContext(RoomContext);

  const onChangeHandler = (e) => {
    if (name === "playerName") {
      if (e.target.value === " ") return;
      if (e.target.value.trim().length > 10) {
        return setData({
          ...data,
          errorMessage: "Username can be a max of 10 characters",
        });
      }
    }
    setData({
      ...data,
      [name]: e.target.value,
    });
  };

  return (
    <input
      disabled={data.errorMessage}
      type="text"
      style={chat && { width: "75%", ...props.styles }}
      className={classes.gameInputField}
      placeholder={placeholder}
      onChange={onChangeHandler}
      value={data[name] || ""}
      {...props}
    />
  );
}
