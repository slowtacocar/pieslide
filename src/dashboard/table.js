/** @jsx this.createElement */

import jQuery from "jquery";
import jsx from "../lib/jsx.js";

class Table extends jsx.Component {
  render() {
    const obj =
      <div>
        <div class={`input-group${
          this.props.sticky ? " position-sticky b-0 py-2 bg-white" : ""
        }`}>
          <div class="custom-file">
            <input
              type="file"
              class="custom-file-input"
              id={`inputGroup${this.props.name}`}
              accept="image/*"
              onchange={this.updateFilename}
              ref="inputGroup"
            ></input>
            <label
              class="custom-file-label mb-0"
              for={`inputGroup${this.props.name}`}
              aria-describedby={`inputGroup${this.props.name}Addon`}
              ref="inputGroupLabel"
            >Choose file</label>
          </div>
          <div class="input-group-append">
            <button
              type="button"
              class="input-group-text"
              id={`inputGroup${this.props.name}Addon`}
              onclick={this.upload}
            >Upload</button>
          </div>
        </div>
        <div
          class="modal fade"
          ref="progressModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby={`${name}ProgressModalLabel`}
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id={`${name}ProgressModalLabel`}>
                  Uploading {this.props.name}
                </h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div class="progress">
                  <div
                    class="progress-bar"
                    role="progressbar"
                    ref="progressBar"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>;

    this.$progressModal = jQuery(this.refs.progressModal)
      .on("shown.bs.modal", this.update);

    return obj;
  }

  changeUser(docRef, folderRef) {
    this.folderRef = folderRef;
    this.docRef = docRef;
    this.docRef.onSnapshot(this.changeData);
  }

  updateFilename(event) {
    const value = event.target.files[ 0 ].name;

    this.refs.inputGroupLabel.textContent = value;
  }

  upload() {
    [ this.file ] = this.refs.inputGroup.files;
    this.refs.progressBar.classList.remove("bg-danger");
    this.refs.progressBar.style.width = "0";
    this.$progressModal.modal();
  }

  update() {
    this.folderRef.child(this.file.name).put(this.file)
      .on(
        "state_changed",
        this.updateProgress,
        this.updateError,
        this.updateSuccess
      );
  }

  updateProgress(snapshot) {
    const progress = snapshot.bytesTransferred / snapshot.totalBytes * 100;

    this.refs.progressBar.style.width = `${progress}%`;
  }

  updateError() {
    this.refs.progressBar.classList.add("bg-danger");
  }

  updateSuccess() {
    this.$progressModal.modal("hide");
    this.docRef.update(this.docData(this.file.name));
  }

  changeData(doc) {
    if (doc.exists) {
      this.updateTable(doc.data());
    } else {
      this.docRef.set(this.props.defaultData);
    }
  }
}

export default Table;
