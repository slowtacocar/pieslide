import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";

ReactDOM.render(<App />, document.getElementById("root"));

reportWebVitals();
