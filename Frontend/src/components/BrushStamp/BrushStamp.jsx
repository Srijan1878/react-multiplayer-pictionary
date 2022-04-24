import React from "react";
import classes from "./BrushStamp.module.css";

export default function BrushStamp({ small }) {
  return <div className={classes.brushStamp} style={small && {width:'5px', height:'5px'}}></div>;
}
