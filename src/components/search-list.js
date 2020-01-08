import React from 'react'
import { useStateValue } from '../state'
import decoder from "./decoder"
import './components.css'

export default function SearchList({ items }) {
   const [components, dispatch] = useStateValue()

   const handleSelect = async (item) => {
      await dispatch({
         type: 'select',
         display: {
            title: item.snippet.title,
            id: item.id.videoId,
            description: item.snippet.description,
            thumb: item.snippet.thumbnails.high
         }
      })
      await dispatch({
         type: 'manage',
         components: {
            ...components,
            results: false,
            miniPlayer: true,
            fullPlayer: true,
            playlist: true
         }
      })
   }

   return (
      <div className="item-list">
         {/* <div className="list-item" onClick={handleSelect}>song</div>
         <div className="list-item" onClick={handleSelect}>song</div>
         <div className="list-item" onClick={handleSelect}>song</div>
         <div className="list-item" onClick={handleSelect}>song</div>
         <div className="list-item" onClick={handleSelect}>song</div> */}
         {items.map((item, index) =>
            <div className="list-item" key={index}
               onClick={() => handleSelect(item)}
            >
               {decoder(item.snippet.title)}
            </div>
         )}
      </div>
   )
}