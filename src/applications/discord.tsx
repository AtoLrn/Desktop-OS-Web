import { Application } from "."
import React from "../../jsx-compiler/jsx";

export class Discord extends Application {
    name = "Discord"
    url = "https://i.etsystatic.com/35308167/r/il/ee1b5b/3806884454/il_fullxfull.3806884454_bss8.jpg"

    constructor() {
        super();
    }

    build = () => {
        return super.build(<iframe src="https://www.w3docs.com" width="100%" height="100%"></iframe>)
    }

    export = () => {
        return {}
    }

    hide = () => {
        console.log('hide')
    }
}
