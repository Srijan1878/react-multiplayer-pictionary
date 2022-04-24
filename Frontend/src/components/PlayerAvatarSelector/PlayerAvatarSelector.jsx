import React, { useContext } from "react";
import AvatarURLSArray from "../../Assets/Avatars";
import { RoomContext } from "../../RoomContext/RoomContext";
import ChangeAvatarButton from "./components/SvgButtons/SvgButtons";
import classes from "./PlayerAvatarSelector.module.css";

export default function PlayerAvatarSelector() {
  const { data } = React.useContext(RoomContext);
  return (
    <>
      <div className={classes.playerAvatarSelector}>
        <h2>Select an Avatar</h2>
        <div className={classes.avartarsFlexWrapper}>
          <ChangeAvatarButton left />
          {AvatarURLSArray[data.avatar - 1]}
          <ChangeAvatarButton />
        </div>
      </div>
    </>
  );
}
