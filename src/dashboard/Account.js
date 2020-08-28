import React from "react";
import PropTypes from "prop-types";
import "./Account.module.css";
import { useDialog } from "../common/hooks";
import dialogPolyfill from "dialog-polyfill";
import firebase from "../common/firebase";
import "firebase/auth";

function Account(props) {
  const modal = useDialog(dialogPolyfill);
  const currentPassword = React.useRef();
  const [callback, setCallback] = React.useState();

  function currentPasswordChanged() {
    currentPassword.current.setCustomValidity("");
  }

  function reauthenticate() {
    modal.current.showModal();
    return new Promise((resolve) => {
      setCallback(() => async (event) => {
        event.preventDefault();
        event.persist();

        const provider = firebase.auth.EmailAuthProvider;

        try {
          await props.user.reauthenticateWithCredential(provider.credential(
            props.user.email,
            event.target.currentPassword.value
          ));
          modal.current.close();

          resolve();
        } catch (error) {
          currentPassword.current.setCustomValidity("Incorrect Password");
          event.target.buttonLogIn.click();
        }
      });
    });
  }

  async function changeEmail(event) {
    event.preventDefault();
    event.persist();

    await reauthenticate();
    props.user.updateEmail(event.target.newEmail.value);
  }

  async function changePassword(event) {
    event.preventDefault();
    event.persist();

    await reauthenticate();
    props.user.updatePassword(event.target.newPassword.value);
  }

  async function deleteAccount() {
    await reauthenticate();
    props.user.delete();
  }

  return (
    <section id="accountSettings" className="section">
      <header>
        <h1 className="header">Account Settings</h1>
        <p className="headerSub">
          Use the controls to change settings related to your account.
        </p>
      </header>
      <div styleName="grid">
        <form styleName="newEmail" onSubmit={changeEmail}>
          <input
            type="email"
            name="newEmail"
            placeholder="New Email"
            required
          />
          <button type="submit">Update</button>
        </form>
        <form styleName="newPassword" onSubmit={changePassword}>
          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            required
          />
          <button type="submit">Update</button>
        </form>
        <button type="button" styleName="delete" onClick={deleteAccount}>
          Delete Account
        </button>
      </div>
      <dialog ref={modal} styleName="modal">
        <h3>Enter current password:</h3>
        <form styleName="currentPassword" onSubmit={callback}>
          <input
            type="password"
            placeholder="Current Password"
            ref={currentPassword}
            required
            onChange={currentPasswordChanged}
            name="currentPassword"
          />
          <button type="submit" name="buttonLogIn">Log In</button>
        </form>
      </dialog>
    </section>
  );
}

Account.propTypes = {
  "user": PropTypes.object.isRequired
};

export default Account;
