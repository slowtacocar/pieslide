import React from "react";
import PropTypes from "prop-types";
import Slides from "./Slides";
import Embed from "./Embed";
import EditPanes from "./EditPanes";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Button from "react-bootstrap/Button";

function Panes(props) {
  const [modalShown, setModalShown] = React.useState(false);

  function showEditPanes() {
    setModalShown(true);
  }

  function handleModalClose() {
    setModalShown(false);
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
    <section id="panes" className="mb-5">
      <header>
        <h2>Panes</h2>
        <p className="lead">
          Click on Edit Panes to add, remove, or resize panes.
        </p>
        <p className="lead">
          Click on a tab to select a pane. Use the input at the bottom of the
          screen to upload images for your slideshow, and drag the table rows to
          change the order of the slides.
        </p>
      </header>
      <div className="mb-3">
        <Tabs>
          {props.panes.map((pane, index) => (
            <Tab
              eventKey={pane.timestamp}
              key={pane.timestamp}
              title={`Pane ${index + 1}`}
            >
              {pane.slides ? (
                <Slides
                  onChange={(slides) => {
                    handleSlidesChange(slides, index);
                  }}
                  slides={pane.slides}
                  duration={props.duration}
                  storageRef={props.storageRef}
                />
              ) : (
                <Embed
                  value={pane.embed}
                  onChange={(value) => {
                    handleEmbedChange(value, index);
                  }}
                />
              )}
            </Tab>
          ))}
        </Tabs>
      </div>
      <Button block onClick={showEditPanes}>
        Edit Panes
      </Button>
      <EditPanes
        shown={modalShown}
        onClose={handleModalClose}
        panes={props.panes}
        onChange={props.onChange}
      />
    </section>
  );
}

Panes.propTypes = {
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
  ).isRequired,
  duration: PropTypes.number.isRequired,
  storageRef: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Panes;
