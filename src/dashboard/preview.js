/** @jsx this.createElement */

import jQuery from "jquery";
import jsx from "../lib/jsx.js";

class Preview extends jsx.Component {
  render() {
    const obj =
      <div>
        <div
          class="modal fade"
          id="previewModalImage"
          ref="modalImage"
          tabindex="-1"
          role="dialog"
          aria-labelledby="previewModalImageLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="previewModalImageLabel">Preview</h5>
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
                <img ref="previewImg" class="img-fluid"></img>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                >Close</button>
              </div>
            </div>
          </div>
        </div>
        <div
          class="modal fade"
          id="previewModalVideo"
          ref="modalVideo"
          tabindex="-1"
          role="dialog"
          aria-labelledby="previewModalVideoLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="previewModalVideoLabel">Preview</h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body" ref="modalBodyVideo"></div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                >Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>;

    jQuery(this.refs.modalImage).on("show.bs.modal", this.setPreviewImage);
    jQuery(this.refs.modalVideo).on("show.bs.modal", this.setPreviewVideo)
      .on("hide.bs.modal", this.stopPreviewVideo);

    return obj;
  }

  setPreviewVideo(event) {
    const obj =
      <video autoplay controls class="embed-responsive">
        <source
          src={event.relatedTarget.dataset.link}
          type={`video/${event.relatedTarget.dataset.type}`}
        ></source>
      </video>;

    jsx.render(this.refs.modalBodyVideo, obj);
  }

  setPreviewImage(event) {
    this.refs.previewImg.src = event.relatedTarget.dataset.link;
  }

  stopPreviewVideo() {
    jsx.render(this.refs.modalBodyVideo);
  }
}

export default Preview;
