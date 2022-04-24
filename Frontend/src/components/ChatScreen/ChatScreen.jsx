import React, { useEffect, useState } from "react";
import classes from "./ChatScreen.module.css";
import ActiveWordDisplayer from "./components/ActiveWordDisplayer/ActiveWordDisplayer";
import ChatInputField from "./components/ChatInputField/ChatInputField";
import Messages from "./components/Messages/Messages";
import { ReactComponent as Expand } from "../../Assets/Expand.svg";
import ModalOverlay from "../Modal/components/ModalOverlay/ModalOverlay";
import { AnimatePresence, motion } from "framer-motion";
import { animationProperties, verticalScale } from "../../animations/variants";

const ChatScreen = ({
  activeWord,
  noActiveWordDisplay,
  collapseScreen,
}) => {
  const [expandScreen, setExpandScreen] = useState(false);
  const expandScreenHandler = () => {
    setExpandScreen(true);
  };
  const getHeight = () => {
    if (!noActiveWordDisplay) return "";
    return "10%";
  };
  useEffect(() => {
    if (!collapseScreen) return;
    setExpandScreen(false);
  }, [collapseScreen]);
  const renderExpandedChatScreen = () => {
    if (!expandScreen) return;
    return (
      <>
        <ModalOverlay setModalVisiblity={setExpandScreen} />
        <AnimatePresence exitBeforeEnter={true}>
          <motion.div
            className={classes.expandedChatScreenContainer}
            variants={verticalScale}
            initial={animationProperties.initial}
            animate={animationProperties.animate}
          >
            <Messages />
            <ChatInputField />
          </motion.div>
        </AnimatePresence>
      </>
    );
  };
  return (
    <>
      <div
        className={classes.chatScreenContainer}
        style={{
          width: noActiveWordDisplay ? "100%" : "",
          height: getHeight(),
        }}
      >
        {noActiveWordDisplay && (
          <div
            className={classes.expandIconContainer}
            onClick={expandScreenHandler}
          >
            <Expand />
          </div>
        )}
        <div className={classes.chatScreenOverlay}></div>
        {!noActiveWordDisplay && (
          <ActiveWordDisplayer activeWord={activeWord} />
        )}
        {!expandScreen && <Messages />}
        {!expandScreen && <ChatInputField
          noActiveWordDisplay={noActiveWordDisplay}
        />}
      </div>
      {renderExpandedChatScreen()}
    </>
  );
};
export default React.memo(ChatScreen);
