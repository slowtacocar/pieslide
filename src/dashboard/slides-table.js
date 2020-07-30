import "firebase/firestore";
import Table from "./table.js";
import firebase from "firebase/app";
import jQuery from "jquery";

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
  constructor() {
    super({
      "defaultData": { "slides": [] },
      "inputGroup": "inputGroupSlide",
      "inputGroupAddon": "inputGroupSlideAddon",
      "inputGroupLabel": "inputGroupSlideLabel",
      "modal": "slideProgressModal",
      "progressBar": "slideProgressBar"
    });
    this.getURLs = this.getURLs.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.changeSettings = this.changeSettings.bind(this);
    this.sort = this.sort.bind(this);
    this.stopSort = this.stopSort.bind(this);
    this.save = this.save.bind(this);
    this.tableBody = document.getElementById("tbodySlides");
    this.alertSave = document.getElementById("alertSave");
    this.buttonSaveSlides = document.getElementById("buttonSaveSlides");
    this.buttonDiscard = document.getElementById("buttonDiscard");
    jQuery(this.tableBody).sortable()
      .on("sortstop", this.sort);
    this.buttonSaveSlides.addEventListener("click", this.save);
    this.buttonDiscard.addEventListener("click", this.stopSort);
  }

  async updateTable(data) {
    while (this.tableBody.firstChild) {
      this.tableBody.removeChild(this.tableBody.firstChild);
    }

    this.slides = data.slides;

    const elements = await Promise.all(this.slides.map(this.getURLs));

    this.tableBody.append(...elements);
  }

  async getURLs(file, index) {
    const ref = this.folderRef.child(file.name);
    const url = await ref.getDownloadURL();
    const type = file.name.split(".").slice(-1)[ 0 ].toLowerCase();
    const head = document.createElement("th");
    const previewButton = document.createElement("button");
    const preview = document.createElement("td");
    const durationInput = document.createElement("input");
    const duration = document.createElement("td");
    const delButton = document.createElement("button");
    const del = document.createElement("td");
    const row = document.createElement("tr");

    head.setAttribute("scope", "row");
    head.textContent = file.name;
    head.className = "title";
    previewButton.className = "btn btn-primary";
    previewButton.dataset.link = url;
    previewButton.dataset.toggle = "modal";
    previewButton.type = "button";
    previewButton.textContent = "View Preview";
    previewButton.dataset.type = type;
    preview.append(previewButton);
    durationInput.className = "form-control duration";
    durationInput.min = "0";
    durationInput.type = "number";
    durationInput.value = file.duration;
    duration.append(durationInput);
    delButton.className = "btn btn-danger disable";
    delButton.type = "button";
    delButton.textContent = "Delete";
    delButton.dataset.index = index;
    delButton.addEventListener("click", this.deleteItem);
    del.append(delButton);
    row.append(head);
    row.append(preview);
    row.append(duration);
    row.append(del);

    if (VIDEO_TYPES.includes(type)) {
      durationInput.hidden = true;
      previewButton.dataset.target = "#previewModalVideo";
    } else {
      durationInput.addEventListener("change", this.sort);
      previewButton.dataset.target = "#previewModalImage";
    }

    return row;
  }

  async deleteItem(event) {
    const indexId = event.target.dataset.index;
    const slide = this.slides[ indexId ];

    await this.folderRef.child(slide.name).delete();
    this.slides.splice(indexId, 1);
    this.docRef.update({ "slides": this.slides });
  }

  static docData(name) {
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

  sort() {
    for (const elem of document.getElementsByClassName("disable")) {
      elem.disabled = true;
    }

    this.alertSave.hidden = false;
  }

  stopSort() {
    this.alertSave.hidden = true;

    for (const elem of document.getElementsByClassName("disable")) {
      elem.disabled = false;
    }
  }

  save() {
    const slides = Array.from(this.tableBody.children)
      .map(this.constructor.slideObject);

    this.docRef.update({ slides });
    this.stopSort();
  }

  static slideObject(row) {
    return {
      "duration": row.getElementsByClassName("duration")[ 0 ].value,
      "name": row.getElementsByClassName("title")[ 0 ].textContent
    };
  }
}

export default SlidesTable;
