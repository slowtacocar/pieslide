import React from "react";
import PropTypes from "prop-types";
import "./Settings.module.css";

function Settings(props) {
  function changeDuration(event) {
    props.onDurationChange(Number(event.target.value));
  }

  function changeNews(event) {
    props.onNewsChange(event.target.value.split(","));
  }

  function changeSize(event) {
    props.onSizeChange(Number(event.target.value));
  }

  function changeTime(event) {
    props.onTimeChange(event.target.value === "show");
  }

  function changeTransition(event) {
    props.onTransitionChange(Number(event.target.value));
  }

  function reload() {
    props.onMessageChange("reload");
  }

  return (
    <section id="slideshowSettings" className="section">
      <header>
        <h1 className="header">Slideshow Settings</h1>
        <p className="headerSub">
          Use the controls to change some general settings for your slideshow.
        </p>
      </header>
      <div styleName="grid">
        <div styleName="time">
          <label htmlFor="inputGroupTime">Time Visibility</label>
          <select
            id="inputGroupTime"
            onChange={changeTime}
            value={props.time ? "show" : "hide"}
          >
            <option value="show">Show</option>
            <option value="hide">Hide</option>
          </select>
        </div>
        <div styleName="duration">
          <label htmlFor="inputGroupDuration">Default Slide Duration</label>
          <input
            type="number"
            id="inputGroupDuration"
            onChange={changeDuration}
            min="0"
            step="any"
            value={props.duration}
          />
        </div>
        <div styleName="transition">
          <label htmlFor="inputGroupTransition">Transition Time</label>
          <input
            type="number"
            id="inputGroupTransition"
            onChange={changeTransition}
            min="0"
            step="any"
            value={props.transition}
          />
        </div>
        <div styleName="size">
          <label htmlFor="inputGroupSize">Logo Size</label>
          <input
            type="number"
            id="inputGroupSize"
            onChange={changeSize}
            min="0"
            max="100"
            step="any"
            value={props.size}
          />
          <span>%</span>
        </div>
        <button type="button" onClick={reload} styleName="refresh">
          Refresh Slideshow
        </button>
        <div styleName="advanced">
          <details>
            <summary>Advanced Settings</summary>
            <div styleName="news">
              <label htmlFor="inputGroupNews">News Sources</label>
              <input
                type="text"
                id="inputGroupNews"
                onChange={changeNews}
                value={props.news.join(",")}
              />
            </div>
          </details>
        </div>
      </div>
    </section>
  );
}

Settings.propTypes = {
  duration: PropTypes.number.isRequired,
  news: PropTypes.arrayOf(PropTypes.string).isRequired,
  size: PropTypes.number.isRequired,
  time: PropTypes.bool.isRequired,
  transition: PropTypes.number.isRequired,
  onDurationChange: PropTypes.func.isRequired,
  onNewsChange: PropTypes.func.isRequired,
  onSizeChange: PropTypes.func.isRequired,
  onTimeChange: PropTypes.func.isRequired,
  onTransitionChange: PropTypes.func.isRequired,
  onMessageChange: PropTypes.func.isRequired,
};

export default Settings;
