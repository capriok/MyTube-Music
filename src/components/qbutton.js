import React from 'react'
import { useStateValue } from '../state'
// import addtoq from '../img/addtoq.png'
import { remove } from 'lodash'

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
         <button value="" className="item-button" onClick={() => handleAdd(item)}>
            {/* <img src={addtoq} alt="" /> */}
            Q
         </button>
      </>
   )
}
