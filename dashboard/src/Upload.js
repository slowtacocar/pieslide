import React from "react";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";

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
    <Form className={props.sticky ? "sticky-top" : ""} onSubmit={handleSubmit}>
      <InputGroup>
        <Form.File
          className="input-group-file"
          accept="image/*"
          ref={inputGroup}
          required
        />
        <InputGroup.Append>
          <Button type="submit" variant="outline-secondary">
            Upload
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </Form>
  );
}

Upload.propTypes = {
  storageRef: PropTypes.object.isRequired,
  onSuccess: PropTypes.func.isRequired,
  sticky: PropTypes.bool,
};

export default Upload;
