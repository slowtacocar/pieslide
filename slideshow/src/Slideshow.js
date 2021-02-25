import React from "react";
import Slides from "./Slides";
import Logo from "./Logo";
import Time from "./Time";
import News from "./News";
import Embed from "./Embed";
import PropTypes from "prop-types";

function Slideshow(props) {
  return (
    <>
      <div className="grid">
        {props.data.panes.map((pane) => (
          <div
            className="pane"
            key={pane.timestamp}
            style={{
              gridColumnStart: pane.columnStart,
              gridColumnEnd: pane.columnEnd,
              gridRowStart: pane.rowStart,
              gridRowEnd: pane.rowEnd,
            }}
          >
            {pane.slides ? (
              pane.slides.length && (
                <Slides
                  storageRef={props.storageRef}
                  slides={pane.slides}
                  transition={props.data.transition}
                />
              )
            ) : (
              <Embed embed={pane.embed} />
            )}
          </div>
        ))}
      </div>
      {props.data.logo && (
        <Logo
          storageRef={props.storageRef}
          logo={props.data.logo}
          size={props.data.size}
        />
      )}
      {props.data.time && <Time />}
      <News news={props.data.news} />
    </>
  );
}

Slideshow.propTypes = {
  data: PropTypes.shape({
    panes: PropTypes.arrayOf(
      PropTypes.shape({
        rowStart: PropTypes.number.isRequired,
        rowEnd: PropTypes.number.isRequired,
        columnStart: PropTypes.number.isRequired,
        columnEnd: PropTypes.number.isRequired,
        embed: PropTypes.string,
        slides: PropTypes.arrayOf(
          PropTypes.shape({
            name: PropTypes.string.isRequired,
            duration: PropTypes.number.isRequired,
            timestamp: PropTypes.number.isRequired,
          })
        ),
        timestamp: PropTypes.number.isRequired,
      })
    ).isRequired,
    news: PropTypes.arrayOf(PropTypes.string).isRequired,
    size: PropTypes.number.isRequired,
    time: PropTypes.bool.isRequired,
    transition: PropTypes.number.isRequired,
    logo: PropTypes.shape({
      name: PropTypes.string.isRequired,
      timestamp: PropTypes.number.isRequired,
    }),
  }),
  storageRef: PropTypes.object.isRequired,
};

export default Slideshow;
