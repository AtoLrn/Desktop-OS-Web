import React from "../../jsx-compiler/jsx";


export const StatusBar = () => {

    const updateBattery = () => {
        navigator.getBattery().then((bat) => {
            const div = document.getElementById('status-battery')
            if (!div) return
            div.innerText = `${Math.round(bat.level * 100)}%`
            bat.addEventListener('levelchange', (x) => {
                console.log(x)
                div.innerText = `${Math.round(bat.level * 100)}%`
            });
        })
    }

    const updateWeather = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (loc) => {
                const { latitude, longitude } = loc.coords
                const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${'35f20df55d8f5a1c451cbf8344b6a4ac'}&units=metric`)
                const data = await res.json()
                console.log()
                const div = document.getElementById('status-temp')
                if (!div) return
                div.innerText = `${Math.round(data.main.temp)}°C`

                const divWeather = document.getElementById('status-weather')
                if (!divWeather) return
                divWeather.innerText = `${data.weather[0].main}`
            });
          } else {
          }
        console.log('fetching weather')
    }

    updateBattery()
    updateWeather()


    return (
    <nav className='status'>
        <div id='status-battery'>
            searching...
        </div>
        <div id='status-temp'>
            Fetching...
        </div>
        <div id='status-weather'>
            Fetching...
        </div>
    </nav>
    )
}