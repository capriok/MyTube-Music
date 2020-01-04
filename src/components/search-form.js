import React, { useState } from 'react'
import './components.css'
import youtube, { params } from "../components/apis/youtube"

export default function SearchForm({ setSearchItemsOpen, setFetchedSearch }) {
   const [searchValue, setSearchValue] = useState('beico')

   const handleSearch = async (e) => {
      e.preventDefault()
      if (searchValue) {
         await youtube
            .get("/search", {
               params: {
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
      setSearchItemsOpen(true)
   }


   return (
      <form className="search-form">
         <input type="text" onChange={e => setSearchValue(e.target.value)} placeholder="Search" />
         <button onClick={handleSearch}>GO</button>
      </form>
   )
}
