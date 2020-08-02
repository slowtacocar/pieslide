/** @jsx this.createElement */

import jsx from "../lib/jsx.js";

class SettingsForm extends jsx.Component {
  render() {
    return (
      <div>
        <div class="spacer" id="slideshowSettings"></div>
        <h1>Slideshow Settings</h1>
        <p class="lead">
          Use the controls to change some general settings for your slideshow.
        </p>

        <div class="form-row mb-3">
          <div class="input-group col-md">
            <div class="input-group-prepend">
              <label class="input-group-text" for="inputGroupTime">
                Time Visibility
              </label>
            </div>
            <select
              class="custom-select"
              id="inputGroupTime"
              ref="inputGroupTime"
              onchange={this.timeChanged}
            >
              <option value="show">Show</option>
              <option value="hide">Hide</option>
            </select>
          </div>

          <div class="input-group col-md">
            <div class="input-group-prepend">
              <label class="input-group-text" for="inputGroupDuration">
                Default Slide Duration
              </label>
            </div>
            <input
              type="number"
              class="form-control"
              id="inputGroupDuration"
              ref="inputGroupDuration"
              onchange={this.durationChanged}
              min="0"
              step="any"
            ></input>
          </div>
        </div>
        <div class="form-row mb-3">
          <div class="input-group col-md">
            <div class="input-group-prepend">
              <label class="input-group-text" for="inputGroupTransition">
                Transition Time
              </label>
            </div>
            <input
              type="number"
              class="form-control"
              id="inputGroupTransition"
              ref="inputGroupTransition"
              onchange={this.transitionChanged}
              min="0"
              step="any"
            ></input>
          </div>

          <div class="input-group col-md">
            <div class="input-group-prepend">
              <label class="input-group-text" for="inputGroupSize">
                Logo Size
              </label>
            </div>
            <input
              type="number"
              class="form-control"
              id="inputGroupSize"
              ref="inputGroupSize"
              onchange={this.sizeChanged}
              aria-describedby="inputGroupSizeAddon"
              min="0"
              max="100"
              step="any"
            ></input>
            <div class="input-group-append">
              <span class="input-group-text" id="inputGroupSizeAddon">%</span>
            </div>
          </div>
        </div>

        <button
          class="btn btn-outline-danger btn-block mb-3"
          type="button"
          onclick={this.reload}
        >Refresh Slideshow</button>

        <div class="card">
          <div class="card-header p-0" id="advancedSettingsHeader">
            <h2 class="mb-0">
              <button
                class="btn btn-link btn-block text-left"
                type="button"
                data-toggle="collapse"
                data-target="#advancedSettingsBody"
                aria-expanded="true"
                aria-controls="advancedSettingsBody"
              >
                Advanced Settings
              </button>
            </h2>
          </div>

          <div
            id="advancedSettingsBody"
            class="collapse"
            aria-labelledby="advancedSettingsHeader"
          >
            <div class="card-body">
              <div class="input-group">
                <div class="input-group-prepend">
                  <label class="input-group-text" for="inputGroupNews">
                    News Sources
                  </label>
                </div>
                <input
                  type="text"
                  class="form-control"
                  id="inputGroupNews"
                  ref="inputGroupNews"
                  onchange={this.newsChanged}
                ></input>
              </div>
            </div>
          </div>
        </div>

        <div class="clearfix">
          <button
            class="btn btn-primary btn-lg mt-3 float-right"
            onclick={this.save}
          >Save Changes</button>
        </div>
      </div>
    );
  }

  save() {
    this.docRef.update({
      "duration": this.refs.inputGroupDuration.value,
      "news": this.refs.inputGroupNews.value.split(","),
      "size": this.refs.inputGroupSize.value,
      "time": this.refs.inputGroupTime.value === "show",
      "transition": this.refs.inputGroupTransition.value
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
