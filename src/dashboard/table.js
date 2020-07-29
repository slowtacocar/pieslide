import jQuery from "jquery";

const FAKEPATH = "C:\\fakepath\\";

class Table {
  constructor(elements) {
    this.defaultData = elements.defaultData;
    this.inputGroup = jQuery(elements.inputGroup);
    this.inputGroupAddon = jQuery(elements.inputGroupAddon);
    this.inputGroupLabel = jQuery(elements.inputGroupLabel);
    this.progressModal = jQuery(elements.modal);
    this.progressBar = jQuery(elements.progressBar);
    this.inputGroup.change(this.updateFilename);
    this.inputGroupAddon.click(this.upload);
    this.progressModal.on("shown.bs.modal", this.update);
  }

  changeUser(docRef, folderRef) {
    this.folderRef = folderRef;
    this.docRef = docRef;
    this.docRef.onSnapshot(this.changeData);
  }

  updateFilename = () => {
    const value = this.inputGroup.val();

    this.inputGroupLabel.text(value.slice(FAKEPATH.length));
  };

  upload = () => {
    [ this.file ] = this.inputGroup.prop("files");
    this.progressBar.removeClass("bg-danger").width("0");
    this.progressModal.modal();
  };

  update = () => {
    this.folderRef.child(this.file.name).put(this.file)
      .on(
        "state_changed",
        this.updateProgress,
        this.updateError,
        this.updateSuccess
      );
  };

  updateProgress = (snapshot) => {
    const progress = snapshot.bytesTransferred / snapshot.totalBytes * 100;

    this.progressBar.width(`${progress}%`);
  };

  updateError = () => {
    this.progressBar.addClass("bg-danger");
  };

  updateSuccess = () => {
    this.progressModal.modal("hide");
    this.docRef.update(this.docData(this.file.name));
  };

  changeData = (doc) => {
    if (doc.exists) {
      this.updateTable(doc.data());
    } else {
      this.docRef.set(this.defaultData);
    }
  };

  static addPreviewListeners = (elements) => {
    this.modalBodyVideo = jQuery(elements.modalBodyVideo);
    this.modalImage = jQuery(elements.modalImage);
    this.modalImage.on("show.bs.modal", this.setPreviewImage);
    this.modalVideo = jQuery(elements.modalVideo);
    this.modalVideo.on("show.bs.modal", this.setPreviewVideo);
    this.modalVideo.on("hide.bs.modal", this.stopPreviewVideo);
  };

  static setPreviewVideo = (event) => {
    this.modalBodyVideo.append(jQuery("<video></video>", {
      "autoplay": true,
      "class": "embed-responsive",
      "controls": true
    }).append(jQuery("<source></source>", {
      "src": jQuery(event.relatedTarget).data("link"),
      "type": `video/${jQuery(event.relatedTarget).data("type")}`
    })));
  };

  static setPreviewImage = (event) => {
    jQuery("#previewImg").attr("src", jQuery(event.relatedTarget).data("link"));
  };

  static stopPreviewVideo = () => {
    this.modalBodyVideo.empty();
  };
}

export default Table;
