/** @jsx this.createElement */
/** @jsxFrag jsx.Fragment */

import jsx from "../lib/jsx.js";
import styles from "./slides.module.css";

const LOAD_TIME = 1000;

class Slides extends jsx.Component {
  render() {
    return (
      <>
        <img class={styles.slide} ref="slide1" crossorigin="anonymous"></img>
        <img
          class={`${styles.slide} ${styles.hidden}`}
          ref="slide2"
          crossorigin="anonymous"
        ></img>
      </>
    );
  }

  loop() {
    if (this.slides[ this.index ]) {
      const duration = this.slides[ this.index ].duration * 1000;

      for (const ref in this.refs) {
        this.refs[ ref ].classList.toggle(styles.hidden);
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
    for (const ref in this.refs) {
      if (this.refs[ ref ].classList.contains(styles.hidden)) {
        this.refs[ ref ].src = this.urls[ this.index ];
      }
    }
  }

  changeUser(docRef, folderRef, settingsRef) {
    docRef.onSnapshot(this.changeData);
    this.folderRef = folderRef;
    settingsRef.onSnapshot(this.changeSettings);
  }

  async changeData(doc) {
    this.slides = doc.get("slides");

    const urls = await Promise.all(this.slides.map(this.getUrl));

    this.urls = urls;
    this.index = 0;

    if (!this.isRunning) {
      this.loop();
    }
  }

  getUrl(slide) {
    return this.folderRef.child(slide.name).getDownloadURL();
  }

  changeSettings(doc) {
    for (const ref in this.refs) {
      this.refs[ ref ].style.transition = `opacity ${doc.get("transition")}s`;
    }
  }
}

export default Slides;
