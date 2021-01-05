import React from "react";
import PropTypes from "prop-types";
import "./Embed.module.css";

function Embed(props) {
  function handleChange(event) {
    props.onChange(event.target.value);
  }

  return (
    <div styleName="form">
      <label htmlFor="inputGroupEmbed">Website Embed Link</label>
      <input
        type="text"
        id="inputGroupEmbed"
        onChange={handleChange}
        min="0"
        step="any"
        value={props.value}
      />
    </div>
  );
}

Embed.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Embed;
