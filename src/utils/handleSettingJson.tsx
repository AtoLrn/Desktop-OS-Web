const jsonSettings = {
    enablePwd: 'true',
    darkMode: 'true',
    hoursDisplay: 'true',
    minutesDisplay: 'true',
    secondsDisplay: 'true',
    batteryDisplay: 'true',
    daysDisplay: 'true',
    monthDisplay: 'true',
    yearDisplay: 'true',
    dateDisplay: 'true',
    networkDisplay: 'true',
    vibrationEnabled: 'true'
}

export const importSettings = (object: Record<string, string>): boolean => {
    if (Object.keys(object).length > Object.keys(jsonSettings).length) {
        return false
    }
    Object.entries(object).forEach(([key, val]) => {
        if (key in jsonSettings && ['true', 'false'].includes(val)) {
            localStorage.setItem(key, val)
        }
    })
    return true
}

export const exportSettings = (): boolean => {
    return Object.entries(jsonSettings).reduce((res: any, [key]) => {
        const data = localStorage.getItem(key)
        if(data) {
            res[key] = data
        }
        return res
    }, {})
}