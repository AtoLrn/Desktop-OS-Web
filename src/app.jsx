import React from "../jsx-compiler/jsx.js";

export const App = () => {
  const handleClick = () => {
    alert("Hello, world!");
  };

  return (
    <div className="test2" style="background-color: blue;" onClick={handleClick}>
        <h1>bonjour</h1>
        <ul>
          <li>oui</li>
          <li>c'est</li>
          <li>moi</li>
        </ul>
    </div>
  );
};
