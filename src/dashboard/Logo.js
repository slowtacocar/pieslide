import React from "react";
import PropTypes from "prop-types";
import "./Logo.module.css";
import Upload from "./Upload";
import Preview from "./Preview";

function Logo(props) {
  const preview = React.useRef();

  async function deleteLogo() {
    props.onChange(null);
  }

  function showPreview() {
    preview.current.showModal(props.value.url);
  }

  function handleUpload(value) {
    props.onChange(value);
  }

  return (
    <section id="logo" className="section">
      <header>
        <h1 className="header">Logo</h1>
        <p className="headerSub">
          Use the input to change the logo that appears in the corner of your
          slideshow.
        </p>
      </header>
      <div styleName="tableContainer">
        <table styleName="table">
          <thead>
            <tr>
              <th scope="col">File Name</th>
              <th scope="col">Preview</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {props.value && (
              <tr>
                <th scope="row">{props.value.name}</th>
                <td>
                  <button
                    type="button"
                    styleName="preview"
                    onClick={showPreview}
                  >
                    View Preview
                  </button>
                </td>
                <td>
                  <button type="button" onClick={deleteLogo} styleName="delete">
                    Delete
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Upload onUpload={handleUpload} />
      <Preview ref={preview} />
    </section>
  );
}

Logo.propTypes = {
  value: PropTypes.shape({
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    timestamp: PropTypes.number.isRequired,
  }),
  onChange: PropTypes.func.isRequired,
};

export default Logo;
