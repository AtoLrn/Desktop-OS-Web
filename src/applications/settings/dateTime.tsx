import React from "../../../jsx-compiler/jsx"
import { BackBtn } from "./backBtn"
import { switchElemDisplay } from "./utils"

export const DateAndTime = () => {
    const isHoursDisplayed = localStorage.getItem('hoursDisplay') === 'true' ? true : false
    const isMinutesDisplayed = localStorage.getItem('minutesDisplay') === 'true' ? true : false
    const isSecondsDisplayed = localStorage.getItem('secondsDisplay') === 'true' ? true : false
    
    const isDateDisplayed = localStorage.getItem('dateDisplay') === 'true' ? true : false
    const isDaysDisplayed = localStorage.getItem('daysDisplay') === 'true' ? true : false
    const isMonthDisplayed = localStorage.getItem('monthDisplay') === 'true' ? true : false
    const isYearDisplayed = localStorage.getItem('yearDisplay') === 'true' ? true : false

    const triggerIsDateDisplayed = (value: any) => {
        const daysInput = document.getElementById("settingsInputDays") as HTMLInputElement
        const monthInput = document.getElementById("settingsInputMonth") as HTMLInputElement
        const yearInput = document.getElementById("settingsInputYear") as HTMLInputElement
       
        if (daysInput && monthInput && yearInput) {
            daysInput.disabled = !value.target.checked
            monthInput.disabled = !value.target.checked
            yearInput.disabled = !value.target.checked
        }
    }
    
    return (
        <section className="settings-container" id="date-time">
            <BackBtn cat={'date-time'} />
            <h1>Date & Time</h1>
            <section className="section-settings">
                    <h2 className="container-checkbox">Time</h2>
                    <div className="container-checkbox">
                        <h4>Display hours </h4>
                        <label className="switch">
                            <input onChange={(value: any) => switchElemDisplay(value, 'hoursDisplay')} checked={isHoursDisplayed} type="checkbox"></input>
                            <span className="slider round"></span>
                        </label>
                    </div>
                    <div className="container-checkbox">
                        <h4>Display minutes </h4>
                        <label className="switch">
                            <input onChange={(value: any) => switchElemDisplay(value, 'minutesDisplay')} checked={isMinutesDisplayed} type="checkbox"></input>
                            <span className="slider round"></span>
                        </label>
                    </div>
                    <div className="container-checkbox">
                        <h4>Display seconds </h4>
                        <label className="switch">
                            <input onChange={(value: any) => switchElemDisplay(value, 'secondsDisplay')} checked={isSecondsDisplayed} type="checkbox"></input>
                            <span className="slider round"></span>
                        </label>
                    </div>
                </section>
                <section className="section-settings">
                    <h2 className="container-checkbox">Date</h2>
                    <div className="container-checkbox">
                        <h4>Display date </h4>
                        <label className="switch">
                            <input onChange={(value: any) =>{ 
                                switchElemDisplay(value, 'dateDisplay')
                                triggerIsDateDisplayed(value)
                                }} checked={isDateDisplayed} type="checkbox"></input>
                            <span className="slider round"></span>
                        </label>
                    </div>
                    <div className="container-checkbox">
                        <h4>Display days </h4>
                        <label className="switch">
                            <input id="settingsInputDays" disabled={!isDateDisplayed} onChange={(value: any) => switchElemDisplay(value, 'daysDisplay')} checked={isDaysDisplayed} type="checkbox"></input>
                            <span className="slider round"></span>
                        </label>
                    </div>
                    <div className="container-checkbox">
                        <h4>Display month </h4>
                        <label className="switch">
                            <input id="settingsInputMonth"  disabled={!isDateDisplayed} onChange={(value: any) => switchElemDisplay(value, 'monthDisplay')} checked={isMonthDisplayed} type="checkbox"></input>
                            <span className="slider round"></span>
                        </label>
                    </div>
                    <div className="container-checkbox">
                        <h4>Display year </h4>
                        <label className="switch">
                            <input id="settingsInputYear" disabled={!isDateDisplayed} onChange={(value: any) => switchElemDisplay(value, 'yearDisplay')} checked={isYearDisplayed} type="checkbox"></input>
                            <span className="slider round"></span>
                        </label>
                    </div>
                </section>
        </section>
    )
}