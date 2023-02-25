import React from "../../../jsx-compiler/jsx"
import { BackBtn } from "./backBtn"
import { switchElemDisplay } from "./utils"

export const Vibration = () => {
    const isVibrationDisplay = localStorage.getItem('vibrationDisplay') === 'true' ? true : false
    const isVibrationEnabled = localStorage.getItem('vibrationEnabled') === 'true' ? true : false

    const toggleCheckBox = (value: any) => {
        switchElemDisplay(value, 'vibrationEnabled')
    }
    
    return (
        <section className="settings-container" id="vibration">
            <BackBtn cat={'vibration'} />
            <h1>Vibration</h1>
            <section className="section-settings">
                    <h2 className="container-checkbox">Vibration</h2>
                    <div className="container-checkbox">
                        <h4> display status vibration </h4>
                        <label className="switch">
                            <input onChange={(value: any) => { switchElemDisplay(value, 'vibrationDisplay') }} checked={isVibrationDisplay} type="checkbox"></input>
                            <span className="slider round"></span>
                        </label>
                    </div>
                    <div className="container-checkbox">
                        <h4> enabled vibration </h4>
                        <label className="switch">
                            <input onChange={toggleCheckBox} checked={isVibrationEnabled} type="checkbox"></input>
                            <span className="slider round"></span>
                        </label>
                    </div>
                </section>
        </section>
    )
}