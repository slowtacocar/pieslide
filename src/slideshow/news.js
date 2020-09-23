import React from "react";
import PropTypes from "prop-types";
import "./News.module.css";

const RSS_API_URL = "https://api.rss2json.com/v1/api.json?rss_url=";

function News(props) {
  const duration = React.useCallback(() => {
    const styles = getComputedStyle(news.current);
    const newsWidth = parseInt(styles.width.replace("px", ""));
    const fullWidth = newsWidth + innerWidth;

    return 10000 / fullWidth;
  }, []);

  const getNews = React.useCallback(async () => {
    async function getLink(link) {
      const response = await fetch(RSS_API_URL + link);
      const json = await response.json();
      const headlines = json.items.map(({ title }) => title);

      return headlines.join(" \u2022 ");
    }

    const texts = await Promise.all(props.news.map(getLink));

    setText(texts.join(" \u2022 "));
  }, [props.news]);

  const [text, setText] = React.useState();
  const news = React.useRef();
  const animation = React.useRef();

  React.useEffect(() => {
    animation.current && (animation.current.playbackRate = duration());
  }, [duration, text]);

  React.useEffect(() => {
    getNews();
    animation.current = news.current.animate(
      [{ transform: "translate(100vw)" }, { transform: "translate(-100%)" }],
      50000
    );
    animation.current.playbackRate = duration();
    animation.current.onfinish = async (event) => {
      await getNews();
      event.target.play();
    };
    return () => {
      animation.current.cancel();
    };
  }, [duration, getNews]);

  return (
    <p styleName="news" ref={news}>
      {text}
    </p>
  );
}

News.propTypes = {
  news: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default News;
