import React from 'react'
import { useStateValue } from '../state'
import decoder from "./decoder"
import './components.css'
import Qbutton from './qbutton'

export default function SearchList({ items, activeState }) {
   const [components, dispatch] = useStateValue()

   const activity = activeState

   const handleSelect = async (item) => {
      const video = activity.video
      const playlist = activity.playlist
      if (video) {
         console.log('selected', item);
         await dispatch({
            type: 'select',
            display: {
               title: item.snippet.title,
               id: item.id.videoId,
               channelTitle: item.snippet.channelTitle,
               publishedAt: item.snippet.publishedAt
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
            <div className="list-item" key={index}>
               <div className="item-title" onClick={() => handleSelect(item)}>{decoder(item.snippet.title)}</div>
               <Qbutton />
               {/* <img src={item.snippet.thumbnails.high.url} alt="" /> */}
            </div>
         )}
      </div >
   )
}