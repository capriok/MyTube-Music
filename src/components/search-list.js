import React from 'react'
import { useStateValue } from '../state'
import decoder from "./decoder"
import addtoq from '../img/addtoq.png'
import addedtoq from '../img/addedtoq.png'
import Qbutton from './qbutton'
import './components.css'


export default function SearchList({ items, submitState, vidActive }) {
   const [{ init, components, vidObj, playlistObj, display, queue }, dispatch] = useStateValue()

   const handleSelect = async (item) => {
      if (submitState === 'video') {
         console.log('selected', item);
         await dispatch({
            type: 'vidObj',
            vidObj: { videoId: item.id.videoId, channelTitle: item.snippet.channelTitle, snippet: item.snippet }
         })
         console.log(vidObj);
         await dispatch({
            type: 'manage',
            components: { ...components, audioState: true, fullPlayer: true }
         })
      } else if (submitState === 'playlist') {
         console.log('ITEM', item);
         dispatch({
            type: 'playlistObj',
            playlistObj: {
               ...playlistObj,
               playlistId: item.id.playlistId,
               channelId: item.snippet.channelId,
               playlistTitle: item.snippet.title,
               snippet: item.snippet
            }
         })
         await dispatch({
            type: 'manage',
            components: { ...components, playlistItems: true }
         })
      }
      else if (submitState === 'channel') {
         if (init) {
            localStorage.setItem('MT-channelid', item.snippet.channelId)
            window.location.href = '/'
         } else {
            localStorage.setItem('MT-channelid', item.snippet.channelId)
            await dispatch({
               type: 'channelObj', channelObj: { channelId: item.id.channelId, snippet: item.snippet }
            })
            await dispatch({
               type: 'select', display: { ...display, channelTitle: item.snippet.channelTitle }
            })
            await dispatch({
               type: 'manage',
               components: { ...components, playlistItems: false }
            })
         }
      }
   }

   return (
      <div className="item-list">
         {items.map((item, index) =>
            <div className="list-item" key={index}>
               <img className='list-item-thumb' onClick={() => handleSelect(item)} src={item.snippet.thumbnails.high.url} alt="" />
               <div className="item-title" onClick={() => handleSelect(item)}>{decoder(item.snippet.title)}</div>
               {vidActive &&
                  <Qbutton item={item} icon={queue.some(i => i.id === item.id) ? addedtoq : addtoq} />
               }
            </div>
         )}
      </div>
   )
}