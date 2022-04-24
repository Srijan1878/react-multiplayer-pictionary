import React from "react";
import classes from "./ActiveWordDisplayer.module.css";

export default function ActiveWordDisplayer({ activeWord }) {
  return <h2 className={classes.activeWord}>{activeWord}</h2>;
}
