import React from "../../../jsx-compiler/jsx"
import { BackBtn } from "./backBtn"
import { switchElemDisplay } from "./utils"

export const Networks = () => {
    const isNetworkDisplayed = localStorage.getItem('networkDisplay') === 'true' ? true : false
    
    return (
        <section className="settings-container" id="networks">
            <BackBtn cat={'networks'} />
            <h1>Networks</h1>
            <section className="section-settings">
                    <h2 className="container-checkbox">Display</h2>
                    <div className="container-checkbox">
                        <h4>display network </h4>
                        <label className="switch">
                            <input onChange={(value: any) => switchElemDisplay(value, 'networkDisplay')} checked={isNetworkDisplayed} type="checkbox"></input>
                            <span className="slider round"></span>
                        </label>
                    </div>
                </section>
        </section>
    )
}