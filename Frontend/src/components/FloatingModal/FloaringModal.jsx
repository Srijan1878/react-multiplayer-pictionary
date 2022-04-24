import React from "react";
import Alarm from "./components/Alarm/Alarm";
import classes from "./FloatingModal.module.css";
const FloatingModal = ({ data, alarm, title }) => {
  return (
    <>
      {alarm ? (
        <Alarm data={data} />
      ) : (
        <div className={classes.clockContainer}>
          <p>{title + data}</p>
        </div>
      )}
    </>
  );
};
export default React.memo(FloatingModal);
