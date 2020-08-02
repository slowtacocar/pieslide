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

class Slideshow {
  constructor() {
    this.changeUser = this.changeUser.bind(this);
    this.slidesChanged = this.slidesChanged.bind(this);
    this.logoChanged = this.logoChanged.bind(this);
    this.docChanged = this.docChanged.bind(this);
    firebase.initializeApp(config);
    this.firestore = firebase.firestore();
    this.firestore.enablePersistence();
    this.storageRef = firebase.storage().ref();
    this.logo = new Logo();
    this.news = new News();
    this.slides = new Slides();
    this.time = new Time();
    firebase.auth().onAuthStateChanged(this.changeUser);
  }

  static get() {
    return new Slideshow();
  }

  changeUser(user) {
    this.user = user;

    if (this.user) {
      const ref = this.firestore.doc(`user/${this.user.uid}`);
      const dataRef = ref.collection("data");

      dataRef.doc("slides").onSnapshot(this.slidesChanged);
      dataRef.doc("logo").onSnapshot(this.logoChanged);
      ref.onSnapshot(this.docChanged);
    } else {
      window.location.replace("login.html?signInSuccessUrl=slideshow.html");
    }
  }

  slidesChanged(doc) {
    this.slides.setData(
      doc.get("slides"),
      this.storageRef.child(`user/${this.user.uid}/slides`)
    );
  }

  logoChanged(doc) {
    this.logo.setImage(
      doc.get("name"),
      this.storageRef.child(`user/${this.user.uid}/logo`)
    );
  }

  docChanged(doc) {
    this.time.setVisibility(doc.get("time"));
    this.slides.setTransition(doc.get("transition"));
    this.logo.setSize(doc.get("size"));
    this.news.setLinks(doc.get("news"));
    this.constructor.handleMessage(doc.get("message"), doc.ref);
  }

  static async handleMessage(message, ref) {
    if (message === "reload") {
      await ref.update({ "message": "" });
      location.reload();
    }
  }
}
Slideshow.get();
