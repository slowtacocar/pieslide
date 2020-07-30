class Logo {
  constructor() {
    this.logo = document.getElementById("logo");
  }

  setSize = (size) => {
    this.logo.style.width = `${size}vw`;
    this.logo.style.height = `${size}vh`;
  };

  setImage = async (name, ref) => {
    if (name) {
      const url = await ref.child(name).getDownloadURL();

      this.displayImage(url);
    } else {
      this.logo.style.background = "none";
    }
  };

  displayImage = (url) => {
    this.logo.style.background = `url(${url}) top left/contain no-repeat`;
  };
}

export default Logo;
