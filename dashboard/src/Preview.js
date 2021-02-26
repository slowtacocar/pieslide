import React from "react";
import PropTypes from "prop-types";
import Modal from "react-bootstrap/Modal";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";

const Preview = function Preview(props) {
  return (
    <Modal onHide={props.onClose} show={props.shown}>
      <Modal.Body>
        <Image fluid src={props.src} alt="Preview" />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onClose} variant="secondary">
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

Preview.propTypes = {
  src: PropTypes.string,
  shown: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Preview;
