/** @jsx this.createElement */
/** @jsxFrag jsx.Fragment */

import jsx from "../lib/jsx.js";
import styles from "./404.module.css";

class Error404 extends jsx.Component {
  render() {
    return (
      <div class={styles.message}>
        <h2>404</h2>
        <h1>Page Not Found</h1>
        <p>
          The specified file was not found on this website.
          Please check the URL for mistakes and try again.
        </p>
      </div>
    );
  }
}

jsx.render(document.body, jsx.createElement(Error404, null));