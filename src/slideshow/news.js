const NEWS_DELAY = 1000;
const NEWS_SPEED = 100;
const TRANSITION_DELAY = 500;
const RSS_API_URL = "https://api.rss2json.com/v1/api.json?rss_url=";

class News {
  constructor() {
    this.isRunning = false;
    this.cardNews = document.getElementById("cardNews");
    this.cardNews.addEventListener("transitionend", this.loop);
  }

  loop = () => {
    this.isRunning = true;
    this.cardNews.style.transform = "translate(100vw)";
    this.cardNews.style.transition = "none";
    this.news = document.getElementById("news");
    Promise.all(this.links.map(this.getSource)).then(this.setText);
    window.setTimeout(this.setTransition, TRANSITION_DELAY);
    window.setTimeout(this.setTransform, NEWS_DELAY);
  };

  getSource = (link) => fetch(RSS_API_URL + link).then(this.getJSON);

  getJSON = (response) => response.json().then(this.getItems);

  getItems = (data) => data.items.map(this.getTitle).join(" \u25cf ");

  getTitle = (item) => item.title;

  setText = (texts) => {
    this.news.textContent = texts.join("");
  };

  setTransition = () => {
    const width = getComputedStyle(this.cardNews).width.replace("px", "") +
      window.innerWidth;

    this.cardNews.style.transition = `transform ${width / NEWS_SPEED}s linear`;
  };

  setTransform = () => {
    this.cardNews.style.transform = "translate(-100%)";
  };

  setLinks = (links) => {
    this.links = links;

    if (!this.isRunning) {
      this.loop();
    }
  };
}

export default News;
