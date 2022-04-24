import React from "react";
import classes from "./NewWord.module.css";
import { motion } from "framer-motion";
import {
  animationProperties,
  blurOutAnimation,
  ModalslideInAnimation,
  overlayFadeInAnimation,
} from "../../animations/variants";
import ModalOverlay from "../Modal/components/ModalOverlay/ModalOverlay";

export default function NewWord({ activeWord }) {
  return (
    <>
      <motion.div
        className={classes.newWordPopupContainer}
        variants={ModalslideInAnimation}
        initial={animationProperties.initial}
        animate={animationProperties.animate}
      >
        <h3>
          YOUR WORD IS: <motion.p className={classes.currentWord} variants={blurOutAnimation} animate={animationProperties.animate} initial={animationProperties.initial}>{activeWord}</motion.p >
        </h3>
      </motion.div>
    <ModalOverlay />
    </>
  );
}
