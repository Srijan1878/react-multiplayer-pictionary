//player avatar animation variants(Waiting Lobby)

export const animationProperties = {
  initial: "initial",
  animate: "final",
  hover: "hover",
};

export const AvatarAnimation = {
  initial: { opacity: 0, scale: 0.5 },
  final: {
    opacity: 1,
    x: "0%",
    y: "2%",
    scale: 1,
    transition: {
      duration: 0.35,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
};

export const spiralScalingAnimation = {
  initial: {
    opacity: 0,
  },
  final: {
    opacity: 1,
    transition: {
      duration: 0.6,
    },
  },
  exit: {
    opacity: 0,
  },
};

export const overlayFadeInAnimation = {
  initial: { opacity: 0 },
  final: {
    opacity: 1,
    transition: {
      duration: 0.6,
    },
  },
  exit: {
    opacity: 0,
  },
  transition: {
    duration: 0.6,
  },
};

export const ModalslideInAnimation = {
  initial: { opacity: 0, x: "50%", y: "-50%" },
  final: {
    opacity: 1,
    x: "-50%",
    y: "-50%",
    transition: {
      duration: 0.6,
    },
  },
  exit: {
    opacity: 0,
  },
  transition: {
    duration: 0.6,
  },
};

export const BulgeAnimation = {
  initial: { opacity: 0, boxShadow: "none" },
  final: {
    opacity: 1,
    boxShadow: "20px 20px 40px #010a15, -20px -20px 40px #01162f",
    transition: {
      duration: 0.6,
      bounce: 0.25,
      delay: 0.6,
    },
  },
  exit: {
    opacity: 0,
  },
};

export const blurOutAnimation = {
  initial: { opacity: 0, filter: "blur(4px)" },
  final: {
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      delay: 0.3,
    },
  },
};

export const drawAnimation = (delay) => {
  return {
    initial: { opacity: 0, pathLength: 0, rotate: 15 },
    final: {
      pathLength: 1,
      opacity: 1,
      rotate: 0,
      transition: {
        bounce: 0.8,
        duration: 1,
        delay: delay / 2,
        ease: "easeInOut",
      },
    },
  };
};

export const fadeOut = {
  initial: { opacity: 1 },
  final: {
    opacity: 0,
    transition: {
      duration: 0.6,
      delay: 5.5,
    },
  },
};

export const sliceOut = (moveX) => {
  return {
    initial: {
      x: -moveX * 10,
      y: 0,
    },
    hover: {
      x: !moveX ? 0 : -moveX * 15,
      y: -10,
      transition: {
        duration: 0.1,
        type: "spring",
      },
    },
  };
};

export const verticalScale = {
  initial: { scaleY: 0, x: "-50%", y: "-50%" },
  final: {
    scaleY: 1,
    x: "-50%",
    y: "-50%",
  },
};
