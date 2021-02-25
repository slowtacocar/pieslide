import React from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function Settings(props) {
  function changeDuration(event) {
    props.onDurationChange(Number(event.target.value));
  }

  function changeNews(event) {
    props.onNewsChange(event.target.value.split(","));
  }

  function changeSize(event) {
    props.onSizeChange(Number(event.target.value));
  }

  function changeTime(event) {
    props.onTimeChange(event.target.value === "show");
  }

  function changeTransition(event) {
    props.onTransitionChange(Number(event.target.value));
  }

  function reload() {
    props.onMessageChange("reload");
  }

  return (
    <section id="slideshowSettings" className="mb-5">
      <header>
        <h2>Slideshow Settings</h2>
        <p className="lead">
          Use the controls to change some general settings for your slideshow.
        </p>
      </header>
      <Form.Row>
        <Col sm className="mb-form">
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text id="inputGroupTime">
                Time Visibility
              </InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              as="select"
              aria-labelledby="inputGroupTime"
              onChange={changeTime}
              value={props.time ? "show" : "hide"}
            >
              <option value="show">Show</option>
              <option value="hide">Hide</option>
            </Form.Control>
          </InputGroup>
        </Col>
        <Col sm className="mb-form">
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text id="inputGroupDuration">
                Default Slide Duration
              </InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              type="number"
              aria-labelledby="inputGroupDuration"
              onChange={changeDuration}
              min="0"
              step="any"
              value={props.duration}
            />
          </InputGroup>
        </Col>
      </Form.Row>
      <Form.Row>
        <Col sm className="mb-form">
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text id="inputGroupTransition">
                Transition Time
              </InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              type="number"
              aria-labelledby="inputGroupTransition"
              onChange={changeTransition}
              min="0"
              step="any"
              value={props.transition}
            />
          </InputGroup>
        </Col>
        <Col sm className="mb-form">
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text id="inputGroupSize">Logo Size</InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              type="number"
              aria-labelledby="inputGroupSize"
              aria-describedby="sizePercent"
              onChange={changeSize}
              min="0"
              max="100"
              step="any"
              value={props.size}
            />
            <InputGroup.Append>
              <InputGroup.Text id="sizePercent">%</InputGroup.Text>
            </InputGroup.Append>
          </InputGroup>
        </Col>
      </Form.Row>
      <Button
        block
        onClick={reload}
        variant="outline-warning"
        className="mb-form"
      >
        Refresh Slideshow
      </Button>
      <details>
        <summary>Advanced Settings</summary>
        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text id="inputGroupNews">News Sources</InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control
            aria-labelledby="inputGroupNews"
            onChange={changeNews}
            value={props.news.join(",")}
          />
        </InputGroup>
      </details>
    </section>
  );
}

Settings.propTypes = {
  duration: PropTypes.number.isRequired,
  news: PropTypes.arrayOf(PropTypes.string).isRequired,
  size: PropTypes.number.isRequired,
  time: PropTypes.bool.isRequired,
  transition: PropTypes.number.isRequired,
  onDurationChange: PropTypes.func.isRequired,
  onNewsChange: PropTypes.func.isRequired,
  onSizeChange: PropTypes.func.isRequired,
  onTimeChange: PropTypes.func.isRequired,
  onTransitionChange: PropTypes.func.isRequired,
  onMessageChange: PropTypes.func.isRequired,
};

export default Settings;
