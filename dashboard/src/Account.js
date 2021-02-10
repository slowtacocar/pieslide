import React from "react";
import PropTypes from "prop-types";
import { firebase } from "@pieslide/common";
import "firebase/auth";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Modal from "react-bootstrap/Modal";

function Account(props) {
  const currentPassword = React.useRef();
  const [
    handleCurrentPasswordSubmit,
    setHandleCurrentPasswordSubmit,
  ] = React.useState();

  const [modalShown, setModalShown] = React.useState();

  function handleModalClose() {
    setModalShown(false);
  }

  function handleCurrentPasswordChange() {
    currentPassword.current.setCustomValidity("");
  }

  function reauthenticate() {
    setModalShown(true);
    return new Promise((resolve) => {
      setHandleCurrentPasswordSubmit(() => async (event) => {
        event.preventDefault();
        event.persist();

        const credential = firebase.auth.EmailAuthProvider.credential(
          props.user.email,
          event.target.currentPassword.value
        );

        try {
          await props.user.reauthenticateWithCredential(credential);
          setModalShown(false);

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
                name="newEmail"
                placeholder="New Email"
                required
              />
              <InputGroup.Append>
                <Button variant="outline-secondary" type="submit">
                  Update
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
                name="newPassword"
                placeholder="New Password"
                required
              />
              <InputGroup.Append>
                <Button variant="outline-secondary" type="submit">
                  Update
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
                ref={currentPassword}
                required
                onChange={handleCurrentPasswordChange}
                name="currentPassword"
              />
              <InputGroup.Append>
                <Button
                  variant="outline-secondary"
                  type="submit"
                  name="buttonLogIn"
                >
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
