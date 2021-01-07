import React from "react";
import PropTypes from "prop-types";
import "./EditPanes.module.css";
import dialogPolyfill from "dialog-polyfill";
import { useDialog } from "../common/hooks";
import PaneRow from "./PaneRow";
import PanesPreview from "./PanesPreview";

const EditPanes = React.forwardRef(function EditPanes(props, ref) {
  const modal = useDialog(dialogPolyfill);

  React.useImperativeHandle(ref, () => ({
    showModal: () => {
      modal.current.showModal();
    },
  }));

  function handlePaneChange(pane, index) {
    const panes = [...props.panes];
    panes[index] = pane;

    props.onChange(panes);
  }

  function deletePane(index) {
    const panes = [...props.panes];
    panes.splice(index, 1);
    props.onChange(panes);
  }

  function addEmbedPane() {
    props.onChange([
      ...props.panes,
      {
        rowStart: 1,
        rowEnd: 2,
        columnStart: 1,
        columnEnd: 2,
        embed: "",
        timestamp: Date.now(),
      },
    ]);
  }

  function addSlideshowPane() {
    props.onChange([
      ...props.panes,
      {
        rowStart: 1,
        rowEnd: 2,
        columnStart: 1,
        columnEnd: 2,
        slides: [],
        timestamp: Date.now(),
      },
    ]);
  }

  return (
    <dialog styleName="modal" ref={modal}>
      <div styleName="editGrid">
        <div styleName="edit">
          <h1 className="header">Edit Panes</h1>
          <p className="headerSub">
            Use the inputs below to change the placement and size of each pane.
            The numbers represent lines on a grid, so a pane that, for example,
            spans the first column would start at line 1 and end at line 2.
          </p>
          <div styleName="tableContainer">
            <table styleName="table">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Type</th>
                  <th scope="col">Column Start</th>
                  <th scope="col">Column End</th>
                  <th scope="col">Row Start</th>
                  <th scope="col">Row End</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              <tbody>
                {props.panes.map((pane, index) => (
                  <PaneRow
                    pane={pane}
                    index={index}
                    key={pane.timestamp}
                    onChange={(value) => {
                      handlePaneChange(value, index);
                    }}
                    onDelete={() => {
                      deletePane(index);
                    }}
                  />
                ))}
              </tbody>
            </table>
          </div>
          <div styleName="buttonGrid">
            <button styleName="newSlideshow" onClick={addSlideshowPane}>
              New Slideshow Pane
            </button>
            <button styleName="newEmbed" onClick={addEmbedPane}>
              New Website Embed Pane
            </button>
            <form method="dialog" styleName="form">
              <button type="submit" styleName="closeButton">
                Close
              </button>
            </form>
          </div>
        </div>
        <PanesPreview panes={props.panes} />
      </div>
    </dialog>
  );
});

EditPanes.propTypes = {
  panes: PropTypes.arrayOf(
    PropTypes.shape({
      rowStart: PropTypes.any.isRequired,
      rowEnd: PropTypes.any.isRequired,
      columnStart: PropTypes.any.isRequired,
      columnEnd: PropTypes.any.isRequired,
      embed: PropTypes.string,
      slides: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          duration: PropTypes.any.isRequired,
        })
      ),
    })
  ),
  onChange: PropTypes.func.isRequired,
};

export default EditPanes;
