import React from "react";
import { RoomContext } from "../../RoomContext/RoomContext";
import classes from "./RangeSlider.module.css";

export default function RangeSlider({ label, min, max, name, step }) {
  const { data, setData } = React.useContext(RoomContext);

  const SliderValueHandler = (e) => {
    setData({
      ...data,
      [name]: e.target.value,
    });
  };

  return (
    <>
      <label className={classes.rangeSliderLabel} htmlFor={name}>
        {label}
      </label>
      <div className={classes.rangeSliderContainer}>
        <input
          disabled={data.errorMessage}
          type="range"
          min={min}
          id={name}
          max={max}
          step={step}
          className={classes.customRangeSlider}
          value={(data && data[name]) || min}
          onChange={SliderValueHandler}
        />
        <p>{(data && data[name]) || min}</p>
      </div>
    </>
  );
}
