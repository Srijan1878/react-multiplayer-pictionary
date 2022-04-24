import { useContext } from "react";
import { RoomContext } from "../../../../RoomContext/RoomContext";
import classes from "./SvgButtons.module.css";
import AvatarURLSArray from "../../../../Assets/Avatars";

const ChangeAvatarButton = ({ left }) => {
  const { data, setData } = useContext(RoomContext);

  const changeIndexHandler = () => {
    if (left) {
      data.avatar === 1
        ? setData({
            ...data,
            avatar: AvatarURLSArray.length,
          })
        : setData({
            ...data,
            avatar: data.avatar - 1,
          });
      return;
    }
    data.avatar === AvatarURLSArray.length
      ? setData({
          ...data,
          avatar: 1,
        })
      : setData({
          ...data,
          avatar: data.avatar + 1,
        });
  };

  return (
    <svg
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      width="32.000000pt"
      height="32.000000pt"
      viewBox="0 0 32.000000 32.000000"
      preserveAspectRatio="xMidYMid meet"
      className={left ? classes.leftButton : classes.rightButton}
      onClick={changeIndexHandler}
    >
      <g
        transform="translate(0.000000,32.000000) scale(0.100000,-0.100000)"
        fill="#000000"
        stroke="none"
      >
        <path
          d="M92 280 c-94 -57 -94 -183 0 -240 64 -39 146 -16 188 52 71 116 -72
        259 -188 188z m28 -7 c-29 -10 -69 -56 -75 -85 -4 -16 -9 -27 -12 -24 -3 2 0
        21 7 40 12 38 53 76 79 75 13 0 14 -1 1 -6z m87 -39 c3 -9 -6 -27 -23 -45
        l-28 -29 28 -29 c29 -30 30 -61 3 -61 -7 0 -33 20 -57 45 l-44 45 44 45 c47
        47 67 55 77 29z"
        fill="white"
        />
        <path
          d="M145 200 l-39 -40 39 -40 c26 -26 42 -37 49 -30 7 7 0 20 -19 40
        l-29 30 29 30 c19 20 26 33 19 40 -7 7 -23 -4 -49 -30z"
        />
      </g>
    </svg>
  );
};

export default ChangeAvatarButton;
