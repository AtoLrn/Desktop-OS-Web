import React from "../../../jsx-compiler/jsx";

export const Chronometer = () => {
    let milliseconds = 0

    let chronometerInterval = 0
    let laps: number[] = []

    const formatWatch = (value: number) => {
        const chronometerDate = new Date(value)
        return ('0' + chronometerDate.getUTCHours()).slice(-2) + ':' +
            ('0' + chronometerDate.getUTCMinutes()).slice(-2) + ':' +
            ('0' + chronometerDate.getUTCSeconds()).slice(-2) + ':' +
            ('0' + chronometerDate.getUTCMilliseconds()).slice(-3, -1)
    }

    const startChronometer = () => {
        const watchDiv = document.getElementById('watch')

        if (watchDiv) {
            milliseconds += 10
            watchDiv.innerHTML = formatWatch(milliseconds)
        }
    }

    const onStartChronometer = () => {
        const startButton = document.getElementById('startChronometerButton')
        const setLapButton = document.getElementById('lapChronometerButton')
        if (startButton) {
            clearInterval(chronometerInterval)
            chronometerInterval = setInterval(startChronometer, 10);

            if (setLapButton) {
                startButton.classList.add('hidden-element')
                setLapButton.classList.remove('hidden-element')
            }
        }
    }

    const onStopChronometer = () => {
        const startButton = document.getElementById('startChronometerButton')
        const setLapButton = document.getElementById('lapChronometerButton')

        clearInterval(chronometerInterval)

        if (startButton && setLapButton) {
            startButton.classList.remove('hidden-element')
            setLapButton.classList.add('hidden-element')
        }
    }

    const onSetLapChronometer = () => {
        const lapsDiv = document.getElementById('laps')

        laps.push(milliseconds)
        if (lapsDiv) {
            lapsDiv.innerHTML = ""
            laps.forEach((lap, i) => {
                const newDiv = document.createElement('div')
                const content = document.createTextNode(`lap ${i+1}: ` + formatWatch(lap))
                newDiv.appendChild(content)
                lapsDiv.appendChild(newDiv)
            })
        }
    }

    const onResetChronometer = () => {
        const startButton = document.getElementById('startChronometerButton')
        const setLapButton = document.getElementById('lapChronometerButton')

        const lapsDiv = document.getElementById('laps')

        const watchDiv = document.getElementById('watch')

        clearInterval(chronometerInterval)
        milliseconds = 0

        if (watchDiv) {
            watchDiv.innerHTML = '00:00:00:00'
        }

        if (startButton && setLapButton) {
            startButton.classList.remove('hidden-element')
            setLapButton.classList.add('hidden-element')
        }

        if (lapsDiv) {
            laps = []
            lapsDiv.innerHTML = ""
        }
    }

    return (
        <div id="chronometer" className='panels hidden-element'>
            <h1 id="watch">00:00:00:00</h1>
            <div id="chronometerButtons">
                <button id="startChronometerButton" onClick={() => onStartChronometer()}>Start</button>
                <button className='hidden-element' id="lapChronometerButton" onClick={() => onSetLapChronometer()}>Lap</button>
                <button id="stopChronometerButton" onClick={() => onStopChronometer()}>Stop</button>
                <button id="resetChronometerButton" onClick={() => onResetChronometer()}>Reset</button>
                <div id="laps"></div>
            </div>
         </div>
    )
}
