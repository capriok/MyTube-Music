import React, { useState, useEffect } from 'react'
import { useStateValue } from '../state'
import { remove } from 'lodash'

export default function Qbutton({ item, icon }) {
  const [{ components, queue }, dispatch] = useStateValue()

  const handleAdd = async item => {
    await dispatch({
      type: 'addtoq',
      queue: [...remove(queue, e => e.id !== item.id), item]
    })
    await dispatch({
      type: 'manage',
      components: {
        ...components,
        queue: true
      }
    })
  }

  return (
    <>
      <img
        src={icon}
        className='item-button'
        alt=''
        onClick={() => handleAdd(item)}
      />
    </>
  )
}
