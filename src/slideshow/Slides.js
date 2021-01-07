import React from "react";
import PropTypes from "prop-types";
import "./Slides.module.css";

function Slides(props) {
  const [shownIndex, setShownIndex] = React.useState(0);

  React.useEffect(() => {
    const slide = props.slides[shownIndex];
    const duration = slide.duration * 1000;

    const timeout = setTimeout(() => {
      setShownIndex(props.slides[shownIndex + 1] ? shownIndex + 1 : 0);
    }, duration);

    return () => {
      clearTimeout(timeout);
    };
  }, [props.slides, shownIndex]);

  return (
    <>
      {props.slides.map((slide, index) => (
        <div styleName="container" key={slide.timestamp}>
          <img
            styleName={shownIndex === index ? "slide" : "hidden"}
            crossOrigin="anonymous"
            src={slide.url}
            style={{
              transition: `opacity ${props.transition}s`,
            }}
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
      url: PropTypes.string.isRequired,
      timestamp: PropTypes.number.isRequired,
    })
  ).isRequired,
  transition: PropTypes.number.isRequired,
};

export default Slides;
