import React from "../../../jsx-compiler/jsx";
import { htmlById } from "../../utils/handleHtml";
import { makeVibration } from "../../utils/handleVibration";

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
        makeVibration(0.1)
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

            htmlById('timerInput').style.display = 'none'

            startButtonDiv.classList.add('hidden-element')
            stopButtonDiv.classList.remove('hidden-element')
            cancelButtonDiv.classList.remove('hidden-element')

            timerValueDiv.classList.remove('hidden-element')

            timerInterval = setInterval(startTimer, 1000)
        }
    }

    const onStopTimer = () => {
        makeVibration(0.1)
        const startButtonDiv = document.getElementById('startButtonTimer')
        const stopButtonDiv = document.getElementById('stopButtonTimer')

        clearInterval(timerInterval)

        if (startButtonDiv && stopButtonDiv) {
            startButtonDiv.classList.remove('hidden-element')
            stopButtonDiv.classList.add('hidden-element')
        }
    }

    const timerNotify = () => {
        makeVibration(1)
        if (!("Notification" in window)) {
            alert("This browser does not support desktop notification")
        } else if (Notification.permission === "granted") {
            new Notification("Timer finished!")
        } else if (Notification.permission !== "denied") {
            Notification.requestPermission().then((permission) => {
                if (permission === "granted") {
                    new Notification("Timer finished!")
                }
            })
        }
    }

    const onCancelTimer = () => {
        const startButtonDiv = document.getElementById('startButtonTimer')
        const stopButtonDiv = document.getElementById('stopButtonTimer')
        const cancelButtonDiv = document.getElementById('cancelButtonTimer')

        const timerValueDiv = document.getElementById('timerValue')

        clearInterval(timerInterval)


        const audio = new Audio("https://lasonotheque.org/UPLOAD/wav/1111.wav")
        audio.play()
        window.navigator.vibrate(500)
        timerNotify()


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

        htmlById('timerInput').style.display = 'flex'
    }

    return (
        <div id="timer" className='panels hidden-element'>
            <div id='timerInput'>
                <input className="input-timer" id="hoursInput" type='number' min='0' max='23' value='0'/>
                <div>:</div>
                <input className="input-timer" id="minutesInput" type='number' min='0' max='59' value='10'/>
                <div>:</div>
                <input className="input-timer" id="secondsInput" type='number' min='0' max='59' value='0'/>
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

