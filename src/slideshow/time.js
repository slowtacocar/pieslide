import React, { useState, useEffect } from "react";
import CSSModules from "react-css-modules";
import styles from "./Time.module.css";

function Time() {
  const [time, setTime] = useState();

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  });

  return <time styleName="time">{time}</time>;
}

export default CSSModules(Time, styles);
