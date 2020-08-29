/** @jsx this.createElement */
/** @jsxFrag jsx.Fragment */

import jsx from "../lib/jsx.js";
import styles from "./news.module.css";

const NEWS_SPEED = 10000;
const RSS_API_URL = "https://api.rss2json.com/v1/api.json?rss_url=";
const NEWS_DELAY = 1000;

class News extends jsx.Component {
  render() {
    return (
      <p ref="news" class={styles.news}></p>
    );
  }

  changeUser(docRef) {
    docRef.onSnapshot(this.changeData);
  }

  async loop() {
    const texts = await Promise.all(this.links.map(this.getSource));

    this.isRunning = true;
    this.refs.news.textContent = texts.join(" \u2022 ");

    const width =
      parseInt(getComputedStyle(this.refs.news).width.replace("px", "")) +
      window.innerWidth;

    this.animation.playbackRate = NEWS_SPEED / width;
    this.animation.play();
  }

  async getSource(link) {
    const response = await fetch(RSS_API_URL + link);
    const data = await response.json();

    return data.items.map(({ title }) => title).join(" \u2022 ");
  }

  changeData(doc) {
    this.links = doc.get("news");

    if (!this.isRunning) {
      this.animation = this.refs.news.animate([
        { "transform": "translate(100vw)" },
        { "transform": "translate(-100%)" }
      ], {
        "duration": 50000,
        "endDelay": NEWS_DELAY
      });
      (this.animation.onfinish = this.loop)();
    }
  }
}

export default News;
