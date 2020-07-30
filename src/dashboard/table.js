import jQuery from "jquery";

class Table {
  constructor(elements) {
    this.defaultData = elements.defaultData;
    this.inputGroup = document.getElementById(elements.inputGroup);
    this.inputGroupAddon = document.getElementById(elements.inputGroupAddon);
    this.inputGroupLabel = document.getElementById(elements.inputGroupLabel);
    this.progressModal = document.getElementById(elements.modal);
    this.progressBar = document.getElementById(elements.progressBar);
    this.inputGroup.addEventListener("change", this.updateFilename);
    this.inputGroupAddon.addEventListener("click", this.upload);
    this.$progressModal = jQuery(this.progressModal)
      .on("shown.bs.modal", this.update);
  }

  changeUser(docRef, folderRef) {
    this.folderRef = folderRef;
    this.docRef = docRef;
    this.docRef.onSnapshot(this.changeData);
  }

  updateFilename = () => {
    const value = this.inputGroup.files[ 0 ].name;

    this.inputGroupLabel.textContent = value;
  };

  upload = () => {
    [ this.file ] = this.inputGroup.files;
    this.progressBar.classList.remove("bg-danger");
    this.progressBar.style.width = "0";
    this.$progressModal.modal();
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

    this.progressBar.style.width = `${progress}%`;
  };

  updateError = () => {
    this.progressBar.classList.add("bg-danger");
  };

  updateSuccess = () => {
    this.$progressModal.modal("hide");
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
    this.modalBodyVideo = document.getElementById(elements.modalBodyVideo);
    this.modalImage = document.getElementById(elements.modalImage);
    jQuery(this.modalImage).on("show.bs.modal", this.setPreviewImage);
    this.modalVideo = document.getElementById(elements.modalVideo);
    jQuery(this.modalVideo).on("show.bs.modal", this.setPreviewVideo);
    jQuery(this.modalVideo).on("hide.bs.modal", this.stopPreviewVideo);
    this.previewImg = document.getElementById(elements.previewImg);
  };

  static setPreviewVideo = (event) => {
    const source = document.createElement("source");
    const video = document.createElement("video");

    source.src = event.relatedTarget.dataset.link;
    source.type = `video/${event.relatedTarget.dataset.type}`;
    video.autoplay = true;
    video.className = "embed-responsive";
    video.controls = true;
    video.append(source);
    this.modalBodyVideo.append(video);
  };

  static setPreviewImage = (event) => {
    this.previewImg.src = event.relatedTarget.dataset.link;
  };

  static stopPreviewVideo = () => {
    if (this.modalBodyVideo.firstChild) {
      this.modalBodyVideo.removeChild(this.modalBodyVideo.firstChild);
    }
  };
}

export default Table;
