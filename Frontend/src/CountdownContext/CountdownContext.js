import React from "react";

export const CountdownContext = React.createContext();

const CountdownContextProvider = (props) => {
  const [countDown, setCountDown] = React.useState(0);

  return (
    <CountdownContext.Provider
      value={{
        countDown,
        setCountDown,
      }}
    >
      {props.children}
    </CountdownContext.Provider>
  );
};

export default CountdownContextProvider;
