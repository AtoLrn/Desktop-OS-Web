import React from "../../jsx-compiler/jsx"
import "../styles/components/formPassword.scss"
import { htmlById } from "../utils/handleHtml"

export const FormPassword = ({ isPwdEnabled }: { isPwdEnabled: () => boolean }) => {
    if(!isPwdEnabled()) return null

    const submit = (e: any) => {
        e.preventDefault()
        const input = document.getElementById('input-pwd') as HTMLInputElement
        htmlById('result').innerHTML = "password saved."
        localStorage.setItem('pwd', input.value)
    }

    const onKeyUp = (e: any) => {
        htmlById('result').innerHTML = ""
        const btn = document.getElementById('submit') as HTMLButtonElement

        if (e.target.value.length === 6) {
            btn.disabled = false
        }else {
            btn.disabled = true
        }
    }
    return (
        <form className="form-pwd">
            <div>
                <label> Password: 6 numbers </label>
                <input onKeyUp={onKeyUp} maxLength="6" type="number" inputMode="numeric" pattern="[0-9]*" id="input-pwd"  />
            </div>
            <button id='submit' onClick={submit} disabled="true">Save</button>
            <div id="result"></div>
        </form>
    )
}
