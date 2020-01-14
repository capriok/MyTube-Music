import React, { useState, useEffect } from 'react'
import { useStateValue } from '../state'
import youtube, { params } from "./apis/youtube"
import SectionHead from './playlist-head'
import './components.css'

export default function PlaylistList({ fetchedPlaylists }) {
   const [{ components, playlistObj }, dispatch] = useStateValue()
   const [playlistItems, setPlaylistItems] = useState([])
   const [displayItems, toDisplayItems] = useState(false)
   const [sectionTitle, setTitle] = useState()

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
      toDisplayItems(true)
      setTitle(item.snippet.title)
   }

   const itemSelect = (item) => {
      console.log('selected', item);

      dispatch({
         type: 'select',
         display: {
            title: item.snippet.title,
            id: item.snippet.resourceId.videoId,
            description: item.snippet.description,
            thumb: item.snippet.thumbnails.high
         }
      })
      dispatch({
         type: 'manage',
         components: {
            ...components,
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
            toDisplayItems(true)
            setTitle(playlistObj.snippet.title)
            console.log('playlistObj', playlistObj);
         }
         setPlaylist()
      }
   }, [playlistObj])

   return (
      <>
         <SectionHead goBack={toDisplayItems} displayItems={displayItems} />
         <h1 className="playlist-title">{displayItems ? sectionTitle : 'Playlists'}</h1>
         <div className="item-list">
            {!displayItems ?
               fetchedPlaylists.map((item, index) =>
                  <div className="list-item" key={index} onClick={() => playlistSelect(item)}>
                     <div>{item.snippet.title}</div>
                  </div>)
               :
               playlistItems.map((item, index) =>
                  <div className="list-item" key={index} onClick={() => itemSelect(item)}>
                     <div>{item.snippet.title}</div>
                  </div>)
            }
         </div>
      </>
   )
}