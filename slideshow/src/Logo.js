import React from "react";
import PropTypes from "prop-types";
import { useUrl } from "@pieslide/common";

function Logo(props) {
  const logo = useUrl(props.logo, props.storageRef);

  return logo ? (
    <img
      style={{
        width: `${props.size}vw`,
        height: `${props.size}vh`,
      }}
      className="logo"
      crossOrigin="anonymous"
      src={logo.url}
      alt="Logo"
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
