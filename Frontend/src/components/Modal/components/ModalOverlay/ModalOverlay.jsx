import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import {
  animationProperties,
  overlayFadeInAnimation,
} from "../../../../animations/variants";
import classes from "./ModalOverlay.module.css";

export default function ModalOverlay({ setModalVisiblity }) {
  return (
    <motion.div
      onClick={() => {
        if (setModalVisiblity) setModalVisiblity(false);
      }}
      className={classes.newWordPopupOverlay}
      variants={overlayFadeInAnimation}
      initial={animationProperties.initial}
      animate={animationProperties.animate}
    ></motion.div>
  );
}
