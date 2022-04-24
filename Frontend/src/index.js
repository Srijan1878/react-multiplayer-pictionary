import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import SocketContextProvider from "./SocketContext/SocketContext";
import RoomContextProvider from "./RoomContext/RoomContext";
import CountdownContextProvider from "./CountdownContext/CountdownContext";

ReactDOM.render(
  <React.StrictMode>
    <SocketContextProvider>
      <RoomContextProvider>
        <CountdownContextProvider>
          <Router>
            <App />
          </Router>
        </CountdownContextProvider>
      </RoomContextProvider>
    </SocketContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
