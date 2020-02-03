import React, { useState } from 'react'
import { useStateValue } from '.././state'
import logo from '../img/logo.png'
import search from '../img/search.png'
import logout from "../img/logout.png";
import './components.css'

export default function Navbar({ initialComponentState }) {
   const [{ components, user }, dispatch] = useStateValue()
   const [bin, openBin] = useState(false)

   function handleLogout() {
      localStorage.removeItem('MT-token')
      localStorage.removeItem('MT-user')
      dispatch({ type: 'logout' })
   }

   return (
      <nav>
         <img className="nav-profile" alt=""
            src={user.avatar}
            onClick={() => openBin(!bin)}
         />
         {bin &&
            <div className="logout-bin">
               <div className="logout-icon">
                  <img src={logout} alt="" onClick={handleLogout} />
               </div>
            </div>
         }
         <div onClick={initialComponentState}>
            <img className="nav-logo" src={logo} alt="" />
         </div>
         <div className="nav-buttons">
            <img className="nav-button" src={search} alt=""
               onClick={() => dispatch({ type: 'manage', components: { ...components, search: !components.search } })} />
         </div>
      </nav>
   )
}