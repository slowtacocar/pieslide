import React from "react";
import PropTypes from "prop-types";
import "./Tabs.module.css";

function Tabs(props) {
  const [selected, setSelected] = React.useState(0);

  return (
    <>
      <div>
        {props.children.map((tab, index) => (
          <button
            styleName={selected === index ? "selectedTab" : "tab"}
            key={tab.id}
            onClick={() => {
              setSelected(index);
            }}
          >
            {tab.name}
          </button>
        ))}
      </div>
      <div styleName="container">
        {props.children[selected] && props.children[selected].node}
      </div>
    </>
  );
}

Tabs.propTypes = {
  children: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.any.isRequired,
      node: PropTypes.node.isRequired,
    })
  ),
};

export default Tabs;
