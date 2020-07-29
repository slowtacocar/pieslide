import "firebase/auth";
import firebase from "firebase/app";
import jQuery from "jquery";

class AccountForm {
  constructor(auth, elements) {
    this.auth = auth;
    this.buttonAuth = jQuery(elements.buttonAuth);
    this.buttonAuth.on("show.bs.modal", this.accountChange);
    this.buttonSignOut = jQuery(elements.buttonSignOut);
    this.buttonSignOut.click(this.signOut);
    this.inputAuth = jQuery(elements.inputAuth);
    this.inputEmail = jQuery(elements.inputEmail);
    this.inputPassword = jQuery(elements.inputPassword);
    this.modal = jQuery(elements.modal);
  }

  signOut = () => {
    this.auth.signOut();
  };

  accountChange = (event) => {
    const operation = jQuery(event.relatedTarget).data("operation");
    const callback = operation === "email" ? this.changeEmail
      : operation === "password" ? this.changePassword
        : operation === "delete" ? this.deleteAccount : null;

    this.buttonAuth.click({ callback }, this.reauthenticate);
  };

  reauthenticate = async (event) => {
    const provider = firebase.auth.EmailAuthProvider;

    await this.user.reauthenticateWithCredential(provider.credential(
      this.user.email,
      this.inputAuth.val()
    ));
    event.data.callback();
    this.buttonAuth.off("click");
  };

  changeEmail = () => {
    this.user.updateEmail(this.inputEmail.val());
  };

  changePassword = () => {
    this.user.updatePassword(this.inputPassword.val());
  };

  deleteAccount = () => {
    this.user.delete();
  };

  changeUser = (user) => {
    this.user = user;
  };
}

export default AccountForm;
