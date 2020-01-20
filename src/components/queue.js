import React from 'react'
import { useStateValue } from '../state'

export default function Queue() {
   const [{ components, queue }, dispatch] = useStateValue()

   return (
      <>
         {queue.slice(0, 8).map((item, index) => (
            <li className="queue-li" key={index}>
               <div className="queue-item">
                  <img src={item.snippet.thumbnails.medium.url} alt="" />
               </div>
            </li>
         ))}
      </>
   )
}
