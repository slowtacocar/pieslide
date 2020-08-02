function createElement(type, props, ...children) {
  // Create an element, generally from JSX

  if (typeof type === "string") {
    // `type` is a string, so create a normal DOM element
    const element = document.createElement(type);

    element.append(...children);

    for (const prop in props) {
      if (prop === "ref") {
        // `prop` is a string ref, add it to the `this.refs`
        this.refs[ props.ref ] = element;
      } else if (prop in element) {
        // `prop` has a property in the DOM element, set it
        element[ prop ] = props[ prop ];
      } else {
        // `prop` does not have a DOM element property, use `setAttribute`
        element.setAttribute(prop, props[ prop ]);
      }
    }

    return element;
  }
  // `type` is a component, so render it

  const component = new type(props); // eslint-disable-line babel/new-cap

  if (props && this.refs) {
    // Add the component to the refs
    this.refs[ props.ref ] = component;
  }

  return component.render();
}

class Component {
  constructor(props) {
    // Bind all class methods to `this`
    let obj = this.constructor.prototype;

    while (obj !== Object.prototype) {
      for (const prop of Object.getOwnPropertyNames(obj)) {
        this[ prop ] = this[ prop ].bind(this);
      }

      // Get the next object in the prototype chain
      obj = Object.getPrototypeOf(obj);
    }

    // Start with an empty refs object
    this.refs = {};
    // Let class methods access props
    this.props = props;
    // Create an instance of `createElement` that can access `this`
    this.createElement = createElement;
  }
}

function render(container, ...element) {
  // Empty the container, then add all elements to it
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }

  if (element) {
    container.append(...element);
  }
}

export default {
  Component,
  createElement,
  render
};
