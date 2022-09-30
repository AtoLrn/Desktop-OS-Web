export const createInnerText = (parent, string) => {
    const text = document.createTextNode(string);
    parent.appendChild(text);
}

export const createElement = (element) => {
    return Object.entries(element.attributes).reduce((newElement, [name, value]) => {
        console.log(name, value)

        if (name.startsWith("on")) {
            newElement[name.toLowerCase()] = value;
            return newElement;
        }

        newElement[name] = value;
        return newElement;

    }, document.createElement(element.name))
};

export const isComponent = (el) => {
    return el.attributes !== undefined 
        && typeof el.name === "function"
}
