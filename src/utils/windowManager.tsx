import compilerDOM from "../../jsx-compiler/dom"
import { Application } from "../applications"
import { AppType } from "../types/application"
import { isMobile } from "./checkMobile"
export class WindowManager {
    windowCollection: Application[] = []
    root: any

    getAppElement () {
        if (this.root) return this.root
        const page = document.getElementById('app')
        if (!page) return
        this.root = compilerDOM.createHtml(page);
        return this.root
    }

    createApp (app: AppType<any>) {
        const exist = this.windowCollection.find(window => window.name === app.name)
        if (exist) { 
            this.showWindow(exist.id)
            return 
        } 
        const appInstance = new app()
        this.getAppElement().render(appInstance.build())
        console.log('Opening: ', appInstance.name, ' with ID: ', appInstance.id)
        this.windowCollection.push(appInstance)
    }

    getOpenedWindow () {
        return this.windowCollection
    }

    showWindow (id: string) {
        const { style } = document.getElementById(id) as HTMLElement
        if (!style) return
        this.top(id)
        
        if (isMobile()) {
            style.top = '0px'
            style.left = '0px'
            style.borderRadius = '0px'
        }else {
            style.top = '100px'
            style.left = '100px'
            style.borderRadius = '20px'
        }

        style.transform = 'scale(1)'
        setTimeout(() => {
            style.transition = ''
        }, 300)
    }

    hideWindow (id: string) {
        const { style } = document.getElementById(id) as HTMLElement
        if (!style) return

        style.top = '100vh'
        style.left = '100vw'
        style.transform = 'scale(0.05)'
        style.transition = '.3s ease-in-out'
    }

    hideAll() {
        this.windowCollection.forEach(app => { this.hideWindow(app.id)})
    }

    closingWindow (id: string) {
        const elem = document.getElementById(id)
        if (!elem) return
        elem.remove()
        this.windowCollection = this.windowCollection.filter(window => window.id !== id)
    }

    top (id: string) {
        this.windowCollection.forEach(app => {
            const elem = document.getElementById(app.id)
            if (!elem) return
            elem.style.zIndex = '10'
            
        })

        const elem = document.getElementById(id)
        if (!elem) return
        elem.style.zIndex = '11'
    }

    fullScreen (id: string) {
        this.top(id)
        const elem = document.getElementById(id)
        if (!elem) return
        elem.style.width = '100vw'
        elem.style.height = '100vh'
        elem.style.top = '0'
        elem.style.left = '0'
    }

    fullExitScreen (id: string) {
        this.top(id)
        const elem = document.getElementById(id)
        if (!elem) return
        elem.style.width = '550px'
        elem.style.height = '550px'
        elem.style.top = '100px'
        elem.style.left = '100px'
    }
}

export const windowManager = new WindowManager()