import React, { useState } from 'react'
import { useStateValue } from '.././state'
import logo from '../img/logo.png'
import search from '../img/search.png'
import logout from "../img/logout.png";
import './components.css'

import { Transition } from 'react-spring/renderprops'
import { useTransition, animated } from 'react-spring'


export default function Navbar({ initialComponentState }) {
   const [{ components, user }, dispatch] = useStateValue()
   const [bin, openBin] = useState(false)

   function handleLogout() {
      localStorage.removeItem('MT-token')
      localStorage.removeItem('MT-user')
      dispatch({ type: 'logout' })
   }

   const transitions = useTransition(bin, null, {
      from: { position: 'absolute', transform: 'translate3d(0,0px,0)', left: 5 },
      enter: { transform: 'translate3d(0,50px,0)', },
      leave: { transform: 'translate3d(0, 0px,0)' },
   })

   return (
      <>
         {/* <Transition
            items={bin}
            from={{ position: 'absolute', left: 5, top: 0, }}
            to={{ position: 'absolute', left: 5, top: 50, }}
         >
            {results => bin && (props => (
               <div style={props}>
                  <div className="logout-bin">
                     <div className="logout-icon">
                        <img src={logout} alt="" onClick={handleLogout} />
                     </div>
                  </div>
               </div>
            ))}
         </Transition> */}
         {bin &&
            transitions.map(({ item, props, key }) =>
               <animated.div key={key} style={props}>
                  <div className="logout-bin">
                     <div className="logout-icon">
                        <img src={logout} alt="" onClick={handleLogout} />
                     </div>
                  </div>
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