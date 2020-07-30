const LOAD_TIME = 1000;

class Slides {
  constructor() {
    this.isRunning = false;
    this.slideElements = document.getElementsByClassName("slide");
  }

  loop = () => {
    if (this.slides[ this.index ]) {
      this.isRunning = true;

      for (const slideElement of this.slideElements) {
        slideElement.classList.toggle("hidden");
        slideElement.classList.toggle("shown");
      }

      const duration = this.slides[ this.index ].duration * 1000;

      window.setTimeout(this.loop, duration);
      this.index = this.slides[ this.index + 1 ] ? this.index + 1 : 0;
      window.setTimeout(this.preload, duration - LOAD_TIME);
    } else {
      this.isRunning = false;
    }
  };

  preload = () => {
    document.getElementsByClassName("hidden slide")[ 0 ].style.background =
      `black url(${this.urls[ this.index ]}) center/contain no-repeat`;
  };

  setData = async (data, ref) => {
    this.ref = ref;
    this.slides = data;

    const url = await Promise.all(data.map(this.getUrl));

    this.setVars(url);
  };

  getUrl = (slide) => this.ref.child(slide.name).getDownloadURL();

  setVars = (url) => {
    this.urls = url;
    this.index = 0;

    if (!this.isRunning) {
      this.loop();
    }
  };

  setTransition = (time) => {
    for (const slideElement of this.slideElements) {
      slideElement.style.transition = `opacity ${time}s`;
    }
  };
}

export default Slides;
