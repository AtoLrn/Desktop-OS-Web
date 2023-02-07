import { MainPage } from ".";
import { toggleThemeMode } from "..";
import React from "../../../jsx-compiler/jsx";
import { updateBattery } from "../../components/statusBar";
import { changePanel, switchElemDisplay } from "./utils";

export const General = () => {
    const isBatteryDisplayed = localStorage.getItem('batteryDisplay') === 'true' ? true : false
    const isDarkModeEnabled = localStorage.getItem('darkMode') === 'true' ? true : false

    return (
        <section className="settings-container" id="general">
            <button onClick={() => {changePanel(<MainPage/>, 'general')}}>lala</button>
            <h1>General</h1>
            <div>
                <section>
                    <h3>Battery display</h3>
                    <label className="switch">
                        <input onChange={(value: any) => {switchElemDisplay(value, 'batteryDisplay', updateBattery)}} checked={isBatteryDisplayed} type="checkbox"></input>
                        <span className="slider round"></span>
                    </label>
                </section>
                <section>
                    <h3>Dark Mode</h3>
                    <label className="switch">
                        <input onChange={(value: any) => {switchElemDisplay(value, 'darkMode', toggleThemeMode)}} checked={isDarkModeEnabled} type="checkbox"></input>
                        <span className="slider round"></span>
                    </label>
                </section>
            </div>
        </section>
    )
}
