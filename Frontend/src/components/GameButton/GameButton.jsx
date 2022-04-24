import React from "react";
import classes from "./GameButton.module.css";

const GameButton = ({ title, onClickEventFunction }) => {
  return (
    <button
      aria-label={title}
      className={classes.GameButton}
      data-text={title}
      onClick={onClickEventFunction}
    ></button>
  );
};

export default GameButton;
