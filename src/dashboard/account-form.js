/** @jsx this.createElement */
/** @jsxFrag jsx.Fragment */

import "firebase/auth";
import firebase from "firebase/app";
import jsx from "../lib/jsx.js";

class AccountForm extends jsx.Component {
  render() {
    return (
      <section id="accountSettings">
        <header>
          <h1>Account Settings</h1>
          <p>Use the controls to change settings related to your account.</p>
        </header>

        <div class="grid">
          <form class="form" onsubmit={this.setCallbackAndData}>
            <input type="email" placeholder="New Email" name="new"></input>
            <button type="submit" value="changeEmail">Update</button>
          </form>
          <form class="form" onsubmit={this.setCallbackAndData}>
            <input
              type="password"
              placeholder="New Password"
              name="new"
            ></input>
            <button type="submit" value="changePassword">Update</button>
          </form>
          <button
            class="button"
            type="button"
            value="deleteAccount"
            onclick={this.setCallback}
          >Delete Account</button>
        </div>

        <dialog ref="dialog" class="modal">
          <h3>Enter current password:</h3>
          <form
            class="form"
            method="dialog"
            onsubmit={this.reauthenticateFormSubmitted}
          >
            <input
              type="password"
              placeholder="Current Password"
              name="current"
            ></input>
            <button type="submit" ref="buttonLogIn" value="{}">Log In</button>
          </form>
        </dialog>
      </section>
    );
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
