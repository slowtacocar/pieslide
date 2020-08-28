import React from "react";
import PropTypes from "prop-types";
import "./Settings.module.css";

function Settings(props) {
  function durationChanged(event) {
    props.docRef.update({
      "duration": event.target.value
    });
  }

  function newsChanged(event) {
    props.docRef.update({
      "news": event.target.value.split(",")
    });
  }

  function sizeChanged(event) {
    props.docRef.update({
      "size": event.target.value
    });
  }

  function timeChanged(event) {
    props.docRef.update({
      "time": event.target.value === "show"
    });
  }

  function transitionChanged(event) {
    props.docRef.update({
      "transition": event.target.value
    });
  }

  function reload() {
    props.docRef.update({ "message": "reload" });
  }

  return (
    <section id="slideshowSettings" className="section">
      <header>
        <h1 className="header">Slideshow Settings</h1>
        <p className="headerSub">Use the controls to change some general settings for your slideshow.</p>
      </header>
      <div styleName="grid">
        <div styleName="time">
          <label htmlFor="inputGroupTime">Time Visibility</label>
          <select id="inputGroupTime" onChange={timeChanged} value={props.time ? "show" : "hide"}>
            <option value="show">Show</option>
            <option value="hide">Hide</option>
          </select>
        </div>
        <div styleName="duration">
          <label htmlFor="inputGroupDuration">Default Slide Duration</label>
          <input type="number" id="inputGroupDuration" onChange={durationChanged} min="0" step="any" value={props.duration} />
        </div>
        <div styleName="transition">
          <label htmlFor="inputGroupTransition">Transition Time</label>
          <input type="number" id="inputGroupTransition" onChange={transitionChanged} min="0" step="any" value={props.transition} />
        </div>
        <div styleName="size">
          <label htmlFor="inputGroupSize">Logo Size</label>
          <input type="number" id="inputGroupSize" onChange={sizeChanged} min="0" max="100" step="any" value={props.size} />
          <span>%</span>
        </div>
        <button type="button" onClick={reload} styleName="refresh">Refresh Slideshow</button>
        <div styleName="advanced">
          <details>
            <summary>Advanced Settings</summary>
            <div styleName="news">
              <label htmlFor="inputGroupNews">News Sources</label>
              <input type="text" id="inputGroupNews" onChange={newsChanged} value={props.news.join(",")} />
            </div>
          </details>
        </div>
      </div>
    </section>
  );
}

Settings.propTypes = {
  "duration": PropTypes.any.isRequired,
  "news": PropTypes.arrayOf(PropTypes.string).isRequired,
  "size": PropTypes.any.isRequired,
  "time": PropTypes.bool.isRequired,
  "transition": PropTypes.any.isRequired,
  "docRef": PropTypes.object.isRequired
};

export default Settings;
