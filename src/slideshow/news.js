/** @jsx this.createElement */

import jsx from "../lib/jsx.js";

const NEWS_DELAY = 1000;
const NEWS_SPEED = 100;
const TRANSITION_DELAY = 500;
const RSS_API_URL = "https://api.rss2json.com/v1/api.json?rss_url=";

class News extends jsx.Component {
  constructor(props) {
    super(props);
    this.isRunning = false;
  }

  render() {
    return (
      <div
        class="card loose-fixed-bottom"
        ref="cardNews"
        ontransitionend={this.loop}
      >
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
    this.refs.cardNews.style.transform = "translate(100vw)";
    this.refs.cardNews.style.transition = "none";

    const texts = await Promise.all(this.links.map(this.getSource));

    this.refs.news.textContent = texts.join("");
    window.setTimeout(this.setTransition, TRANSITION_DELAY);
    window.setTimeout(this.setTransform, NEWS_DELAY);
  }

  async getSource(link) {
    const response = await fetch(RSS_API_URL + link);
    const data = await response.json();

    return data.items.map(this.getTitle).join(" \u25cf ");
  }

  getTitle(item) {
    return item.title;
  }

  setTransition() {
    const width = getComputedStyle(this.refs.cardNews).width.replace("px", "") +
      window.innerWidth;

    this.refs.cardNews.style.transition =
      `transform ${width / NEWS_SPEED}s linear`;
  }

  setTransform() {
    this.refs.cardNews.style.transform = "translate(-100%)";
  }

  changeData(doc) {
    this.links = doc.get("news");

    if (!this.isRunning) {
      this.loop();
    }
  }
}

export default News;
