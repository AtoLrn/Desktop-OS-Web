import { Application } from "."
import React from "../../jsx-compiler/jsx";

export class TicTacToe extends Application {
    name = "TicTacToe"
    url = "https://store-images.s-microsoft.com/image/apps.2005.14057826194083709.67242c47-4fd7-4f1a-9dd6-5d93f6cc10df.f80f14c0-72ab-46ff-86cd-9d801c8e04e8?mode=scale&q=90&h=300&w=300"

    constructor() {
        super();
    }

    build = () => {
        return super.build(<p>TicTacToe</p>)
    }

    export = () => {
        return {}
    }

    hide = () => {
        console.log('hide')
    }
}

const x = new TicTacToe()
x.build()