/** @jsx this.createElement */
/** @jsxFrag jsx.Fragment */

import jsx from "../lib/jsx.js";

class SettingsForm extends jsx.Component {
  render() {
    return (
      <section id="slideshowSettings">
        <header>
          <h1>Slideshow Settings</h1>
          <p>
            Use the controls to change some general settings for your slideshow.
          </p>
        </header>
        <div id="settingsGrid">
          <div class="form" id="time">
            <label for="inputGroupTime">
              Time Visibility
            </label>
            <select
              id="inputGroupTime"
              ref="inputGroupTime"
              onchange={this.timeChanged}
            >
              <option value="show">Show</option>
              <option value="hide">Hide</option>
            </select>
          </div>

          <div class="form" id="duration">
            <label for="inputGroupDuration">
              Default Slide Duration
            </label>
            <input
              type="number"
              id="inputGroupDuration"
              ref="inputGroupDuration"
              onchange={this.durationChanged}
              min="0"
              step="any"
            ></input>
          </div>
          <div class="form" id="transition">
            <label for="inputGroupTransition">
              Transition Time
            </label>
            <input
              type="number"
              id="inputGroupTransition"
              ref="inputGroupTransition"
              onchange={this.transitionChanged}
              min="0"
              step="any"
            ></input>
          </div>

          <div class="form" id="size">
            <label for="inputGroupSize">
              Logo Size
            </label>
            <input
              type="number"
              id="inputGroupSize"
              ref="inputGroupSize"
              onchange={this.sizeChanged}
              min="0"
              max="100"
              step="any"
            ></input>
            <span>%</span>
          </div>

          <button
            class="red-button"
            type="button"
            onclick={this.reload}
            id="refresh"
          >Refresh Slideshow</button>

          <div id="advanced">
            <details>
              <summary>Advanced Settings</summary>
              <div class="form">
                <label for="inputGroupNews">
                  News Sources
                </label>
                <input
                  type="text"
                  id="inputGroupNews"
                  ref="inputGroupNews"
                  onchange={this.newsChanged}
                ></input>
              </div>
            </details>
          </div>
        </div>
      </section>
    );
  }

  durationChanged(event) {
    this.docRef.update({
      "duration": event.target.value
    });
  }

  newsChanged(event) {
    this.docRef.update({
      "news": event.target.value.split(",")
    });
  }

  sizeChanged(event) {
    this.docRef.update({
      "size": event.target.value
    });
  }

  timeChanged(event) {
    this.docRef.update({
      "time": event.target.value === "show"
    });
  }

  transitionChanged(event) {
    this.docRef.update({
      "transition": event.target.value
    });
  }

  reload() {
    this.docRef.update({ "message": "reload" });
  }

  changeUser(docRef) {
    this.docRef = docRef;
    this.docRef.onSnapshot(this.changeData);
  }

  changeData(doc) {
    if (doc.exists) {
      this.refs.inputGroupTime.value = doc.get("time") ? "show" : "hide";
      this.refs.inputGroupDuration.value = doc.get("duration");
      this.refs.inputGroupTransition.value = doc.get("transition");
      this.refs.inputGroupSize.value = doc.get("size");
      this.refs.inputGroupNews.value = doc.get("news").join(",");
    } else {
      this.docRef.set({
        "duration": 5,
        "message": "",
        "news": [ "https://news.google.com/news/rss" ],
        "size": 30,
        "time": true,
        "transition": 0.25
      });
    }
  }
}

export default SettingsForm;
