import { useContext, useEffect } from "react";
import { RoomContext } from "../../RoomContext/RoomContext";
import isMuted from "../../utils/isMuted";
import classes from "./Speaker.module.css";

const SpeakerSvg = () => {
  const { IsSoundMuted, setIsSoundMuted } = useContext(RoomContext);

  useEffect(() => {
    if (isMuted()) setIsSoundMuted(true);
  }, []);

  const toggleAudios = () => {
    if (!IsSoundMuted) {
      localStorage.setItem("muted", true);
      setIsSoundMuted(true);
    } else {
      localStorage.removeItem("muted");
      setIsSoundMuted(false);
    }
  };

  return (
    <div
      className={`${classes.speakerContainer} ${IsSoundMuted && classes.muted}`}
      onClick={toggleAudios}
    >
      <svg
        width="45"
        height="45"
        viewBox="0 0 53 52"
        fill="#0ADA91"
        xmlns="http://www.w3.org/2000/svg"
        className={classes.speakerSvg}
      >
        <path
          d={`M11.7828 33.9639H1.5V16.0362H11.7828H12.3192L12.734 15.696L28.0082 3.17V46.83L12.734 34.3041L12.3192 33.9639H11.7828ZM34.624 15.9216L36.1399 ${
            !IsSoundMuted 
              ? "14.3528C38.6571 17.3417 39.938 20.8575 39.9959 24.9588C39.9937 28.8539 38.7309 32.2345 36.1625 35.1552L34.6357 33.5752C36.7107 31.0622 37.7705 28.1369 37.7705 24.8454C37.7705 21.4903 36.7086 18.5004 34.624 15.9216ZM40.6218 9.83993L42.2735 8.22283C46.433 12.8711 48.5 18.3554 48.5 24.7423C48.5 31.1232 46.4367 36.6355 42.2807 41.3423L40.6162 39.6674C44.3157 35.5296 46.1721 30.5477 46.1721 24.794C46.1721 19.0399 44.3158 14.0327 40.6218 9.83993Z"
              : "17.3417"
          }`}
          stroke="white"
          strokeWidth="3"
        />
        <path
          d={`M3 16.5362H14.7828L32.5082 2V52L14.7828 37.4639H3V16.5362ZM39.168 ${
            !IsSoundMuted
              ? "14.165C42.6516 17.6702 44.4276 21.9313 44.4959 26.9485C44.4959 31.7595 42.7199 35.8832 39.168 39.3196L35.582 35.6084C38.041 33.1341 39.2705 30.2132 39.2705 26.8454C39.2705 23.409 38.041 20.4194 35.582 17.8763L39.168 14.165ZM45.3156 8.08252C50.4385 13.2372 53 19.4571 53 26.7423C53 34.0276 50.4385 40.2818 45.3156 45.5052L41.5246 41.6908C45.623 37.6358 47.6721 32.6702 47.6721 26.794C47.6721 20.9177 45.623 15.9176 41.5246 11.7939L45.3156 8.08252Z"
              : "17.3417"
          }`}
          fill="none"
        />
      </svg>
    </div>
  );
};

export default SpeakerSvg;
