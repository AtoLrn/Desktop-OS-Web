import React from "../../jsx-compiler/jsx";
import "../styles/status-bar.scss" 
import { handleLock } from "../utils/handleLock";

export const updateBattery = () => {
    const nav: any = navigator
    nav.getBattery().then((bat: any) => {
        const isBatteryDisplayed = localStorage.getItem('batteryDisplay') === 'true' ? true : false
        const div = document.getElementById('status-battery')

        if (!div) return
        
        const updateFunction = (x: any) => {
            console.log(x)
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

export const StatusBar = ({ reRenderApp } : { reRenderApp: (lock?: boolean) => void }) => {

    // need to be modified in the controle center
    const isVibrationEnabled = true

    // const updateWeather = () => {
    //     if (navigator.geolocation) {
    //         navigator.geolocation.getCurrentPosition(async (loc) => {
    //             const { latitude, longitude } = loc.coords
    //             const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${'35f20df55d8f5a1c451cbf8344b6a4ac'}&units=metric`)
    //             const data = await res.json()
    //             const div = document.getElementById('status-temp')
    //             if (!div) return
    //             div.innerText = `${Math.round(data.main.temp)}°C`

    //             const divWeather = document.getElementById('status-weather')
    //             if (!divWeather) return
    //             divWeather.innerText = `${data.weather[0].main}`
    //         });
    //       } else {
    //       }
    // }

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

        if (localTimeDiv) {
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
        const networkTypeDiv = document.getElementById('network-type')
        const networkSpeedDiv = document.getElementById('network-speed')

        const nav: any = navigator

        if (!networkSpeedDiv || !networkTypeDiv || !nav.connection?.effectiveType) return

        networkTypeDiv.innerHTML = nav.connection.effectiveType
        networkSpeedDiv.innerHTML = `${nav.connection.downlink} Mbps`
    }
    
    updateBattery()
    // updateWeather()
    setInterval(displayLocalTime, 1000)
    setInterval(displayNetworkState, 1000)

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
        {isVibrationEnabled ? <div id="vibration-status"><img src="https://www.svgrepo.com/show/334132/mobile-vibration.svg" alt="vibration-mode"/></div> : <div></div>}
        <div id="network-state"><div id="network-type"></div><div id="network-speed"></div></div>
        <div id="lock" onClick={() => { handleLock.lock(); reRenderApp(true) }}> Lock </div>
    </nav>
    )
}