import React from "react";
import PropTypes from "prop-types";
import "./Upload.module.css";

function Upload(props) {
  const inputGroup = React.useRef();

  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const [file] = inputGroup.current.files;
    props.onUpload({
      name: file.name,
      url: await getBase64(file),
      timestamp: Date.now(),
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
  onUpload: PropTypes.func.isRequired,
  sticky: PropTypes.bool,
};

export default Upload;
