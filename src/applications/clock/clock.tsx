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
            if (element) {
                if (elementId === elementToDisplay) {
                    element.classList.remove("hidden-element")
                } else {
                    element.classList.add("hidden-element")
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
        return super.build(
                <div className='clock-container'>
                    <div className='panels' id="clock">
                        <h1></h1>
                    </div>
                    <Chronometer/>
                    <Timer/>
                    <div className='nav-bar'>
                        <button onClick={() => {this.changePanel('clock')}}>Horloge</button>
                        <button onClick={() => {this.changePanel('chronometer')}}>Chronomètre</button>
                        <button onClick={() => {this.changePanel('timer')}}>Minuterie</button>
                    </div>
                </div>
        )
    }
}

