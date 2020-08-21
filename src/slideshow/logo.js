import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import CSSModules from "react-css-modules";
import styles from "./Logo.module.css";

function Logo(props) {
  const [url, setUrl] = useState();

  useEffect(() => {
    (async () => {
      setUrl(await props.storageRef.child(props.logo).getDownloadURL());
    })();
  }, [props.logo, props.storageRef]);

  if (url) {
    return (
      <img style={{
        width: `${props.size}vw`,
        height: `${props.size}vh`
      }} styleName="logo" crossOrigin="anonymous" src={url} />
    );
  }
  return null;
}

Logo.propTypes = {
  "logo": PropTypes.string.isRequired,
  "storageRef": PropTypes.object.isRequired,
  "size": PropTypes.string.isRequired
}

export default CSSModules(Logo, styles);
