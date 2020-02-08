import React, { useState, useEffect } from 'react'
import { useStateValue } from '../state'
// import { useTransition, animated } from 'react-spring'
import { Transition } from 'react-spring/renderprops'
import youtube, { params } from '../components/apis/youtube'
import SearchList from './search-list'
import './components.css'
import _ from 'lodash'

export default function SearchForm({ fetchedSearch, setFetchedSearch }) {
  const [{ init, components, channelObj }, dispatch] = useStateValue()
  const initState = { video: false, playlist: false, channel: false }
  const [boxState, setBoxState] = useState(initState)
  const [vidActive, setActive] = useState(false)
  const [searchValue, setSearchValue] = useState('Kyle Caprio')
  const [searchOp, setSearchOp] = useState('video')
  const [submitState, setSubmitState] = useState()
  const handleSearch = async e => {
    e.preventDefault()
    if (searchValue) {
      await youtube
        .get('/search', {
          params: {
            type: searchOp,
            ...params.video,
            q: searchValue
          }
        })
        .then(res => {
          console.log('search', res)
          setFetchedSearch(res.data.items)
          dispatch({
            type: 'manage',
            components: { ...components, results: true }
          })
        })
        .catch(error => console.log(error))
    }
    boxState.video ? setActive(true) : setActive(false)
    var keys = _.keys(_.pickBy(boxState));
    setSubmitState(keys[0])
  }

  const handleOp = e => {
    const value = e.target.value
    setSearchOp(e.target.value)
    setBoxState({ ...initState, [value]: true })
  }

  useEffect(() => {
    setBoxState({ ...initState, video: true })
  }, [])

  useEffect(() => {
    if (channelObj.channelId) {
      dispatch({ type: 'init', init: false })
    } else {
      dispatch({ type: 'init', init: true })
      setBoxState({ ...initState, channel: true })
      setSearchOp('channel')
    }
  }, [])

  return (
    <div className='search-parent'>
      <div className='search-one'>
        <h1>Search</h1>
        <div className='search-ops'>
          <div className='ops-float'>
            {!init &&
              <>
                <button
                  className={!boxState.video ? 'op-box' : 'op-box active'}
                  value='video' onClick={handleOp}>
                  Video
                </button>
                <button
                  className={!boxState.playlist ? 'op-box' : 'op-box active'}
                  value='playlist'
                  onClick={handleOp}>
                  Playlist
            </button>
              </>
            }
            <button
              className={!boxState.channel ? 'op-box' : 'op-box active'}
              value='channel'
              onClick={handleOp}>
              Channel
            </button>
          </div>
        </div>
        <form className='search-form'>
          <div className='input-form'>
            <input type='text' onChange={e => setSearchValue(e.target.value)} placeholder='Search' />
            <button onClick={handleSearch}>GO</button>
          </div>
        </form>
      </div>
      {components.results && (
        <div className='search-two'>
          <Transition
            items={components.results}
            from={{ position: 'relative', marginTop: -100, opacity: 0 }}
            enter={{ position: 'relative', marginTop: 0, opacity: 1 }}
            leave={{ position: 'relative', marginTop: -500, opacity: 0 }}
            config={{ duration: 200 }}>
            {results =>
              results &&
              (props => (
                <div style={props}>
                  <SearchList
                    items={fetchedSearch}
                    submitState={submitState}
                    vidActive={vidActive}
                  />
                </div>
              ))
            }
          </Transition>
        </div>
      )}
    </div>
  )
}
