import React from "react";
import PropTypes from "prop-types";
import "./Logo.module.css";
import { useUrl } from "../common/hooks";

function Logo(props) {
  const logo = useUrl({ "name": props.logo }, props.storageRef);

  return logo ? (
    <img style={{
      width: `${props.size}vw`,
      height: `${props.size}vh`
    }} styleName="logo" crossOrigin="anonymous" src={logo.url} />
  ) : null;
}

Logo.propTypes = {
  "logo": PropTypes.string.isRequired,
  "storageRef": PropTypes.object.isRequired,
  "size": PropTypes.any.isRequired
}

export default Logo;
