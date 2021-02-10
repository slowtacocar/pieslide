import React from "react";
import PropTypes from "prop-types";
import PaneRow from "./PaneRow";
import PanesPreview from "./PanesPreview";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";

const EditPanes = function EditPanes(props) {
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
    <Modal onHide={props.onClose} show={props.shown} size="xl">
      <Modal.Body>
        <Row>
          <Col lg={8}>
            <h3>Edit Panes</h3>
            <p className="lead">
              Use the inputs below to change the placement and size of each
              pane. The numbers represent lines on a grid, so a pane that, for
              example, spans the first column would start at line 1 and end at
              line 2.
            </p>
            <Table responsive striped>
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
            </Table>
            <Form.Row>
              <Col>
                <Button block onClick={addSlideshowPane}>
                  New Slideshow Pane
                </Button>
              </Col>
              <Col>
                <Button block onClick={addEmbedPane}>
                  New Website Embed Pane
                </Button>
              </Col>
            </Form.Row>
          </Col>
          <Col lg={4}>
            <PanesPreview panes={props.panes} />
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

EditPanes.propTypes = {
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
  onChange: PropTypes.func.isRequired,
  shown: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default EditPanes;
