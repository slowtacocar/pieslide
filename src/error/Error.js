import React from "react";
import CSSModules from "react-css-modules";
import styles from "./Error.module.css";

function Error() {
  return (
    <div styleName="message">
      <h2>404</h2>
      <h1>Page Not Found</h1>
      <p>
        The specified file was not found on this website.
        Please check the URL for mistakes and try again.
      </p>
    </div>
  );
}

export default CSSModules(Error, styles);
