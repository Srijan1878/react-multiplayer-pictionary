import React, { useContext, useEffect, useRef, useState } from "react";
import classes from "./PlayerData.module.css";
import AvatarURLSArray from "../../../../Assets/Avatars";
import { motion } from "framer-motion";
import {
  animationProperties,
  AvatarAnimation,
  sliceOut,
} from "../../../../animations/variants";
import lottie from "lottie-web";
import { socketContext } from "../../../../SocketContext/SocketContext";

export default function PlayerData({
  stackEffect,
  cardIndex,
  playerData: { name, avatar, points, socketId },
}) {
  const cardContainer = useRef();
  const { socketInstance } = useContext(socketContext);
  let isMyCard = socketInstance.id === socketId

  useEffect(() => {
    if (!stackEffect || cardIndex) return;
    lottie.loadAnimation({
      container: cardContainer.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: require("../../../../Assets/crown.json"),
    });
  }, []);

  switch (stackEffect) {
    case true:
      return (
        <motion.div
          className={`${classes.stackedSinglePlayerContainer} ${isMyCard && classes.myCard}`}
          variants={sliceOut(cardIndex)}
          initial={animationProperties.initial}
          whileHover={animationProperties.hover}
          onHoverEnd={animationProperties.initial}
        >
          <div style={{ transform: "scale(0.6) translateY(-30%)" }}>
            {AvatarURLSArray[avatar - 1]}
          </div>
          <h2>{name}</h2>
          <p>{points}</p>
          {!cardIndex && (
            <div
              className={classes.animationOverlayContainer}
              ref={cardContainer}
            ></div>
          )}
        </motion.div>
      );
    case false:
      return (
        <motion.div
          className={classes.singlePlayerContainer}
          variants={AvatarAnimation}
          initial={animationProperties.initial}
          animate={animationProperties.animate}
        >
          <div style={{ transform: "scale(0.8)" }}>
            {AvatarURLSArray[avatar - 1]}
          </div>
          <h2>{name}</h2>
        </motion.div>
      );
    default:
      return;
  }
}
