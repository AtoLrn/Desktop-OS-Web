const React = {
    createElement(name, attributes = {}, ...children) {
      return {
        name,
        attributes: typeof attributes === "object" && attributes !== null ? attributes : {},
        children
      };
    }
  };
  
export default React;
  