import { JSX } from "./jsx";

export const createInnerText = (parent: JSX.IntrinsicElements, string: string) => {
    const text = document.createTextNode(string);
    parent.appendChild(text);
}

export const createElement = (element: JSX.IntrinsicElements) => {
    return Object.entries(element.attributes).reduce((newElement, [name, value]) => {

        if (name.startsWith("on")) {
            newElement[name.toLowerCase()] = value;
            return newElement;
        }

        newElement[name] = value;
        return newElement;

    }, document.createElement(element.name))
};

export const isComponent = (el: JSX.IntrinsicElements) => {
    return el.attributes !== undefined 
        && typeof el.name === "function"
}
