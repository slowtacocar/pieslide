/** @jsx this.createElement */

import jsx from "../lib/jsx.js";

class Time extends jsx.Component {
  render() {
    const element =
      <p id="time" ref="time"></p>;

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
