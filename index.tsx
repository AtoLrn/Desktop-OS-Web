import React from "./jsx-compiler/jsx";
import compilerDOM from "./jsx-compiler/dom";
import { App } from "./src/app";
namespace JSX {
    export type Element = any;
    export interface IntrinsicElements {
      [elemName: string]: any;
    }
}

const rootElement = document.getElementById("root");
if(rootElement !== null) {
    const root = compilerDOM.createHtml(rootElement);
    root.render(<App />);
}