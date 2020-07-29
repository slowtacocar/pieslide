import jQuery from "jquery";

const LOAD_TIME = 1000;

class Slides {
  constructor() {
    this.isRunning = false;
  }

  loop = () => {
    if (this.slides[ this.index ]) {
      this.isRunning = true;
      jQuery(".slide").toggleClass("hidden")
        .toggleClass("shown");

      const duration = this.slides[ this.index ].duration * 1000;

      window.setTimeout(this.loop, duration);
      this.index = this.slides[ this.index + 1 ] ? this.index + 1 : 0;
      window.setTimeout(this.preload, duration - LOAD_TIME);
    } else {
      this.isRunning = false;
    }
  };

  preload = () => {
    jQuery(".hidden.slide").css(
      "background",
      `black url(${this.urls[ this.index ]}) center/contain no-repeat`
    );
  };

  setData = (data, ref) => {
    this.ref = ref;
    this.slides = data;

    const promise = Promise.all(data.map(this.getUrl));

    promise.then(this.setVars);
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
    jQuery(".slide").css("transition", `opacity ${time}s`);
  };
}

export default Slides;
