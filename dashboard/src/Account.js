import React from "react";
import PropTypes from "prop-types";
import firebase from "firebase/app";
import "firebase/auth";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Modal from "react-bootstrap/Modal";

function Account(props) {
  const currentPasswordBox = React.useRef();
  const [callback, setCallback] = React.useState();
  const [newEmail, setNewEmail] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [currentPassword, setCurrentPassword] = React.useState("");

  const [modalShown, setModalShown] = React.useState();

  function handleModalClose() {
    setModalShown(false);
  }

  function handleCurrentPasswordChange(event) {
    currentPasswordBox.current.setCustomValidity("");
    setCurrentPassword(event.target.value);
  }

  function handleNewEmailChange(event) {
    setNewEmail(event.target.value);
  }

  function handleNewPasswordChange(event) {
    setNewPassword(event.target.value);
  }

  async function handleCurrentPasswordSubmit(event) {
    event.preventDefault();
    const credential = firebase.auth.EmailAuthProvider.credential(
      props.user.email,
      currentPassword
    );

    try {
      await props.user.reauthenticateWithCredential(credential);
      setModalShown(false);

      callback();
    } catch (error) {
      currentPasswordBox.current.setCustomValidity("Incorrect Password");
      currentPasswordBox.current.reportValidity();
    }
  }

  async function changeEmail(event) {
    event.preventDefault();
    setCallback(() => () => {
      props.user.updateEmail(newEmail);
    });
    setModalShown(true);
  }

  async function changePassword(event) {
    event.preventDefault();
    setCallback(() => () => {
      props.user.updatePassword(newPassword);
    });
    setModalShown(true);
  }

  async function deleteAccount() {
    setCallback(() => () => {
      props.user.delete();
    });
    setModalShown(true);
  }

  return (
    <section id="accountSettings">
      <header>
        <h2>Account Settings</h2>
        <p className="lead">
          Use the controls to change settings related to your account.
        </p>
      </header>
      <Form.Row>
        <Col sm className="mb-form">
          <Form onSubmit={changeEmail}>
            <InputGroup>
              <Form.Control
                type="email"
                placeholder="New Email"
                value={newEmail}
                onChange={handleNewEmailChange}
                required
              />
              <InputGroup.Append>
                <Button variant="outline-secondary" type="submit">
                  Update Email
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Form>
        </Col>
        <Col sm className="mb-form">
          <Form onSubmit={changePassword}>
            <InputGroup>
              <Form.Control
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={handleNewPasswordChange}
                required
              />
              <InputGroup.Append>
                <Button variant="outline-secondary" type="submit">
                  Update Password
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Form>
        </Col>
      </Form.Row>
      <Button variant="outline-danger" block onClick={deleteAccount}>
        Delete Account
      </Button>
      <Modal show={modalShown} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Enter current password:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleCurrentPasswordSubmit}>
            <InputGroup>
              <Form.Control
                type="password"
                placeholder="Current Password"
                ref={currentPasswordBox}
                required
                onChange={handleCurrentPasswordChange}
                value={currentPassword}
                name="currentPassword"
              />
              <InputGroup.Append>
                <Button variant="outline-secondary" type="submit">
                  Log In
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Form>
        </Modal.Body>
      </Modal>
    </section>
  );
}

Account.propTypes = {
  user: PropTypes.object.isRequired,
};

export default Account;
