import React from 'react'
import './components.css'
import PlaylistItem from './playlistitem'

export default function PlaylistList({ playlistSelect, items }) {
   return (
      <div className="item-list">
         <>{items.map((item, index) => <PlaylistItem key={index} item={item} playlistSelect={playlistSelect} />)}</>
      </div>
   )
}