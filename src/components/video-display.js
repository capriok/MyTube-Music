import React, { useEffect } from 'react'
import decoder from './decoder'
import { useStateValue } from '../state'

export default function SelectedDisplay() {
   const [{ display }] = useStateValue()
   // const [startTime, setStartTime] = useState('20')

   useEffect(() => {
      console.log('playing', display.title);
   }, [display])

   const id = display.id
   const vidSrc = `https://www.youtube.com/embed/${id}?autoplay=1&start=${'20'}`
   const title = display.title
   const stats = null


   return (
      <>
         <iframe className="display-frame"
            src={vidSrc}
            title='player'
            allow="autoplay; fullscreen"
            frameBorder="0"
         />
         <h2 className="display-title">{decoder(title)}</h2>
         <div className="display-details">
            <p>{stats}</p>
            {/* <p>{description}</p> */}
         </div>
      </>
   )
}
