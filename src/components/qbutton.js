import React, { useState, useEffect } from 'react'
import { useStateValue } from '../state'
import { remove } from 'lodash'

export default function Qbutton({ item, icon }) {
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
         <img src={icon} className="item-button" alt="" onClick={() => handleAdd(item)} />
      </>
   )
}
