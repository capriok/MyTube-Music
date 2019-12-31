import React from 'react'
import logo from '../img/logo.png'
import './components.css'

export default function Navbar({ search, playlist, profile, settings }) {
   return (
      <nav>
         <a href="/">
            <img className="nav-logo" src={logo} alt=""></img>
         </a>
         <div className="nav-buttons">
            <div className="nav-button">
               <img src={playlist} alt=""></img>
            </div>
            <div className="nav-button">
               <img src={settings} alt=""></img>
            </div>
         </div>
      </nav >
   )
}
