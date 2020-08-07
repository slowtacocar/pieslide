/** @jsx this.createElement */
/** @jsxFrag jsx.Fragment */

import dialogPolyfill from "dialog-polyfill";
import jsx from "../lib/jsx.js";

class Preview extends jsx.Component {
  render() {
    const element =
      <>
        <dialog
          class="modal preview"
          ref="modalImagePreview"
        >
          <img ref="imagePreview"></img>
          <form class="form" method="dialog">
            <button type="submit">Close</button>
          </form>
        </dialog>
        {
          this.props.video
            ? <dialog
              class="modal preview"
              ref="modalVideoPreview"
              onclose={this.closeVideo}
            >
              <div id={`modalBodyPreviewVideo${this.props.name}`}></div>
              <form class="form" method="dialog">
                <button type="submit">Close</button>
              </form>
            </dialog>
            : ""
        }
      </>;

    dialogPolyfill.registerDialog(this.refs.modalImagePreview);

    if (this.props.video) {
      dialogPolyfill.registerDialog(this.refs.modalVideoPreview);
    }

    return element;
  }

  showVideo(event) {
    const element =
      <video autoplay controls>
        <source
          src={event.relatedTarget.dataset.link}
          type={`video/${event.relatedTarget.dataset.type}`}
        ></source>
      </video>;

    jsx.render(this.refs[ `modalBodyPreviewVideo${this.props.name}` ], element);
  }

  showImage(event) {
    this.refs.imagePreview.src = event.target.dataset.link;
    this.refs.modalImagePreview.showModal();
  }

  closeVideo() {
    jsx.render(this.refs.modalBodyPreviewVideo);
  }
}

export default Preview;
