import React from "react";
import PropTypes from "prop-types";
import "./Logo.module.css";
import { useUrl } from "../common/hooks";

function Logo(props) {
  const logo = useUrl(props.logo, props.storageRef);

  return logo ? (
    <img
      style={{
        width: `${props.size}vw`,
        height: `${props.size}vh`,
      }}
      styleName="logo"
      crossOrigin="anonymous"
      src={logo.url}
    />
  ) : null;
}

Logo.propTypes = {
  logo: PropTypes.shape({
    name: PropTypes.string.isRequired,
    timestamp: PropTypes.number.isRequired,
  }).isRequired,
  storageRef: PropTypes.object.isRequired,
  size: PropTypes.number.isRequired,
};

export default Logo;
