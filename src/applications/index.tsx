import React from "../../jsx-compiler/jsx";
import { generateId } from "../utils/idGenerator";
import { windowManager } from "../utils/windowManager";

export class Application {
    id: string
    name = 'applicationTemplate'
    url = 'https://logo.com'

    holded = false

    offset = [ 0, 0]

    moveListener = null

    constructor() {
        this.id = generateId()
    }

    build (args: any) {
        const onClose = () => {
            this.onClose()
            windowManager.closingWindow(this.id)
        }
        
        const handleMove = (event: any) => {
            event.preventDefault();
            const elem = document.getElementById(this.id)
            if (!elem || !this.holded) return 
            elem.style.left = `${event.clientX + this.offset[0] }px`
            elem.style.top = `${event.clientY + this.offset[1]}px`
        }

        const onHandle = (event: any) => {
            event.preventDefault();
            const elem = document.getElementById(this.id)
            if (!elem) return
            document.addEventListener('mousemove', handleMove.bind(this))

            this.offset = [ elem.offsetLeft - event.clientX,  elem.offsetTop - event.clientY ]
            this.holded = true
        }

        const onLossHandle = () => {
            this.holded = false
        }

        const onClick = () => [
            windowManager.top(this.id)
        ]

        return (
        <div id={this.id} className='application-window' onMouseDown={() => onClick()}>
             <nav onMouseDown={onHandle} onMouseUp={() => onLossHandle()} > 
                <span className='close' onClick={() => onClose()}>X</span>
                <span className='resize' onClick={() => this.onHide()}>Mini</span>
                <span className='resize' onClick={() => this.onHide()}>resize</span>
             </nav>
             <main>
             {args}
             </main>
        </div>
        )
    }

    onClose () {
        console.log('CLOSING', this.id)
    }

    onHide () {
        windowManager.hideWindow(this.id)
    }
}