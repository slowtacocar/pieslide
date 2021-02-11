import React from "react";
import PropTypes from "prop-types";

function PanesPreview(props) {
  const maxRow = Math.max(...props.panes.map((pane) => pane.rowEnd));
  const maxColumn = Math.max(...props.panes.map((pane) => pane.columnEnd));

  const gridLines = [];

  for (let i = 1; i < maxColumn; i++) {
    gridLines.push(
      <div
        key={`c${i}`}
        className="preview-grid-line"
        style={{
          gridColumnStart: i,
          gridColumnEnd: i + 1,
          gridRowStart: 1,
          gridRowEnd: maxRow,
        }}
      />
    );
  }
  for (let i = 1; i < maxRow; i++) {
    gridLines.push(
      <div
        key={`r${i}`}
        className="preview-grid-line"
        style={{
          gridColumnStart: 1,
          gridColumnEnd: maxColumn,
          gridRowStart: i,
          gridRowEnd: i + 1,
        }}
      />
    );
  }

  return (
    <>
      <h3 className="header">Preview</h3>
      <div className="preview-grid-container">
        <div className="preview-grid">
          {props.panes.map((pane, index) => (
            <div
              className="preview-pane"
              key={pane.timestamp}
              style={{
                gridColumnStart: pane.columnStart,
                gridColumnEnd: pane.columnEnd,
                gridRowStart: pane.rowStart,
                gridRowEnd: pane.rowEnd,
              }}
            >
              {`Pane ${index}`}
            </div>
          ))}
          {gridLines}
        </div>
      </div>
    </>
  );
}

PanesPreview.propTypes = {
  panes: PropTypes.arrayOf(
    PropTypes.shape({
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
    })
  ),
};

export default PanesPreview;
