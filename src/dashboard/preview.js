/** @jsx this.createElement */

import jQuery from "jquery";
import jsx from "../lib/jsx.js";

class Preview extends jsx.Component {
  render() {
    const element =
      <div>
        <div
          class="modal fade"
          id="modalImagePreview"
          ref="modalImagePreview"
          tabindex="-1"
          role="dialog"
          aria-labelledby="modalImagePreviewLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="modalImagePreviewLabel">Preview</h5>
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
                <img ref="imagePreview" class="img-fluid"></img>
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
          id="modalPreviewVideo"
          ref="modalPreviewVideo"
          tabindex="-1"
          role="dialog"
          aria-labelledby="modalVideoPreviewLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="modalVideoPreviewLabel">Preview</h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body" ref="modalBodyPreviewVideo"></div>
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

    jQuery(this.refs.modalPreviewImage).on("show.bs.modal", this.setPreviewImage);
    jQuery(this.refs.modalPreviewVideo).on("show.bs.modal", this.setPreviewVideo)
      .on("hide.bs.modal", this.stopPreviewVideo);

    return element;
  }

  setPreviewVideo(event) {
    const element =
      <video autoplay controls class="embed-responsive">
        <source
          src={event.relatedTarget.dataset.link}
          type={`video/${event.relatedTarget.dataset.type}`}
        ></source>
      </video>;

    jsx.render(this.refs.modalBodyPreviewVideo, element);
  }

  setPreviewImage(event) {
    this.refs.imagePreview.src = event.relatedTarget.dataset.link;
  }

  stopPreviewVideo() {
    jsx.render(this.refs.modalBodyPreviewVideo);
  }
}

export default Preview;
