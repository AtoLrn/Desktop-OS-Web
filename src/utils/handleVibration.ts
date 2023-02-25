export const makeVibration = (durationInSecond: number) => {
    if (localStorage.getItem('vibrationEnabled') === 'true') {
        console.log('vibrate')
        window.navigator.vibrate(durationInSecond * 1000)
    }
}