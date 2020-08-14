/** @jsx this.createElement */
/** @jsxFrag jsx.Fragment */

import "./theme.module.css";
import "dialog-polyfill/dist/dialog-polyfill.css";
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
import styles from "./dashboard.module.css";

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
        <nav class={styles.navbar}>
          <span class={styles.navbarSpan}>PieSlide</span>
          <a href="index.html" class={styles.navbarLinkActive}>Dashboard</a>
          <a href="slideshow.html" target="_blank" class={styles.navbarLink}>Slideshow</a>
          <button type="button" onclick={this.signOut} class={styles.navbarButton}>Sign Out</button>
        </nav>

        <nav class={styles.sidebar}>
          <a href="#slides" class={`${styles.active} ${styles.sidebarLink}`}>Slides</a>
          <a href="#logo" class={styles.sidebarLink}>Logo</a>
          <a href="#slideshowSettings" class={styles.sidebarLink}>Slideshow Settings</a>
          <a href="#accountSettings" class={styles.sidebarLink}>Account Settings</a>
        </nav>

        <div class={styles.mainContainer}>
          <div class={styles.main}>
            <SlidesTable ref="slidesTable" />
            <LogoTable ref="logoTable" />
            <SettingsForm ref="settingsForm" />
            <AccountForm ref="accountForm" />
          </div>
        </div>
        <div ref="error" role="alert" class={styles.error} hidden>
          <p ref="errorSpan" class={styles.errorSpan}></p>
          <button
            type="button"
            onclick={this.hideAlertError}
            class={styles.errorButton}
          >&times;</button>
        </div>
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
    this.refs.error.setAttribute("hidden");
  }

  showAlertError(msg) {
    this.refs.errorSpan.textContent = msg;
    this.refs.error.removeAttribute("hidden");

    return false;
  }
}

jsx.render(document.body, jsx.createElement(Dashboard, null));
