import React from "react";
import PropTypes from "prop-types";
import "./Logo.module.css";
import { useUrl } from "../common/hooks";
import Upload from "./Upload";
import Preview from "./Preview";

function Logo(props) {
  const preview = React.useRef();

  const logoName = React.useMemo(() => ({ name: props.logo }), [props.logo]);
  const logo = useUrl(logoName, props.storageRef);

  async function deleteLogo() {
    await props.storageRef.child(logo.name).delete();
    props.docRef.update({ logo: null });
  }

  function showPreview() {
    preview.current.showModal(logo.url);
  }

  function success(name) {
    props.docRef.update({ logo: name });
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
            {logo && (
              <tr>
                <th scope="row">{logo.name}</th>
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
      <Upload storageRef={props.storageRef} success={success} />
      <Preview ref={preview} />
    </section>
  );
}

Logo.propTypes = {
  logo: PropTypes.string,
  docRef: PropTypes.object.isRequired,
  storageRef: PropTypes.object.isRequired,
};

export default Logo;