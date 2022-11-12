import React from "../../../jsx-compiler/jsx";

export const Timer = () => {

    let seconds : number | undefined
    let minutes: number | undefined
    let hours : number | undefined
    let compressedTime: number | undefined
    let timerInterval : number

    const startTimer = () => {
        const timerValueDiv = document.getElementById('timerValue')

        if (compressedTime == undefined) { return }
        if (!timerValueDiv) { return }

        if (compressedTime <= 0) {
            onCancelTimer()
        }

        compressedTime--

        const timerDate = new Date(compressedTime * 1000)
        timerValueDiv.innerHTML =
            ('0' + timerDate.getUTCHours()).slice(-2) + ':' +
            ('0' + timerDate.getUTCMinutes()).slice(-2) + ':' +
            ('0' + timerDate.getUTCSeconds()).slice(-2)

    }

    const onStartTimer = () => {
        const hoursInput = document.getElementById('hoursInput') as HTMLInputElement
        const minutesInput = document.getElementById('minutesInput') as HTMLInputElement
        const secondsInput = document.getElementById('secondsInput') as HTMLInputElement

        const startButtonDiv = document.getElementById('startButtonTimer')
        const stopButtonDiv = document.getElementById('stopButtonTimer')
        const cancelButtonDiv = document.getElementById('cancelButtonTimer')

        const timerValueDiv = document.getElementById('timerValue')

        if (hoursInput && minutesInput && secondsInput && startButtonDiv && stopButtonDiv && cancelButtonDiv && timerValueDiv) {
            if (!hours && !minutes && !seconds) {
                hours = parseInt(hoursInput.value)
                minutes = parseInt(minutesInput.value)
                seconds = parseInt(secondsInput.value)
            }
            if (hours === undefined || minutes === undefined || seconds === undefined) {
                return
            }

            if (!compressedTime) {
                compressedTime = seconds + (minutes * 60) + (hours * 3600)
            }

            hoursInput.classList.add('hidden-element')
            minutesInput.classList.add('hidden-element')
            secondsInput.classList.add('hidden-element')

            startButtonDiv.classList.add('hidden-element')
            stopButtonDiv.classList.remove('hidden-element')
            cancelButtonDiv.classList.remove('hidden-element')

            timerValueDiv.classList.remove('hidden-element')

            timerInterval = setInterval(startTimer, 1000)
        }
    }

    const onStopTimer = () => {
        const startButtonDiv = document.getElementById('startButtonTimer')
        const stopButtonDiv = document.getElementById('stopButtonTimer')

        clearInterval(timerInterval)

        if (startButtonDiv && stopButtonDiv) {
            startButtonDiv.classList.remove('hidden-element')
            stopButtonDiv.classList.add('hidden-element')
        }
    }

    const onCancelTimer = () => {
        const startButtonDiv = document.getElementById('startButtonTimer')
        const stopButtonDiv = document.getElementById('stopButtonTimer')
        const cancelButtonDiv = document.getElementById('cancelButtonTimer')

        const timerValueDiv = document.getElementById('timerValue')

        const hoursInput = document.getElementById('hoursInput') as HTMLInputElement
        const minutesInput = document.getElementById('minutesInput') as HTMLInputElement
        const secondsInput = document.getElementById('secondsInput') as HTMLInputElement

        clearInterval(timerInterval)


        const audio = new Audio("https://lasonotheque.org/UPLOAD/wav/1111.wav")
        audio.play()
        window.navigator.vibrate(500)

        hours = undefined
        seconds = undefined
        minutes = undefined

        compressedTime = undefined

        if (startButtonDiv && stopButtonDiv && cancelButtonDiv) {
            startButtonDiv.classList.remove('hidden-element')
            stopButtonDiv.classList.add('hidden-element')
            cancelButtonDiv.classList.add('hidden-element')
        }

        if (timerValueDiv) {
            timerValueDiv.innerHTML = "00:00:00"
            timerValueDiv.classList.add('hidden-element')
        }

        if (hoursInput && minutesInput && secondsInput) {
            hoursInput.classList.remove('hidden-element')
            minutesInput.classList.remove('hidden-element')
            secondsInput.classList.remove('hidden-element')
        }
    }

    return (
        <div id="timer" className='panels hidden-element'>
            <div id='timerInput'>
                <input id="hoursInput" type='number' min='0' max='23' value='0'/>
                <input id="minutesInput" type='number' min='0' max='59' value='10'/>
                <input id="secondsInput" type='number' min='0' max='59' value='0'/>
            </div>
            <h1 id='timerValue' className='hidden-element'>00:00:00</h1>
            <div id='timerButton'>
                <button id='startButtonTimer' onClick={() => onStartTimer()}>Start</button>
                <button id='stopButtonTimer' className='hidden-element' onClick={() => onStopTimer()}>Stop</button>
                <button id='cancelButtonTimer' className='hidden-element' onClick={() => onCancelTimer()}>Cancel</button>
            </div>
        </div>
    )
}

