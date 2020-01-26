import React, { useState, useEffect } from 'react'
import { useStateValue } from './state'
import './component-test.css'

export default function AppTest() {
  const [{ queue }, dispatch] = useStateValue()
  const [items, setItems] = useState(queue)
  const [draggedItem, setDraggedItem] = useState()
  const [draggedOverItem, setDraggedOverItem] = useState()

  const onDrag = (e, index) => {
    setDraggedItem(items[index])
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/html', e.target.parentNode)
    e.dataTransfer.setDragImage(e.target.parentNode, 100, 100)
  }

  const onDragOver = index => {
    setDraggedOverItem(items[index])
    if (draggedItem === draggedOverItem) {
      return
    }
    let newItems = items.filter(item => item !== draggedItem)
    newItems.splice(index, 0, draggedItem)
    setItems(newItems)
    dispatch({ type: 'addtoq', queue: newItems })
  }

  useEffect(() => {
    setItems(queue)
  }, [queue])

  useEffect(() => {
    onDragOver()
  }, [draggedOverItem])

  return (
    <>
      {items.slice(0, 8).map((item, idx) => (
        <li
          key={idx}
          draggable
          className='queue-li'
          onDragStart={e => onDrag(e, idx)}
          onDragOver={() => onDragOver(idx)}>
          <div
            draggable
            className='queue-item'
            onDragStart={e => onDrag(e, idx)}
            onDragEnd={() => {
              console.log('newQueue', queue)
            }}>
            <img src={item.snippet.thumbnails.medium.url} alt='' />
          </div>
        </li>
      ))}
    </>
  )
}
