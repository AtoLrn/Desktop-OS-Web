import React from "../jsx-compiler/jsx";
import { Home } from "./components/Home";
import "./styles/main.scss"

export const App = () => {
  const handleClick = () => {
    alert("Hello, world!");
  };

  return (<Home onClick={handleClick} />);
};
