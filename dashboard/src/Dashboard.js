import React from "react";
import { uiConfig, firebase, useAuth, useData } from "@pieslide/common";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import Panes from "./Panes";
import Logo from "./Logo";
import Account from "./Account";
import Settings from "./Settings";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import Spinner from "react-bootstrap/Spinner";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";

function Dashboard() {
  const auth = React.useMemo(() => firebase.auth(), []);
  const firestore = React.useMemo(() => firebase.firestore(), []);
  const storage = React.useMemo(() => firebase.storage(), []);
  const user = useAuth(auth);
  const docRef = React.useMemo(
    () => user && firestore.collection("user").doc(user.uid),
    [firestore, user]
  );
  const storageRef = React.useMemo(
    () => user && storage.ref().child("user").child(user.uid),
    [storage, user]
  );
  const data = useData(docRef);

  function signOut() {
    auth.signOut();
  }

  function handleDurationChange(value) {
    docRef.update({ duration: value });
  }

  function handleNewsChange(value) {
    docRef.update({ news: value });
  }

  function handleSizeChange(value) {
    docRef.update({ size: value });
  }

  function handleTimeChange(value) {
    docRef.update({ time: value });
  }

  function handleTransitionChange(value) {
    docRef.update({ transition: value });
  }

  function handleMessageChange(value) {
    docRef.update({ message: value });
  }

  function handleLogoChange(value) {
    docRef.update({ logo: value });
  }

  function handlePanesChange(value) {
    docRef.update({ panes: value });
  }

  return user || user === 0 ? (
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
                href="https://slideshow-pieslide.web.app/"
                target="_blank"
              >
                Slideshow
              </Nav.Link>
            </Nav>
            <Button variant="outline-light" onClick={signOut}>
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
          {data && user !== 0 ? (
            <>
              <Panes
                panes={data.panes}
                duration={data.duration}
                storageRef={storageRef}
                onChange={handlePanesChange}
              />
              <Logo
                value={data.logo}
                storageRef={storageRef}
                onChange={handleLogoChange}
              />
              <Settings
                duration={data.duration}
                news={data.news}
                size={data.size}
                time={data.time}
                transition={data.transition}
                onDurationChange={handleDurationChange}
                onNewsChange={handleNewsChange}
                onSizeChange={handleSizeChange}
                onTimeChange={handleTimeChange}
                onTransitionChange={handleTransitionChange}
                onMessageChange={handleMessageChange}
              />
              <Account user={user} />
            </>
          ) : (
            <div className="text-center">
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            </div>
          )}
        </div>
      </div>
    </div>
  ) : (
    <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
  );
}

export default Dashboard;
