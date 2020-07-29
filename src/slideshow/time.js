import jQuery from "jquery";

class Time {
  constructor() {
    window.setInterval(this.loop, 1000);
  }

  loop = () => {
    jQuery("#time").text(new Date().toLocaleTimeString());
  };

  setVisibility = (visible) => {
    if (visible) {
      jQuery("#cardTime").show();
    } else {
      jQuery("#cardTime").hide();
    }
  };
}

export default Time;
