import React from 'react'
import './components.css'
import SearchItem from './searchitem'

export default function SearchList({ handleSelect, items }) {

   return (
      <div className="item-list">
         <>{items.map((item, index) => <SearchItem key={index} item={item} handleSelect={handleSelect} />)}</>
      </div>
   )
}