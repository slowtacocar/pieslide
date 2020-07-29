import "firebase/auth";
import firebase from "firebase/app";
import jQuery from "jquery";

class AccountForm {
  constructor(auth, elements) {
    this.auth = auth;
    this.buttonAuth = document.getElementById(elements.buttonAuth);
    this.buttonAuth.addEventListener("click", this.reauthenticate);
    this.buttonSignOut = document.getElementById(elements.buttonSignOut);
    this.buttonSignOut.addEventListener("click", this.signOut);
    this.inputAuth = document.getElementById(elements.inputAuth);
    this.inputEmail = document.getElementById(elements.inputEmail);
    this.inputPassword = document.getElementById(elements.inputPassword);
    this.modal = document.getElementById(elements.modal);
    jQuery(this.modal).on("show.bs.modal", this.accountChange);
  }

  signOut = () => {
    this.auth.signOut();
  };

  accountChange = (event) => {
    const { operation } = event.relatedTarget.dataset;

    this.callback = operation === "email" ? this.changeEmail
      : operation === "password" ? this.changePassword
        : operation === "delete" ? this.deleteAccount : null;
  };

  reauthenticate = async () => {
    const provider = firebase.auth.EmailAuthProvider;

    await this.user.reauthenticateWithCredential(provider.credential(
      this.user.email,
      this.inputAuth.value
    ));
    this.callback();
  };

  changeEmail = () => {
    this.user.updateEmail(this.inputEmail.value);
  };

  changePassword = () => {
    this.user.updatePassword(this.inputPassword.value);
  };

  deleteAccount = () => {
    this.user.delete();
  };

  changeUser = (user) => {
    this.user = user;
  };
}

export default AccountForm;
