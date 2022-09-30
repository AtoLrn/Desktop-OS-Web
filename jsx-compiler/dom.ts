import { createInnerText, createElement, isComponent } from "./helpers";
import { JSX } from "./jsx";

const compilerDOM = {
  createHtml(htmlElement: HTMLElement) {
    return {
      render(element: JSX.IntrinsicElements) {

        if (typeof element === "string") {
            createInnerText(htmlElement, element);
            return;
        }

        if (typeof element === "array") {
          element.map((child: any) => {
            compilerDOM.createHtml(htmlElement).render(child);
          });
          return;
        }

        if (isComponent(element)) {
          compilerDOM.createHtml(htmlElement).render(element.name({...element.attributes, children: element.children}));
          return;
        }
        const createdElement = createElement(element);

        element.children.map(child => {
          compilerDOM.createHtml(createdElement).render(child);
        });

        htmlElement.appendChild(createdElement);    
      }
    };
  }
};


export default compilerDOM;
