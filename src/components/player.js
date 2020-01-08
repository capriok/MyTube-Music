import React, { useState, useEffect, useRef } from 'react'
import { useStateValue } from '../state'
import play from '../img/play.png'
import pause from '../img/pause.png'
import next from '../img/next.png'
import prev from '../img/prev.png'
import './components.css'
import up from '../img/up.png'
import ReactPlayer from 'react-player'

export default function MiniDisplay() {
   const [{ components, display }, dispatch] = useStateValue()
   const [played, setPlayed] = useState(0)
   const [playing, setPlaying] = useState(true)
   const [startTime, setStartTime] = useState(0)
   const [volume, setVolume] = useState(0)
   const [seeking, setSeeking] = useState(false)

   //    useEffect(() => {
   //    console.log('playing', display.title);
   // }, [display])

   const toggleFull = () => {
      dispatch({
         type: 'manage',
         components: {
            ...components,
            fullPlayer: !components.fullPlayer
         }
      })
   }

   const id = display.id
   const vidSrc = `https://www.youtube.com/embed/rSbwMeoA1N4?autoplay=1&start=${startTime}`
   const title = display.title
   const stats = null

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
         setPlayed(played)
      }
   }
   return (
      <>
         <div className={components.fullPlayer ? "player-frame" : "player-frame-hide"}>
            <ReactPlayer
               ref={playerRef}
               url={vidSrc}
               playing={playing}
               volume={volume / 100}
               controls={true}
               onProgress={handleProgress}
            />
         </div>
         <div className="section-head">
            <div className="section-back"
               onClick={toggleFull} >
               <img src={up} alt="" />
            </div>
         </div>
         <div className="player-display">
            <div className="player-title">
               <h3>{display.title}</h3>
            </div>
            <input
               class="range-slider seek"
               type="range" min={0} max={1} step='any'
               value={played}
               onMouseDown={handleSeekMouseDown}
               onChange={handleSeekChange}
               onMouseUp={handleMouseUp}
            />
            <input type="range"
               class="range-slider volume"
               value={volume}
               onChange={(e) => setVolume(e.target.value)} />
            <div className="player-controls">
               <img src={prev} alt="" />
               {playing ?
                  <img src={pause}
                     alt=""
                     onClick={() => setPlaying(!playing)} /> :
                  <img
                     src={play}
                     alt=""
                     onClick={() => setPlaying(!playing)} />
               }
               <img src={next} alt="" />
            </div>
         </div>
      </>
   )
}
