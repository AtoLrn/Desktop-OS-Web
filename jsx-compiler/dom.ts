import { createInnerText, createElement, isComponent } from "./helpers";
import { JSX } from "./types";

const compilerDOM = {
  createHtml(htmlElement: JSX) {
    return {
      render(element: JSX) {

        if (typeof element === "string") {
            createInnerText(htmlElement, element);
            return;
        }

        if (Array.isArray(element)) {
          element.map((child) => {
            compilerDOM.createHtml(htmlElement).render(child);
          });
          return;
        }

        if (isComponent(element)) {
          compilerDOM.createHtml(htmlElement).render(element.name({...element.attributes, children: element.children}));
          return;
        }

        const createdElement = createElement(element);

        element.children.map((child: JSX) => {
          compilerDOM.createHtml(createdElement).render(child);
        });

        htmlElement.appendChild(createdElement);    
      }
    };
  }
};


export default compilerDOM;
