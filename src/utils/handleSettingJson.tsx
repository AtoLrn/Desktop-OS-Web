import fs from 'vite-plugin-fs/browser';


export interface JsonSettings {
    pwd?: string
    enablePwd?: string
    darkMode?: string
    hoursDisplay?: string
    minutesDisplay?: string
    secondsDisplay?: string
    batteryDisplay?: string
    daysDisplay?: string
    monthDisplay?: string
    yearDisplay?: string
    dateDisplay?: string
    fileSystem?: any
}

class HandleSettingJson {
    settings: JsonSettings = {}
    init() {
        fetch('/settings-app.json')
            .then((res) => res.json())
            .then(res => { 
                this.settings = res 
                this.loadSettingInLocalStorage()
            })
    }

    loadSettingInLocalStorage() {

        if(this.settings) {
            Object.entries(this.settings).forEach(([key, val]) => {
                localStorage.setItem(key, val)
            })
        }
    }

    async set(key: keyof JsonSettings, value: any) {
        localStorage.setItem(key, value)
        this.settings[key] = value 

        fs.writeFile('/settings-app.json', JSON.stringify(this.settings));
    }
}

export const handleSettingJson = new HandleSettingJson()