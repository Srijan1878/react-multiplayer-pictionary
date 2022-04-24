import React, { useContext, useEffect, useState } from "react";
import { DRAWING_BRUSH, DRAWING_ERASER } from "../../constants/drawingTools";
import { socketContext } from "../../SocketContext/SocketContext";
import { changeBrushSize, changeColor } from "../../utils/Context";
import { brushSvg, eraserSvg } from "../../Assets/drawTools";
import BrushStamp from "../BrushStamp/BrushStamp";
import ExpandMenu from "./Components/ExpandMenu";
import classes from "./DrawingTools.module.css";
import useMobileSize from "../../customHooks/useMobileSize";

export default function DrawingTools({ myTurn }) {
  const { socketInstance, currentRoom } = useContext(socketContext);
  const [expandMenu, setExpandMenu] = useState(false);
  const [activeDrawingTool, setActiveDrawingTool] = useState(
    DRAWING_BRUSH.name
  );
  const [showMobileView] = useMobileSize();

  useEffect(() => {
    if (socketInstance) {
      socketInstance.on("onChangedDrawingTool", ({ value }) => {
        if (typeof value === "number") {
          changeBrushSize(value);
          return;
        }
        changeColor(value);
      });
    }
  }, [socketInstance]);

  /*Mehtods to switch between drawing tools 
  ------------------------------------------*/
  const chageBrushSize = (e) => {
    let parsedInt = parseInt(e.target.value);
    socketInstance.emit("changeDrawingTool", {
      currentRoom: currentRoom,
      value: parsedInt,
    });
    changeBrushSize(parsedInt);
  };

  const switchToBrushHandler = () => {
    changeColor(DRAWING_BRUSH.value); //changing drawing tool to brush
    setActiveDrawingTool(DRAWING_BRUSH.name);
    socketInstance.emit("changeDrawingTool", {
      currentRoom: currentRoom,
      value: DRAWING_BRUSH.value,
    });
  };

  const switchToEraserHandler = () => {
    changeColor(DRAWING_ERASER.value); //changins drawing tool to eraser
    setActiveDrawingTool(DRAWING_ERASER.name);
    socketInstance.emit("changeDrawingTool", {
      currentRoom: currentRoom,
      value: DRAWING_ERASER.value,
    });
  };

  const changeColorHandler = (e) => {
    changeColor(e.target.value);
    socketInstance.emit("changeDrawingTool", {
      currentRoom: currentRoom,
      value: e.target.value,
    });
  };

  /*-----------------------------------------*/

  return (
    <div
      className={classes.bottomMenuContainer}
      style={{
        visibility: !myTurn ? "hidden" : "visible",
        left: showMobileView && "50%",
        transform: showMobileView && "translateX(-50%)",
      }}
    >
      <ExpandMenu setExpandMenu={setExpandMenu} expandMenu={expandMenu} />
      <div
        className={
          expandMenu
            ? classes.drawingToolsContainer
            : classes.collapsedDrawingToolsContainer
        }
      >
        <div className={classes.strokeSizeSlider}>
          <BrushStamp small />
          <input
            type="range"
            className={classes.brushRangeSlider}
            min={2}
            max={40}
            defaultValue={5}
            onChange={chageBrushSize}
          />
          <BrushStamp />
        </div>
        <div className={classes.drawingTools}>
          {brushSvg(switchToBrushHandler, activeDrawingTool)}
          {eraserSvg(switchToEraserHandler, activeDrawingTool)}
          <label htmlFor="colorInput" className={classes.colorInputLabel}>
            <input
              type="color"
              id="colorInput"
              onChange={changeColorHandler}
              className={classes.colorInput}
            />
          </label>
        </div>
      </div>
    </div>
  );
}
