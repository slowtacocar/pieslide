/** @jsx this.createElement */

import "firebase/auth";
import firebase from "firebase/app";
import jsx from "../lib/jsx.js";

class AccountForm extends jsx.Component {
  render() {
    return (
      <div>
        <div class="spacer" id="accountSettings"></div>
        <h1>Account Settings</h1>
        <p class="lead">
          Use the controls to change settings related to your account.
        </p>

        <div class="form-row mb-3">
          <div class="input-group col-md">
            <input
              type="email"
              ref="email"
              class="form-control"
              placeholder="New Email"
              aria-label="New Email"
            ></input>
            <div class="input-group-append">
              <button
                class="btn btn-outline-secondary"
                type="button"
                data-toggle="modal"
                data-target="#authModal"
                data-operation="changeEmail"
                onclick={this.accountChange}
              >Update</button>
            </div>
          </div>
          <div class="input-group col-md">
            <input
              type="password"
              ref="password"
              class="form-control"
              placeholder="New Password"
              aria-label="New Password"
            ></input>
            <div class="input-group-append">
              <button
                class="btn btn-outline-secondary"
                type="button"
                data-toggle="modal"
                data-target="#authModal"
                data-operation="changePassword"
                onclick={this.accountChange}
              >Update</button>
            </div>
          </div>
        </div>
        <button
          class="btn btn-outline-danger btn-block"
          type="button"
          data-toggle="modal"
          data-target="#authModal"
          data-operation="deleteAccount"
          onclick={this.accountChange}
        >Delete Account</button>

        <div
          class="modal fade"
          id="authModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="authModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="authModalLabel">
                  Enter Current Password
                </h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div class="input-group">
                  <input
                    type="password"
                    class="form-control"
                    placeholder="Current Password"
                    aria-label="Current Password"
                    ref="oldPassword"
                  ></input>
                  <div class="input-group-append">
                    <button
                      class="btn btn-outline-primary"
                      type="button"
                      ref="logIn"
                      onclick={this.reauthenticate}
                      data-dismiss="modal"
                    >Log In</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  accountChange(event) {
    this.refs.logIn.dataset.callback = event.target.dataset.operation;
  }

  async reauthenticate(event) {
    const provider = firebase.auth.EmailAuthProvider;

    await this.user.reauthenticateWithCredential(provider.credential(
      this.user.email,
      this.refs.oldPassword.value
    ));
    this[ event.target.dataset.callback ]();
  }

  changeEmail() {
    this.user.updateEmail(this.refs.email.value);
  }

  changePassword() {
    this.user.updatePassword(this.refs.password.value);
  }

  deleteAccount() {
    this.user.delete();
  }

  changeUser(user) {
    this.user = user;
  }
}

export default AccountForm;
