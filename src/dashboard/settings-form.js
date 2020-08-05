/** @jsx this.createElement */
/** @jsxFrag jsx.Fragment */

import jsx from "../lib/jsx.js";

class SettingsForm extends jsx.Component {
  render() {
    return (
      <section>
        <header id="slideshowSettings">
          <h2>Slideshow Settings</h2>
          <p>
            Use the controls to change some general settings for your slideshow.
          </p>
        </header>
        <div class="grid">
          <form>
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
          </form>

          <form>
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
          </form>
          <form>
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
          </form>

          <form>
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
          </form>

          <button
            class="button"
            type="button"
            onclick={this.reload}
          >Refresh Slideshow</button>

          <details>
            <summary>Advanced Settings</summary>
            <form>
              <label for="inputGroupNews">
                News Sources
              </label>
              <input
                type="text"
                id="inputGroupNews"
                ref="inputGroupNews"
                onchange={this.newsChanged}
              ></input>
            </form>
          </details>
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
