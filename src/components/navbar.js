import React, { useState } from 'react'
import { useStateValue } from '.././state'
import { Transition } from 'react-spring/renderprops'
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
      <>
         <Transition
            items={bin}
            from={{ position: 'absolute', left: 5, top: '0px', }}
            enter={{ position: 'absolute', left: 5, top: '50px', }}
            leave={{ position: 'absolute', left: 5, top: '0px', }}

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
         </Transition>
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