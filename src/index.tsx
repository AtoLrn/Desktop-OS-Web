import React from "../jsx-compiler/jsx";
import compilerDOM from "../jsx-compiler/dom";
import { App } from "./app";

const rootElement = document.getElementById("root");
if(rootElement !== null) {
    const root = compilerDOM.createHtml(rootElement);
    root.render(<App />);
}