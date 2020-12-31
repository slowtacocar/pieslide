import React from "react";
import PropTypes from "prop-types";
import "./Slides.module.css";
import { useUrls } from "../common/hooks";
import jQuery from "jquery";
import "jquery-ui/ui/data";
import "jquery-ui/ui/scroll-parent";
import "jquery-ui/ui/widget";
import "jquery-ui/ui/widgets/mouse";
import "jquery-ui/ui/widgets/sortable";
import Slide from "./Slide";
import Upload from "./Upload";
import Preview from "./Preview";

function Slides(props) {
  const preview = React.useRef();
  const tableBody = React.useRef();

  const slidesWithUrls = useUrls(props.slides, props.storageRef);

  React.useEffect(() => {
    function stop(event) {
      props.onChange(
        Array.from(event.target.children).map((row) => {
          const name = row.getAttribute("data-name");

          return props.slides.find((slide) => slide.name == name);
        })
      );
    }

    const $tableBody = jQuery(tableBody.current).sortable({ stop });

    return () => $tableBody.sortable("destroy");
  }, [props]);

  async function handleDelete(index) {
    const slides = [...props.slides];
    slides.splice(index, 1);

    props.onChange(slides);
  }

  function showPreview(slide) {
    preview.current.showModal(slide.url);
  }

  function handleDurationChange(value, index) {
    const slides = [...props.slides];
    slides[index].duration = value;

    props.onChange(slides);
  }

  function handleUploadSuccess(name) {
    props.onChange([
      ...props.slides,
      {
        duration: props.duration,
        name,
      },
    ]);
  }

  return (
    <>
      <div styleName="tableContainer">
        <table styleName="table">
          <thead>
            <tr>
              <th scope="col">File Name</th>
              <th scope="col">Preview</th>
              <th scope="col">Duration</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody ref={tableBody}>
            {slidesWithUrls.map((slide, index) => (
              <Slide
                key={slide.name}
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
          </tbody>
        </table>
      </div>
      <Upload
        storageRef={props.storageRef}
        onSuccess={handleUploadSuccess}
        sticky
      />
      <Preview ref={preview} />
    </>
  );
}

Slides.propTypes = {
  slides: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      duration: PropTypes.any.isRequired,
    })
  ).isRequired,
  onChange: PropTypes.func.isRequired,
  duration: PropTypes.any.isRequired,
  storageRef: PropTypes.object.isRequired,
};

export default Slides;
