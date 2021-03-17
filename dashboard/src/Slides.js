import React from "react";
import PropTypes from "prop-types";
import Slide from "./Slide";
import Upload from "./Upload";
import Preview from "./Preview";
import { ReactSortable } from "react-sortablejs";
import Table from "react-bootstrap/Table";

function Slides(props) {
  const [modalShown, setModalShown] = React.useState(false);
  const [src, setSrc] = React.useState();
  const [urls, setUrls] = React.useState();

  React.useEffect(() => {
    async function getDownloadUrl(data) {
      const url = await props.storageRef
        .child(data.timestamp.toString())
        .getDownloadURL();

      return [data.timestamp, url];
    }

    async function getDownloadUrls() {
      setUrls(
        Object.fromEntries(await Promise.all(props.slides.map(getDownloadUrl)))
      );
    }

    getDownloadUrls();
  }, [props.slides, props.storageRef]);

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

  function setSlides(newSlides) {
    if (!newSlides.some((slide) => slide.chosen != null)) {
      props.onChange(newSlides);
    }
  }

  function showPreview(timestamp) {
    setSrc(urls[timestamp]);
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
        <ReactSortable tag="tbody" list={props.slides} setList={setSlides}>
          {props.slides.map((slide, index) => (
            <Slide
              key={slide.timestamp}
              slide={slide}
              onDelete={() => {
                handleDelete(index);
              }}
              showPreview={() => {
                showPreview(slide.timestamp);
              }}
              onDurationChange={(value) => {
                handleDurationChange(value, index);
              }}
            />
          ))}
        </ReactSortable>
      </Table>
      <Upload storageRef={props.storageRef} onSuccess={handleUploadSuccess} />
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
