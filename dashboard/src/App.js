import React, { useState } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import Spinner from "react-bootstrap/Spinner";
import Dashboard from "./Dashboard";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

firebase.initializeApp({
  apiKey: "AIzaSyCqXsPnGH_BoUDap1nxMSZX7WdOHs0tQFA",
  appId: "1:15324979686:web:d7910cad504253a3c97627",
  authDomain: "pieslide.firebaseapp.com",
  databaseURL: "https://pieslide.firebaseio.com",
  measurementId: "G-DMN7G5ZM1Q",
  messagingSenderId: "15324979686",
  projectId: "pieslide",
  storageBucket: "pieslide.appspot.com",
});

function App() {
  const [user, setUser] = React.useState();
  const [screens, setScreens] = useState();

  React.useEffect(
    () =>
      firebase.auth().onAuthStateChanged((user) => {
        setUser(user);
      }),
    []
  );

  React.useEffect(() => {
    if (user) {
      return firebase
        .firestore()
        .collection("user")
        .doc(user.uid)
        .onSnapshot((data) => {
          if (data.get("screens")) {
            setScreens(new Map(Object.entries(data.get("screens"))));
          } else {
            setScreens(new Map([["0", "First Screen"]]));
          }
        });
    }
  }, [user]);

  function signOut() {
    firebase.auth().signOut();
  }

  return user === null ? (
    <StyledFirebaseAuth
      uiConfig={{
        signInFlow: "popup",
        signInOptions: [
          firebase.auth.EmailAuthProvider.PROVIDER_ID,
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        ],
        callbacks: {
          signInSuccessWithAuthResult: () => false,
        },
      }}
      firebaseAuth={firebase.auth()}
    />
  ) : user && screens ? (
    <Dashboard signOut={signOut} user={user} screens={screens} />
  ) : screens === null ? (
    <p className="text-center text-muted">You have no screens registered.</p>
  ) : (
    <div className="text-center p-3">
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    </div>
  );
}

export default App;
