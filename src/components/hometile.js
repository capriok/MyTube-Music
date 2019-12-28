import React from 'react'
import './components.css'

export default function Hometile({ to, title, img }) {
   return (
      <a href={to}>
         <div className="landing-tile">
            <div className="tile-content">
               <h1>{title}</h1>
               <img src={img} alt=""></img>
            </div>
         </div>
      </a>
   )
}