import React from 'react'

export default function ItemDisplay() {
   return (
      <div className="item-display">
         <div className="item-embed">
            <iframe src="https://www.youtube.com/embed/pikItut56FY?list=RDyEbrvMljMCg" frameBorder="0"></iframe>
         </div>
         <p className="item-title">Title</p>
         <p className="item-details">
            <span>description</span><br />
            <span>statistics</span>
         </p>
      </div>
   )
}