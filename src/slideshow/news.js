import jQuery from "jquery";

const NEWS_DELAY = 1000;
const NEWS_SPEED = 100;
const TRANSITION_DELAY = 500;
const RSS_API_URL = "https://api.rss2json.com/v1/api.json?rss_url=";

class News {
  constructor() {
    this.isRunning = false;
    this.cardNews = jQuery("#cardNews");
    this.cardNews.on("transitionend", this.loop);
  }

  loop = () => {
    this.isRunning = true;
    this.cardNews.css({
      "transform": "translate(100vw)",
      "transition": "none"
    });
    Promise.all(this.links.map(this.getSource)).then(this.setText);
    window.setTimeout(this.setTransition, TRANSITION_DELAY);
    window.setTimeout(this.setTransform, NEWS_DELAY);
  };

  getSource = (link) => {
    const params = { "url": RSS_API_URL + link };

    return jQuery.ajax(params).then(this.getItems);
  };

  getItems = (data) => data.items.map(this.getTitle).join(" \u25cf ");

  getTitle = (item) => item.title;

  setText = (texts) => {
    jQuery("#news").text(texts.join(""));
  };

  setTransition = () => {
    const width = this.cardNews.width() + jQuery(window).width();

    this.cardNews.css("transition", `transform ${width / NEWS_SPEED}s linear`);
  };

  setTransform = () => {
    this.cardNews.css("transform", "translate(-100%)");
  };

  setLinks = (links) => {
    this.links = links;

    if (!this.isRunning) {
      this.loop();
    }
  };
}

export default News;
