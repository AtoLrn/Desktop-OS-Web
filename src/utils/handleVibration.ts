export const makeVibration = (durationInSecond: number) => {
    if (localStorage.getItem('vibrationEnabled') === 'true') {
        if (window.navigator.vibrate !== undefined) window.navigator.vibrate(durationInSecond * 1000)
    }
}