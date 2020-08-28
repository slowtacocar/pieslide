import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "../common/firebase";
import "firebase/auth";

function Login() {
  const uiConfig = {
    "signInFlow": "popup",
    "signInSuccessUrl": "/",
    "signInOptions": [
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ]
  };

  const auth = firebase.auth();

  return (
    <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth}/>
  );
}

export default Login;
