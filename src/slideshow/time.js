class Time {
  constructor() {
    this.loop = this.loop.bind(this);
    this.setVisibility = this.setVisibility.bind(this);
    window.setInterval(this.loop, 1000);
    this.time = document.getElementById("time");
    this.card = document.getElementById("cardTime");
  }

  loop() {
    this.time.textContent = new Date().toLocaleTimeString();
  }

  setVisibility(visible) {
    this.card.hidden = !visible;
  }
}

export default Time;
