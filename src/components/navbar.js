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
               <a href="/search">
                  <img src={search} alt=""></img>
               </a>
            </div>
            <div className="nav-button">
               <a href="/playlist">
                  <img src={playlist} alt=""></img>
               </a>
            </div>
            <div className="nav-button">
               <a href="/profile">
                  <img src={profile} alt=""></img>
               </a>
            </div>
            <div className="nav-button">
               <a href="/settings">
                  <img src={settings} alt=""></img>
               </a>
            </div>
         </div>
      </nav>
   )
}
