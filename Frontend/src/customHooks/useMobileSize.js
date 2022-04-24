import { useState } from "react";

const useMobileSize = (gameCanvas) => {
  const [showMobileView, setShowMobileView] = useState(window.innerWidth < 750);

  const throttle = (func, limit) => {
    let inThrottle;
    return function () {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  };

  const resizeHandler = () => {
    if (window.innerWidth > 750) {
      if (!showMobileView) return;
      setShowMobileView(false);
    } else {
      if (showMobileView) return;
      setShowMobileView(true);
    }
  };
  window.addEventListener("resize", throttle(resizeHandler, 100));
  return [showMobileView, setShowMobileView];
};

export default useMobileSize;
