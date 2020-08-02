/** @jsx this.createElement */

import "firebase/firestore";
import "jquery-ui/ui/data";
import "jquery-ui/ui/scroll-parent";
import "jquery-ui/ui/widget";
import "jquery-ui/ui/widgets/mouse";
import "jquery-ui/ui/widgets/sortable";
import Table from "./table.js";
import firebase from "firebase/app";
import jQuery from "jquery";
import jsx from "../lib/jsx.js";

const VIDEO_TYPES = [
  "ogm",
  "wmv",
  "mpg",
  "webm",
  "ogv",
  "mov",
  "asx",
  "mpeg",
  "mp4",
  "m4v",
  "avi"
];

class SlidesTable extends Table {
  constructor(props) {
    super({
      ...props,
      "defaultData": { "slides": [] },
      "name": "slide",
      "sticky": true
    });
  }

  render() {
    const obj =
      <div>
        <div id="slides" class="spacer"></div>
        <h1>Slides</h1>
        <p class="lead">
          Use the input at the bottom of the screen to upload images for your
          slideshow, and drag the table rows to change the order of the slides.
        </p>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">File Name</th>
              <th scope="col">Preview</th>
              <th scope="col">Duration</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody ref="tableBody">
          </tbody>
        </table>
        {super.render()}
        <div
          class="alert alert-warning mb-0 fixed-bottom"
          role="alert"
          ref="alertSave"
          hidden
        >
          <button class="btn btn-primary" onclick={this.save}>
            Save Changes
          </button>
          <button class="btn btn-secondary" onclick={this.stopSort}>
            Discard Changes
          </button>
        </div>
      </div>;

    jQuery(this.refs.tableBody).sortable({
      "stop": this.startSort
    });

    return obj;
  }

  async updateTable(data) {
    this.slides = data.slides;
    this.rows = await Promise.all(this.slides.map(this.getURLs));
    jsx.render(this.refs.tableBody, ...this.rows);
  }

  async getURLs(file, index) {
    const ref = this.folderRef.child(file.name);
    const url = await ref.getDownloadURL();
    const type = file.name.split(".").slice(-1)[ 0 ].toLowerCase();
    const row =
      <tr>
        <th class="title" scope="row">{file.name}</th>
        <td>
          <button
            type="button"
            class="btn btn-primary"
            data-link={url}
            data-toggle="modal"
            data-type={type}
            data-target={
              VIDEO_TYPES.includes(type)
                ? "#previewModalVideo"
                : "#previewModalImage"
            }
          >View Preview</button>
        </td>
        <td>
          <input
            class="form-control duration"
            min="0"
            type="number"
            value={file.duration}
            hidden={VIDEO_TYPES.includes(type)}
            onchange={this.startSort}
          ></input>
        </td>
        <td>
          <button
            class="btn btn-danger delete"
            type="button"
            data-index={index}
            onclick={this.deleteItem}
          >Delete</button>
        </td>
      </tr>;

    return row;
  }

  async deleteItem(event) {
    const indexId = event.target.dataset.index;
    const slide = this.slides[ indexId ];

    await this.folderRef.child(slide.name).delete();
    this.slides.splice(indexId, 1);
    this.docRef.update({ "slides": this.slides });
  }

  docData(name) {
    return {
      "slides": firebase.firestore.FieldValue.arrayUnion({
        "duration": this.defaultDuration,
        name
      })
    };
  }

  changeUser(docRef, folderRef, settingsRef) {
    super.changeUser(docRef, folderRef);
    settingsRef.onSnapshot(this.changeSettings);
  }

  changeSettings(doc) {
    this.defaultDuration = doc.get("duration");
  }

  sort(hide) {
    for (const btn of this.refs.tableBody.querySelectorAll(".delete")) {
      btn.disabled = !hide;
    }

    this.refs.alertSave.hidden = hide;
  }

  startSort() {
    this.sort(false);
  }

  stopSort() {
    this.sort(true);
  }

  save() {
    const slides = Array.from(this.refs.tableBody.children)
      .map(this.slideObject);

    this.docRef.update({ slides });
    this.stopSort();
  }

  slideObject(row) {
    return {
      "duration": row.querySelector(".duration").value,
      "name": row.querySelector(".title").textContent
    };
  }
}

export default SlidesTable;
