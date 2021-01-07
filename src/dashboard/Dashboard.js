import React from "react";
import firebase from "../common/firebase";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "./Dashboard.module.css";
import { useAuth, useData } from "../common/hooks";
import Panes from "./Panes";
import Logo from "./Logo";
import Account from "./Account";
import Settings from "./Settings";

function Dashboard() {
  const auth = React.useMemo(() => firebase.auth(), []);
  const firestore = React.useMemo(() => firebase.firestore(), []);
  const user = useAuth(auth);
  const docRef = React.useMemo(
    () => user && firestore.collection("user").doc(user.uid),
    [firestore, user]
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

  return (
    <div styleName="container">
      <nav styleName="navbar">
        <span styleName="navbarSpan">PieSlide</span>
        <a href="index.html" styleName="navbarLinkActive">
          Dashboard
        </a>
        <a href="slideshow.html" target="_blank" styleName="navbarLink">
          Slideshow
        </a>
        <button type="button" onClick={signOut} styleName="navbarButton">
          Sign Out
        </button>
      </nav>

      <nav styleName="sidebar">
        <a href="#panes" styleName="sidebarLinkActive">
          Panes
        </a>
        <a href="#logo" styleName="sidebarLink">
          Logo
        </a>
        <a href="#slideshowSettings" styleName="sidebarLink">
          Slideshow Settings
        </a>
        <a href="#accountSettings" styleName="sidebarLink">
          Account Settings
        </a>
      </nav>

      <div styleName="mainContainer">
        <div styleName="main">
          {data ? (
            <>
              <Panes
                panes={data.panes}
                duration={data.duration}
                onChange={handlePanesChange}
              />
              <Logo value={data.logo} onChange={handleLogoChange} />
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
            <h1 styleName="loading">Loading...</h1>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
