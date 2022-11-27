import { htmlById } from "./handleHtml"
import { windowManager } from "./windowManager"

export class ActionMobile {
    isMenuOpen = false
    openMenu = () => {
        this.isMenuOpen = true
        windowManager.hideAll()
        const nav = htmlById('navbar')
        nav.classList.add('show')
        setTimeout(() => {nav.classList.add('smooth')}, 10)
    }

    closeMenu = () => {
        this.isMenuOpen = false
        const nav = htmlById('navbar')
        nav.classList.remove('smooth')
        setTimeout(() => {nav.classList.remove('show')}, 10)
    }

    goHome = () => {
        console.log('home')
    }
}

