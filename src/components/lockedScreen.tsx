import React from "../../jsx-compiler/jsx"
import { handleLock } from "../utils/handleLock"
import "../styles/locked-screen.scss" 

const currentPwd = () => localStorage.getItem('pwd') ?? ''

export const LockedScreen = ({ reRenderApp }: { reRenderApp: () => void }) => {
    
    const unlock = async (plainPassword: string) => {

        
        if (plainPassword !== currentPwd()) {
            const input = document.getElementById('pwd') as HTMLInputElement
            input.value = ""
            input.disabled = true
            setTimeout(() => { 
                input.disabled = false 
                input.focus()
            }, 300)
            return
        }

        handleLock.unlock()
        reRenderApp()
    }

    const isPwdEnabled = () => {
        return localStorage.getItem('enablePwd') === 'true' && currentPwd() !== ''
    }

    const onInputChange = (e: any) => {
        const plainPassword = e.target.value
        if(plainPassword.length < 6) { return }

        unlock(plainPassword)
    }



    return (
        <div id="app">
            <div className="container-lock-screen">
                {isPwdEnabled() ? 
                <form className="form-locked-screen">
                    <div>
                    <h1> Screen Locked </h1>
                    <p>Enter your 6 characters password </p>
                    </div>
                    <input onKeyUp={onInputChange} type="password" id="pwd" maxLength="6" />
                </form> : 
                <div className="form-locked-screen" onClick={() => { handleLock.unlock(); reRenderApp(); }}>
                    <h1> Screen Locked </h1>
                    <p>Touch the screen </p>      
                </div>
                }
            
            </div>
        </div>
    )
}