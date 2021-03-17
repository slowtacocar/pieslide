import React from "react";
import PropTypes from "prop-types";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";

function Embed(props) {
  function handleChange(event) {
    props.onChange(event.target.value);
  }

  return (
    <InputGroup>
      <InputGroup.Prepend>
        <InputGroup.Text id="inputGroupEmbed">
          Website Embed Link
        </InputGroup.Text>
      </InputGroup.Prepend>
      <FormControl
        aria-labelledby="inputGroupEmbed"
        onChange={handleChange}
        min="0"
        step="any"
        value={props.value}
      />
    </InputGroup>
  );
}

Embed.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Embed;
