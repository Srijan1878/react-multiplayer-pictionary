import React, { useState } from "react";

export const RoomContext = React.createContext();

const RoomContextProvider = (props) => {
  const [data, setData] = React.useState({
    avatar: 1,
  });
  const [playersInLobby, setPlayersInLobby] = React.useState({});
  const [roundDuration, setRoundDuration] = React.useState(null);
  const [currentRound, setCurrentRound] = React.useState(0);
  const [findingRoom, setFindingRoom] = useState(false);
  const [IsSoundMuted, setIsSoundMuted] = useState(false);
  const [messages, setMessages] = useState([]);

  return (
    <RoomContext.Provider
      value={{
        data,
        playersInLobby,
        setData,
        setPlayersInLobby,
        roundDuration,
        setRoundDuration,
        currentRound,
        setCurrentRound,
        findingRoom,
        setFindingRoom,
        IsSoundMuted,
        setIsSoundMuted,
        messages,
        setMessages,
      }}
    >
      {props.children}
    </RoomContext.Provider>
  );
};

export default RoomContextProvider;
