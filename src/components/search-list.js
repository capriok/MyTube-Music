import React, { useEffect } from 'react'
import { useStateValue } from '../state'
import decoder from "./decoder"
import addtoq from '../img/addtoq.png'
import addedtoq from '../img/addedtoq.png'
import Qbutton from './qbutton'
import './components.css'


export default function SearchList({ items, activeState, isActive, setTitle }) {
   const [{ init, components, vidObj, display, queue }, dispatch] = useStateValue()
   const activity = activeState

   const handleSelect = async (item) => {
      const video = activity.video
      const playlist = activity.playlist
      const channel = activity.channel
      if (video) {
         console.log('selected', item);
         await dispatch({
            type: 'vidObj',
            vidObj: { videoId: item.id.videoId, channelTitle: item.snippet.channelTitle, snippet: item.snippet }
         })
         console.log(vidObj);
         await dispatch({
            type: 'manage',
            components: { ...components, audioState: true, fullPlayer: true, playlist: true }
         })
      } else if (playlist) {
         dispatch({
            type: 'playlistObj',
            playlistObj: { playlistId: item.id.playlistId, channelId: item.snippet.channelId, snippet: item.snippet }
         })
         await dispatch({
            type: 'manage',
            components: { ...components, results: true, playlist: true }
         })
      }
      else if (channel) {
         if (init) {
            localStorage.setItem('MT-channelid', item.snippet.channelId)
            window.location.href = '/'
         } else {
            await dispatch({
               type: 'channelObj',
               channelObj: { channelId: item.id.channelId, snippet: item.snippet }
            })
            await dispatch({ type: 'select', display: { ...display, channelTitle: item.snippet.channelTitle } })
            await dispatch({
               type: 'manage',
               components: { ...components, results: true, playlistItems: false }
            })
         }
      }
   }

   return (
      <div className="item-list">
         {items.map((item, index) =>
            <div className="list-item" key={index}>
               <div className="item-title" onClick={() => handleSelect(item)}>{decoder(item.snippet.title)}</div>
               {isActive &&
                  <Qbutton item={item} icon={queue.some(i => i.id === item.id) ? addedtoq : addtoq} />
               }
            </div>
         )}
      </div>
   )
}