import React from "react";
import PropTypes from "prop-types";
import Upload from "./Upload";
import Preview from "./Preview";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

function Logo(props) {
  const [modalShown, setModalShown] = React.useState(false);
  const [url, setUrl] = React.useState();

  React.useEffect(() => {
    async function getDownloadUrl() {
      setUrl(
        await props.storageRef
          .child(props.value.timestamp.toString())
          .getDownloadURL()
      );
    }

    if (props.value) {
      getDownloadUrl();
    } else {
      setUrl(null);
    }
  }, [props.value, props.storageRef]);

  function handleModalClose() {
    setModalShown(false);
  }

  async function deleteLogo() {
    props.onChange(null);
    await props.storageRef.child(props.value.timestamp.toString()).delete();
  }

  function showPreview() {
    setModalShown(true);
  }

  function handleUploadSuccess(value) {
    props.onChange(value);
  }

  return (
    <section id="logo" className="mb-5">
      <header>
        <h2>Logo</h2>
        <p className="lead">
          Use the input to change the logo that appears in the corner of your
          slideshow.
        </p>
      </header>
      <Table responsive striped>
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
                <Button onClick={showPreview}>View Preview</Button>
              </td>
              <td>
                <Button onClick={deleteLogo} variant="danger">
                  Delete
                </Button>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      <Upload storageRef={props.storageRef} onSuccess={handleUploadSuccess} />
      <Preview src={url} onClose={handleModalClose} shown={modalShown} />
    </section>
  );
}

Logo.propTypes = {
  value: PropTypes.shape({
    name: PropTypes.string.isRequired,
    timestamp: PropTypes.number.isRequired,
  }),
  storageRef: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Logo;
