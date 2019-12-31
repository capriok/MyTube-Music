import React from 'react'
// import decoder from "./decoder"
import './components.css'

export default function PlaylistItem({ playlistSelect, item }) {
   return (
      <div className="list-item" onClick={() => playlistSelect(item)}>
         <div>{item.snippet.title}</div>
      </div>
   )
}