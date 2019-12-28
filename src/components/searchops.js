import React from 'react'
import './components.css'

export default function SearchOps() {
   return (
      <div className="search-ops">
         <div className="ops-center">
            <label><input type="checkbox" /><span>Channel</span></label>
            <label><input type="checkbox" /><span>Video</span></label>
         </div>
      </div>
   )
}
