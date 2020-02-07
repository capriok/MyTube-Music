import React, { useState } from 'react'
import { useStateValue } from '../state'
import backIcon from '../img/back.png'
import urlIcon from '../img/url.png'

export default function SectionHead({ updateTitle }) {
   const [{ components, channelObj }, dispatch] = useStateValue()
   const [displayUrlField, toDisplayUrlField] = useState(false)
   const [value, setValue] = useState('aah')

   const handleSubmit = (e) => {
      try {
         e.preventDefault()
         dispatch({ type: 'cId', channelId: value })
         localStorage.setItem('MT-channelid', value)
         dispatch({ type: 'channelObj', channelObj: { ...channelObj, channelId: value } })
         console.log('Channel Id -> ', value);
      } catch (error) {
         console.log(error);
      }
   }
   return (
      <div className="playlist-pos">
         {components.playlistItems
            ? <div className="playlist-event" onClick={() => {
               dispatch({
                  type: 'manage', components: { ...components, playlistItems: false }
               })
            }}>
               <img src={backIcon} alt="" /></div>
            : <>
               <div className="playlist-url"  >
                  <img src={urlIcon} alt="" onClick={() => toDisplayUrlField(!displayUrlField)} />
                  {displayUrlField &&
                     <form onSubmit={handleSubmit}>
                        <input type="text"
                           placeholder="Default channel ID"
                           onChange={e => setValue(e.target.value)}
                           autoFocus={true} />
                     </form>
                  }
               </div>
            </>
         }
      </div>
   )
}
