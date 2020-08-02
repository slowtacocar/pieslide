/** @jsx this.createElement */

import jsx from "../lib/jsx.js";

const NEWS_SPEED = 0.15;
const RSS_API_URL = "https://api.rss2json.com/v1/api.json?rss_url=";

class News extends jsx.Component {
  constructor(props) {
    super(props);
    this.ii = -1;
    this.isRunning = false;
  }

  render() {
    return (
      <p ref="news" id="news"></p>
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

    this.animation.effect.updateTiming({
      "duration": width / NEWS_SPEED,
      "endDelay": 1000
    });
    this.animation.play();
  }

  async getSource(link) {
    const response = await fetch(RSS_API_URL + link);
    const data = await response.json();

    return data.items.map(this.getTitle).join(" \u2022 ");
  }

  getTitle(item) {
    return item.title;
  }

  changeData(doc) {
    this.links = doc.get("news");

    if (!this.isRunning) {
      this.animation = this.refs.news.animate([
        { "transform": "translate(100vw)" },
        { "transform": "translate(-100%)" }
      ]);
      this.animation.onfinish = this.loop;
      this.loop();
    }
  }
}

export default News;
