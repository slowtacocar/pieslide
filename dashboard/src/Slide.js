import React from "react";
import PropTypes from "prop-types";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";

function Slide(props) {
  function handleDelete() {
    props.onDelete();
  }

  function showPreview() {
    props.showPreview();
  }

  function handleDurationChange(event) {
    props.onDurationChange(Number(event.target.value));
  }

  return (
    <tr data-name={props.slide.name}>
      <th scope="row">{props.slide.name}</th>
      <td>
        <Button onClick={showPreview}>View Preview</Button>
      </td>
      <td>
        <FormControl
          min="0"
          type="number"
          value={props.slide.duration}
          onChange={handleDurationChange}
        />
      </td>
      <td>
        <Button onClick={handleDelete} variant="danger">
          Delete
        </Button>
      </td>
    </tr>
  );
}

Slide.propTypes = {
  slide: PropTypes.shape({
    name: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
    url: PropTypes.string.isRequired,
    timestamp: PropTypes.number.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  showPreview: PropTypes.func.isRequired,
  onDurationChange: PropTypes.func.isRequired,
};

export default Slide;
