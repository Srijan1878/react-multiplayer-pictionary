import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import GameButton from "../../components/GameButton/GameButton";
import Spinner from "../../components/Spinner/Spinner";
import { RoomContext } from "../../RoomContext/RoomContext";
import { socketContext } from "../../SocketContext/SocketContext";
import PlayerData from "./components/PlayerData/PlayerData";
import RoomCode from "./components/RoomCode/RoomCode";
import classes from "./WaitingLobby.module.css";
import playerJoinedAudio from "../../Assets/PlayerJoined.wav";
import isMuted from "../../utils/isMuted";

export default function WaitingLobby() {
  const navigate = useNavigate();

  const playerJoinedAudioClip = new Audio(playerJoinedAudio);

  //retrieving states from context
  const { socketInstance, currentRoom } = useContext(socketContext);
  const {
    playersInLobby,
    setPlayersInLobby,
    setFindingRoom,
    findingRoom,
    setData,
    data,
    IsSoundMuted,
  } = useContext(RoomContext);

  //fetching details about players in lobby when someone joins
  useEffect(() => {
    if (socketInstance) {
      if (!currentRoom) {
        navigate("/");
      }
      socketInstance.emit("getLobbyDetails", currentRoom);
      socketInstance.on("onFetchingLobbyDetails", (roomDetails) => {
        if (!IsSoundMuted) {
          playerJoinedAudioClip.play();
        }
        setPlayersInLobby({
          ...playersInLobby,
          ...roomDetails,
          creator: roomDetails.creator === socketInstance.id,
          full: roomDetails.full || false,
        });
      });
      socketInstance.on("onStartGame", ({ status }) => {
        if (!status) return;
        navigate("/game");
      });
      socketInstance.on("newPlayerJoined", (roomData) => {
        setFindingRoom(false);
        if (!IsSoundMuted) {
          playerJoinedAudioClip.play();
        }
        let { code, ...roomDetails } = roomData;
        setPlayersInLobby({
          ...playersInLobby,
          ...roomDetails,
          creator: roomDetails.creator === socketInstance.id,
          full: roomDetails.full || false,
        });
      });
      socketInstance.on("notEnoughPlayers", (errorMessage) => {
        setData({
          ...data,
          errorMessage: errorMessage,
        });
      });
    }
  }, [socketInstance]);

  useEffect(() => {
    if (playersInLobby.full) {
      socketInstance.emit("startGame", currentRoom);
    }
  }, [playersInLobby]);

  const startMatch = () => {
    socketInstance.emit("startGame", currentRoom);
  };

  return (
    <>
      <div className={classes.WaitingLobbyContainer}>
        <h2>
          Players
          {`(${playersInLobby?.players?.length} / ${playersInLobby?.total})`}
        </h2>
        <div className={classes.playersInLobbyContainer}>
          {playersInLobby?.players?.map((player, index) => (
            <>
              <PlayerData playerData={player} key={index} stackEffect={false} />
            </>
          ))}
        </div>
        <RoomCode />
        {playersInLobby.creator && (
          <GameButton
            title={playersInLobby?.full ? "Start" : "Start Anyway"}
            waiting
            onClickEventFunction={startMatch}
          />
        )}
        {findingRoom && (
          <Spinner loaderText={"Hold Up, We are finding a room for you"} />
        )}
      </div>
      <ErrorMessage />
    </>
  );
}
