import React, { useEffect } from 'react'
import decoder from './decoder'
import { useStateValue } from '../state'

export default function SelectedDisplay() {
   const [{ result }, dispatch] = useStateValue()

   useEffect(() => {
      console.log('selected', result);
   }, [result])


   const id = result.id
   const vidSrc = `https://www.youtube.com/embed/${id}`
   const title = result.title
   const stats = null
   const description = result.description

   return (
      <>
         <iframe className="display-frame" title='player' src={vidSrc} frameBorder="0"></iframe>
         <h2 className="display-title">{decoder(title)}</h2>
         <div className="display-details">
            <p>{stats}</p>
            {/* <p>{description}</p> */}
         </div>
      </>
   )
}
