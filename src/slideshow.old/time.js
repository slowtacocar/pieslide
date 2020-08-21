/** @jsx this.createElement */
/** @jsxFrag jsx.Fragment */

import jsx from "../lib/jsx.js";
import styles from "./time.module.css";

class Time extends jsx.Component {
  render() {
    const element =
      <time class={styles.time} ref="time"></time>;

    window.setInterval(this.loop, 1000);

    return element;
  }

  loop() {
    this.refs.time.textContent = new Date().toLocaleTimeString();
  }

  changeUser(docRef) {
    docRef.onSnapshot(this.changeData);
  }

  changeData(doc) {
    this.refs.time.hidden = !doc.get("time");
  }
}

export default Time;
