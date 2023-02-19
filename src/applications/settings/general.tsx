import { toggleThemeMode } from "..";
import React from "../../../jsx-compiler/jsx";
import { updateBattery } from "../../components/statusBar";
import { BackBtn } from "./backBtn"
import { switchElemDisplay } from "./utils";

export const General = () => {
    const isBatteryDisplayed = localStorage.getItem('batteryDisplay') === 'true' ? true : false
    const isDarkModeEnabled = localStorage.getItem('darkMode') === 'true' ? true : false

    return (
        <section className="settings-container" id="general">
            <BackBtn cat={'general'} />
            <h1>General</h1>
            <section className="section-settings">
                <div className="container-checkbox">
                    <h3>Battery display</h3>
                    <label className="switch">
                        <input onChange={(value: any) => {switchElemDisplay(value, 'batteryDisplay', updateBattery)}} checked={isBatteryDisplayed} type="checkbox"></input>
                        <span className="slider round"></span>
                    </label>
                </div>
                <div className="container-checkbox">
                    <h3>Dark Mode</h3>
                    <label className="switch">
                        <input onChange={(value: any) => {switchElemDisplay(value, 'darkMode', toggleThemeMode)}} checked={isDarkModeEnabled} type="checkbox"></input>
                        <span className="slider round"></span>
                    </label>
                </div>
            </section>
        </section>
    )
}
