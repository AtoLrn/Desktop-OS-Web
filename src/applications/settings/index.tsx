import React from "../../../jsx-compiler/jsx";

import { Application } from "..";

import '../../styles/apps/settings.scss'
import { changePanel } from "./utils";

export const MainPage = () => {
    return (
        <section className="settings-container" id="main-page">
            <h1>Settings</h1>
            <div>
                <button onClick={() => {changePanel('general', 'main-page')}}><div id="general"><h3>General</h3></div></button>
                <button onClick={() => {changePanel('date-time', 'main-page')}}><div id="dateAndTime"><h3>Date & Time</h3></div></button>
                <button><div id="vibration"><h3>Vibration</h3></div></button>
                <button><div id="network"><h3>Network</h3></div></button>
            </div>
        </section>
    )
}
    

export class Settings extends Application {
    name = 'Settings'
    url = 'https://developer.apple.com/design/human-interface-guidelines/foundations/app-icons/images/icon-and-image-large-icon-settings_2x.png'
    backgroundColor = 'white'

    constructor() {
        super();
    }

    build() {
        return super.build(
            <div id="main-container">
                <MainPage/>
            </div>
        )
    }
}
