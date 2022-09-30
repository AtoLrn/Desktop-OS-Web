import React from "./jsx-compiler/jsx.js";
import compilerDOM from "./jsx-compiler/dom.js";
import { App } from "./src/app";

const rootElement = document.getElementById("root");
const root = compilerDOM.createHtml(rootElement);
root.render(<App />);