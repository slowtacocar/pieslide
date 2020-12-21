import React from "react";
import PropTypes from "prop-types";
import "./News.module.css";

const RSS_API_URL = "https://api.rss2json.com/v1/api.json?rss_url=";

function News(props) {
  const drawFrame = React.useCallback(() => {
    setPosition((position) => {
      if (position < -news.current.offsetWidth) {
        getNews();
        return innerWidth;
      } else {
        return position - 2;
      }
    });
    animation.current = requestAnimationFrame(drawFrame);
  }, [getNews]);

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
  const [position, setPosition] = React.useState(innerWidth);
  const animation = React.useRef();
  const news = React.useRef();

  React.useEffect(() => {
    getNews();
    animation.current = requestAnimationFrame(drawFrame);
    return () => cancelAnimationFrame(animation.current);
  }, [drawFrame, getNews]);

  return (
    <p
      styleName="news"
      style={{
        transform: `translate(${position}px)`,
      }}
      ref={news}
    >
      {text}
    </p>
  );
}

News.propTypes = {
  news: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default News;
