import jQuery from "jquery";

class Logo {
  constructor() {
    this.logo = jQuery("#logo");
  }

  setSize = (size) => {
    this.logo.width(`${size}vw`).height(`${size}vh`);
  };

  setImage = (name, ref) => {
    if (name) {
      ref.child(name).getDownloadURL()
        .then(this.displayImage);
    } else {
      this.logo.css("background", "none");
    }
  };

  displayImage = (url) => {
    this.logo.css("background", `url(${url}) top left/contain no-repeat`);
  };
}

export default Logo;
