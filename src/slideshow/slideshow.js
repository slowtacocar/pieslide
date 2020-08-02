/** @jsx this.createElement */

import "./slideshow.scss";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import Logo from "./logo.js";
import News from "./news.js";
import Slides from "./slides.js";
import Time from "./time.js";
import config from "../lib/config.js";
import firebase from "firebase/app";
import jsx from "../lib/jsx.js";

class Slideshow extends jsx.Component {
  constructor(props) {
    super(props);
    firebase.initializeApp(config);
    this.firestore = firebase.firestore();
    this.storageRef = firebase.storage().ref();
  }

  render() {
    const obj =
      <div>
        <Slides ref="slides" />
        <Logo ref="logo" />
        <News ref="news" />
        <Time ref="time" />
      </div>;

    firebase.auth().onAuthStateChanged(this.changeUser);

    return obj;
  }

  changeUser(user) {
    if (user) {
      const docRef = this.firestore.doc(`user/${user.uid}`);
      const folderRef = this.storageRef.child(`user/${user.uid}`);

      this.refs.time.changeUser(docRef);
      this.refs.news.changeUser(docRef);
      this.refs.slides.changeUser(
        docRef.collection("data").doc("slides"),
        folderRef.child("slides"),
        docRef
      );
      this.refs.logo.changeUser(
        docRef.collection("data").doc("logo"),
        folderRef.child("logo"),
        docRef
      );
      docRef.onSnapshot(this.changeData);
    } else {
      window.location.replace("login.html?signInSuccessUrl=slideshow.html");
    }
  }

  async changeData(doc) {
    if (doc.get("message") === "reload") {
      await doc.ref.update({ "message": "" });
      location.reload();
    }
  }
}

jsx.render(document.body, jsx.createElement(Slideshow, null));
