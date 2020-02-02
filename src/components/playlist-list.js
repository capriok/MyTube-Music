import React, { useState, useEffect } from 'react'
import { useStateValue } from '../state'
import youtube, { params } from "./apis/youtube"
import SectionHead from './playlist-head'
import addtoq from '../img/addtoq.png'
import addedtoq from '../img/addedtoq.png'
import Qbutton from './qbutton'
import './components.css'

export default function PlaylistList({ fetchedPlaylists, fetchError }) {
   const [{ components, queue, playlistObj, auth }, dispatch] = useStateValue()
   const [playlistItems, setPlaylistItems] = useState([])
   const [sectionTitle, setTitle] = useState(JSON.parse(auth.user).name)

   const playlistSelect = async (item) => {
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
      setTitle(item.snippet.title)
   }

   const itemSelect = async (item) => {
      console.log('selected', item);
      await dispatch({
         type: 'select',
         display: {
            title: item.snippet.title,
            id: item.snippet.resourceId.videoId,
            description: item.snippet.description,
            thumb: item.snippet.thumbnails.high
         }
      })
      await dispatch({
         type: 'manage',
         components: {
            ...components,
            audioState: true,
            results: false,
            fullPlayer: true,
            playlist: true,
         }
      })
   }


   useEffect(() => {
      if (playlistObj.id) {
         const setPlaylist = async () => {
            // const prevId = localStorage.getItem('YT-prevPlaylistId')
            const id = playlistObj.id
            await youtube
               .get('/playlistItems', {
                  params: {
                     ...params.playlistItems,
                     playlistId: id
                  }
               })
               .then(res => setPlaylistItems(res.data.items))
               .catch(error => console.log(error))
            dispatch({ type: 'manage', components: { ...components, playlistItems: true } })
            setTitle(playlistObj.snippet.title)
            console.log('playlistObj', playlistObj);
         }
         setPlaylist()
      }
   }, [playlistObj])

   return (
      <>
         <div className="playlit-parent">
            <div className="playlist-one">
               <h1>
                  <SectionHead updateTitle={setTitle} />
                  {sectionTitle}
               </h1>
            </div>
            <div className="playlist-two">
               <div className="item-list">
                  {!components.playlistItems
                     ? fetchedPlaylists.map((item, index) =>
                        <div className="list-item" key={index} onClick={() => playlistSelect(item)}>
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