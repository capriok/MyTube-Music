import React from 'react'
import './components.css'

export default function SearchForm({ setSearch, handleSearch }) {
   return (
      <form className="search-form">
         <input type="text" onChange={e => setSearch(e.target.value)} placeholder="Search" />
         <button onClick={handleSearch}>GO</button>
      </form>
   )
}
