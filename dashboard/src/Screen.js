import Panes from "./Panes";
import Logo from "./Logo";
import Settings from "./Settings";
import Account from "./Account";
import React from "react";
import PropTypes from "prop-types";

function Screen(props) {
  function handleDurationChange(value) {
    props.onChange({ duration: value });
  }

  function handleNewsChange(value) {
    props.onChange({ news: value });
  }

  function handleSizeChange(value) {
    props.onChange({ size: value });
  }

  function handleTimeChange(value) {
    props.onChange({ time: value });
  }

  function handleTransitionChange(value) {
    props.onChange({ transition: value });
  }

  function handleMessageChange(value) {
    props.onChange({ message: value });
  }

  function handleLogoChange(value) {
    props.onChange({ logo: value });
  }

  function handlePanesChange(value) {
    props.onChange({ panes: value });
  }

  return (
    <>
      <Panes
        panes={props.value.panes}
        duration={props.value.duration}
        storageRef={props.storageRef}
        onChange={handlePanesChange}
      />
      <Logo
        value={props.value.logo}
        storageRef={props.storageRef}
        onChange={handleLogoChange}
      />
      <Settings
        duration={props.value.duration}
        news={props.value.news}
        size={props.value.size}
        time={props.value.time}
        transition={props.value.transition}
        onDurationChange={handleDurationChange}
        onNewsChange={handleNewsChange}
        onSizeChange={handleSizeChange}
        onTimeChange={handleTimeChange}
        onTransitionChange={handleTransitionChange}
        onMessageChange={handleMessageChange}
      />
      <Account user={props.user} />
    </>
  );
}

Screen.propTypes = {
  value: PropTypes.shape({
    panes: PropTypes.arrayOf(
      PropTypes.shape({
        rowStart: PropTypes.number.isRequired,
        rowEnd: PropTypes.number.isRequired,
        columnStart: PropTypes.number.isRequired,
        columnEnd: PropTypes.number.isRequired,
        embed: PropTypes.string,
        slides: PropTypes.arrayOf(
          PropTypes.shape({
            name: PropTypes.string.isRequired,
            duration: PropTypes.number.isRequired,
            timestamp: PropTypes.number.isRequired,
          })
        ),
        timestamp: PropTypes.number.isRequired,
      })
    ).isRequired,
    duration: PropTypes.number.isRequired,
    news: PropTypes.arrayOf(PropTypes.string).isRequired,
    size: PropTypes.number.isRequired,
    time: PropTypes.bool.isRequired,
    transition: PropTypes.number.isRequired,
    logo: PropTypes.shape({
      name: PropTypes.string.isRequired,
      timestamp: PropTypes.number.isRequired,
    }),
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  storageRef: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

export default Screen;
