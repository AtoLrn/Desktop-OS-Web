// import { MainPage } from ".";
import compilerDOM from "../../../jsx-compiler/dom";
import React from "../../../jsx-compiler/jsx";
import { DateAndTime } from "./date-time";
import { General } from "./general";
import { HandleSettings } from "./handleSettings";
import { Security } from "./security";

const panels = [
    // {
    //     id: 'main-page',
    //     element: MainPage
    // },
    {
        id: 'general',
        element: <General/>
    },
    {
        id: 'date-time',
        element: <DateAndTime/>
    },
    {
        id: 'security',
        element: <Security />
    },
    {
        id: 'vibration',
        element: <h1>vibration</h1>
    },
    {
        id: 'network',
        element: <h1>network</h1>
    },
    {
        id: 'handle-settings',
        element: <HandleSettings />
    }
]

export const changePanel = (elementToDisplayId: string | (() => any), elementToHideId: string) => {
    const container = document.getElementById('main-container')
    const elementToHide = document.getElementById(elementToHideId)
    const elementToDisplay = typeof elementToDisplayId === 'string' ? panels.find(panel => panel.id === elementToDisplayId)?.element : elementToDisplayId

    if (!container || !elementToHide || !elementToDisplay) { return }

    container.removeChild(elementToHide)

    compilerDOM.createHtml(container).render(elementToDisplay)
}

export const switchElemDisplay = (value: any, elem: string, callBack?: () => void) => {
    const isChecked = value.target.checked

    if (typeof isChecked === 'boolean') {
        localStorage.setItem(elem, isChecked ? 'true' : 'false')
        if (callBack) { callBack() }
    }
}