import React, { useEffect } from "react";
import { io } from "socket.io-client";
export const socketContext = React.createContext();

const SocketContextProvider = (props) => {
  const [socketInstance, setSocketInstance] = React.useState(null);
  const [currentRoom, setCurrentRoom] = React.useState(null);
  useEffect(() => {
    const socket = io.connect(process.env.REACT_APP_BACKEND_URL || "http://localhost:5000");
    setSocketInstance(socket);
    return () => {
      socket.close();
    };
  }, []);
  return (
    <socketContext.Provider
      value={{
        socketInstance,
        setSocketInstance,
        currentRoom,
        setCurrentRoom,
      }}
    >
      {props.children}
    </socketContext.Provider>
  );
};

export default SocketContextProvider;
