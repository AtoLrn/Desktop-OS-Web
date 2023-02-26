import React from "../../jsx-compiler/jsx";
import "../styles/status-bar.scss" 
import { htmlById, onLoad, reRenderHtml } from "../utils/handleHtml";

export const updateBattery = () => {
    const nav: any = navigator
    if (nav.getBattery)
    nav.getBattery().then((bat: any) => {
        const isBatteryDisplayed = localStorage.getItem('batteryDisplay') === 'true' ? true : false
        const div = document.getElementById('status-battery')

        if (!div) return
        
        const updateFunction = () => {
            div.innerText = `${Math.round(bat.level * 100)}%`
        }

        if (!isBatteryDisplayed) { 
            div.style.display = 'none'
            bat.removeEventListener('levelchange', updateFunction)
            return
        }else {
            div.style.display = 'block'
        }
        
        div.innerText = `${Math.round(bat.level * 100)}%`
        bat.addEventListener('levelchange', updateFunction);
    })
}

export const StatusBar = () => {

    const displayLocalTime = () => {
        const localTimeDiv = document.querySelector('#local-time')
        const localDateDiv = document.querySelector('#local-date')

        const isHoursDisplayed = localStorage.getItem('hoursDisplay') === 'true' ? true : false
        const isMinutesDisplayed = localStorage.getItem('minutesDisplay') === 'true' ? true : false
        const isSecondsDisplayed = localStorage.getItem('secondsDisplay') === 'true' ? true : false

        const isDateDisplayed = localStorage.getItem('dateDisplay') === 'true' ? true : false
        const isDaysDisplayed = localStorage.getItem('daysDisplay') === 'true' ? true : false
        const isMonthDisplayed = localStorage.getItem('monthDisplay') === 'true' ? true : false
        const isYearDisplayed = localStorage.getItem('yearDisplay') === 'true' ? true : false

        const dateOptions = {day: isDaysDisplayed ? 'numeric' : undefined, month: isMonthDisplayed ? 'numeric' : undefined, year: isYearDisplayed ? 'numeric' : undefined } as const

        const localTime = new Date()

        if (localTimeDiv && (isHoursDisplayed || isMinutesDisplayed || isSecondsDisplayed)) {
            localTimeDiv.innerHTML = localTime.toLocaleTimeString([], {hour: isHoursDisplayed ? '2-digit' : undefined, minute: isMinutesDisplayed ? '2-digit' : undefined, second: isSecondsDisplayed ? '2-digit' : undefined})
        }

        if (localDateDiv) {
            if (isDateDisplayed && (isDaysDisplayed || isMonthDisplayed || isYearDisplayed)) {
                localDateDiv.innerHTML = localTime.toLocaleDateString('en-GB', dateOptions)
            } else {
                localDateDiv.innerHTML = ''
            }

        }
    }

    const displayNetworkState = () => {
        if (localStorage.getItem('networkDisplay') !== 'true') {
            htmlById("network-state").style.display = 'none'
            return
        }
        htmlById("network-state").style.display = 'flex'

        const networkTypeDiv = document.getElementById('network-type')
        const networkSpeedDiv = document.getElementById('network-speed')

        const nav: any = navigator

        if (!networkSpeedDiv || !networkTypeDiv || !nav.connection?.effectiveType) return

        networkTypeDiv.innerHTML = nav.connection.effectiveType
        networkSpeedDiv.innerHTML = `${nav.connection.downlink} Mbps`
    }

    const displayVibration = () => {
        const isVibrationDisplayed = localStorage.getItem('vibrationDisplay') === 'true'
        const isVibrationEnabled = localStorage.getItem('vibrationEnabled') === 'true'
        
        const containerVibration = htmlById('vibration-status')
        if (isVibrationDisplayed) {
            containerVibration.style.display = 'block'
            reRenderHtml('vibration-status', <img src={isVibrationEnabled ? "https://www.svgrepo.com/show/334132/mobile-vibration.svg" : "https://www.svgrepo.com/show/391025/mute-notification.svg"} alt="vibration-mode"/>)            
        }else {
            containerVibration.style.display = 'none'
            containerVibration.innerHTML = ""
        }
    }
    
    updateBattery()
    // updateWeather()
    onLoad(displayLocalTime, displayNetworkState, displayVibration)
    setInterval(displayLocalTime, 1000)
    setInterval(displayNetworkState, 1000)

    window.addEventListener('storage', () => {
        displayVibration()
        displayLocalTime()
        displayNetworkState()
    })

    return (
    <nav className='status'>
        <div id='status-battery'></div>
        {/* <div id='status-temp'>
            Fetching...
        </div>
        <div id='status-weather'>
            Fetching...
        </div> */}
        <div id="local-time"></div>
        <div id="local-date"></div>
        <div id="vibration-status"></div>
        <div id="network-state"><div id="network-type"></div><div id="network-speed"></div></div>
    </nav>
    )
}