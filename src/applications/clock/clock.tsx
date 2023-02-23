import { Application } from "../index"
import React from "../../../jsx-compiler/jsx";
import '../../styles/apps/clock.scss'
import {Chronometer} from "./chronometer";
import {Timer} from "./timer";

export class Clock extends Application {
    name = 'Clock'
    url = 'https://i.pinimg.com/originals/03/fd/28/03fd284948387458641483ef58822e3c.png'
    backgroundColor = 'white'

    constructor() {
        super();
        setTimeout(this.displayLocalTime, 100)
        setInterval(this.displayLocalTime, 1000)
    }

    changePanel = (elementToDisplay: string) => {
        const elementIds = ['clock', 'chronometer', 'timer']
        elementIds.map((elementId) => {
            const element = document.getElementById(elementId)
            const elementImg = document.getElementById(`img-${elementId}`)
            const elementImgSelected = document.getElementById(`img-${elementId}-selected`)
            if (element && elementImg && elementImgSelected) {
                if (elementId === elementToDisplay) {
                    element.classList.remove("hidden-element")
                    elementImg.classList.add("hidden-element")
                    elementImgSelected.classList.remove("hidden-element")
                } else {
                    element.classList.add("hidden-element")
                    elementImg.classList.remove("hidden-element")
                    elementImgSelected.classList.add("hidden-element")
                }
            }
        })
    }

    displayLocalTime = () => {
        const clockElement = document.querySelector('#clock h1')
        if (clockElement) {
            const localTime = new Date()
            clockElement.innerHTML = localTime.toLocaleTimeString()
        }
    }

    build() {
        const isDarkModeEnabled = localStorage.getItem('darkMode') === 'true' ? true : false

        const clockLogo = !isDarkModeEnabled ? "/button-logo/clock-logo.svg" : "/button-logo/clock-logo-dark-mod.svg"
        const clockLogoSelected = "/button-logo/clock-logo-selected.svg"

        const chronometerLogo = !isDarkModeEnabled ? "/button-logo/chronometer-logo.svg" : "/button-logo/chronometer-logo-dark-mod.svg"
        const chronometerLogoSelected = "/button-logo/chronometer-logo-selected.svg"
        
        const timerLogo = !isDarkModeEnabled ? "/button-logo/timer-logo.svg" : "/button-logo/timer-logo-dark-mod.svg"
        const timerLogoSelected = "/button-logo/timer-logo-selected.svg"


        return super.build(
                <div className='clock-container'>
                    <div className='panels' id="clock">
                        <h1></h1>
                    </div>
                    <Chronometer/>
                    <Timer/>
                    <div className='nav-bar'>
                        <button onClick={() => {this.changePanel('clock')}}><img id="img-clock" className="hidden-element" src={clockLogo} alt="clock"/><img id="img-clock-selected" src={clockLogoSelected} alt="clock-selected"/></button>
                        <button onClick={() => {this.changePanel('chronometer')}}><img id="img-chronometer" src={chronometerLogo} alt="chronometer"/><img id="img-chronometer-selected" className="hidden-element" src={chronometerLogoSelected} alt="chronometer-selected"/></button>
                        <button onClick={() => {this.changePanel('timer')}}><img id="img-timer" src={timerLogo} alt="timer"/><img id="img-timer-selected" className="hidden-element" src={timerLogoSelected} alt="timer-selected"/></button>
                    </div>
                </div>
        )
    }
}

