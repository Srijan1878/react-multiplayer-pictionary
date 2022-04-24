import lottie from "lottie-web";
import React, { useEffect, useRef } from "react";
import ModalOverlay from "../Modal/components/ModalOverlay/ModalOverlay";
import classes from "./Spinner.module.css";

export default function Spinner({ loaderText, asPreLoader }) {
  const spinnerRef = useRef();

  useEffect(() => {
    lottie.loadAnimation({
      container: spinnerRef.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: require("../../Assets/Pendulum.json"),
    });
  }, []);
  return (
    <>
      <div className={classes.loaderAndTextWrapper}>
        <div
          className={asPreLoader ? classes.preLoader : classes.loader}
          ref={spinnerRef}
        ></div>
        <h4>{loaderText}</h4>
      </div>
      <ModalOverlay />
    </>
  );
}
