import React from "react";
import PropTypes from "prop-types";
import "./Slide.module.css";

function Slide(props) {
  function deleteSlide() {
    props.delete(props.slide, props.index);
  }

  function preview() {
    props.preview(props.slide);
  }

  function duration(event) {
    props.duration({
      ...props.slide,
      "duration": event.target.value
    }, props.index);
  }

  return (
    <tr data-name={props.slide.name}>
      <th scope="row">{props.slide.name}</th>
      <td>
        <button type="button" styleName="preview" onClick={preview}>
          View Preview
        </button>
      </td>
      <td>
        <input
          styleName="duration"
          min="0"
          type="number"
          value={props.slide.duration}
          onChange={duration}
        />
      </td>
      <td>
        <button type="button" onClick={deleteSlide} styleName="delete">
          Delete
        </button>
      </td>
    </tr>
  );
}

Slide.propTypes = {
  "slide": PropTypes.shape({
    "name": PropTypes.string.isRequired,
    "duration": PropTypes.any.isRequired,
    "url": PropTypes.string.isRequired
  }).isRequired,
  "index": PropTypes.number.isRequired,
  "delete": PropTypes.func.isRequired,
  "preview": PropTypes.func.isRequired,
  "duration": PropTypes.func.isRequired
};

export default Slide;
