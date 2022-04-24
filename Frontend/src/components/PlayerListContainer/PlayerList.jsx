import React, { useContext, useEffect, useRef } from "react";
import PlayerData from "../../pages/WaitingLobby/components/PlayerData/PlayerData";
import { RoomContext } from "../../RoomContext/RoomContext";
import { socketContext } from "../../SocketContext/SocketContext";
import ScrollButton from "./components/ScrollButton/ScrollButton";
import classes from "./PlayerList.module.css";
import playerLeft from "../../Assets/PlayerLeft.wav";
import isMuted from "../../utils/isMuted";

export default function PlayerList({ showMobileView }) {
  const { playersInLobby, setPlayersInLobby, IsSoundMuted } =
    useContext(RoomContext);
  const { socketInstance } = useContext(socketContext);
  const containerRef = useRef(null);
  const playerLeftAudio = new Audio(playerLeft);

  useEffect(() => {
    if (socketInstance) {
      socketInstance.on("onPlayerLeft", ({ updatedPlayerList }) => {
        if (!IsSoundMuted) playerLeftAudio.play();
        setPlayersInLobby({
          ...playersInLobby,
          players: updatedPlayerList,
          full: false,
        });
      });
    }
  }, [socketInstance]);

  return (
    <div
      className={classes.playerListContainer}
      style={{ flex: showMobileView ? "1" : "" }}
    >
      <ScrollButton direction={"left"} containerRef={containerRef.current} />
      <div className={classes.outerWrapper}>
        <div className={classes.overlayWrapper}></div>
        <div className={classes.playerListWrapper} ref={containerRef}>
          {playersInLobby.players
            ?.sort(
              (playerOne, playerTwo) => playerTwo.points - playerOne.points
            )
            .map((player, index) => {
              return (
                <PlayerData
                  playerData={player}
                  cardIndex={index}
                  key={index}
                  matchStarted
                  stackEffect
                />
              );
            })}
        </div>
      </div>
      <ScrollButton direction={"right"} containerRef={containerRef.current} />
    </div>
  );
}
