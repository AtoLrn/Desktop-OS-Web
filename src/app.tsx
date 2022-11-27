import compilerDOM from "../jsx-compiler/dom";
import React from "../jsx-compiler/jsx";
import { StatusBar } from "./components/statusBar";
import "./styles/main.scss"
import { AppType } from "./types/application";
import { applications } from "./utils/applications";
import { fileSystem } from "./utils/FileSystem";
import { swipeListener } from "./utils/handleSwipe";
import { eventListener } from "./utils/listener";
import { windowManager } from "./utils/windowManager";

export const App = () => {
  swipeListener.startListening()

  const onHoverNav = () => {
    eventListener.post('navHover', true)
  }

  const onHoverLeftNav = () => {
    eventListener.post('navHover', false)
  }

  const onApplicationOpen = (app: AppType<any>) => {
    swipeListener.closeMenu()
    windowManager.createApp(app)
    refreshCurrentApps()
  }

  const closeApp = (id: string) => {
    windowManager.closingWindow(id)
    refreshCurrentApps()
  }

  const refreshCurrentApps = () => {
    const apps = document.getElementById('navbar')
    if(!apps) return
    apps.innerHTML = ""
    windowManager.getOpenedWindow().forEach((app: any, index) => {
        const html = <div onClick={() => onApplicationOpen(app)} key={index} className="app-button" style={{ backgroundImage: `url(${app.url})` }} title={app.name}>
          <span onClick={() => closeApp(app.id)}>x</span>
        </div>
        compilerDOM.createHtml(apps).render(html)
    })   
  }
  

  let isHovered = false
  
  eventListener.subscribe('navHover', (val) => {
    const navbar = document.getElementById('navbar')
    if (!navbar) return
    if (val) {
      isHovered = true
      navbar.classList.add('hover')
    } else {
      setTimeout(() => {
        if (!isHovered) navbar.classList.remove('hover')
      }, 2000)
      isHovered = false
    }
  })

  fileSystem.save('banane', 'Super')

  return (<div id="app">
    <StatusBar />
    <div className="all-apps">
      {applications.map((app, index) => <div onClick={() => onApplicationOpen(app)} key={index} className="app-button" style={{ backgroundImage: `url('${new app().url}')` }} title={app.name}></div>)}
    </div>
    <div className='hover-listener' onMouseEnter={onHoverNav} onMouseLeave={onHoverLeftNav}></div>
    <nav id='navbar' className='apps' onMouseEnter={onHoverNav} onMouseLeave={onHoverLeftNav}>
      {
        windowManager.getOpenedWindow().map((app: any, index) => {
          return <div 
            onClick={() => onApplicationOpen(app)}  
            key={index} className="app-button" 
            style={{ backgroundImage: `url('${app.url}')` }} 
            title={app.name}> <span>x</span>
          </div>
        })
      }
    </nav>
  </div>);
};
