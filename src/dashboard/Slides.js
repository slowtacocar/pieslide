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
import firebase from "../common/firebase";
import Slide from "./Slide";
import Upload from "./Upload";
import Preview from "./Preview";

function Slides(props) {
  const preview = React.useRef();
  const tableBody = React.useRef();

  const slides = useUrls(props.slides, props.storageRef);

  React.useEffect(() => {
    function stop(event) {
      props.docRef.update({
        slides: Array.from(event.target.children).map((row) => {
          const name = row.getAttribute("data-name");

          return slides
            .find((slide) => slide.name == name)
            .map(({ name, duration }) => ({ name, duration }));
        }),
      });
    }

    const $tableBody = jQuery(tableBody.current).sortable({ stop });

    return () => $tableBody.sortable("destroy");
  }, [props.docRef, slides]);

  async function deleteSlide(slide, index) {
    slides.splice(index, 1);

    await props.storageRef.child(slide.name).delete();
    props.docRef.update({
      slides: slides.map(({ name, duration }) => ({ name, duration })),
    });
  }

  function showPreview(slide) {
    preview.current.showModal(slide.url);
  }

  function duration(slide, index) {
    slides[index] = slide;

    props.docRef.update({
      slides: slides.map(({ name, duration }) => ({ name, duration })),
    });
  }

  function success(name) {
    props.docRef.update({
      slides: firebase.firestore.FieldValue.arrayUnion({
        duration: props.duration,
        name,
      }),
    });
  }

  return (
    <section id="slides" className="section">
      <header>
        <h1 className="header">Slides</h1>
        <p className="headerSub">
          Use the input at the bottom of the screen to upload images for your
          slideshow, and drag the table rows to change the order of the slides.
        </p>
      </header>
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
            {slides.map((slide, index) => (
              <Slide
                key={slide.name}
                slide={slide}
                index={index}
                delete={deleteSlide}
                preview={showPreview}
                duration={duration}
              />
            ))}
          </tbody>
        </table>
      </div>
      <Upload storageRef={props.storageRef} success={success} sticky />
      <Preview ref={preview} />
    </section>
  );
}

Slides.propTypes = {
  slides: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      duration: PropTypes.any.isRequired,
    })
  ).isRequired,
  duration: PropTypes.any.isRequired,
  docRef: PropTypes.object.isRequired,
  storageRef: PropTypes.object.isRequired,
};

export default Slides;
