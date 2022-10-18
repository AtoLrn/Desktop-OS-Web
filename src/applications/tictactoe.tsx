import { Application } from "."
import React from "../../jsx-compiler/jsx";

export class TicTacToe extends Application {
    name = "TicTacToe"
    public static url = "https://store-images.s-microsoft.com/image/apps.2005.14057826194083709.67242c47-4fd7-4f1a-9dd6-5d93f6cc10df.f80f14c0-72ab-46ff-86cd-9d801c8e04e8?mode=scale&q=90&h=300&w=300"
    backgroundColor = 'white'

    constructor() {
        super();
    }

    launchGame =  () => {
        this.render(<p>Hello</p>)
    }

    build = () => {
        return super.build(
        <div className='tictactoe'>
            <h1>TicTacToe</h1>
            <button onClick={() => this.launchGame()}>Play</button>
            <button>History</button>

            </div>
        )
    }

    export = () => {
        return {}
    }

    hide = () => {
        console.log('hide')
    }
}
