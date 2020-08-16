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
          <p class="headerSub">
            Use the controls to change settings related to your account.
          </p>
        </header>

        <div class={styles.grid}>
          <form onsubmit={this.setCallback} class={styles.newEmail}>
            <input type="email" placeholder="New Email" ref="newEmail"></input>
            <button type="submit" value="changeEmail">Update</button>
          </form>
          <form
            onsubmit={this.setCallback}
            class={styles.newPassword}
          >
            <input
              type="password"
              placeholder="New Password"
              ref="newPassword"
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
            class={styles.currentPassword}
          >
            <input
              type="password"
              placeholder="Current Password"
              name="current"
              ref="currentPassword"
            ></input>
            <button type="submit" ref="buttonLogIn">Log In</button>
          </form>
        </dialog>
      </section>;

    dialogPolyfill.registerDialog(this.refs.dialog);

    return element;
  }

  setCallback(event) {
    this.refs.dialog.onclose =
      this[ (event.target.querySelector("button") || event.target).value ];
    this.refs.dialog.showModal();

    return false;
  }

  async reauthenticate() {
    const provider = firebase.auth.EmailAuthProvider;

    await this.user.reauthenticateWithCredential(provider.credential(
      this.user.email,
      this.refs.currentPassword.value
    ));
  }

  async changeEmail() {
    await this.reauthenticate();
    this.user.updateEmail(this.refs.newEmail.value);
  }

  async changePassword() {
    await this.reauthenticate();
    this.user.updatePassword(this.refs.newPassword.value);
  }

  async deleteAccount() {
    await this.reauthenticate();
    this.user.delete();
  }

  changeUser(user) {
    this.user = user;
  }
}

export default AccountForm;
