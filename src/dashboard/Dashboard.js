import React from "react";
import firebase from "../common/firebase";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "./Dashboard.module.css";
import { useAuth, useData } from "../common/hooks";
import Slides from "./Slides";
import Logo from "./Logo";
import Account from "./Account";
import Settings from "./Settings";

function Dashboard() {
  const auth = React.useMemo(() => firebase.auth(), []);
  const firestore = React.useMemo(() => firebase.firestore(), []);
  const storage = React.useMemo(() => firebase.storage(), []);
  const user = useAuth(auth);
  const docRef = React.useMemo(() => (
    user && firestore.collection("user").doc(user.uid)
  ), [firestore, user]);
  const storageRef = React.useMemo(() => (
    user && storage.ref().child("user").child(user.uid)
  ), [storage, user]);
  const data = useData(docRef);

  function signOut() {
    auth.signOut();
  }

  return data ? (
    <div styleName="container">
      <nav styleName="navbar">
        <span styleName="navbarSpan">PieSlide</span>
        <a href="index.html" styleName="navbarLinkActive">Dashboard</a>
        <a href="slideshow.html" target="_blank" styleName="navbarLink">
          Slideshow
        </a>
        <button type="button" onClick={signOut} styleName="navbarButton">
          Sign Out
        </button>
      </nav>

      <nav styleName="sidebar">
        <a href="#slides" styleName="sidebarLinkActive">Slides</a>
        <a href="#logo" styleName="sidebarLink">Logo</a>
        <a href="#slideshowSettings" styleName="sidebarLink">
          Slideshow Settings
        </a>
        <a href="#accountSettings" styleName="sidebarLink">Account Settings</a>
      </nav>

      <div styleName="mainContainer">
        <div styleName="main">
          <Slides
            slides={data.slides}
            duration={data.duration}
            docRef={docRef}
            storageRef={storageRef}
          />
          <Logo logo={data.logo} docRef={docRef} storageRef={storageRef} />
          <Settings
            duration={data.duration}
            news={data.news}
            size={data.size}
            time={data.time}
            transition={data.transition}
            docRef={docRef}
          />
          <Account user={user} />
        </div>
      </div>
    </div>
  ) : null;
}

export default Dashboard;
