import React from "react";
import PropTypes from "prop-types";
import "./Slides.css";
import { useUrls } from "@pieslide/common";

function Slides(props) {
  const slides = useUrls(props.slides, props.storageRef);
  const [shownIndex, setShownIndex] = React.useState(0);

  React.useEffect(() => {
    const slide = slides[shownIndex];
    const duration = slide ? slide.duration * 1000 : 0;

    const timeout = setTimeout(() => {
      setShownIndex(slides[shownIndex + 1] ? shownIndex + 1 : 0);
    }, duration);

    return () => {
      clearTimeout(timeout);
    };
  }, [slides, shownIndex]);

  return (
    <>
      {slides.map((slide, index) => (
        <div className="container" key={slide.timestamp}>
          <img
            className={`slide${shownIndex === index ? "" : " hidden"}`}
            crossOrigin="anonymous"
            src={slide.url}
            style={{
              transition: `opacity ${props.transition}s`,
            }}
            alt="Slideshow Slide"
          />
        </div>
      ))}
    </>
  );
}

Slides.propTypes = {
  slides: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      duration: PropTypes.number.isRequired,
      timestamp: PropTypes.number.isRequired,
    })
  ).isRequired,
  transition: PropTypes.number.isRequired,
  storageRef: PropTypes.object.isRequired,
};

export default Slides;
