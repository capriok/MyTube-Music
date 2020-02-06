import React, { useState, useEffect } from 'react'
import { useStateValue } from '../state'
import youtube, { params } from "./apis/youtube"
import SectionHead from './playlist-head'
import addtoq from '../img/addtoq.png'
import addedtoq from '../img/addedtoq.png'
import Qbutton from './qbutton'
import './components.css'
import Axios from 'axios'

export default function PlaylistList({ fetchedPlaylists, fetchError, sectionTitle, setTitle }) {
   const [{ components, queue, vidObj, playlistObj, channelObj }, dispatch] = useStateValue()
   const [playlistItems, setPlaylistItems] = useState([])

   const fetchPlaylistItemsByPlaylistId = async (item) => {
      await youtube
         .get('/playlistItems', {
            params: {
               ...params.playlistItems,
               playlistId: item.id.playlistId
            }
         })
         .then(res => setPlaylistItems(res.data.items))
         .catch(error => console.log(error))
      dispatch({ type: 'manage', components: { ...components, playlistItems: true } })
      console.log(playlistItems);
   }

   const itemSelect = async (item) => {
      console.log('selected', item);
      await dispatch({
         type: 'vidObj',
         vidObj: {
            videoId: item.snippet.resourceId.videoId,
            channelId: item.snippet.channelId,
            snippet: item.snippet
         }
      })
      await dispatch({
         type: 'manage',
         components: {
            ...components,
            audioState: true,
            fullPlayer: true,
            playlist: true,
         }
      })
   }


   useEffect(() => {
      if (playlistObj.playlistId) {
         const setPlaylist = async () => {
            const id = playlistObj.playlistId
            await youtube
               .get('/playlistItems', {
                  params: {
                     ...params.playlistItems,
                     playlistId: id
                  }
               })
               .then(res => setPlaylistItems(res.data.items))
               .catch(error => console.log(error))
         }
         setPlaylist()
      }
   }, [playlistObj])

   return (
      <>
         <div className="playlist-parent">
            <div className="playlist-one">
               <h1>
                  <SectionHead />
                  {components.playlistItems
                     ? playlistObj.snippet.title
                     : playlistObj.snippet.channelTitle
                  }
               </h1>
            </div>
            <div className="playlist-two">
               <div className="item-list">
                  {!components.playlistItems
                     ? fetchedPlaylists.map((item, index) =>
                        <div className="list-item" key={index} onClick={() => fetchPlaylistItemsByPlaylistId(item)}>
                           {/* <img src={item.snippet.thumbnails.high.url} alt="" /> */}
                           <div className="item-title">{item.snippet.title}</div>
                        </div>
                     )
                     : playlistItems.map((item, index) =>
                        <div className="list-item" key={index}>
                           <div className="item-title" onClick={() => itemSelect(item)}>{item.snippet.title}</div>
                           <Qbutton className="item-button" item={item}
                              icon={queue.some(i => i.id === item.id) ? addedtoq : addtoq} />
                        </div>
                     )
                  }
                  {!components.playlistItems && fetchError &&
                     <div className="list-item"><span className="item-title error">No playlists found</span></div>
                  }
               </div>
            </div>
         </div>
      </>
   )
}