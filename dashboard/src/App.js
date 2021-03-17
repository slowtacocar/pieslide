import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import Spinner from "react-bootstrap/Spinner";
import Dashboard from "./Dashboard";
import isEqual from "lodash/isEqual";
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
  const storageRef = React.useMemo(
    () => user && firebase.storage().ref().child("user").child(user.uid),
    [user]
  );
  const [data, setData] = React.useReducer((state, action) => {
    updateWithRefEqual(state, action);
    return action;
  });

  React.useEffect(() => {
    if (user) {
      return firebase
        .firestore()
        .collection("user")
        .doc(user.uid)
        .onSnapshot((doc) => {
          if (doc.exists) {
            setData(doc.data());
          } else {
            doc.ref.set({
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
            });
          }
        });
    }
  }, [user]);

  React.useEffect(
    () =>
      firebase.auth().onAuthStateChanged((user) => {
        setUser(user);
      }),
    []
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
    firebase.firestore().collection("user").doc(user.uid).update(mergeData);
  }

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
  ) : user ? (
    <Dashboard
      value={data}
      onChange={updateData}
      signOut={signOut}
      storageRef={storageRef}
      user={user}
    />
  ) : (
    <div className="text-center p-3">
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    </div>
  );
}

export default App;
