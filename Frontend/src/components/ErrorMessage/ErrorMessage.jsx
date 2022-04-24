import React, { useEffect } from "react";
import { RESIZE_WARNING } from "../../constants/timeouts";
import { RoomContext } from "../../RoomContext/RoomContext";
import classes from "./ErrorMessage.module.css";

export default function ErrorMessage() {
  const { data, setData } = React.useContext(RoomContext);

  //manipulating state to show error message for a fixed time interval
  useEffect(() => {
    if (data?.errorMessage) {
      setTimeout(() => {
        setData({
          ...data,
          errorMessage: null,
        });
      }, 1500);
    }
  }, [data?.errorMessage]);

  return (
    <div
      className={
        data?.errorMessage
          ? classes.errorMessagePopup
          : classes.hiddenErrorMessagePopup
      }
    >
      <p>{data.errorMessage}</p>
    </div>
  );
}
