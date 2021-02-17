import React from "react";
import firebase from "firebase/app";
import "firebase/auth";

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

export { firebase };

export const uiConfig = {
  signInFlow: "popup",
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  ],
  callbacks: {
    signInSuccessWithAuthResult: () => false,
  },
};

export function useAuth(auth) {
  const [user, setUser] = React.useState(0);

  function authStateChanged(user) {
    setUser(user);
  }

  React.useEffect(() => auth.onAuthStateChanged(authStateChanged), [auth]);

  return user;
}

export function useData(docRef) {
  function reducer(state, action) {
    if (state.data) {
      const data = {};
      for (const key in action.data) {
        const actionString = JSON.stringify(action.data[key]);
        const stateString = JSON.stringify(state.data[key]);
        if (actionString === stateString) {
          data[key] = state.data[key];
        } else {
          data[key] = action.data[key];
        }
      }
      return { data };
    } else {
      return { data: action.data };
    }
  }

  const [state, dispatch] = React.useReducer(reducer, {});

  function snapshot(doc) {
    if (doc.exists) {
      dispatch({ data: doc.data() });
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
  }

  React.useEffect(() => {
    if (docRef) {
      return docRef.onSnapshot(snapshot);
    }
  }, [docRef]);

  function setData(data) {
    dispatch({ data: { ...state.data, ...data } });
    docRef.update(data);
  }
  console.log(state);
  return [state.data, setData];
}

export function useUrls(data, storageRef) {
  const [dataWithUrls, setDataWithUrls] = React.useState([]);

  React.useEffect(() => {
    async function getDownloadUrl(datum) {
      const url = await storageRef
        .child(datum.timestamp.toString())
        .getDownloadURL();

      return { url, ...datum };
    }

    async function getDownloadUrls() {
      setDataWithUrls(await Promise.all(data.map(getDownloadUrl)));
    }

    getDownloadUrls();
  }, [data, storageRef]);

  return dataWithUrls;
}

export function useUrl(data, storageRef) {
  const [dataWithUrl, setDataWithUrl] = React.useState();

  React.useEffect(() => {
    async function getDownloadUrl() {
      const url = await storageRef
        .child(data.timestamp.toString())
        .getDownloadURL();

      setDataWithUrl({ url, ...data });
    }

    if (data) {
      getDownloadUrl();
    } else {
      setDataWithUrl(null);
    }
  }, [data, storageRef]);

  return dataWithUrl;
}
