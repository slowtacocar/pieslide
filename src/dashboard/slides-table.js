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
      "sticky": true,
      "video": true
    });
  }

  render() {
    const element =
      <section>
        <header id="slides">
          <h2>Slides</h2>
          <p class="lead">
            Use the input at the bottom of the screen to upload images for your
            slideshow, and drag the table rows to change the order of the
            slides.
          </p>
        </header>
        <div class="table-scroller">
          <table>
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
        </div>
        {super.render()}
      </section>;

    jQuery(this.refs.tableBody).sortable({
      "stop": this.updateSort
    });

    return element;
  }

  async updateTable(data) {
    this.slides = data.slides;

    const rowElements =
      await Promise.all(this.slides.map(this.createRowElement));

    jsx.render(this.refs.tableBody, ...rowElements);
  }

  async createRowElement(file, index) {
    const ref = this.folderRef.child(file.name);
    const url = await ref.getDownloadURL();
    const type = file.name.split(".").slice(-1)[ 0 ].toLowerCase();
    const row =
      <tr>
        <th class="title" scope="row">{file.name}</th>
        <td>
          <button
            type="button"
            data-link={url}
            data-type={type}
            onclick={
              VIDEO_TYPES.includes(type)
                ? this.refs.preview.showVideo
                : this.refs.preview.showImage
            }
          >View Preview</button>
        </td>
        <td>
          <input
            class="duration"
            min="0"
            type="number"
            value={file.duration}
            data-index={index}
            hidden={VIDEO_TYPES.includes(type)}
            onchange={this.updateDuration}
          ></input>
        </td>
        <td>
          <button
            class="delete"
            type="button"
            data-index={index}
            onclick={this.deleteItem}
          >Delete</button>
        </td>
      </tr>;

    return row;
  }

  async deleteItem(event) {
    const { index } = event.target.dataset;
    const [ slide ] = this.slides.splice(index, 1);

    await this.folderRef.child(slide.name).delete();
    this.docRef.update({ "slides": this.slides });
  }

  toObject(name) {
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

  updateSort() {
    const slides = Array.from(this.refs.tableBody.children)
      .map(this.getObject);

    this.docRef.update({ slides });
  }

  updateDuration(event) {
    const { index } = event.target.dataset;
    const slide = this.slides[ index ];

    slide.duration = event.target.value;
    this.docRef.update({ "slides": this.slides });
  }

  getObject(row) {
    return {
      "duration": row.querySelector(".duration").value,
      "name": row.querySelector(".title").textContent
    };
  }
}

export default SlidesTable;
