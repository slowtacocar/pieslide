import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import CSSModules from "react-css-modules";
import styles from "./News.module.css";

const NEWS_SPEED = 0.15;
const RSS_API_URL = "https://api.rss2json.com/v1/api.json?rss_url=";
const NEWS_DELAY = 1000;

function News() {
  const [text, setText] = useState();

  return <p styleName="news">{text}</p>;
}

News.propTypes = {
  "news": PropTypes.arrayOf(PropTypes.string).isRequired
};

export default CSSModules(News, styles);
