import React from "../../../jsx-compiler/jsx"
import { exportSettings, importSettings } from "../../utils/handleSettingJson";
import { BackBtn } from "./backBtn"
import '../../styles/components/handle-settings.scss'
import { htmlById } from "../../utils/handleHtml";

export const HandleSettings = () => {

    const importFile = () => {
        const input = document.getElementById('file') as HTMLInputElement
        htmlById('errors').innerHTML = htmlById('success').innerHTML = ""
        if(!input.files || input.files.length == 0) {
            htmlById('errors').innerHTML = "No file selected."
            return
        }
        if (input.files[0].type !== 'application/json') {
            htmlById('errors').innerHTML = "Not a Json file."
            return
        }

        const reader = new FileReader();
        reader.onload = (event: any) => {
            const settings = JSON.parse(event.target.result)
            if (!importSettings(settings)) {
                htmlById('errors').innerHTML = "Errors while reading settings."
            }else {
                htmlById('success').innerHTML = "Settings imported!"
            }
        }
        reader.readAsText(input.files[0]);
    }

    const exportConfig = () => {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportSettings()))
        const downloadAnchorNode = document.createElement('a')
        downloadAnchorNode.setAttribute("href",     dataStr)
        downloadAnchorNode.setAttribute("download", "settings-app.json")
        document.body.appendChild(downloadAnchorNode)
        downloadAnchorNode.click()
        downloadAnchorNode.remove()
    }
  
    return (
        <section className="settings-container" id="handle-settings">
            <BackBtn cat={'handle-settings'} />
            <h1>Handle Settings</h1>    
            <section className="section-settings">
                    <h2 className="container-checkbox">Import</h2>
                    <div className="cont-input-file">
                        <input type="file" id="file" />
                        <button onClick={importFile} className="btn-import">Import</button>
                    </div>
                    <div id="errors"></div><div id="success"></div>

                </section>
                <section className="section-settings" style={{'paddingBottom' : '12px'}}>
                    <h2 className="container-checkbox">Export</h2>
                    <button onClick={exportConfig} className="btn-import">Export your settings</button>
                </section>
        </section>
    )
}