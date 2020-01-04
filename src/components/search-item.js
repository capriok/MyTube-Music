import React from 'react'
import decoder from "./decoder"
import './components.css'

export default function SearchItem({ handleSelect, item }) {
   return (
      <div className="list-item" onClick={() => handleSelect(item)}>{decoder(item.snippet.title)}</div>
   )
}