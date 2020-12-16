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
      for (const key in action.data) {
        if (
          JSON.stringify(action.data[key]) === JSON.stringify(state.data[key])
        ) {
          action.data[key] = state.data[key];
        }
      }
    }

    return { data: action.data };
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
        slides: [],
      });
    }
  }

  React.useEffect(() => docRef && docRef.onSnapshot(snapshot), [docRef]);

  return state.data;
}

export function useUrls(data, storageRef) {
  const [dataWithUrls, setDataWithUrls] = React.useState([]);

  React.useEffect(() => {
    async function getDownloadUrl(datum) {
      const url = await storageRef.child(datum.name).getDownloadURL();

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
      const url = await storageRef.child(data.name).getDownloadURL();

      setDataWithUrl({ url, ...data });
    }

    if (data.name) {
      getDownloadUrl();
    } else {
      setDataWithUrl(null);
    }
  }, [data, storageRef]);

  return dataWithUrl;
}

export function useDialog(dialogPolyfill) {
  const modal = React.useRef();

  React.useEffect(() => {
    modal.current && dialogPolyfill.registerDialog(modal.current);
  }, [dialogPolyfill]);

  return modal;
}