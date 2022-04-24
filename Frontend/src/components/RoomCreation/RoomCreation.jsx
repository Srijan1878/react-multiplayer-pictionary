import React from "react";
import RangeSlider from "../RangeSlider/RangeSlider";
import SwitchButton from "../SwitchButton/SwitchButton";
import classes from "./RoomCreation.module.css";

export default function RoomCreation() {
  return (
    <div className={classes.roomCreationContainer}>
      <RangeSlider label={"Max Rounds"} min={1} max={6} name={"maxRounds"} />
      <RangeSlider
        label={"Round Duration"}
        min={40}
        max={150}
        name={"roundDuration"}
        step={5}
      />
      <RangeSlider
        label={"Max Participants"}
        min={2}
        max={8}
        name={"maxParticipants"}
      />
      <div className={classes.checkboxContainer}>
        <SwitchButton labelText={"public"}/>
        <SwitchButton labelText={"private"} />
      </div>
    </div>
  );
}
