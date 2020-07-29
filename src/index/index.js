import "./index.scss";
import "firebase/auth";
import * as firebaseui from "firebaseui";
import config from "../config.js";
import firebase from "firebase/app";
import jQuery from "jquery";

class Index {
  constructor() {
    firebase.initializeApp(config);
    firebase.auth().onAuthStateChanged(this.changeUser);
  }

  static get() {
    return new Index();
  }

  changeUser = (user) => {
    const params = new URLSearchParams(window.location.search);
    let redir = params.get("redir");

    if (!redir) {
      redir = "dashboard.html";
    }

    if (user) {
      window.location.replace(redir);
    } else {
      const ui = new firebaseui.auth.AuthUI(firebase.auth());

      ui.start("#firebaseui", {
        "signInOptions": [
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          firebase.auth.EmailAuthProvider.PROVIDER_ID
        ],
        "signInSuccessUrl": redir
      });
    }
  };
}
jQuery(Index.get);
