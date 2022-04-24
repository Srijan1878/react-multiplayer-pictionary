import React, { useContext, useEffect, useCallback, useState } from "react";
import ChatScreen from "../../components/ChatScreen/ChatScreen";
import CustomConfetti from "../../components/CustomConfetti/CustomConfetti";
import DrawingTools from "../../components/DrawingTools/DrawingTools";
import FloatingModal from "../../components/FloatingModal/FloaringModal";
import GameScreenCanvas from "../../components/GameCanvas/gameScreenCanvas";
import Modal from "../../components/Modal/Modal";
import NewWord from "../../components/NewWordPopup/NewWord";
import PlayerList from "../../components/PlayerListContainer/PlayerList";
import { NEW_WORD_MODAL_DISPLAY_TIME } from "../../constants/timeouts";
import { RoomContext } from "../../RoomContext/RoomContext";
import { socketContext } from "../../SocketContext/SocketContext";
import sliceRandomWord from "../../utils/SliceRandomWord";
import classes from "./GameScreen.module.css";
import resetState from "../../utils/resetState";
import TickSound from "../../Assets/clock-ticking.mp3";
import withBackground from "../../WithBackground/withBackground";
import useMobileSize from "../../customHooks/useMobileSize";
import { CountdownContext } from "../../CountdownContext/CountdownContext";

const GameScreen = () => {
  //retrieving data from context
  const { socketInstance, currentRoom } = useContext(socketContext);
  const {
    roundDuration,
    setRoundDuration,
    setCurrentRound,
    currentRound,
    IsSoundMuted,
    setFindingRoom,
    setPlayersInLobby,
    playersInLobby,
  } = useContext(RoomContext);
  const { countDown, setCountDown } = useContext(CountdownContext);

  const [showMobileView, setShowMobileView] = useMobileSize();

  const clockTickSound = new Audio(TickSound);

  //states to manage component data
  const [myTurn, setMyTurn] = useState(false);
  const [activeWord, setActiveWord] = useState("");
  const [showNewWordModal, setShowNewWordModal] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);
  const [allPlayersLeftModal, setAllPlayersLeftModal] = useState(false);

  //logic for getting current player turn and checking if the id matches with the socket id returned from backend
  useEffect(() => {
    let modalShowTimeout;
    if (socketInstance) {
      socketInstance.emit("getCurrentPlayerIndex", { roomCode: currentRoom });
      socketInstance.on(
        "onGettingCurrentPlayerIndex",
        (currentRoundDetails) => {
          if (!currentRoundDetails.id) {
            return;
          }
          if (leaderboard) setLeaderboard({});
          setCurrentRound(currentRoundDetails.round);
          //updating states accordingly on currentTurn
          if (currentRoundDetails.id === socketInstance.id) {
            setRoundDuration(currentRoundDetails.duration); //populating roundDuration, turn and active word state
            setShowNewWordModal(true);
            setActiveWord(currentRoundDetails.word);
            setTimeout(() => {
              setMyTurn(true);
              setShowNewWordModal(false);
              setCountDown(currentRoundDetails.duration);
            }, NEW_WORD_MODAL_DISPLAY_TIME);
          } else {
            if (myTurn) setMyTurn(false);
            if (roundDuration) setRoundDuration(null);
            modalShowTimeout = setTimeout(() => {
              setCountDown(currentRoundDetails.duration);
              setActiveWord(sliceRandomWord(currentRoundDetails.word));
            }, NEW_WORD_MODAL_DISPLAY_TIME);
          }
        }
      );
      socketInstance.on("onUpdatingCurrentPlayerIndex", (matchStatus) => {
        if (matchStatus) {
          setLeaderboard({
            ...leaderboard,
            status: true,
            players: matchStatus.finalLeaderboard,
          });
          return;
        }
        socketInstance.emit("getCurrentPlayerIndex", { roomCode: currentRoom });
      });
      socketInstance.on("newPlayerJoined", (roomData) => {
        let { code, ...roomDetails } = roomData;
        setFindingRoom(false);
        setPlayersInLobby({
          ...playersInLobby,
          ...roomDetails,
          creator: roomDetails.creator === socketInstance.id,
          full: roomDetails.full || false,
        });
      });
      socketInstance.on("onEveryoneGuessed", (status) => {
        if (status) {
          resetState([setMyTurn, setRoundDuration, setCountDown]);
          socketInstance.emit("updateCurrentPlayerIndex", currentRoom);
        }
      });
      socketInstance.on("showLeaderboard", (players) => {
        if (!players.length) {
          return;
        }
        setCountDown(0);
      });
      socketInstance.on("onAllPlayersLeft", () => {
        setAllPlayersLeftModal(true);
        resetState([setRoundDuration, setCountDown]);
        socketInstance.emit("deleteRoomInstance", currentRoom);
      });
    }
    return () => {
      if (modalShowTimeout) clearTimeout(modalShowTimeout);
    };
  }, [socketInstance]);

  //logic for updating current player turn and all of this happens when the time duration of the current turn ends
  useEffect(() => {
    let turnTimeOut;
    if (myTurn && roundDuration) {
      turnTimeOut = setTimeout(() => {
        resetState([setMyTurn, setRoundDuration, setCountDown]);
        socketInstance.emit("updateCurrentPlayerIndex", currentRoom);
      }, roundDuration * 1000);
    }
    return () => {
      clearTimeout(turnTimeOut);
    };
  }, [myTurn, roundDuration]);

  //starting countDown as soon as the user is provided with a new word
  useEffect(() => {
    if (countDown !== 0) {
      let countdown = setInterval(() => {
        setCountDown((prevCount) => prevCount - 1);
        if (!IsSoundMuted) clockTickSound.play();
      }, 1000); //running every one second 1000(in ms)
      return () => {
        clearInterval(countdown);
      };
    }
  }, [countDown]);

  return (
    <>
      <div className={classes.gameScreenContainer}>
        <div
          className={classes.leftSideWrapper}
          style={{ width: showMobileView ? "100%" : "65%" }}
        >
          <PlayerList showMobileView={showMobileView} />
          {showMobileView && (
            <div className={classes.mobileViewGameDataContainer}>
              <div className={classes.topWrapper}>
                <FloatingModal data={countDown} title={"Time Left:"} />
                <FloatingModal data={currentRound} title={"Current Round:"} />
              </div>
              <FloatingModal data={activeWord} title={"Active Word:"} />
            </div>
          )}
          <GameScreenCanvas
            gameOver={leaderboard.status}
            myTurn={myTurn}
            activeWord={activeWord}
            showMobileView={showMobileView}
          />
          {showMobileView && (
            <ChatScreen
              noActiveWordDisplay
              collapseScreen={leaderboard.status}
            />
          )}
        </div>
        {!showMobileView && (
          <div className={classes.rightSideWrapper}>
            <div className={classes.clockAndRoundContainer}>
              <FloatingModal data={countDown} title={"Time Left:"} />
              <FloatingModal data={currentRound} title={"Current Round:"} />
            </div>
            <ChatScreen activeWord={activeWord} />
          </div>
        )}
        {showNewWordModal && <NewWord activeWord={activeWord} />}
      </div>
      <DrawingTools myTurn={myTurn} />
      {leaderboard.status && (
        <>
          <CustomConfetti />
          <Modal
            data={leaderboard.players}
            setCloseModal={setLeaderboard}
            leaderboard
          />
        </>
      )}
      {allPlayersLeftModal && <Modal playersLeft />}
    </>
  );
};

export default withBackground(GameScreen, true);
