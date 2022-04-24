import React from "react";
import classes from "./ScrollButton.module.css";

export default function ScrollButton({ direction, containerRef }) {
  let directionVector = direction === "left" ? -1 : 1;

  let customStyles = {
    [direction]: 0,
    transform: `translate(${50 * directionVector}%, -50%)`,
  };

  const horizontalScrollTrigger = () => {
    containerRef.scrollBy({
      left: 120 * directionVector,
      behavior: "smooth",
    });
  };

  return (
    <div
      className={classes.scrollButton}
      style={customStyles}
      onClick={horizontalScrollTrigger}
    ></div>
  );
}
