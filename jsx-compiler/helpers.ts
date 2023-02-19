import { JSX } from "./types";

export const createInnerText = (parent: JSX, string: string) => {
    const text = document.createTextNode(string);
    parent.appendChild(text);
}

export const createElement = (element: JSX) => {
    return Object.entries(element.attributes).reduce((newElement, [name, value]) => {

        if (name === 'clipPath') {
            newElement['clip-path'] = value  
            return newElement;
        }

        if (name === 'style') {
            // @ts-expect-error style always object
            Object.entries(value).forEach(([cssProperty, cssValue]) => { 
                newElement.style[cssProperty] = cssValue
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
    return el !== null
        && el.attributes !== undefined 
        && typeof el.name === "function"
}
