import React from "react";
import "./Preview.module.css";
import dialogPolyfill from "dialog-polyfill";
import { useDialog } from "../common/hooks";

function Preview(props, ref) {
  const modal = useDialog(dialogPolyfill);

  const [src, setSrc] = React.useState();

  React.useImperativeHandle(ref, () => ({
    "showModal": (newSrc) => {
      modal.current.showModal();
      setSrc(newSrc);
    }
  }));

  return (
    <dialog ref={modal} styleName="modal">
      <img styleName="modalImg" src={src} />
      <form method="dialog" styleName="form">
        <button type="submit">Close</button>
      </form>
    </dialog>
  );
}

export default React.forwardRef(Preview);
