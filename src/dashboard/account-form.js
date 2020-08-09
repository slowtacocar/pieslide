/** @jsx this.createElement */
/** @jsxFrag jsx.Fragment */

import "firebase/auth";
import dialogPolyfill from "dialog-polyfill";
import firebase from "firebase/app";
import jsx from "../lib/jsx.js";
import styles from "./account-form.module.css";

class AccountForm extends jsx.Component {
  render() {
    const element =
      <section id="accountSettings" class="section">
        <header>
          <h1 class="header">Account Settings</h1>
          <p class="headerSub">Use the controls to change settings related to your account.</p>
        </header>

        <div class={styles.grid}>
          <form onsubmit={this.setCallbackAndData} class={styles.newEmail}>
            <input type="email" placeholder="New Email" name="new"></input>
            <button type="submit" value="changeEmail">Update</button>
          </form>
          <form
            onsubmit={this.setCallbackAndData}
            class={styles.newPassword}
          >
            <input
              type="password"
              placeholder="New Password"
              name="new"
            ></input>
            <button type="submit" value="changePassword">Update</button>
          </form>
          <button
            type="button"
            value="deleteAccount"
            onclick={this.setCallback}
            class={styles.delete}
          >Delete Account</button>
        </div>

        <dialog ref="dialog" class={styles.modal}>
          <h3>Enter current password:</h3>
          <form
            method="dialog"
            onsubmit={this.reauthenticateFormSubmitted}
            class={styles.currentPassword}
          >
            <input
              type="password"
              placeholder="Current Password"
              name="current"
            ></input>
            <button type="submit" ref="buttonLogIn" value="{}">Log In</button>
          </form>
        </dialog>
      </section>;

    dialogPolyfill.registerDialog(this.refs.dialog);

    return element;
  }

  setCallbackAndData(event) {
    const formData = new FormData(event.target);

    this.refs.buttonLogIn.value = JSON.stringify({
      "new": formData.get("new")
    });
    this.refs.dialog.onclose = this[ event.submitter.value ];
    this.refs.dialog.showModal();

    return false;
  }

  setCallback(event) {
    this.refs.dialog.onclose = this[ event.target.value ];
    this.refs.dialog.showModal();

    return false;
  }

  reauthenticateFormSubmitted(event) {
    const formData = new FormData(event.target);

    this.refs.buttonLogIn.value = JSON.stringify({
      ...JSON.parse(this.refs.buttonLogIn.value),
      "current": formData.get("current")
    });
  }

  async reauthenticate(password) {
    const provider = firebase.auth.EmailAuthProvider;

    await this.user.reauthenticateWithCredential(provider.credential(
      this.user.email,
      password
    ));
  }

  async changeEmail(event) {
    const data = JSON.parse(event.target.returnValue);

    await this.reauthenticate(data.current);
    this.user.updateEmail(data.new);
  }

  async changePassword(event) {
    const data = JSON.parse(event.target.returnValue);

    await this.reauthenticate(data.current);
    this.user.updatePassword(data.new);
  }

  async deleteAccount(event) {
    const data = JSON.parse(event.target.returnValue);

    await this.reauthenticate(data.current);
    this.user.delete();
  }

  changeUser(user) {
    this.user = user;
  }
}

export default AccountForm;
