class Time {
  constructor() {
    window.setInterval(this.loop, 1000);
    this.time = document.getElementById("time");
    this.card = document.getElementById("cardTime");
  }

  loop = () => {
    this.time.textContent = new Date().toLocaleTimeString();
  };

  setVisibility = (visible) => {
    this.card.hidden = !visible;
  };
}

export default Time;
