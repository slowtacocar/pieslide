/** @jsx this.createElement */

import "./login.scss";
import "firebase/auth";
import * as firebaseui from "firebaseui";
import config from "../lib/config.js";
import firebase from "firebase/app";
import jsx from "../lib/jsx.js";

class Login extends jsx.Component {
  constructor(props) {
    super(props);
    firebase.initializeApp(config);

    const authUI = new firebaseui.auth.AuthUI(firebase.auth());

    authUI.start("body", {
      "signInOptions": [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ],
      "signInSuccessUrl": "index.html"
    });
  }
}

jsx.render(document.body, jsx.createElement(Login, null));
