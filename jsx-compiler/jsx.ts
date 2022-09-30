const React = {
    createElement(name: string, attributes = {}, ...children: any[]) {
      return {
        name,
        attributes: typeof attributes === "object" && attributes !== null ? attributes : {},
        children
      };
    }
};

export default React;

export declare namespace JSX {
  export interface IntrinsicElements {
    [elemName: string]: any;
  }
}
  
  