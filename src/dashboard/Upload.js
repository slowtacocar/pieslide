import React from "react";
import PropTypes from "prop-types";
import "./Upload.module.css";

function Upload(props) {
  const inputGroup = React.useRef();

  function handleSubmit(event) {
    event.preventDefault();

    const [file] = inputGroup.current.files;
    const timestamp = Date.now();
    const ref = props.storageRef.child(timestamp.toString());
    ref.put(file).on("state_changed", null, null, () => {
      props.onSuccess({ name: file.name, timestamp });
    });
  }

  return (
    <form
      styleName={props.sticky ? "uploadSticky" : "upload"}
      onSubmit={handleSubmit}
    >
      <input type="file" accept="image/*" ref={inputGroup} required />
      <button type="submit">Upload</button>
    </form>
  );
}

Upload.propTypes = {
  storageRef: PropTypes.object.isRequired,
  onSuccess: PropTypes.func.isRequired,
  sticky: PropTypes.bool,
};

export default Upload;
