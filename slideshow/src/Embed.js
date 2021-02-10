import React from "react";
import PropTypes from "prop-types";
import "./Embed.css";

function Embed(props) {
  let src = props.embed;
  let lower = src.toLowerCase();

  if (lower.includes("youtube.com") && src.includes("?v=")) {
    const id = src.split("?v=")[1].split("&")[0];
    src = `https://www.youtube.com/embed/${id}?autoplay=1&controls=0&loop=1&playlist=${id}`;
  }

  if (!lower.startsWith("https://") && !lower.startsWith("http://")) {
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
