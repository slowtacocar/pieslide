/** @jsx this.createElement */
/** @jsxFrag jsx.Fragment */

import Preview from "./preview.js";
import jsx from "../lib/jsx.js";

class Table extends jsx.Component {
  render() {
    const element =
      <>
        <div class={`form file-form${this.props.sticky ? " sticky" : ""}`}>
          <label>
            <span class="file-button">Browse</span>
            <span ref="inputGroupLabel">Choose file</span>
            <input
              type="file"
              accept="image/*"
              onchange={this.updateFilename}
              ref="inputGroup"
            ></input>
          </label>
          <button
            type="button"
            onclick={this.openProgressModal}
          >Upload</button>
        </div>
        <dialog
          class="modal"
          ref="progressModal"
        >
          <progress max="1" ref="progressBar"></progress>
        </dialog>
        <Preview ref="preview" video={this.props.video} name={this.props.name}/>
      </>;

    return element;
  }

  changeUser(docRef, folderRef) {
    this.folderRef = folderRef;
    this.docRef = docRef;
    this.docRef.onSnapshot(this.changeData);
  }

  updateFilename(event) {
    const [ { name } ] = event.target.files;

    this.refs.inputGroupLabel.textContent = name;
  }

  openProgressModal() {
    this.refs.progressBar.value = 0;
    this.refs.progressModal.showModal();
    [ this.file ] = this.refs.inputGroup.files;
    this.folderRef.child(this.file.name).put(this.file)
      .on(
        "state_changed",
        this.updateProgress,
        null,
        this.uploadSuccess
      );
  }

  updateProgress(snapshot) {
    const progress = snapshot.bytesTransferred / snapshot.totalBytes;

    this.refs.progressBar.value = progress;
  }

  uploadSuccess() {
    this.refs.progressModal.close();
    this.docRef.update(this.toObject(this.file.name));
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
