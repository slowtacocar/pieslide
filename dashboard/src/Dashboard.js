import React, { useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import FormControl from "react-bootstrap/FormControl";
import Screen from "./Screen";
import firebase from "firebase";
import isEqual from "lodash/isEqual";

function Dashboard(props) {
  const [screen, setScreen] = useState(props.screens.keys().next().value);

  const storageRef = React.useMemo(
    () =>
      props.user &&
      firebase.storage().ref().child("user").child(props.user.uid),
    [props.user]
  );
  const docRef = React.useMemo(
    () =>
      screen &&
      firebase
        .firestore()
        .collection("user")
        .doc(props.user.uid)
        .collection("screens")
        .doc(screen),
    [screen, props.user.uid]
  );

  const [data, setData] = React.useReducer((state, action) => {
    updateWithRefEqual(state, action);
    return action;
  });

  React.useEffect(
    () =>
      docRef?.onSnapshot((doc) => {
        const data = doc.data();
        const updated = {
          duration: 5,
          message: "",
          news: ["https://news.google.com/news/rss"],
          size: 30,
          time: true,
          transition: 0.25,
          logo: null,
          panes: [
            {
              rowStart: 1,
              rowEnd: 2,
              columnStart: 1,
              columnEnd: 2,
              slides: [],
              timestamp: Date.now(),
            },
          ],
          ...data,
        };
        if (isEqual(data, updated)) {
          setData(data);
        } else {
          doc.ref.set(updated);
        }
      }),
    [docRef]
  );

  function updateWithRefEqual(oldData, newData) {
    if (oldData) {
      for (const key in newData) {
        if (typeof newData[key] === "object") {
          if (isEqual(oldData[key], newData[key])) {
            newData[key] = oldData[key];
          } else {
            updateWithRefEqual(oldData[key], newData[key]);
          }
        }
      }
    }
  }

  function updateData(mergeData) {
    setData({ ...data, ...mergeData });
    docRef.update(mergeData);
  }

  function handleScreenChange(event) {
    setScreen(event.target.value);
  }

  return (
    <div className="dashboard-grid">
      <div className="dashboard-navbar">
        <Navbar bg="dark" expand="sm" variant="dark">
          <Navbar.Brand>PieSlide</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarNav" />
          <Navbar.Collapse id="navbarNav">
            <Nav className="mr-auto" activeKey="dashboard">
              <Nav.Link href="https://pieslide.web.app/" eventKey="dashboard">
                Dashboard
              </Nav.Link>
              <Nav.Link
                href={`https://slideshow-pieslide.web.app?screen=${screen}`}
                target="_blank"
              >
                Slideshow
              </Nav.Link>
            </Nav>
            {props.screens.size > 1 && (
              <FormControl
                as="select"
                value={screen}
                onChange={handleScreenChange}
                className="w-auto mr-3"
              >
                {Array.from(props.screens, ([id, name]) => (
                  <option key={id} value={id}>
                    {name}
                  </option>
                ))}
              </FormControl>
            )}
            <Button variant="outline-light" onClick={props.signOut}>
              Sign Out
            </Button>
          </Navbar.Collapse>
        </Navbar>
      </div>

      <div className="dashboard-sidebar">
        <Nav variant="pills" className="flex-column bg-light h-100 pr-3 py-2">
          <Nav.Link href="#panes" className="sidebar-link">
            Panes
          </Nav.Link>
          <Nav.Link href="#logo" className="sidebar-link">
            Logo
          </Nav.Link>
          <Nav.Link href="#slideshowSettings" className="sidebar-link">
            Slideshow Settings
          </Nav.Link>
          <Nav.Link href="#accountSettings" className="sidebar-link">
            Account Settings
          </Nav.Link>
        </Nav>
      </div>

      <div className="dashboard-main overflow-auto position-relative">
        <div className="p-3">
          {screen ? (
            data ? (
              <Screen
                onChange={updateData}
                storageRef={storageRef}
                user={props.user}
                value={data}
              />
            ) : (
              <div className="text-center">
                <Spinner animation="border" role="status">
                  <span className="sr-only">Loading...</span>
                </Spinner>
              </div>
            )
          ) : (
            <p className="text-center text-muted">
              Select a screen from the dropdown
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

Dashboard.propTypes = {
  signOut: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  screens: PropTypes.instanceOf(Map).isRequired,
};

export default Dashboard;
