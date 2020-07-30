import "./dashboard.scss";
import "bootstrap/js/dist/collapse";
import "bootstrap/js/dist/modal";
import "bootstrap/js/dist/scrollspy";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "jquery-ui/ui/data";
import "jquery-ui/ui/scroll-parent";
import "jquery-ui/ui/widget";
import "jquery-ui/ui/widgets/mouse";
import "jquery-ui/ui/widgets/sortable";
import AccountForm from "./account-form.js";
import LogoTable from "./logo-table.js";
import SettingsForm from "./settings-form.js";
import SlidesTable from "./slides-table.js";
import Table from "./table.js";
import config from "../config.js";
import firebase from "firebase/app";

class Dashboard {
  constructor() {
    this.changeUser = this.changeUser.bind(this);
    this.hideError = this.hideError.bind(this);
    this.onError = this.onError.bind(this);
    this.alertError = document.getElementById("alertError");
    this.buttonError = document.getElementById("buttonError");
    this.logoTable = new LogoTable();
    this.parError = document.getElementById("parError");
    this.settingsForm = new SettingsForm();
    this.slidesTable = new SlidesTable();
    firebase.initializeApp(config);
    this.auth = firebase.auth();
    this.accountForm = new AccountForm(this.auth, {
      "buttonAuth": "buttonAuth",
      "buttonSignOut": "signout",
      "inputAuth": "inputAuth",
      "inputEmail": "inputEmail",
      "inputPassword": "inputPassword",
      "modal": "authModal"
    });
    this.firestore = firebase.firestore();
    this.storageRef = firebase.storage().ref();
    this.auth.onAuthStateChanged(this.changeUser);
    Table.addPreviewListeners({
      "modalBodyVideo": "modalBodyVideo",
      "modalImage": "previewModalImage",
      "modalVideo": "previewModalVideo",
      "previewImg": "previewImg"
    });
    this.buttonError.addEventListener("click", this.hideError);
    window.onerror = this.onError;
  }

  static get() {
    return new Dashboard();
  }

  changeUser(user) {
    this.user = user;

    if (this.user) {
      const docRef = this.firestore.collection("user").doc(this.user.uid);
      const folderRef = this.storageRef.child(`user/${this.user.uid}`);

      this.accountForm.changeUser(user);
      this.logoTable.changeUser(
        docRef.collection("data").doc("logo"),
        folderRef.child("logo")
      );
      this.settingsForm.changeUser(docRef);
      this.slidesTable.changeUser(
        docRef.collection("data").doc("slides"),
        folderRef.child("slides"),
        docRef
      );
    } else {
      window.location.replace("login.html");
    }
  }

  hideError() {
    this.alertError.hidden = true;
  }

  onError(msg) {
    this.parError.textContent = msg;
    this.alertError.hidden = false;

    return false;
  }
}
Dashboard.get();
