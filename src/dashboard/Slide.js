import React from "react";
import PropTypes from "prop-types";
import "./Slide.module.css";

function Slide(props) {
  function handleDelete() {
    props.onDelete();
  }

  function showPreview() {
    props.showPreview();
  }

  function handleDurationChange(event) {
    props.onDurationChange(event.target.value);
  }

  return (
    <tr data-name={props.slide.name}>
      <th scope="row">{props.slide.name}</th>
      <td>
        <button type="button" styleName="preview" onClick={showPreview}>
          View Preview
        </button>
      </td>
      <td>
        <input
          styleName="duration"
          min="0"
          type="number"
          value={props.slide.duration}
          onChange={handleDurationChange}
        />
      </td>
      <td>
        <button type="button" onClick={handleDelete} styleName="delete">
          Delete
        </button>
      </td>
    </tr>
  );
}

Slide.propTypes = {
  slide: PropTypes.shape({
    name: PropTypes.string.isRequired,
    duration: PropTypes.any.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  showPreview: PropTypes.func.isRequired,
  onDurationChange: PropTypes.func.isRequired,
};

export default Slide;
