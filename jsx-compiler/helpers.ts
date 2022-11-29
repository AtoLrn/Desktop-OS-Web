import { JSX } from "./types";

export const createInnerText = (parent: JSX, string: string) => {
    const text = document.createTextNode(string);
    parent.appendChild(text);
}

export const createElement = (element: JSX) => {
    return Object.entries(element.attributes).reduce((newElement, [name, value]) => {

        if (name === 'style') {
            Object.entries(value).forEach(([cssName, cssValue]) => {
                newElement.style[cssName] = cssValue
            })
            return newElement;
        }

        if (name.startsWith("on")) {
            newElement[name.toLowerCase()] = value;
            return newElement;
        }

        newElement[name] = value;
        return newElement;

    }, document.createElement(element.name))
};

export const isComponent = (el: JSX) => {
    return el.attributes !== undefined 
        && typeof el.name === "function"
}
