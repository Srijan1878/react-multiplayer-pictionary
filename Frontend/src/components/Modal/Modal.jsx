import React, { useContext, useEffect, useRef } from "react";
import GameButton from "../GameButton/GameButton";
import PlayerPoint from "../PlayerPoints/PlayerPoint";
import ModalOverlay from "./components/ModalOverlay/ModalOverlay";
import classes from "./Modal.module.css";
import BUTTON_BOTTOM_STYLES from "../../constants/buttonBottom";
import { useNavigate } from "react-router-dom";
import { socketContext } from "../../SocketContext/SocketContext";
import { RoomContext } from "../../RoomContext/RoomContext";
import Lottie from "lottie-web";

export default function Modal({
  data,
  setCloseModal,
  playersLeft,
  leaderboard,
}) {
  const navigate = useNavigate();
  const { socketInstance, currentRoom } = useContext(socketContext);
  const { playersInLobby } = useContext(RoomContext);

  const newRoomHandler = () => {
    navigate("/");
    window.location.reload();
    socketInstance.emit("deleteRoomInstance", currentRoom);
  };

  const leaderboardModalRef = useRef();

  const playAgainHandler = () => {
    setCloseModal({});
    socketInstance.emit("getCurrentPlayerIndex", {
      roomCode: currentRoom,
      startAgain: true,
    });
  };

  const navigateToHomePage = () => {
    navigate("/");
    window.location.reload();
  };

  useEffect(() => {
    Lottie.loadAnimation({
      container: leaderboardModalRef.current,
      renderer: "svg",
      loop: false,
      autoplay: true,
      animationData: leaderboard
        ? require("../../Assets/Leaderboard.json")
        : require("../../Assets/PlayerLeftAnimation.json"),
    });
  }, []);

  return (
    <>
      <div className={classes.Modal}>
        <h2>Leaderboard</h2>
        <div className={classes.ModalContent}>
          {!playersLeft ? (
            <>
              {leaderboard && (
                <div
                  className={classes.leaderboardAnimationContainer}
                  ref={leaderboardModalRef}
                ></div>
              )}
              {data?.map((player, index) => (
                <PlayerPoint player={player} key={index} />
              ))}
            </>
          ) : (
            <>
              {!leaderboard && (
                <div
                  className={classes.translatedLeaderboardAnimationContainer}
                  ref={leaderboardModalRef}
                ></div>
              )}
              <h2>All Players Left</h2>
              <GameButton
                styles={{ marginTop: "auto" }}
                title={"Go To Home Page"}
                onClickEventFunction={navigateToHomePage}
              />
            </>
          )}
        </div>
        <div className={classes.buttonsContainer}>
          {playersInLobby.creator && (
            <GameButton
              title={"Start Over"}
              styles={BUTTON_BOTTOM_STYLES}
              onClickEventFunction={playAgainHandler}
            />
          )}
          <GameButton
            title={"New Room"}
            styles={{
              ...BUTTON_BOTTOM_STYLES,
              backgroundColor: "#fffb00",
              color: "black",
            }}
            onClickEventFunction={newRoomHandler}
          />
        </div>
      </div>
      <ModalOverlay />
    </>
  );
}
