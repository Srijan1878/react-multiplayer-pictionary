import React from "react";
import classes from "./ExpandMenu.module.css";
import { motion } from 'framer-motion'
import { upSvg } from "../../../Assets/drawTools";

export default function ExpandMenu({ expandMenu, setExpandMenu }) {
  const expandMenuHandler = () => {
    setExpandMenu(!expandMenu);
  };
  return (
    <motion.div 
      onTap={expandMenuHandler}
      className={classes.expandMenuContainer}
    >
      {upSvg(expandMenu)}
    </motion.div>
  );
}
