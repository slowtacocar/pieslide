import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import CSSModules from "react-css-modules";
import styles from "./Slideshow.module.css";
import { firestore, storage } from "../common/firebase";
import Logo from "./Logo";
import Time from "./Time";
import News from "./News";

function Slideshow(props) {
  const docRef = firestore.collection("user").doc(props.user.uid);
  const storageRef = storage.ref().child("user").child(props.user.uid);

  const [data, setData] = useState();

  useEffect(() => docRef.onSnapshot((doc) => {
    setData(doc.data());
  }), [props.user.uid]);

  if (data) {
    if (data.message === "reload") {
      (async function() {
        await docRef.update({ "message": "" });
        location.reload();
      })();
    } else {
      return (
        <>
          {data.logo && <Logo storageRef={storageRef} logo={data.logo} size={data.size} />}
          {data.time && <Time />}
          <News news={data.news} />
        </>
      );
    }
  }
  return null;
}

Slideshow.propTypes = {
  "user": PropTypes.object.isRequired
};

export default CSSModules(Slideshow, styles);
