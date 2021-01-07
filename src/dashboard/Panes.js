import React from "react";
import PropTypes from "prop-types";
import "./Panes.module.css";
import Slides from "./Slides";
import Embed from "./Embed";
import Tabs from "./Tabs";
import EditPanes from "./EditPanes";

function Panes(props) {
  const editPanes = React.useRef();

  function showEditPanes() {
    editPanes.current.showModal();
  }

  function handleSlidesChange(slides, index) {
    const panes = [...props.panes];
    panes[index].slides = slides;

    props.onChange(panes);
  }

  function handleEmbedChange(value, index) {
    const panes = [...props.panes];
    panes[index].embed = value;

    props.onChange(panes);
  }

  return (
    <section id="panes" className="section">
      <header>
        <h1 className="header">Panes</h1>
        <p className="headerSub">
          Click on Edit Panes to add, remove, or resize panes.
        </p>
        <p className="headerSub">
          Click on a tab to select a pane. Use the input at the bottom of the
          screen to upload images for your slideshow, and drag the table rows to
          change the order of the slides.
        </p>
      </header>
      <Tabs>
        {props.panes.map((pane, index) => ({
          name: `Pane ${index}`,
          id: pane.timestamp,
          node: pane.slides ? (
            <Slides
              onChange={(slides) => {
                handleSlidesChange(slides, index);
              }}
              slides={pane.slides}
              duration={props.duration}
            />
          ) : (
            <Embed
              value={pane.embed}
              onChange={(value) => {
                handleEmbedChange(value, index);
              }}
            />
          ),
        }))}
      </Tabs>
      <button styleName="button" onClick={showEditPanes}>
        Edit Panes
      </button>
      <EditPanes
        ref={editPanes}
        panes={props.panes}
        onChange={props.onChange}
      />
    </section>
  );
}

Panes.propTypes = {
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
          url: PropTypes.string.isRequired,
          timestamp: PropTypes.number.isRequired,
        })
      ),
      timestamp: PropTypes.number.isRequired,
    })
  ),
  duration: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Panes;
