import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "../common/firebase";
import "firebase/auth";

function Login() {
  return (
    <StyledFirebaseAuth uiConfig={{
      "signInFlow": "popup",
      "signInSuccessUrl": "/",
      "signInOptions": [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID
      ]
    }} firebaseAuth={firebase.auth()}/>
  );
}

export default Login;
