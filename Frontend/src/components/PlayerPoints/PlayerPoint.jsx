import React from "react";
import classes from "./PlayerPoint.module.css";

export default function PlayerPoint({ player }) {
  return (
    <div className={classes.playerPointContainer}>
      <p>{player.name}</p>
      <p>{player.points}</p>
    </div>
  );
}
