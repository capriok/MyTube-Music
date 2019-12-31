import React from 'react'
import './components.css'
import PlayItem from './playitem'
import axios from 'axios'

export default function Playlist({ handleSelect, items }) {

   return (
      <div className="item-list" >
         {/* <>{items.map((item, index) => <PlayItem key={index} item={item} handleSelect={handleSelect} />)}</> */}
         {/* <div>{items.snippet.title}</div> */}
      </div>
   )
}