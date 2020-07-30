const NEWS_DELAY = 1000;
const NEWS_SPEED = 100;
const TRANSITION_DELAY = 500;
const RSS_API_URL = "https://api.rss2json.com/v1/api.json?rss_url=";

class News {
  constructor() {
    this.loop = this.loop.bind(this);
    this.setTransition = this.setTransition.bind(this);
    this.setTransform = this.setTransform.bind(this);
    this.setLinks = this.setLinks.bind(this);
    this.isRunning = false;
    this.cardNews = document.getElementById("cardNews");
    this.cardNews.addEventListener("transitionend", this.loop);
  }

  async loop() {
    this.isRunning = true;
    this.cardNews.style.transform = "translate(100vw)";
    this.cardNews.style.transition = "none";
    this.news = document.getElementById("news");

    const texts = await Promise.all(this.links.map(this.constructor.getSource));

    this.news.textContent = texts.join("");
    window.setTimeout(this.setTransition, TRANSITION_DELAY);
    window.setTimeout(this.setTransform, NEWS_DELAY);
    this.setTransform = this.setTransform.bind(this);
    this.setTransition = this.setTransition.bind(this);
    this.setLinks = this.setLinks.bind(this);
  }

  static async getSource(link) {
    const response = await fetch(RSS_API_URL + link);
    const data = await response.json();

    return data.items.map(this.constructor.getTitle).join(" \u25cf ");
  }

  static getTitle(item) {
    return item.title;
  }

  setTransition() {
    const width = getComputedStyle(this.cardNews).width.replace("px", "") +
      window.innerWidth;

    this.cardNews.style.transition = `transform ${width / NEWS_SPEED}s linear`;
  }

  setTransform() {
    this.cardNews.style.transform = "translate(-100%)";
  }

  setLinks(links) {
    this.links = links;

    if (!this.isRunning) {
      this.loop();
    }
  }
}

export default News;
