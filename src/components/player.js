import React, { useState, useEffect, useRef } from 'react'
import { useStateValue } from '../state'
import play from '../img/play.png'
import pause from '../img/pause.png'
import next from '../img/next.png'
import prev from '../img/prev.png'
import './components.css'
import up from '../img/up.png'
import down from '../img/down.png'
import ReactPlayer from 'react-player'
import { Transition } from 'react-spring/renderprops'
import _ from 'lodash'

export default function MiniDisplay() {
   const [{ components, queue, display }, dispatch] = useStateValue()
   const [played, setPlayed] = useState(0)
   const [startTime] = useState(0)
   const [volume, setVolume] = useState(5)
   const [seeking, setSeeking] = useState(false)
   const player = components.fullPlayer
   const published = display.publishedAt
   const playing = components.audioState

   const toggleFull = () => {
      if (display.id) {
         dispatch({
            type: 'manage',
            components: {
               ...components,
               fullPlayer: !components.fullPlayer,
               results: false
            }
         })
      }
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

   useEffect(() => {
      const test = _.uniqBy(queue, (e) => e.id)
      console.log(test);
   }, [queue])

   return (
      <>
         {/* <Transition
            items={player}
            from={{ opacity: 0, }}
            enter={{ opacity: 1, }}
            leave={{ opacity: 0, }}>
            {player => player && (props => <div style={props}> */}
         <div className={components.fullPlayer ? "player-frame" : "player-frame-hide"}>
            <div className="player-header">
               <h2>{display.title}</h2>
            </div>
            <ReactPlayer
               ref={playerRef}
               url={vidSrc}
               playing={playing}
               volume={volume / 100}
            // onProgress={handleProgress}
            />
            <div className="player-desc"><span>{display.channelTitle}{published}</span></div>
         </div>
         {/* </div>)}
         </Transition> */}
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
               {components.audioState
                  ? <img src={pause} alt="" onClick={() => dispatch(
                     { type: 'manage', components: { ...components, audioState: !components.audioState } })} />
                  : <img src={play} alt="" onClick={() => dispatch(
                     { type: 'manage', components: { ...components, audioState: !components.audioState } })} />
               }
               <img src={next} alt="" />
            </div>
         </div>
      </>
   )
}
