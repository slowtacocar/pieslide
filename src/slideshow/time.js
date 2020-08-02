/** @jsx this.createElement */

import jsx from "../lib/jsx.js";

class Time extends jsx.Component {
  render() {
    const element =
      <div class="card fixed-top-right" ref="card">
        <div class="card-header">
          <span class="h2" ref="time"></span>
        </div>
      </div>;

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
    this.refs.card.hidden = !doc.get("time");
  }
}

export default Time;
