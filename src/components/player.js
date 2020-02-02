import React, { useState, useEffect, useRef } from 'react'
import { useStateValue } from '../state'
import ReactPlayer from 'react-player'
import { tail } from 'lodash'
import play from '../img/play.png'
import pause from '../img/pause.png'
import next from '../img/next.png'
import prev from '../img/prev.png'
import up from '../img/up.png'
import down from '../img/down.png'
import './components.css'

export default function MiniDisplay() {
  const [{ components, queue, display }, dispatch] = useStateValue()
  const [qLen, setQlen] = useState(0)
  const [played, setPlayed] = useState(0)
  const [startTime] = useState(0)
  const [volume, setVolume] = useState(0)
  const [seeking, setSeeking] = useState(false)
  // const player = components.fullPlayer
  // const published = display.publishedAt
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
  let vidSrc = `https://www.youtube.com/embed/${id}?autoplay=1&start=${startTime}`

  const playerRef = useRef(null)

  const handlePlay = async () => {
    if (display.id) {
      await dispatch({
        type: 'manage',
        components: { ...components, audioState: !components.audioState }
      })
    }
    if (queue.length > 0 && !display.id) {
      await dispatch({
        type: 'select',
        display: {
          ...display,
          title: queue[0].snippet.title,
          id: queue[0].id.videoId || queue[0].snippet.resourceId.videoId,
          channelTitle: queue[0].snippet.channelTitle
        }
      })
      await dispatch({
        type: 'manage',
        components: {
          ...components,
          audioState: true,
          fullPlayer: true
        }
      })
      const newQueue = tail(queue)
      await dispatch({
        type: 'addtoq',
        queue: newQueue
      })
    }
  }

  const handleSeekMouseDown = e => {
    setSeeking(true)
  }

  const handleSeekChange = e => {
    if (display.id) {
      setPlayed(parseFloat(e.target.value))
    }
  }

  const handleMouseUp = e => {
    setSeeking(false)
    playerRef.current.seekTo(parseFloat(e.target.value))
  }

  const handleProgress = state => {
    //returns callback data as state
    if (!seeking) {
      setPlayed(state.played)
    }
  }

  const handleEnd = async () => {
    const nextTrack = queue[0]
    console.log('nextTrack', nextTrack)
    await dispatch({
      type: 'select',
      display: {
        ...display,
        title: nextTrack.snippet.title,
        id: nextTrack.id.videoId || nextTrack.snippet.resourceId.videoId
      }
    })
    const newQueue = tail(queue)
    console.log('newQueue', newQueue)
    await dispatch({
      type: 'addtoq',
      queue: newQueue
    })
  }

  // useEffect(() => {
  //   setQlen(queue.length)
  //   if (queue.length !== qLen) {
  //     console.log('newQueue', queue)
  //   }
  // }, [queue])

  return (
    <>
      {components.fullPlayer && <div className='player-header'><h2>{display.title}</h2></div>}
      <div className={components.fullPlayer ? 'player-frame' : 'player-frame-hide'}>
        <ReactPlayer
          ref={playerRef}
          url={vidSrc}
          playing={playing}
          volume={volume / 100}
          onProgress={handleProgress}
          onEnded={handleEnd}
        />
      </div>
      <div className='player-display'>
        <div className='player-event' onClick={toggleFull}>
          {components.fullPlayer
            ? <img src={down} alt='' />
            : <img src={up} alt='' />
          }
        </div>
        <div className='player-title'></div>
        <input
          className='range-slider seek'
          type='range'
          min={0}
          max={1}
          step='any'
          value={played}
          onMouseDown={handleSeekMouseDown}
          onChange={handleSeekChange}
          onMouseUp={handleMouseUp}
        />
        <input
          type='range'
          className='range-slider volume'
          value={volume}
          onChange={e => setVolume(e.target.value)}
        />
        <div className='player-controls'>
          <img src={prev} alt='' />
          {components.audioState ? (
            <img src={pause} alt='' onClick={() =>
              dispatch({
                type: 'manage', components: { ...components, audioState: !components.audioState }
              })
            }
            />
          ) : (
              <img src={play} alt='' onClick={handlePlay} />
            )}
          <img src={next} onClick={handleEnd} alt='' />
        </div>
      </div>
    </>
  )
}
