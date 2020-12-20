/* eslint-disable max-classes-per-file */

function appendArray(element, children) {
  for (let child of children) {
    if (Array.isArray(child)) {
      appendArray(element, child);
    } else {
      if (typeof child === "string") {
        child = document.createTextNode(child);
      }

      element.appendChild(child);
    }
  }
}

function createElement(type, props, ...children) {
  // Create an element, generally from JSX

  if (typeof type === "string") {
    // `type` is a string, so create a normal DOM element
    const element = document.createElement(type);

    appendArray(element, children);

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
  // eslint-disable-next-line babel/new-cap
  const component = new type(props, children);

  if (props && this.refs) {
    // Add the component to the refs
    this.refs[ props.ref ] = component;
  }

  return component.render();
}

class Component {
  constructor(props) {
    // Bind all class methods to `this`
    let { prototype } = this.constructor;

    while (prototype !== Object.prototype) {
      for (const method of Object.getOwnPropertyNames(prototype)) {
        this[ method ] = this[ method ].bind(this);
      }

      // Get the next object in the prototype chain
      prototype = Object.getPrototypeOf(prototype);
    }

    // Start with an empty refs object
    this.refs = {};
    // Let class methods access props
    this.props = props;
    // Create an instance of `createElement` that can access `this`
    this.createElement = createElement;
  }

  render() {
    // Default render function
    return "";
  }
}

class Fragment extends Component {
  constructor(props, children) {
    super(props);
    this.children = children;
  }

  render() {
    return this.children;
  }
}

function render(container, ...elements) {
  // Empty the container, then add all elements to it
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }

  if (elements) {
    appendArray(container, elements);
  }
}

export default {
  Component,
  Fragment,
  createElement,
  render
};
