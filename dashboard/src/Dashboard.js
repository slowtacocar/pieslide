import React from "react";
import Panes from "./Panes";
import Logo from "./Logo";
import Account from "./Account";
import Settings from "./Settings";
import Spinner from "react-bootstrap/Spinner";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";

function Dashboard(props) {
  function handleDurationChange(value) {
    props.onChange({ duration: value });
  }

  function handleNewsChange(value) {
    props.onChange({ news: value });
  }

  function handleSizeChange(value) {
    props.onChange({ size: value });
  }

  function handleTimeChange(value) {
    props.onChange({ time: value });
  }

  function handleTransitionChange(value) {
    props.onChange({ transition: value });
  }

  function handleMessageChange(value) {
    props.onChange({ message: value });
  }

  function handleLogoChange(value) {
    props.onChange({ logo: value });
  }

  function handlePanesChange(value) {
    props.onChange({ panes: value });
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
                href="https://slideshow-pieslide.web.app/"
                target="_blank"
              >
                Slideshow
              </Nav.Link>
            </Nav>
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
          {props.value ? (
            <>
              <Panes
                panes={props.value.panes}
                duration={props.value.duration}
                storageRef={props.storageRef}
                onChange={handlePanesChange}
              />
              <Logo
                value={props.value.logo}
                storageRef={props.storageRef}
                onChange={handleLogoChange}
              />
              <Settings
                duration={props.value.duration}
                news={props.value.news}
                size={props.value.size}
                time={props.value.time}
                transition={props.value.transition}
                onDurationChange={handleDurationChange}
                onNewsChange={handleNewsChange}
                onSizeChange={handleSizeChange}
                onTimeChange={handleTimeChange}
                onTransitionChange={handleTransitionChange}
                onMessageChange={handleMessageChange}
              />
              <Account user={props.user} />
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
  );
}

Dashboard.propTypes = {
  value: PropTypes.shape({
    panes: PropTypes.arrayOf(
      PropTypes.shape({
        rowStart: PropTypes.number.isRequired,
        rowEnd: PropTypes.number.isRequired,
        columnStart: PropTypes.number.isRequired,
        columnEnd: PropTypes.number.isRequired,
        embed: PropTypes.string,
        slides: PropTypes.arrayOf(
          PropTypes.shape({
            name: PropTypes.string.isRequired,
            duration: PropTypes.number.isRequired,
            timestamp: PropTypes.number.isRequired,
          })
        ),
        timestamp: PropTypes.number.isRequired,
      })
    ).isRequired,
    duration: PropTypes.number.isRequired,
    news: PropTypes.arrayOf(PropTypes.string).isRequired,
    size: PropTypes.number.isRequired,
    time: PropTypes.bool.isRequired,
    transition: PropTypes.number.isRequired,
    logo: PropTypes.shape({
      name: PropTypes.string.isRequired,
      timestamp: PropTypes.number.isRequired,
    }),
  }),
  onChange: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
  storageRef: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

export default Dashboard;
