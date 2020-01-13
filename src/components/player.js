import React, { useState, useRef } from 'react'
import { useStateValue } from '../state'
import play from '../img/play.png'
import pause from '../img/pause.png'
import next from '../img/next.png'
import prev from '../img/prev.png'
import './components.css'
import up from '../img/up.png'
import down from '../img/down.png'
import ReactPlayer from 'react-player'

export default function MiniDisplay() {
   const [{ components, display }, dispatch] = useStateValue()
   const [played, setPlayed] = useState(0)
   const [playing, setPlaying] = useState(false)
   const [startTime] = useState(0)
   const [volume, setVolume] = useState(40)
   const [seeking, setSeeking] = useState(false)

   const toggleFull = () => {
      dispatch({
         type: 'manage',
         components: {
            ...components,
            fullPlayer: !components.fullPlayer,
            results: false
         }
      })
   }

   const id = display.id
   const vidSrc = `https://www.youtube.com/embed/${id}?autoplay=1&start=${startTime}`
   // const title = display.title
   // const stats = null

   const playerRef = useRef(null)

   const handleSeekMouseDown = e => {
      setSeeking(true)
   }

   const handleSeekChange = e => {
      setPlayed(parseFloat(e.target.value))
   }

   const handleMouseUp = e => {
      setSeeking(false)
      playerRef.current.seekTo(parseFloat(e.target.value))

   }

   const handleProgress = () => {
      if (!seeking) {
         // setPlayed(played)
      }
   }
   return (
      <>
         <div className={components.fullPlayer ? "player-frame" : "player-frame-hide"}>
            <h1 className="player-header">{display.title}</h1>
            <ReactPlayer
               ref={playerRef}
               url={vidSrc}
               playing={playing}
               volume={volume / 100}
               onProgress={handleProgress}
            />
         </div>
         <div className="player-display">
            <div className="player-pos">
               <div className="player-event"
                  onClick={toggleFull} >
                  {components.fullPlayer
                     ? <img src={down} alt="" />
                     : <img src={up} alt="" />
                  }
               </div>
            </div>
            <div className="player-title">
            </div>
            <input
               className="range-slider seek"
               type="range" min={0} max={1} step='any'
               value={played}
               onMouseDown={handleSeekMouseDown}
               onChange={handleSeekChange}
               onMouseUp={handleMouseUp}
            />
            <input type="range"
               className="range-slider volume"
               value={volume}
               onChange={(e) => setVolume(e.target.value)} />
            <div className="player-controls">
               <img src={prev} alt="" />
               {playing
                  ? <img src={pause} alt="" onClick={() => setPlaying(!playing)} />
                  : <img src={play} alt="" onClick={() => setPlaying(!playing)} />
               }
               <img src={next} alt="" />
            </div>
         </div>
      </>
   )
}
