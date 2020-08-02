/** @jsx this.createElement */

import "./dashboard.scss";
import "bootstrap/js/dist/collapse";
import "bootstrap/js/dist/modal";
import "bootstrap/js/dist/scrollspy";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import AccountForm from "./account-form.js";
import LogoTable from "./logo-table.js";
import Preview from "./preview.js";
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
      <div>
        <nav class="navbar navbar-expand-sm navbar-dark bg-dark fixed-top">
          <a class="navbar-brand" href="#">PieSlide</a>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#sidebar"
            aria-controls="sidebar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse">
            <ul class="navbar-nav w-100">
              <li class="nav-item active">
                <a class="nav-link" href="#">
                  Dashboard <span class="sr-only">(current)</span>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="slideshow.html" target="_blank">
                  Slideshow
                </a>
              </li>
            </ul>
          </div>
          <button
            type="button"
            onclick={this.signOut}
            class="btn btn-outline-light text-nowrap"
          >Sign Out</button>
        </nav>

        <div class="row m-0">
          <ul
            id="sidebar"
            class={
              `nav mt-navbar z-1030 bg-light collapse flex-column nav-pills
              col-sm-4 col-md-3 col-xl-2 py-2 px-3 pl-sm-0 position-fixed
              d-sm-block h-sm-100`
            }
          >
            <li class="nav-item">
              <a class="nav-link active" href="#slides">Slides</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#logo">Logo</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#slideshowSettings">
                Slideshow Settings
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#accountSettings">Account Settings</a>
            </li>
          </ul>

          <main class="col-sm-8 col-md-9 col-xl-10 ml-auto px-3 pb-3">
            <SlidesTable ref="slidesTable" />
            <LogoTable ref="logoTable" />
            <SettingsForm ref="settingsForm" />
            <AccountForm ref="accountForm" />
          </main>
        </div>
        <div
          class="alert alert-danger mb-0 fixed-bottom"
          role="alert"
          ref="alertError"
          hidden
        >
          <span ref="textError"></span>
          <button
            type="button"
            class="close"
            aria-label="Close"
            onclick={this.hideAlertError}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <Preview />
      </div>;

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
    this.refs.alertError.hidden = true;
  }

  showAlertError(msg) {
    this.refs.textError.textContent = msg;
    this.refs.alertError.hidden = false;

    return false;
  }
}

jsx.render(document.body, jsx.createElement(Dashboard, null));
