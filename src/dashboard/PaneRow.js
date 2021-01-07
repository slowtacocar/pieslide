import React from "react";
import PropTypes from "prop-types";
import "./PaneRow.module.css";

function PaneRow(props) {
  function handleDelete() {
    props.onDelete();
  }

  function handleColumnStartChange(event) {
    props.onChange({
      ...props.pane,
      columnStart: event.target.value,
    });
  }

  function handleColumnEndChange(event) {
    props.onChange({
      ...props.pane,
      columnEnd: event.target.value,
    });
  }

  function handleRowStartChange(event) {
    props.onChange({
      ...props.pane,
      rowStart: event.target.value,
    });
  }

  function handleRowEndChange(event) {
    props.onChange({
      ...props.pane,
      rowEnd: event.target.value,
    });
  }

  return (
    <tr>
      <th scope="row">{`Pane ${props.index}`}</th>
      <td>{props.pane.slides ? "Slideshow" : "Website Embed"}</td>
      <td>
        <input
          styleName="number"
          min="1"
          type="number"
          value={props.pane.columnStart}
          onChange={handleColumnStartChange}
        />
      </td>
      <td>
        <input
          styleName="number"
          min={parseInt(props.pane.columnStart) + 1}
          type="number"
          value={props.pane.columnEnd}
          onChange={handleColumnEndChange}
        />
      </td>
      <td>
        <input
          styleName="number"
          min="1"
          type="number"
          value={props.pane.rowStart}
          onChange={handleRowStartChange}
        />
      </td>
      <td>
        <input
          styleName="number"
          min={parseInt(props.pane.rowStart) + 1}
          type="number"
          value={props.pane.rowEnd}
          onChange={handleRowEndChange}
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

PaneRow.propTypes = {
  pane: PropTypes.shape({
    rowStart: PropTypes.any.isRequired,
    rowEnd: PropTypes.any.isRequired,
    columnStart: PropTypes.any.isRequired,
    columnEnd: PropTypes.any.isRequired,
    embed: PropTypes.string,
    slides: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        duration: PropTypes.any.isRequired,
        url: PropTypes.string.isRequired,
        timestamp: PropTypes.number.isRequired,
      })
    ),
    timestamp: PropTypes.number.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default PaneRow;
