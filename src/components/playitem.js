import React from 'react'
// import decoder from "./decoder"
import './components.css'

export default function PlayItem({ handleSelect, item }) {
   return (
      <div className="list-item" onClick={() => handleSelect(item)}>
         <div>{item.snippet.title}</div>
      </div>
   )
}