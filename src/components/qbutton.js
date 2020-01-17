import React from 'react'
import { useStateValue } from '../state'
// import addtoq from '../img/addtoq.png'
import { remove } from 'lodash'
import addtoq from '../img/addtoq.png'
import addedtoq from '../img/addedtoq.png'

export default function Qbutton({ item }) {
   const [{ queue }, dispatch] = useStateValue()

   const handleAdd = (item) => {
      dispatch({
         type: 'addtoq',
         queue: [
            ...remove(queue, (e) => e.id !== item.id),
            item
         ]
      })
   }
   return (
      <>
         <img src={addtoq} className="item-button" alt="" onClick={() => handleAdd(item)} />
      </>
   )
}
