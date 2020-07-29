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
const BUTTON_DELETE = "buttonDelete";

class SlidesTable extends Table {
  constructor() {
    super({
      "defaultData": { "slides": [] },
      "inputGroup": "#inputGroupSlide",
      "inputGroupAddon": "#inputGroupSlideAddon",
      "inputGroupLabel": "#inputGroupSlideLabel",
      "modal": "#slideProgressModal",
      "progressBar": "#slideProgressBar"
    });
    this.tableBody = jQuery("#tbodySlides");
    this.alertSave = jQuery("#alertSave");
    jQuery("#tbodySlides").sortable();
    jQuery("#tbodySlides").on("sortstop", this.sort);
    jQuery("#buttonSaveSlides").click(this.save);
    jQuery("#buttonDiscard").click(this.stopSort);
  }

  updateTable = (data) => {
    this.tableBody.empty();
    data.slides.forEach(this.addTableRow);
    data.slides.forEach(this.getURLs);
  };

  addTableRow = (file, index) => {
    this.tableBody.append(jQuery("<tr></tr>", { "id": `tr${index}` }));
  };

  getURLs = (file, index, slides) => {
    const ref = this.folderRef.child(file.name);

    ref.getDownloadURL().then(this.addTableData.bind(this, {
      file,
      index,
      slides
    }));
  };

  addTableData = (slide, url) => {
    const { file, index, slides } = slide;
    const type = file.name.split(".").slice(-1)[ 0 ].toLowerCase();

    jQuery(`#tr${index}`).append(jQuery("<th></th>", {
      "html": file.name,
      "scope": "row"
    }))
      .append(jQuery("<td></td>").append(jQuery("<button></button>", {
        "class": "btn btn-primary",
        "data-link": url,
        "data-toggle": "modal",
        "data-type": type,
        "html": "View Preview",
        "id": `buttonPreview${index}`,
        "type": "button"
      })))
      .append(jQuery("<td></td>").append(jQuery("<input>", {
        "class": "form-control",
        "id": `inputDuration${index}`,
        "min": "0",
        "type": "number",
        "value": file.duration
      })))
      .append(jQuery("<td></td>").append(jQuery("<button></button>", {
        "class": "btn btn-danger delete",
        "html": "Delete",
        "id": `buttonDelete${index}`,
        "type": "button"
      })));

    if (VIDEO_TYPES.includes(type)) {
      jQuery(`#inputDuration${index}`).hide();
      jQuery(`#buttonPreview${index}`)
        .attr("data-target", "#previewModalVideo");
    } else {
      jQuery(`#inputDuration${index}`).change(this.sort);
      jQuery(`#buttonPreview${index}`)
        .attr("data-target", "#previewModalImage");
    }

    jQuery(`#buttonDelete${index}`).click({ slides }, this.deleteItem);
  };

  deleteItem = (event) => {
    const indexId = jQuery(event.target).attr("id")
      .slice(BUTTON_DELETE.length);
    const slide = event.data.slides[ indexId ];

    this.folderRef.child(slide.name).delete()
      .then(this.deleteEntry.bind(this, indexId, event.data.slides));
  };

  deleteEntry = (indexId, slides) => {
    slides.splice(indexId, 1);
    this.docRef.update({ slides });
  };

  docData = (name) => ({ "slides": firebase.firestore.FieldValue.arrayUnion({
    "duration": this.defaultDuration, name
  }) });

  changeUser = (docRef, folderRef, settingsRef) => {
    super.changeUser(docRef, folderRef);
    settingsRef.onSnapshot(this.changeSettings);
  };

  changeSettings = (doc) => {
    this.defaultDuration = doc.get("duration");
  };

  sort = () => {
    jQuery(".delete").prop("disabled", true);
    jQuery("[id^=inputGroupSlide]").prop("disabled", true);
    this.alertSave.prop("hidden", false);
  };

  stopSort = () => {
    this.alertSave.prop("hidden", true);
    jQuery(".delete").prop("disabled", false);
    jQuery("[id^=inputGroupSlide]").prop("disabled", false);
  };

  save = () => {
    const rows = jQuery("#tbodySlides > tr");
    const slides = rows.map(this.slideObject).get();

    this.docRef.update({ slides }).then(this.stopSort);
  };

  slideObject = (index, row) => ({
    "duration": jQuery("[id^=inputDuration]", row).val(),
    "name": jQuery("th", row).text()
  });
}

export default SlidesTable;
