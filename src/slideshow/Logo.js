import React from "react";
import PropTypes from "prop-types";
import "./Logo.module.css";

function Logo(props) {
  return (
    <img
      style={{
        width: `${props.size}vw`,
        height: `${props.size}vh`,
      }}
      styleName="logo"
      crossOrigin="anonymous"
      src={props.logo.url}
    />
  );
}

Logo.propTypes = {
  logo: PropTypes.shape({
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    timestamp: PropTypes.number.isRequired,
  }).isRequired,
  size: PropTypes.any.isRequired,
};

export default Logo;
