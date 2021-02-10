import React from "react";
import PropTypes from "prop-types";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";

function PaneRow(props) {
  function handleDelete() {
    props.onDelete();
  }

  function handleColumnStartChange(event) {
    props.onChange({
      ...props.pane,
      columnStart: Number(event.target.value),
    });
  }

  function handleColumnEndChange(event) {
    props.onChange({
      ...props.pane,
      columnEnd: Number(event.target.value),
    });
  }

  function handleRowStartChange(event) {
    props.onChange({
      ...props.pane,
      rowStart: Number(event.target.value),
    });
  }

  function handleRowEndChange(event) {
    props.onChange({
      ...props.pane,
      rowEnd: Number(event.target.value),
    });
  }

  return (
    <tr>
      <th scope="row">{`Pane ${props.index}`}</th>
      <td>{props.pane.slides ? "Slideshow" : "Website Embed"}</td>
      <td>
        <FormControl
          min="1"
          type="number"
          value={props.pane.columnStart}
          onChange={handleColumnStartChange}
        />
      </td>
      <td>
        <FormControl
          min={props.pane.columnStart + 1}
          type="number"
          value={props.pane.columnEnd}
          onChange={handleColumnEndChange}
        />
      </td>
      <td>
        <FormControl
          min="1"
          type="number"
          value={props.pane.rowStart}
          onChange={handleRowStartChange}
        />
      </td>
      <td>
        <FormControl
          min={props.pane.rowStart + 1}
          type="number"
          value={props.pane.rowEnd}
          onChange={handleRowEndChange}
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

PaneRow.propTypes = {
  pane: PropTypes.shape({
    rowStart: PropTypes.number.isRequired,
    rowEnd: PropTypes.number.isRequired,
    columnStart: PropTypes.number.isRequired,
    columnEnd: PropTypes.number.isRequired,
    embed: PropTypes.string,
    slides: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        duration: PropTypes.number.isRequired,
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
