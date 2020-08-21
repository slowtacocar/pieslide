import React, { useState, useEffect } from "react";
import { auth } from "../common/firebase";
import Slideshow from "./Slideshow";

function AuthController() {
  const [user, setUser] = useState();

  useEffect(() => auth.onAuthStateChanged(setUser), []);

  if (user === null) {
    window.location.replace("login.html?signInSuccessUrl=slideshow.html");
  } else if (user) {
    return <Slideshow user={user} />;
  }
  return null;
}

export default AuthController;
