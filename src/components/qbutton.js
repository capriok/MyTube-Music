import React, { useState, useEffect } from 'react'
import { useStateValue } from '../state'
// import addtoq from '../img/addtoq.png'
import { remove } from 'lodash'
import addtoq from '../img/addtoq.png'
import addedtoq from '../img/addedtoq.png'

export default function Qbutton({ item }) {
   const [{ queue }, dispatch] = useStateValue()
   const [added, setAddedIcon] = useState(false)

   const handleAdd = (item) => {
      console.log(item);
      dispatch({
         type: 'addtoq',
         queue: [
            ...remove(queue, (e) => e.id !== item.id),
            item
         ]
      })
   }

   // id.videoId || snippet.resourceId.videoId

   useEffect(() => {
      if (queue.length > 0) {
         console.log('item', item);

         const isInQueue = queue.some(i => {
            return i.id === item.id.videoId || item.snippet.resourceId.videoId
         })
         console.log(isInQueue);
         if (isInQueue) {
            setAddedIcon(true)
         }
      }
   }, [queue])

   return (
      <>
         {added ?
            <img src={addedtoq} className="item-button" alt="" onClick={() => handleAdd(item)} />
            :
            <img src={addtoq} className="item-button" alt="" onClick={() => handleAdd(item)} />
         }
      </>
   )
}
