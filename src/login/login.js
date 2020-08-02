import "./login.scss";
import "firebase/auth";
import * as firebaseui from "firebaseui";
import config from "../lib/config.js";
import firebase from "firebase/app";

class Index {
  constructor() {
    firebase.initializeApp(config);

    const ui = new firebaseui.auth.AuthUI(firebase.auth());

    ui.start("#firebaseui", {
      "signInOptions": [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ],
      "signInSuccessUrl": "index.html"
    });
  }

  static get() {
    return new Index();
  }
}
Index.get();
