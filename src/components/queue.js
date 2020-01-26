import React, { useState, useEffect } from 'react'
import { useStateValue } from '../state'

export default function AppTest() {
  const [{ queue }, dispatch] = useStateValue()
  const [items, setItems] = useState(queue)
  const [dragging, isDragging] = useState(true)
  const [draggedItem, setDraggedItem] = useState()
  const [draggedOverItem, setDraggedOverItem] = useState()

  const onDragStart = (e, index) => {
    isDragging(true)
    setDraggedItem(items[index])
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/html', e.target.parentNode)
    e.dataTransfer.setDragImage(e.target.parentNode, 39, 20)
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

  const onDragEnd = e => {
    isDragging(false)
    console.log('newQueue', queue)
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
          draggable={true}
          className='queue-li'
          onDragStart={e => onDragStart(e, idx)}
          onDragOver={() => onDragOver(idx)}
          onDragEnd={e => onDragEnd(e)}>
          <div
            draggable={true}
            className='queue-item'
            onDragStart={e => onDragStart(e, idx)}
            onDragEnd={e => onDragEnd(e)}>
            <img src={item.snippet.thumbnails.medium.url} alt='' />
          </div>
        </li>
      ))}
    </>
  )
}
