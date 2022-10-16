import React from "../jsx-compiler/jsx";
import { Application } from "./applications";
import "./styles/main.scss"
import { applications } from "./utils/applications";
import { eventListener } from "./utils/listener";
import { windowManager } from "./utils/windowManager";

export const App = () => {
  const onHoverNav = () => {
    eventListener.post('navHover', true)
  }

  const onHoverLeftNav = () => {
    eventListener.post('navHover', false)
  }

  const onApplicationOpen = (app: Application) => {
    windowManager.createApp(app)
  }
  
  const sub = eventListener.subscribe('navHover', (val) => console.log('HELLO', val))
  sub.unsubscribe()

  console.log(windowManager.getOpenedWindow())

  return (<div id="app">
    <nav onMouseEnter={onHoverNav} onMouseLeave={onHoverLeftNav}>
      {applications.map((app, index) => <div onClick={() => onApplicationOpen(app)} key={index} className="app-button" title={app.name}></div>)}
    </nav>
  </div>);
};
