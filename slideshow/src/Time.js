import React from "react";
import "./Time.css";

function Time() {
  function reducer() {
    const date = new Date();

    return { time: date.toLocaleTimeString() };
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

  return <p className="pill font-size-1 time">{state.time}</p>;
}

export default Time;
