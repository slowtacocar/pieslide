import React from "react";
import PropTypes from "prop-types";

function Embed(props) {
  let src = props.embed;
  let lower = props.embed.toLowerCase();

  const match = src.match(/youtube\.com\/watch\?(?:v=|.*&v=)(.*?(?=&)|.*)/i);
  if (match) {
    src = `https://www.youtube.com/embed/${match[1]}?autoplay=1&controls=0&loop=1&playlist=${match[1]}`;
  } else if (!lower.startsWith("https://") && !lower.startsWith("http://")) {
    src = `https://${src}`;
  }

  return (
    <iframe
      className="frame"
      src={src}
      frameBorder="0"
      allow="autoplay; encrypted-media"
      title="Website Embed"
    />
  );
}

Embed.propTypes = {
  embed: PropTypes.string.isRequired,
};

export default Embed;
