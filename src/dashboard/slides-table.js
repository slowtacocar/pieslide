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
    this.tableBody = document.getElementById("tbodySlides");
    this.alertSave = document.getElementById("alertSave");
    this.buttonSaveSlides = document.getElementById("buttonSaveSlides");
    this.buttonDiscard = document.getElementById("buttonDiscard");
    jQuery(this.tableBody).sortable()
      .on("sortstop", this.sort);
    this.buttonSaveSlides.addEventListener("click", this.save);
    this.buttonDiscard.addEventListener("click", this.stopSort);
  }

  updateTable = (data) => {
    while (this.tableBody.firstChild) {
      this.tableBody.removeChild(this.tableBody.firstChild);
    }

    this.slides = data.slides;
    data.slides.forEach(this.addTableRow);
    data.slides.forEach(this.getURLs);
  };

  addTableRow = (file, index) => {
    const row = document.createElement("tr");

    row.id = `tr${index}`;
    this.tableBody.appendChild(row);
  };

  getURLs = (file, index) => {
    const ref = this.folderRef.child(file.name);

    ref.getDownloadURL().then(this.addTableData.bind(
      this,
      file,
      index
    ));
  };

  addTableData = (file, index, url) => {
    const type = file.name.split(".").slice(-1)[ 0 ].toLowerCase();
    const head = document.createElement("th");
    const previewButton = document.createElement("button");
    const preview = document.createElement("td");
    const durationInput = document.createElement("input");
    const duration = document.createElement("td");
    const delButton = document.createElement("button");
    const del = document.createElement("td");
    const row = document.getElementById(`tr${index}`);

    head.setAttribute("scope", "row");
    head.textContent = file.name;
    head.className = "title";
    previewButton.className = "btn btn-primary";
    previewButton.dataset.link = url;
    previewButton.dataset.toggle = "modal";
    previewButton.type = "button";
    previewButton.textContent = "View Preview";
    previewButton.dataset.type = type;
    preview.appendChild(previewButton);
    durationInput.className = "form-control duration";
    durationInput.min = "0";
    durationInput.type = "number";
    durationInput.value = file.duration;
    duration.appendChild(durationInput);
    delButton.className = "btn btn-danger disable";
    delButton.type = "button";
    delButton.textContent = "Delete";
    delButton.dataset.index = index;
    delButton.addEventListener("click", this.deleteItem);
    del.appendChild(delButton);
    row.appendChild(head);
    row.appendChild(preview);
    row.appendChild(duration);
    row.appendChild(del);

    if (VIDEO_TYPES.includes(type)) {
      durationInput.hidden = true;
      previewButton.dataset.target = "#previewModalVideo";
    } else {
      durationInput.addEventListener("change", this.sort);
      previewButton.dataset.target = "#previewModalImage";
    }

    delButton.addEventListener("click", this.deleteItem);
  };

  deleteItem = (event) => {
    const indexId = event.target.dataset.index;
    const slide = this.slides[ indexId ];

    this.folderRef.child(slide.name).delete()
      .then(this.deleteEntry.bind(this, indexId));
  };

  deleteEntry = (indexId) => {
    this.slides.splice(indexId, 1);
    this.docRef.update({ "slides": this.slides });
  };

  docData = (name) => ({
    "slides": firebase.firestore.FieldValue.arrayUnion({
      "duration": this.defaultDuration,
      name
    })
  });

  changeUser = (docRef, folderRef, settingsRef) => {
    super.changeUser(docRef, folderRef);
    settingsRef.onSnapshot(this.changeSettings);
  };

  changeSettings = (doc) => {
    this.defaultDuration = doc.get("duration");
  };

  sort = () => {
    for (const elem of document.getElementsByClassName("disable")) {
      elem.disabled = true;
    }

    this.alertSave.hidden = false;
  };

  stopSort = () => {
    this.alertSave.hidden = true;

    for (const elem of document.getElementsByClassName("disable")) {
      elem.disabled = false;
    }
  };

  save = () => {
    const slides = Array.from(this.tableBody.children).map(this.slideObject);

    this.docRef.update({ slides }).then(this.stopSort);
  };

  slideObject = (row) => ({
    "duration": row.getElementsByClassName("duration")[ 0 ].value,
    "name": row.getElementsByClassName("title")[ 0 ].textContent
  });
}

export default SlidesTable;
