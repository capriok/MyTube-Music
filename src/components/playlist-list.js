import React, { useState } from 'react'
import { useStateValue } from '../state'
import youtube, { params } from "./apis/youtube"
import SectionHead from './section-head'
import './components.css'

export default function PlaylistList({ fetchedPlaylists, toDisplay }) {
   const [{ playlistId }, dispatch] = useStateValue()
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
      setTitle(item.snippet.title)
      toDisplayItems(true)
   }

   const handleSelect = (item) => {
      dispatch({
         type: 'select',
         display: {
            title: item.snippet.title,
            id: item.snippet.resourceId.videoId,
            description: item.snippet.description,
            thumb: item.snippet.thumbnails.high
         }
      })
      toDisplay(true)
   }
   return (
      <>
         <SectionHead goBack={toDisplayItems} displayItems={displayItems} />
         <h1 className="section-title">{displayItems ? sectionTitle : 'Playlists'}</h1>
         <div className="item-list">
            {!displayItems ?
               fetchedPlaylists.map((item, index) =>
                  <div className="list-item" key={index} onClick={() => playlistSelect(item)}>
                     <div>{item.snippet.title}</div>
                  </div>)
               :
               playlistItems.map((item, index) =>
                  <div className="list-item" key={index} onClick={() => handleSelect(item)}>
                     <div>{item.snippet.title}</div>
                  </div>)
            }
         </div>
      </>
   )
}