import React, { useEffect } from 'react'
import { useStateValue } from '../state'
import decoder from "./decoder"
import addtoq from '../img/addtoq.png'
import addedtoq from '../img/addedtoq.png'
import Qbutton from './qbutton'
import './components.css'


export default function SearchList({ items, activeState, isActive, setTitle }) {
   const [{ init, components, display, queue }, dispatch] = useStateValue()
   const activity = activeState

   const handleSelect = async (item) => {
      const video = activity.video
      const playlist = activity.playlist
      const channel = activity.channel
      if (video) {
         console.log('selected', item);
         await dispatch({
            type: 'select',
            display: {
               title: item.snippet.title,
               id: item.id.videoId,
               channelTitle: item.snippet.channelTitle,
            }
         })
         await dispatch({
            type: 'manage',
            components: {
               ...components,
               audioState: true,
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
               results: true,
               playlist: true
            }
         })
      }
      else if (channel) {
         if (init) {
            localStorage.setItem('MT-channelid', item.snippet.channelId)
            window.location.href = '/'
            console.log(item.snippet.channelTitle);
            setTitle(item.snippet.channelTitle)

         } else {
            setTitle(item.snippet.channelTitle)
            await dispatch({ type: 'cId', channelId: item.snippet.channelId })
            await dispatch({ type: 'select', display: { ...display, channelTitle: item.snippet.channelTitle } })
            await dispatch({
               type: 'manage',
               components: {
                  ...components,
                  results: true,
                  playlist: true
               }
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