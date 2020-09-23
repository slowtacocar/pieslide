import React from "react";
import ReactDOM from "react-dom";
import "./index.module.css";
import Dashboard from "./Dashboard";

// TODO: Remove this once all users have updated their slideshow link
if (new URLSearchParams(location.search).get("redir") === "slideshow.html") {
  location.replace("slideshow.html");
}

ReactDOM.render(<Dashboard />, document.getElementById("root"));
