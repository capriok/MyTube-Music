import React, { useState } from 'react'
import { useStateValue } from '.././state'
import logo from '../img/logo.png'
import search from '../img/search.png'
import logout from "../img/logout.png";
import './components.css'

import { useTransition, animated } from 'react-spring'


export default function Navbar({ initialComponentState }) {
   const [{ components, user }, dispatch] = useStateValue()
   const [bin, openBin] = useState()

   function handleLogout() {
      localStorage.removeItem('MT-token')
      localStorage.removeItem('MT-user')
      dispatch({ type: 'logout' })
   }

   const transitions = useTransition(bin, null, {
      from: { transform: 'translate3d(0,0px,0)' },
      enter: { transform: 'translate3d(0,50px,0)' },
      leave: { transform: 'translate3d(0, 0px,0)' },
      config: { duration: 1000 }
   })

   return (
      <>
         {bin &&
            transitions.map(({ item, props, key }) =>
               <animated.div className="logout-bin" key={key} style={props} >
                  <img className="logout-icon" src={logout} alt="" onClick={handleLogout} />
               </animated.div>
            )
         }
         <nav>

            <img className="nav-profile" alt=""
               src={user.avatar}
               onClick={() => openBin(!bin)}
            />

            <div onClick={initialComponentState}>
               <img className="nav-logo" src={logo} alt="" />
            </div>
            <div className="nav-buttons">
               <img className="nav-button" src={search} alt=""
                  onClick={() => dispatch({ type: 'manage', components: { ...components, search: !components.search } })} />
            </div>
         </nav >
      </>
   )
}