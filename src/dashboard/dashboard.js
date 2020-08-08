/** @jsx this.createElement */
/** @jsxFrag jsx.Fragment */

import "./scss/dashboard.scss";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import AccountForm from "./account-form.js";
import LogoTable from "./logo-table.js";
import SettingsForm from "./settings-form.js";
import SlidesTable from "./slides-table.js";
import config from "../lib/config.js";
import firebase from "firebase/app";
import jsx from "../lib/jsx.js";

class Dashboard extends jsx.Component {
  constructor(props) {
    super(props);
    firebase.initializeApp(config);
    this.auth = firebase.auth();
    this.firestore = firebase.firestore();
    this.storageRef = firebase.storage().ref();
    window.onerror = this.showAlertError;
  }

  render() {
    const element =
      <>
        <nav id="navbar">
          <span>PieSlide</span>
          <a href="index.html" class="active-link">Dashboard</a>
          <a href="slideshow.html" target="_blank">Slideshow</a>
          <button type="button" onclick={this.signOut}>Sign Out</button>
        </nav>

        <nav id="sidebar">
          <a href="#slides" class="active-link">Slides</a>
          <a href="#logo">Logo</a>
          <a href="#slideshowSettings">Slideshow Settings</a>
          <a href="#accountSettings">Account Settings</a>
        </nav>

        <div class="main">
          <div>
            <SlidesTable ref="slidesTable" />
            <LogoTable ref="logoTable" />
            <SettingsForm ref="settingsForm" />
            <AccountForm ref="accountForm" />
          </div>
        </div>
        <p ref="error" role="alert" id="alert" hidden>
          <span ref="errorSpan"></span>
          <button type="button" onclick={this.hideAlertError}>&times;</button>
        </p>
      </>;

    this.auth.onAuthStateChanged(this.changeUser);

    return element;
  }

  changeUser(user) {
    this.user = user;

    if (this.user) {
      const docRef = this.firestore.collection("user").doc(this.user.uid);
      const folderRef = this.storageRef.child(`user/${this.user.uid}`);

      this.refs.accountForm.changeUser(user);
      this.refs.logoTable.changeUser(
        docRef.collection("data").doc("logo"),
        folderRef.child("logo")
      );
      this.refs.settingsForm.changeUser(docRef);
      this.refs.slidesTable.changeUser(
        docRef.collection("data").doc("slides"),
        folderRef.child("slides"),
        docRef
      );
    } else {
      window.location.replace("login.html");
    }
  }

  signOut() {
    this.auth.signOut();
  }

  hideAlertError() {
    this.refs.error.hidden = true;
  }

  showAlertError(msg) {
    this.refs.errorSpan.textContent = msg;
    this.refs.error.hidden = false;

    return false;
  }
}

jsx.render(document.body, jsx.createElement(Dashboard, null));
