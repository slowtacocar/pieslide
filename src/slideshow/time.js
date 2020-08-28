import React from "react";
import "./Time.module.css";

function Time() {
  function reducer() {
    const date = new Date();

    return { "time": date.toLocaleTimeString() };
  }

  const [state, dispatch] = React.useReducer(reducer, undefined, reducer);

  React.useEffect(() => {
    const interval = setInterval(() => {
      dispatch();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return <p styleName="time">{state.time}</p>;
}

export default Time;
