/** @jsx this.createElement */

import jsx from "../lib/jsx.js";

const LOAD_TIME = 1000;

class Slides extends jsx.Component {
  constructor(props) {
    super(props);
    this.isRunning = false;
  }

  render() {
    const element =
      <div id="slides">
        <div ref="slide1"></div>
        <div class="hidden" ref="slide2"></div>
      </div>;

    this.slideElements = [
      this.refs.slide1,
      this.refs.slide2
    ];

    return element;
  }

  loop() {
    if (this.slides[ this.index ]) {
      const duration = this.slides[ this.index ].duration * 1000;

      for (const slideElement of this.slideElements) {
        slideElement.classList.toggle("hidden");
      }

      this.isRunning = true;
      window.setTimeout(this.loop, duration);
      this.index = this.slides[ this.index + 1 ] ? this.index + 1 : 0;
      window.setTimeout(this.preload, duration - LOAD_TIME);
    } else {
      this.isRunning = false;
    }
  }

  preload() {
    for (const slideElement of this.slideElements) {
      if (slideElement.classList.contains("hidden")) {
        slideElement.style.background =
          `black url(${this.urls[ this.index ]}) center/contain no-repeat`;
      }
    }
  }

  changeUser(docRef, folderRef, settingsRef) {
    docRef.onSnapshot(this.changeData);
    this.folderRef = folderRef;
    settingsRef.onSnapshot(this.changeSettings);
  }

  changeData(doc) {
    this.setData(
      doc.get("slides"),
      this.folderRef
    );
  }

  async setData(data, ref) {
    this.ref = ref;
    this.slides = data;

    const url = await Promise.all(data.map(this.getUrl));

    this.setVars(url);
  }

  getUrl(slide) {
    return this.ref.child(slide.name).getDownloadURL();
  }

  setVars(url) {
    this.urls = url;
    this.index = 0;

    if (!this.isRunning) {
      this.loop();
    }
  }

  changeSettings(doc) {
    for (const slideElement of this.slideElements) {
      slideElement.style.transition = `opacity ${doc.get("transition")}s`;
    }
  }
}

export default Slides;
