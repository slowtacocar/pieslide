import React from "react";
import { firebase, useAuth, useData, uiConfig } from "@pieslide/common";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "./Slideshow.css";
import Slides from "./Slides";
import Logo from "./Logo";
import Time from "./Time";
import News from "./News";
import Embed from "./Embed";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

function Slideshow() {
  async function reload() {
    await docRef.update({ message: "" });
    window.location.reload();
  }

  const auth = React.useMemo(() => firebase.auth(), []);
  const firestore = React.useMemo(() => firebase.firestore(), []);
  const storage = React.useMemo(() => firebase.storage(), []);
  const user = useAuth(auth);
  const docRef = React.useMemo(
    () => user && firestore.collection("user").doc(user.uid),
    [firestore, user]
  );
  const storageRef = React.useMemo(
    () => user && storage.ref().child("user").child(user.uid),
    [storage, user]
  );
  const data = useData(docRef);

  if (data && data.message === "reload") {
    reload();
  }

  return user ? (
    data ? (
      <>
        <div className="grid">
          {data.panes.map((pane) => (
            <div
              className="pane"
              key={pane.timestamp}
              style={{
                gridColumnStart: pane.columnStart,
                gridColumnEnd: pane.columnEnd,
                gridRowStart: pane.rowStart,
                gridRowEnd: pane.rowEnd,
              }}
            >
              {pane.slides ? (
                pane.slides.length && (
                  <Slides
                    storageRef={storageRef}
                    slides={pane.slides}
                    transition={data.transition}
                  />
                )
              ) : (
                <Embed embed={pane.embed} />
              )}
            </div>
          ))}
        </div>
        {data.logo && (
          <Logo storageRef={storageRef} logo={data.logo} size={data.size} />
        )}
        {data.time && <Time />}
        <News news={data.news} />
      </>
    ) : null
  ) : (
    <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
  );
}

export default Slideshow;
