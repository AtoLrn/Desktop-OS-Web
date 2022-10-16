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
        const appInstance = new app()
        this.getAppElement().render(appInstance.build())
        console.log('Opening: ', appInstance.name, ' with ID: ', appInstance.id)
        this.windowCollection.push(appInstance)
    }

    getOpenedWindow () {
        return this.windowCollection
    }

    closingWindow  (id: string) {
        const elem = document.getElementById(id)
        if (!elem) return
        elem.remove()
    }
}

export const windowManager = new WindowManager()