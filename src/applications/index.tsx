import React from "../../jsx-compiler/jsx";
import { generateId } from "../utils/idGenerator";
import { windowManager } from "../utils/windowManager";

export class Application {
    id: string
    name = 'applicationTemplate'
    url = 'https://logo.com'

    constructor() {
        this.id = generateId()
    }

    build (args: any) {
        const onClose = () => {
            this.onClose()
            windowManager.closingWindow(this.id)
        }
        
        return (
        <div id={this.id} className='application-window'>
             <nav>
                <span className='close' onClick={() => onClose()}>X</span>
                <span className='resize'>resize</span>
             </nav>
             <main>
             {args}
             </main>
        </div>
        )
    }

    onClose () {
        console.log('CLOSING')
    }
}