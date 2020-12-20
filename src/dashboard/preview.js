/** @jsx this.createElement */
/** @jsxFrag jsx.Fragment */

import dialogPolyfill from "dialog-polyfill";
import jsx from "../lib/jsx.js";
import styles from "./preview.module.css";

class Preview extends jsx.Component {
  render() {
    const element =
      <>
        <dialog
          ref="modalImagePreview"
          class={styles.modal}
        >
          <img ref="imagePreview" class={styles.modalImg}></img>
          <form method="dialog" class={styles.form}>
            <button type="submit">Close</button>
          </form>
        </dialog>
        {
          this.props.video
            ? <dialog
              ref="modalVideoPreview"
              onclose={this.closeVideo}
              class={styles.modal}
            >
              <div ref="modalBodyPreviewVideo"></div>
              <form method="dialog" class={styles.form}>
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
          src={event.relatedTarget.getAttribute("data-link")}
          type={`video/${event.relatedTarget.getAttribute("data-type")}`}
        ></source>
      </video>;

    jsx.render(this.refs.modalBodyPreviewVideo, element);
  }

  showImage(event) {
    this.refs.imagePreview.src = event.target.getAttribute("data-link");
    this.refs.modalImagePreview.showModal();
  }

  closeVideo() {
    jsx.render(this.refs.modalBodyPreviewVideo);
  }
}

export default Preview;
