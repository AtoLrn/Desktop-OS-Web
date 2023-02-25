import { ActionMobile } from "./actionMobile";
import { handleLock } from "./handleLock";
import { windowManager } from "./windowManager";

class SwipeListener extends ActionMobile {
    xStart: number|null = null;                                                        
    yStart: number|null = null; 
    action?: (arg?: any) => void = undefined;

    setAction = (action?: (arg?: any) => void) => {
        this.action = action
    }
    startListening = (action?: () => void) => {
        document.addEventListener('touchstart', this.handleTouchStart, false);        
        document.addEventListener('touchmove', this.handleTouchMove, false); 
        this.setAction(action)
    }

    stopListening() {
        document.removeEventListener('touchstart', this.handleTouchStart, false);        
        document.removeEventListener('touchmove', this.handleTouchMove, false); 
    }

    handleTouchStart = (evt: any) => {
        const firstTouch = evt.touches[0];                                      
        this.xStart = firstTouch.clientX;                                      
        this.yStart = firstTouch.clientY;                                      
    }  
    handleTouchMove = (evt: any) => {
        if ( !this.xStart || !this.yStart ) {
            return;
        }
    
        const xUp = evt.touches[0].clientX;                                    
        const yUp = evt.touches[0].clientY;
    
        const xDiff = this.xStart - xUp;
        const yDiff = this.yStart - yUp;
                                                                            
        if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {
            if ( xDiff > 0 ) {
               this.swipeLeft()
            } else {
                this.swipeRight()
            }                       
        } else {
            if ( yDiff > 0 ) {
                this.swipeUp()
            } else { 
                this.swipeDown()
            }                                                                 
        }
        this.xStart = null;
        this.yStart = null;                                             
    }
    
    swipeUp = () => {
        if(localStorage.getItem('isLocked') == 'true') {
            return
        }
        
        if(!this.isMenuOpen && this.yStart && this.yStart > window.innerHeight - 200 && windowManager.getOpenedWindow().length > 0) {
            this.openMenu()
        }
    }
    swipeDown = () => {
        if (this.isMenuOpen) this.closeMenu()
        if(this.yStart && this.yStart < 200) {
            handleLock.lock()
            if(this.action) {
                this.action(true)
            }
        }
    }
    swipeLeft = () => {
        console.log('swipe left') 
    }
    swipeRight = () => {
        console.log('swipe right') 
    }
}
                                                                     


export const swipeListener = new SwipeListener()