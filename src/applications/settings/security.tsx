import React from "../../../jsx-compiler/jsx"
import { BackBtn } from "./backBtn"
import { switchElemDisplay } from "./utils"
import { reRenderHtml } from "../../utils/handleHtml"
import { FormPassword } from "../../components/formPassword"
import { handleSettingJson } from "../../utils/handleSettingJson"

const isPwdEnabled = () => localStorage.getItem('enablePwd') === 'true' ? true : false

export const Security = () => {

    const onSwitch = (val: any) => {
        switchElemDisplay(val, 'enablePwd')
        handleSettingJson.set('pwd', '')
        reRenderHtml('form-password', <FormPassword isPwdEnabled={isPwdEnabled} />)
    }

    return (
        <section className="settings-container" id="security">
            <BackBtn cat="security" />
            <h1>Security</h1>
            <div>
                <section className="section-settings">
                    <h2 className="container-checkbox">Password</h2>
                    <div className="container-checkbox">
                        <h4>Activate Password </h4>
                        <label className="switch">
                            <input onChange={onSwitch} checked={isPwdEnabled()} type="checkbox"></input>
                            <span className="slider round"></span>
                        </label>
                    </div>
                    <div id='form-password'>
                        <FormPassword isPwdEnabled={isPwdEnabled} />
                    </div>
                </section>
            </div>
            
        </section>
    )
}