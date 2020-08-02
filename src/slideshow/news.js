/** @jsx this.createElement */

import jsx from "../lib/jsx.js";

const NEWS_SPEED = 0.25;
const RSS_API_URL = "https://api.rss2json.com/v1/api.json?rss_url=";

class News extends jsx.Component {
  constructor(props) {
    super(props);
    this.ii = -1;
    this.isRunning = false;
  }

  render() {
    return (
      <div class="card loose-fixed-bottom" ref="cardNews">
        <div class="card-body">
          <p class="card-text no-wrap bold" ref="news"></p>
        </div>
      </div>
    );
  }

  changeUser(docRef) {
    docRef.onSnapshot(this.changeData);
  }

  async loop() {
    this.isRunning = true;

    const texts = await Promise.all(this.links.map(this.getSource));

    this.refs.news.textContent = texts.join("");

    const width =
      parseInt(getComputedStyle(this.refs.cardNews).width.replace("px", "")) +
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

    return data.items.map(this.getTitle).join(" \u25cf ");
  }

  getTitle(item) {
    return item.title;
  }

  changeData(doc) {
    this.links = doc.get("news");

    if (!this.isRunning) {
      this.animation = this.refs.cardNews.animate([
        { "transform": "translate(100vw)" },
        { "transform": "translate(-100%)" }
      ]);
      this.animation.onfinish = this.loop;
      this.loop();
    }
  }
}

export default News;
