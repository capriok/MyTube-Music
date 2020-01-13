import React from 'react'
import { useStateValue } from '../state'
import decoder from "./decoder"
import './components.css'

export default function SearchList({ items, activeState }) {
   const [components, dispatch] = useStateValue()

   const activity = activeState

   const handleSelect = async (item) => {
      console.log(activity);
      const video = activity.video
      const playlist = activity.playlist

      if (video) {
         console.log('video fired');
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
               search: true,
               results: false,
               miniPlayer: true,
               fullPlayer: true,
               playlist: true
            }
         })
      } else if (playlist) {
         console.log('playlist fired');

         await dispatch({
            type: 'pId', playlistObj: {
               id: item.id.playlistId,
               snippet: item.snippet
            }
         })
         await dispatch({
            type: 'manage',
            components: {
               ...components,
               search: true,
               results: true,
               miniPlayer: true,
               fullPlayer: false,
               playlist: true
            }
         })
      }
   }

   return (
      <div className="item-list">
         {items.map((item, index) =>
            <div className="list-item" key={index}
               onClick={() => handleSelect(item)}
            >
               {/* <img src={item.snippet.thumbnails.medium} alt="" /> */}
               {decoder(item.snippet.title)}

            </div>
         )
         }
         <div className="list-item" onClick={handleSelect}>test</div>
         <div className="list-item" onClick={handleSelect}>test</div>
         <div className="list-item" onClick={handleSelect}>test</div>
         <div className="list-item" onClick={handleSelect}>test</div>
         <div className="list-item" onClick={handleSelect}>test</div>
      </div >
   )
}