import React from 'react'
import logo from '../img/logo.png'
import './components.css'

export default function Navbar({ initialComponentState }) {
   return (
      <nav>
         <div onClick={initialComponentState}>
            <img className="nav-logo" src={logo} alt=""></img>
         </div>
      </nav >
   )
}
