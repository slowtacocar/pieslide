import React from "react";
import PropTypes from "prop-types";
import "./Upload.module.css";
import dialogPolyfill from "dialog-polyfill";
import { useDialog } from "../common/hooks";

function Upload(props) {
  const modal = useDialog(dialogPolyfill);
  const inputGroup = React.useRef();

  const [progress, setProgress] = React.useState();

  function openProgressModal(event) {
    event.preventDefault();

    modal.current.showModal();
    const [file] = inputGroup.current.files;
    const ref = props.storageRef.child(file.name)
    ref.put(file).on("state_changed", updateProgress, null, () => {
      modal.current.close();
      props.success(file.name);
    });
  }

  function updateProgress(snapshot) {
    setProgress(snapshot.bytesTransferred / snapshot.totalBytes);
  }

  return (
    <>
      <form
        styleName={props.sticky ? "uploadSticky" : "upload"}
        onSubmit={openProgressModal}
      >
        <input type="file" accept="image/*" ref={inputGroup} required />
        <button type="submit">Upload</button>
      </form>
      <dialog styleName="modal" ref={modal}>
        <progress max="1" styleName="progressBar" value={progress} />
      </dialog>
    </>
  );
}

Upload.propTypes = {
  "storageRef": PropTypes.object.isRequired,
  "success": PropTypes.func.isRequired,
  "sticky": PropTypes.bool
}

export default Upload;
