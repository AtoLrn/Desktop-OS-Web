import React from "../../../jsx-compiler/jsx"
import { BackBtn } from "./backBtn"
import { switchElemDisplay } from "./utils"

export const Vibration = () => {
    const isVibrationEnabled = localStorage.getItem('vibrationEnabled') === 'true' ? true : false
    
    return (
        <section className="settings-container" id="vibration">
            <BackBtn cat={'vibration'} />
            <h1>Vibration</h1>
            <section className="section-settings">
                    <h2 className="container-checkbox">Vibration</h2>
                    <div className="container-checkbox">
                        <h4> vibration mode </h4>
                        <label className="switch">
                            <input onChange={(value: any) => switchElemDisplay(value, 'vibrationEnabled')} checked={isVibrationEnabled} type="checkbox"></input>
                            <span className="slider round"></span>
                        </label>
                    </div>
                </section>
        </section>
    )
}