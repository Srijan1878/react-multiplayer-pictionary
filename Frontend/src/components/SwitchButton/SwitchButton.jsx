import React from "react";
import { RoomContext } from "../../RoomContext/RoomContext";
import classes from "./SwitchButton.module.css";

export default function SwitchButton({ labelText }) {
  const { data, setData } = React.useContext(RoomContext);
  const checkButtonHandler = () => {
    setData({
      ...data,
      roomAccessType: labelText,
    });
  };

  return (
    <div className={classes.switchButtonContainer}>
      <input
        disabled={data.errorMessage}
        type="checkbox"
        id={"checkbox" + labelText}
        onClick={checkButtonHandler}
        checked={data.roomAccessType === labelText}
        readOnly={true}
      />
      <label htmlFor={"checkbox" + labelText}>{labelText}</label>
    </div>
  );
}
