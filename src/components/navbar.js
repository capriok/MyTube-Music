import React, { useState } from 'react'
import { useStateValue } from '.././state'
import { useTransition, animated } from 'react-spring'
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
      // dispatch({ type: 'logout' })
      window.location.href = '/'
   }

   const transitions = useTransition(bin, null, {
      from: { position: 'absolute', opacity: 0.5, left: 0 },
      enter: { opacity: 1, left: 40 },
      leave: { opacity: 0, left: 0 },
   })


   return (
      <>
         <nav>
            <img className="nav-profile" alt=""
               src={user.avatar}
               onClick={() => openBin(!bin)}
            />
            <div onClick={initialComponentState}>
               <img className="nav-logo" src={logo} alt="" />
            </div>
            {
               transitions.map(({ item, key, props }) =>
                  item && <animated.div key={key} style={props}>
                     <div className="logout-bin">
                        <div className="logout-icon">
                           <img src={logout} alt="" onClick={handleLogout} />
                        </div>
                     </div>
                  </animated.div>
               )
            }
            <div className="nav-buttons">
               <img className="nav-button" src={search} alt=""
                  onClick={() => dispatch({ type: 'manage', components: { ...components, search: !components.search } })} />
            </div>
         </nav>
      </>
   )
}