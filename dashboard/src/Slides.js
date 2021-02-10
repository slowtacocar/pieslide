import React from "react";
import PropTypes from "prop-types";
import { useUrls } from "@pieslide/common";
import Slide from "./Slide";
import Upload from "./Upload";
import Preview from "./Preview";
import { ReactSortable } from "react-sortablejs";
import Table from "react-bootstrap/Table";

function Slides(props) {
  const [modalShown, setModalShown] = React.useState(false);
  const [src, setSrc] = React.useState();
  const slides = useUrls(props.slides, props.storageRef);

  function handleModalClose() {
    setModalShown(false);
  }

  async function handleDelete(index) {
    const slides = [...props.slides];
    slides.splice(index, 1);

    props.onChange(slides);

    await props.storageRef
      .child(props.slides[index].timestamp.toString())
      .delete();
  }

  function setSlides(slides) {
    const newSlides = [...slides];
    for (let i = 0; i < newSlides.length; i++) {
      newSlides[i] = { ...newSlides[i] };
      delete newSlides[i].chosen;
      delete newSlides[i].url;
    }
    props.onChange(newSlides);
  }

  function showPreview(slide) {
    setSrc(slide.url);
    setModalShown(true);
  }

  function handleDurationChange(value, index) {
    const slides = [...props.slides];
    slides[index].duration = value;

    props.onChange(slides);
  }

  function handleUploadSuccess(value) {
    props.onChange([
      ...props.slides,
      {
        ...value,
        duration: props.duration,
      },
    ]);
  }

  return (
    <>
      <Table responsive striped>
        <thead>
          <tr>
            <th scope="col">File Name</th>
            <th scope="col">Preview</th>
            <th scope="col">Duration</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <ReactSortable tag="tbody" list={slides} setList={setSlides}>
          {slides.map((slide, index) => (
            <Slide
              key={slide.timestamp}
              slide={slide}
              onDelete={() => {
                handleDelete(index);
              }}
              showPreview={() => {
                showPreview(slide);
              }}
              onDurationChange={(value) => {
                handleDurationChange(value, index);
              }}
            />
          ))}
        </ReactSortable>
      </Table>
      <Upload
        storageRef={props.storageRef}
        onSuccess={handleUploadSuccess}
        sticky
      />
      <Preview shown={modalShown} onClose={handleModalClose} src={src} />
    </>
  );
}

Slides.propTypes = {
  slides: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      duration: PropTypes.number.isRequired,
      timestamp: PropTypes.number.isRequired,
    })
  ).isRequired,
  onChange: PropTypes.func.isRequired,
  duration: PropTypes.number.isRequired,
  storageRef: PropTypes.object.isRequired,
};

export default Slides;
