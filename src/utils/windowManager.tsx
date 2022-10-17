import compilerDOM from "../../jsx-compiler/dom"
import { Application } from "../applications"

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


    createApp (app: Application) {
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
        const elem = document.getElementById(id)
        if (!elem) return
        elem.style.display = 'block'
    }

    hideWindow (id: string) {
        const elem = document.getElementById(id)
        if (!elem) return
        elem.style.display = 'none'
    }

    closingWindow  (id: string) {
        const elem = document.getElementById(id)
        if (!elem) return
        elem.remove()
        this.windowCollection = this.windowCollection.filter(window => window.id !== id)
    }
}

export const windowManager = new WindowManager()