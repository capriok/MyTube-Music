import React from 'react'
import { useStateValue } from '.././state'
import logo from '../img/logo.png'
import search from '../img/search.png'
import './components.css'

export default function Navbar({ initialComponentState }) {
   const [{ components, channelId, playlistObj }, dispatch] = useStateValue()


   return (
      <nav>
         <div onClick={initialComponentState}>
            <img className="nav-logo" src={logo} alt=""></img>
         </div>
         <div className="nav-buttons">
            <img className="nav-button" src={search} alt=""
               onClick={() => dispatch({ type: 'manage', components: { ...components, search: !components.search } })} />
         </div>
      </nav >
   )
}
