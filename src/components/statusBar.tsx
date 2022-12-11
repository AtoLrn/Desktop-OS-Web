import React from "../../jsx-compiler/jsx";
import "../styles/status-bar.scss"

export const StatusBar = () => {

    // need to be modified in the controle center
    const isVibrationEnabled = true

    const updateBattery = () => {
        const nav: any = navigator
        nav.getBattery().then((bat: any) => {
            const div = document.getElementById('status-battery')
            if (!div) return
            div.innerText = `${Math.round(bat.level * 100)}%`
            bat.addEventListener('levelchange', (x: any) => {
                console.log(x)
                div.innerText = `${Math.round(bat.level * 100)}%`
            });
        })
    }

    // const updateWeather = () => {
    //     if (navigator.geolocation) {
    //         navigator.geolocation.getCurrentPosition(async (loc) => {
    //             const { latitude, longitude } = loc.coords
    //             const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${'35f20df55d8f5a1c451cbf8344b6a4ac'}&units=metric`)
    //             const data = await res.json()
    //             console.log()
    //             const div = document.getElementById('status-temp')
    //             if (!div) return
    //             div.innerText = `${Math.round(data.main.temp)}°C`

    //             const divWeather = document.getElementById('status-weather')
    //             if (!divWeather) return
    //             divWeather.innerText = `${data.weather[0].main}`
    //         });
    //       } else {
    //       }
    //     console.log('fetching weather')
    // }

    // const toggleThemeMode = () => {
    //     if(document.body) {
    //         document.body.classList.toggle('darkmode')
    //         const el = document.getElementById('darkmode')
    //         if(el) el.innerText = document.body.classList.contains('darkmode') ? "dark: ON" : "dark: OFF"
    //     }
    // } 

    const displayLocalTime = () => {
        const localTimeDiv = document.querySelector('#local-time')
        const localDateDiv = document.querySelector('#local-date')

        const localTime = new Date()

        if (localTimeDiv) {
            localTimeDiv.innerHTML = localTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
        }

        if (localDateDiv) {
            localDateDiv.innerHTML = localTime.toLocaleDateString()

        }
    }

    const displayNetworkState = () => {
        const networkTypeDiv = document.getElementById('network-type')
        const networkSpeedDiv = document.getElementById('network-speed')
        if (!networkSpeedDiv || !networkTypeDiv) return

        const nav: any = navigator
        networkTypeDiv.innerHTML = nav.connection.effectiveType
        networkSpeedDiv.innerHTML = `${nav.connection.downlink} Mbps`
    }

    updateBattery()
    // updateWeather()
    setInterval(displayLocalTime, 1000)
    setInterval(displayNetworkState, 1000)

    return (
    <nav className='status'>
        <div id='status-battery'>
            searching...
        </div>
        {/* <div id='status-temp'>
            Fetching...
        </div>
        <div id='status-weather'>
            Fetching...
        </div>
        <div id="darkmode" onClick={toggleThemeMode}>
            dark: OFF
        </div> */}
        <div id="local-time"></div>
        <div id="local-date"></div>
        <div id="network-state"><div id="network-type"></div><div id="network-speed"></div></div>
        {isVibrationEnabled ? <div><img src="https://www.svgrepo.com/show/334132/mobile-vibration.svg" alt="vibration-mode" /></div> : <div></div>}
    </nav>
    )
}