import React, { useState, useEffect } from 'react'
import { useStateValue } from '../state'
import './components.css'
import youtube, { params } from "../components/apis/youtube"
import SearchList from './search-list'

export default function SearchForm({ setFetchedSearch, fetchedSearch }) {
   const [{ components }, dispatch] = useStateValue()
   const initState = { video: false, playlist: false, channel: false }
   const [boxState, setBoxState] = useState(initState)
   const [searchValue, setSearchValue] = useState('beico')
   const [searchOp, setSearchOp] = useState('video')

   const handleSearch = async (e) => {
      e.preventDefault()
      if (searchValue) {
         await youtube
            .get("/search", {
               params: {
                  type: searchOp,
                  ...params.video,
                  q: searchValue
               }
            })
            .then(res => {
               console.log('search', res);
               setFetchedSearch(res.data.items)
            })
            .catch(error => console.log(error))
      } else return
      dispatch({
         type: 'manage',
         components: {
            ...components,
            results: true,
         }
      })
   }

   const handleOp = (e) => {
      const value = e.target.value
      setSearchOp(e.target.value)
      setBoxState({ ...initState, [value]: true })
   }

   useEffect(() => {
      setBoxState({ ...initState, [searchOp]: true })
   }, [])


   return (
      <div className="search-parent">
         <div className="search-one">
            <h1>Search</h1>
            <div className="search-ops">
               <div className="ops-float">
                  <label>
                     <input type="checkbox" value="video" onChange={handleOp} checked={boxState.video} />
                     <span>Video</span>
                  </label>
                  <label>
                     <input type="checkbox" value="playlist" onChange={handleOp} checked={boxState.playlist} />
                     <span>Playlist</span>
                  </label>
                  <label>
                     <input type="checkbox" value="channel" onChange={handleOp} checked={boxState.channel} />
                     <span>Channel</span>
                  </label>
               </div>
            </div>
            <form className="search-form">
               <div className="input-form">
                  <input type="text" onChange={e => setSearchValue(e.target.value)} placeholder="Search" />
                  <button onClick={handleSearch}>GO</button>
               </div>
            </form>
         </div>
         {components.results &&
            <div className="search-two">
               <SearchList items={fetchedSearch} />
            </div>
         }
      </div>
   )
}
