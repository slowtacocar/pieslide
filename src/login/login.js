import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { firebase, auth } from "../common/firebase";

function Login() {
  return (
    <StyledFirebaseAuth uiConfig={{
      "signInFlow": "popup",
      "signInSuccessUrl": "/",
      "signInOptions": [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID
      ]
    }} firebaseAuth={auth}/>
  );
}

export default Login;
