import React from "react";

export function useAuth(auth) {
  const [user, setUser] = React.useState();

  function authStateChanged(user) {
    setUser(user);
  }

  React.useEffect(() => auth.onAuthStateChanged(authStateChanged), [auth]);

  if (user === null) {
    location.replace(`login.html?signInSuccessUrl=${location.pathname}`);
  }

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

  return state.data;
}

export function useDialog(dialogPolyfill) {
  const modal = React.useRef();

  React.useEffect(() => {
    if (modal.current) {
      dialogPolyfill.registerDialog(modal.current);
    }
  }, [dialogPolyfill]);

  return modal;
}
