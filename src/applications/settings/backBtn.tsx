import React from "../../../jsx-compiler/jsx"
import { MainPage } from "."
import { changePanel } from "./utils"


export const BackBtn = ({ cat } : { cat: string }) => {
    return (
        <button className="back" onClick={() => {changePanel(<MainPage/>, cat)}}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_6_9872)">
                    <path d="M15.41 16.59L10.83 12L15.41 7.41L14 6L8 12L14 18L15.41 16.59Z" fill="#FFF"/>
            </g>
                    <defs>
                    <clipPath id="clip0_6_9872">
                    <rect width="24" height="24" fill="white"/>
                    </clipPath>
                </defs>
            </svg>
            <p>Back</p>
        </button>
    )
}
  