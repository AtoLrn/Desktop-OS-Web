// import { MainPage } from ".";
import compilerDOM from "../../../jsx-compiler/dom";
import React from "../../../jsx-compiler/jsx";
import { makeVibration } from "../../utils/handleVibration";
import { DateAndTime } from "./dateTime";
import { General } from "./general";
import { HandleSettings } from "./handleSettings";
import { Networks } from "./networks";
import { Security } from "./security";
import { Vibration } from "./vibration";

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
        element: <Vibration />
    },
    {
        id: 'networks',
        element: <Networks />
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
    makeVibration(0.1)
    const isChecked = value.target.checked

    if (typeof isChecked === 'boolean') {
        localStorage.setItem(elem, isChecked ? 'true' : 'false')
        window.dispatchEvent( new Event('storage') ) // <----- 
        if (callBack) { callBack() }
    }
}