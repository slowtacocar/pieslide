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
import jQuery from "jquery";

class Dashboard {
  constructor() {
    firebase.initializeApp(config);
    this.auth = firebase.auth();
    this.accountForm = new AccountForm(this.auth, {
      "buttonAuth": "#buttonAuth",
      "buttonSignOut": "#signout",
      "inputAuth": "#inputAuth",
      "inputEmail": "#inputEmail",
      "inputPassword": "#inputPassword",
      "modal": "#authModal"
    });
    this.firestore = firebase.firestore();
    this.storageRef = firebase.storage().ref();
    this.auth.onAuthStateChanged(this.changeUser);
    Table.addPreviewListeners({
      "modalBodyVideo": "#modalBodyVideo",
      "modalImage": "#previewModalImage",
      "modalVideo": "#previewModalVideo"
    });
    this.buttonError.click(this.hideError);
    window.onerror = this.onError;
  }

  alertError = jQuery("#alertError");

  buttonError = jQuery("#buttonError");

  logoTable = new LogoTable();

  parError = jQuery("#parError");

  settingsForm = new SettingsForm();

  slidesTable = new SlidesTable();

  changeUser = (user) => {
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
      window.location.replace("index.html");
    }
  };

  hideError = () => {
    this.alertError.hide();
  };

  onError = (msg) => {
    this.parError.text(msg);
    this.alertError.show();

    return false;
  };
}
jQuery(new Dashboard());
