import React from "react";
import PropTypes from "prop-types";

function Slides(props) {
  const [shownIndex, setShownIndex] = React.useState(0);
  const [urls, setUrls] = React.useState();

  React.useEffect(() => {
    async function getDownloadUrl(data) {
      const url = await props.storageRef
        .child(data.timestamp.toString())
        .getDownloadURL();

      return [data.timestamp, url];
    }

    async function getDownloadUrls() {
      setUrls(
        Object.fromEntries(await Promise.all(props.slides.map(getDownloadUrl)))
      );
    }

    getDownloadUrls();
  }, [props.slides, props.storageRef]);

  React.useEffect(() => {
    const slide = props.slides[shownIndex];
    const duration = slide ? slide.duration * 1000 : 0;

    const timeout = setTimeout(() => {
      setShownIndex(props.slides[shownIndex + 1] ? shownIndex + 1 : 0);
    }, duration);

    return () => {
      clearTimeout(timeout);
    };
  }, [props.slides, shownIndex]);

  return (
    <>
      {urls &&
        props.slides.map((slide, index) => (
          <div className="container" key={slide.timestamp}>
            <img
              className="slide"
              crossOrigin="anonymous"
              src={urls[slide.timestamp]}
              style={{
                transition: `opacity ${props.transition}s`,
                opacity: shownIndex === index ? "1" : "0",
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
