import { MainPage } from "."
import React from "../../../jsx-compiler/jsx"
import { changePanel, switchElemDisplay } from "./utils"

export const DateAndTime = () => {
    const isHoursDisplayed = localStorage.getItem('hoursDisplay') === 'true' ? true : false
    const isMinutesDisplayed = localStorage.getItem('minutesDisplay') === 'true' ? true : false
    const isSecondsDisplayed = localStorage.getItem('secondsDisplay') === 'true' ? true : false
    
    return (
        <section className="settings-container" id="date-time">
            <button onClick={() => {changePanel(<MainPage/>, 'date-time')}}>lala</button>
            <h1>Date & Time</h1>
            <div>
                <section>
                    <h3>Time</h3>
                    <div>
                        <h4>Display hours: </h4>
                        <label className="switch">
                            <input onChange={(value: any) => switchElemDisplay(value, 'hoursDisplay')} checked={isHoursDisplayed} type="checkbox"></input>
                            <span className="slider round"></span>
                        </label>
                    </div>
                    <div>
                        <h4>Display minutes: </h4>
                        <label className="switch">
                            <input onChange={(value: any) => switchElemDisplay(value, 'minutesDisplay')} checked={isMinutesDisplayed} type="checkbox"></input>
                            <span className="slider round"></span>
                        </label>
                    </div>
                    <div>
                        <h4>Display seconds: </h4>
                        <label className="switch">
                            <input onChange={(value: any) => switchElemDisplay(value, 'secondsDisplay')} checked={isSecondsDisplayed} type="checkbox"></input>
                            <span className="slider round"></span>
                        </label>
                    </div>
                </section>
            </div>
        </section>
    )
}