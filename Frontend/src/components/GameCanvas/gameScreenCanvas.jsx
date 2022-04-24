import React, { useRef, useEffect, useContext, useState } from "react";
import { socketContext } from "../../SocketContext/SocketContext";
import setUpContext from "../../utils/Context";
import getMousePos from "../../utils/getMousePos";
import classes from "./GameScreenCanvas.module.css";

const GameScreenCanvas = ({
  myTurn,
  activeWord,
  showMobileView,
}) => {
  //state for handling when the mouse is pressed down
  const [isClicked, setIsClicked] = React.useState(false);
  const { currentRoom } = useContext(socketContext);

  //Refs to Canvas Dom Element
  const canvasRef = useRef(null);
  const contextRef = useRef();

  //retrieving socket.io instance from react context
  const { socketInstance } = useContext(socketContext);

  useEffect(() => {
    if (socketInstance) {
      socketInstance.on("onDraw", ({ x, y }) => {
        receivedDrawingData(x, y);
      });
      socketInstance.on("onReposition", ({ x, y }) => {
        mouseReposition(x, y);
      });
    }
  }, [socketInstance]);

  //function to handle cleaning as soon as the activeWord changes
  useEffect(() => {
    if (!activeWord) return;
    contextRef.current.clearRect(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
    contextRef.current.lineCap = "round";
    contextRef.current.strokeStyle = "black";
    contextRef.current.lineWidth = 5;
  }, [activeWord]);

  //setting up context after the component has been mounted
  useEffect(() => {
    let ctx = setUpContext(canvasRef, showMobileView);
    contextRef.current = ctx;
  }, []);

  //Three main functions to implement a drawing applicaiton
  const startDrawing = (e, touchDevice) => {
    if (!myTurn) return;
    let { x: offsetX, y: offsetY } = getMousePos(
      canvasRef.current,
      e,
      touchDevice
    );
    contextRef.current.beginPath();
    contextRef.current.moveTo(
      (offsetX / 100) * canvasRef.current.width,
      (offsetY / 100) * canvasRef.current.height
    );
    socketInstance.emit("reposition", { x: offsetX, y: offsetY, currentRoom });
    setIsClicked(true);
  };

  const stopDrawing = (e) => {
    contextRef.current.closePath();
    setIsClicked(false);
  };

  const draw = (e, touchDevice) => {
    if (!isClicked) {
      return;
    }
    let { x: offsetX, y: offsetY } = getMousePos(
      canvasRef.current,
      e,
      touchDevice
    );
    socketInstance.emit("draw", {
      x: offsetX,
      y: offsetY,
      currentRoom,
    });
    contextRef.current.lineTo(
      (offsetX / 100) * canvasRef.current.width,
      (offsetY / 100) * canvasRef.current.height
    );
    contextRef.current.stroke();
  };

  const receivedDrawingData = (x, y) => {
    contextRef.current.lineTo(
      (x / 100) * canvasRef.current.width,
      (y / 100) * canvasRef.current.height
    );
    contextRef.current.stroke();
  };

  const mouseReposition = (x, y) => {
    contextRef.current.beginPath();
    contextRef.current.moveTo(
      (x / 100) * canvasRef.current.width,
      (y / 100) * canvasRef.current.height
    );
  };
  return (
    <>
      <canvas
        className={classes.canvas}
        ref={canvasRef}
        onTouchStart={(e) => {
          startDrawing(e, true);
        }}
        onTouchMove={(e) => {
          draw(e, true);
        }}
        onTouchEnd={stopDrawing}
        style={{ maxHeight: showMobileView ? "55%" : "70%" }}
        onMouseDown={startDrawing}
        onMouseUp={stopDrawing}
        onMouseMove={draw}
      ></canvas>
    </>
  );
};

export default React.memo(GameScreenCanvas);
