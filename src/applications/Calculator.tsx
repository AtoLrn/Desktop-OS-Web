import { Application } from "."
import React from "../../jsx-compiler/jsx";
import { setValueInput } from "../utils/handleHtml";

import "../styles/apps/calculator.scss"
import { makeVibration } from "../utils/handleVibration";


export class Calculator extends Application {
    name = "Calculator"
    url = "/logo-app/calculator.jpg"

    buttons = ['(', ')', '%', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '+', '/', '-']
    input = ""

    constructor() {
        super();
    }

    writeCharater = (value: string) => {
        makeVibration(0.1)
        this.input = setValueInput("input-calculator", this.input + value)
    }

    deleteCharacter = () => {
        makeVibration(0.1)
        this.input = setValueInput("input-calculator", this.input.substring(0, this.input.length - 1))
    }

    clear = () => {
        makeVibration(0.1)
        this.input = setValueInput("input-calculator", "")
    }

    calculate = (e: Event) => {
        e.preventDefault()
        const result = document.getElementById('result')
        if(/[^0-9%\s\(\)\+\*-\/]/g.test(this.input) && result) {
            result.innerHTML = ""
            return
        }
        if(result) {
            result.innerHTML = eval(this.input)
            this.input = setValueInput("input-calculator", eval(this.input))
        }    
    }  

    build = () => {
        return super.build(
            <form className="calculator-container" onSubmit={this.calculate}>
                <input type="text" id="input-calculator" value="" disabled />
                <p id="result"> 0 </p>
                
                <div className="buttons">
                    <div className="btn red" onClick={this.clear}> C </div>

                    <div className="btn red" onClick={this.deleteCharacter}> del </div>
                    {
                        this.buttons.map(value => {
                            return (<div className="btn outline-green" key={value} onClick={() => {this.writeCharater(value)}}>{value}</div>)
                        })
                    }
                    <button className="btn green" type="submit"> = </button>
                </div>  
                
            </form>
        )
    }
}
