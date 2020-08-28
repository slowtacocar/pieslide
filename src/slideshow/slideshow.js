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

function Slideshow() {
  async function reload() {
    await docRef.update({ "message": "" });
    location.reload();
  }

  const auth = React.useMemo(() => firebase.auth(), []);
  const firestore = React.useMemo(() => firebase.firestore(), []);
  const storage = React.useMemo(() => firebase.storage(), []);
  const user = useAuth(auth);
  const docRef = React.useMemo(() => (
    user && firestore.collection("user").doc(user.uid)
  ), [firestore, user]);
  const storageRef = React.useMemo(() => (
    user && storage.ref().child("user").child(user.uid)
  ), [storage, user]);
  const data = useData(docRef);

  if (data && data.message === "reload") {
    reload();
  }

  return data ? (
    <>
      {data.slides.length && (
        <Slides
          storageRef={storageRef}
          slides={data.slides}
          transition={data.transition}
        />
      )}
      {data.logo && (
        <Logo storageRef={storageRef} logo={data.logo} size={data.size} />
      )}
      {data.time && <Time />}
      <News news={data.news} />
    </>
  ) : null;
}

export default Slideshow;
