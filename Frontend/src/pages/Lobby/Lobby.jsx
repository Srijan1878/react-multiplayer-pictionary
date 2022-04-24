import React, { useContext, useEffect, useState } from "react";
import { socketContext } from "../../SocketContext/SocketContext";
import classes from "./Lobby.module.css";
import { useNavigate } from "react-router-dom";
import createRoom from "../../utils/CreateRoom";
import joinRoom from "../../utils/JoinRoom";
import GameButton from "../../components/GameButton/GameButton";
import PlayerCreation from "../../components/PlayerCreation/PlayerCreation";
import RoomCreation from "../../components/RoomCreation/RoomCreation";
import { RoomContext } from "../../RoomContext/RoomContext";
import GameInputField from "../../components/GameInputField/GameInputField";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import roomCreationValidators, {
  joinRoomValidator,
} from "../../Validators/RoomCreationValidators";
import { motion } from "framer-motion";
import { animationProperties, BulgeAnimation } from "../../animations/variants";
import { ReactComponent as Back } from "../../Assets/Back.svg";

export default function Lobby() {
  const navigateToGameScreen = useNavigate();

  //retrieving data from context
  const { socketInstance, setCurrentRoom, currentRoom } =
    useContext(socketContext);
  const { data, setData, setPlayersInLobby, playersInLobby, setFindingRoom } =
    useContext(RoomContext);

  //states
  const [joinRoomStatus, setJoinRoomStatus] = useState(false);

  useEffect(() => {
    if (socketInstance) {
      socketInstance.on("onRoomCreated", ({ status, roomCode }) => {
        if (status) {
          setCurrentRoom(roomCode);
          navigateToGameScreen("/waiting");
        }
      });
      socketInstance.on("onRoomJoined", ({ status, roomCode }) => {
        if (!status) {
          return setData({
            ...data,
            errorMessage: "Invalid Room Code",
          });
        }
        setCurrentRoom(roomCode);
        navigateToGameScreen("/waiting");
      });
      socketInstance.on("newPlayerJoined", (roomData) => {
        if (currentRoom) return;
        setFindingRoom(false);
        let { code, matchStarted, ...roomDetails } = roomData;
        setCurrentRoom(code);
        setPlayersInLobby({
          ...playersInLobby,
          ...roomDetails,
          creator: roomDetails.creator === socketInstance.id,
          full: roomDetails.full || false,
        });
        if (matchStarted) {
          navigateToGameScreen("/game");
        } else {
          navigateToGameScreen("/waiting");
        }
      });
      socketInstance.on("NoRoomFound", (status) => {
        setFindingRoom(false);
        if (status) setData({ ...data, errorMessage: "No Room Found" });
      });
    }
  }, [socketInstance]);

  //room creation function and populating error field if error encountered
  const createRoomHandler = () => {
    if (joinRoomStatus) {
      setJoinRoomStatus(false);
      return;
    }
    let validateFieldsStatus = roomCreationValidators(data, "create");
    if (validateFieldsStatus.error) {
      setData({
        ...data,
        errorMessage: validateFieldsStatus.message,
      });
      return;
    }
    createRoom(data, socketInstance, "createRoom");
  };

  //joining room function and populating error field if error encountered
  const joinRoomHandler = () => {
    if (!joinRoomStatus) {
      setJoinRoomStatus(true);
      return;
    }
    let validateFieldsStatus = roomCreationValidators(data, "join");
    if (validateFieldsStatus.error) {
      setData({
        ...data,
        errorMessage: validateFieldsStatus.message,
      });
      return;
    }
    joinRoom(data, currentRoom, socketInstance, "joinRoom");
  };

  const findRoomHandler = () => {
    let validateFieldsStatus = joinRoomValidator(data, "join");
    if (validateFieldsStatus.error) {
      setData({
        ...data,
        errorMessage: validateFieldsStatus.message,
      });
      return;
    }
    setFindingRoom(true);
    socketInstance.emit("findRoom", {
      socketId: socketInstance.id,
      playerName: data.playerName,
      avatar: data.avatar,
    });
    return;
  };

  const renderBackButton = () => {
    return (
      <div
        className={classes.backBtnContainer}
        onClick={() => {
          setJoinRoomStatus(false);
        }}
      >
        <Back />
      </div>
    );
  };

  return (
    <>
      <motion.div
        className={classes.lobbyRoomContainer}
        variants={BulgeAnimation}
        initial={animationProperties.initial}
        animate={animationProperties.animate}
      >
        <PlayerCreation />
        {joinRoomStatus ? (
          <GameInputField placeholder={"Enter Room Code"} name={"roomCode"} />
        ) : (
          <RoomCreation />
        )}
        <div className={classes.joinRoomButtonContainers}>
          {!joinRoomStatus ? (
            <GameButton
              title={"Create Room"}
              onClickEventFunction={createRoomHandler}
            ></GameButton>
          ) : (
            joinRoomStatus && (
              <GameButton
                title={"Find A Room"}
                onClickEventFunction={findRoomHandler}
              ></GameButton>
            )
          )}
          <GameButton
            title={"Join Room"}
            onClickEventFunction={joinRoomHandler}
          ></GameButton>
          {joinRoomStatus && renderBackButton()}
        </div>
      </motion.div>
      <ErrorMessage />
    </>
  );
}
