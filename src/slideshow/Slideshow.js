import React from "react";
import firebase from "../common/firebase";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "./Slideshow.module.css";
import { useAuth, useData } from "../common/hooks";
import Slides from "./Slides";
import Logo from "./Logo";
import Time from "./Time";
import News from "./News";
import Embed from "./Embed";

function Slideshow() {
  async function reload() {
    await docRef.update({ message: "" });
    location.reload();
  }

  const auth = React.useMemo(() => firebase.auth(), []);
  const firestore = React.useMemo(() => firebase.firestore(), []);
  const user = useAuth(auth);
  const docRef = React.useMemo(
    () => user && firestore.collection("user").doc(user.uid),
    [firestore, user]
  );
  const data = useData(docRef);

  if (data && data.message === "reload") {
    reload();
  }

  return data ? (
    <>
      <div styleName="grid">
        {data.panes.map((pane, index) => (
          <div
            styleName="pane"
            key={index}
            style={{
              gridColumnStart: pane.columnStart,
              gridColumnEnd: pane.columnEnd,
              gridRowStart: pane.rowStart,
              gridRowEnd: pane.rowEnd,
            }}
          >
            {pane.slides ? (
              pane.slides.length && (
                <Slides slides={pane.slides} transition={data.transition} />
              )
            ) : (
              <Embed embed={pane.embed} />
            )}
          </div>
        ))}
      </div>
      {data.logo && <Logo logo={data.logo} size={data.size} />}
      {data.time && <Time />}
      <News news={data.news} />
    </>
  ) : null;
}

export default Slideshow;