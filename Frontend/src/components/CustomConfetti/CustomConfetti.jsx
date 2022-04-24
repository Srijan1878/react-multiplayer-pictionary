import React from "react";
import Confetti from "react-confetti";

const CustomConfetti = () => {
  return (
    <Confetti
      colors={['#f44336','#e91e63','#9c27b0','#673ab7','#3f51b5','#2196f3','#03a9f4','#00bcd4','#009688','#4CAF50','#8BC34A','#CDDC39','#FFEB3B','#FFC107','#FF9800','#FF5722','#795548',]}      
      style={{
        background: "transparent",
        border: "none",
        backdropFilter: "blur(0)",
      }}
    />
  );
};

export default CustomConfetti;
