import { Application } from ".";
import React from "../../jsx-compiler/jsx";
import "../styles/apps/tictactoe.scss";

interface BlockList {
    bot: {item: HTMLSpanElement, index: number}[]
    player: {item: HTMLSpanElement, index: number}[]
    free: {item: HTMLSpanElement, index: number}[]
}

enum End {
    win = 'WIN',
    lost = 'LOST',
    draw = 'DRAW'
} 

export class TicTacToe extends Application {
    name = "TicTacToe"
    url = "https://store-images.s-microsoft.com/image/apps.2005.14057826194083709.67242c47-4fd7-4f1a-9dd6-5d93f6cc10df.f80f14c0-72ab-46ff-86cd-9d801c8e04e8?mode=scale&q=90&h=300&w=300"
    winPossibility = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],

        [1, 5, 9],
        [3, 5, 7],

        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9]
    ]

    localStorageKey = 'TICTACTOE-STORAGE-KEY'


    constructor() {
        super();
    }

    getAllBlock = () => {
        const el = document.getElementById('tictactoe-playground')
        const blocks = el?.getElementsByTagName('span')
        if (!blocks) throw new Error('Playing but impossible')
        return Array.from(blocks).reduce<BlockList>((acc,val, index) => {
            if (val.classList.contains('player')) {
                acc.player.push({item: val, index})
                return acc
            } 
            if (val.classList.contains('bot')) {
                acc.bot.push({item: val, index})
                return acc
            }
            acc.free.push({item: val, index})
            return acc
        }, { bot: [], player: [], free: [] }) 
    }

    saveGame = (result: End) => {
        const storedData = localStorage.getItem(this.localStorageKey)
        const timestamp = Date.now() 
        if (!storedData) {
            localStorage.setItem(this.localStorageKey, JSON.stringify([{
                timestamp,
                result
            }]))
        } else {
            const oldData = JSON.parse(storedData) 
            oldData.push({
                timestamp,
                result
            })
            localStorage.setItem(this.localStorageKey, JSON.stringify(oldData))
        }
    }

    getHistory = (): Array<any> => {
        return JSON.parse(localStorage.getItem(this.localStorageKey) ?? '[]')
    }

    getEndMessage = (win: boolean, equity = false) => {
        if (equity) {
            this.saveGame(End.draw)
            return 'No winner :('
        }
        if (win) {
            this.saveGame(End.win)
            return 'Congratulation, you won !'
        }
        this.saveGame(End.lost)
        return 'You lost.... 😐'
    }

    finishGame = (win: boolean, equity = false) => {
        this.render(<div className='tictactoe'>
            {this.getEndMessage(win, equity)}
            <button onClick={() => this.render(this.buildMainMenu())}>Go back to main menu</button>
        </div>)
    }

    botPlay = () => {
        const { free } = this.getAllBlock()
        if (free.length === 0) { 
            return this.finishGame(false, true)
        }
        const botClick = free[Math.floor(Math.random()*free.length)]
        botClick.item.classList.add('bot')
        if (this.checkWin('bot')) {
            this.finishGame(false)
        }
    }

    checkWin = (checked: keyof BlockList  = 'player'): boolean => {
        const playerBlocks = this.getAllBlock()[checked]
        const blocks = playerBlocks.map(block =>  block.index + 1)
        return this.winPossibility.some((possiblity) => possiblity.every(elem => blocks.includes(elem)))
    }

    onCaseClick = (event: any) => {
        const elem: HTMLSpanElement = event.srcElement
        if (!elem.classList.contains('bot') && !elem.classList.contains('player')) {
            elem.classList.add('player')
            if (this.checkWin()) {
                return this.finishGame(true)
            } else {
                this.botPlay()
            }
        }
    }

    buildMainMenu = () => {
        return (<div className='tictactoe'>
            <h1>TicTacToe</h1>
            <button onClick={() => this.launchGame()}>Play</button>
            <button onClick={() => this.toHistory()}>History</button>
        </div>)
    }

    toHistory = () => {
        this.render(
        <div className='tictactoe'>
            {this.getHistory().map((game: any, key) => {
                const date = new Date(game.timestamp)
                const formatedDate = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
                return (<p key={key}>Result: {game.result}, at <time>{formatedDate}</time></p>)
                })}
            <button onClick={() => this.render(this.buildMainMenu())}>Go back to main menu</button>
        </div>)
    }

    launchGame =  () => {
        this.render(
        <div className='tictactoe'>
            <div id='tictactoe-playground' className='tictactoe-playground'>
                <span onClick={this.onCaseClick}></span>
                <span onClick={this.onCaseClick}></span>
                <span onClick={this.onCaseClick}></span>
                <span onClick={this.onCaseClick}></span>
                <span onClick={this.onCaseClick}></span>
                <span onClick={this.onCaseClick}></span>
                <span onClick={this.onCaseClick}></span>
                <span onClick={this.onCaseClick}></span>
                <span onClick={this.onCaseClick}></span>
            </div>
        </div>)
    }

    build = () => {
        return super.build(this.buildMainMenu())
    }

    export = () => {
        return {}
    }
}
