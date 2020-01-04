import React from 'react'
import { useStateValue } from '../state'
import decoder from "./decoder"
import './components.css'

export default function SearchList({ items, toDisplay, setPlaylistsOpen }) {
   const [, dispatch] = useStateValue()

   const handleSelect = (item) => {
      setPlaylistsOpen(false)
      dispatch({
         type: 'select',
         display: {
            title: item.snippet.title,
            id: item.id.videoId,
            description: item.snippet.description,
            thumb: item.snippet.thumbnails.high
         }
      })
      toDisplay(true)
   }

   return (
      <div className="item-list">
         {items.map((item, index) =>
            <div className="list-item" key={index} onClick={() => handleSelect(item)}>{decoder(item.snippet.title)}</div>
         )}
      </div>
   )
}