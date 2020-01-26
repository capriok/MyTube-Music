import React, { useState, useEffect } from 'react'
import { useStateValue } from '../state'
import { Transition } from 'react-spring/renderprops'
import youtube, { params } from '../components/apis/youtube'
import SearchList from './search-list'
import './components.css'

export default function SearchForm({ fetchedSearch, setFetchedSearch }) {
  const [{ components }, dispatch] = useStateValue()
  const initState = { video: false, playlist: false, channel: false }
  const [boxState, setBoxState] = useState(initState)
  const [isActive, setActive] = useState(false)
  const [searchValue, setSearchValue] = useState('dark tech channel')
  const [searchOp, setSearchOp] = useState('video')
  const results = components.results
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
        })
        .catch(error => console.log(error))
    } else return
    dispatch({
      type: 'manage',
      components: {
        ...components,
        search: true,
        results: true,
        fullPlayer: false
      }
    })
    boxState.video ? setActive(true) : setActive(false)
  }

  const handleOp = e => {
    const value = e.target.value
    setSearchOp(e.target.value)
    setBoxState({ ...initState, [value]: true })
  }

  useEffect(() => {
    setBoxState({ ...initState, [searchOp]: true })
  }, [])

  return (
    <div className='search-parent'>
      <div className='search-one'>
        <h1>Search</h1>
        <div className='search-ops'>
          <div className='ops-float'>
            <button
              className={!boxState.video ? 'op-box' : 'op-box active'}
              value='video'
              onClick={handleOp}>
              Video
            </button>
            <button
              className={!boxState.playlist ? 'op-box' : 'op-box active'}
              value='playlist'
              onClick={handleOp}>
              Playlist
            </button>
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
            <input
              type='text'
              onChange={e => setSearchValue(e.target.value)}
              placeholder='Search'
            />
            <button onClick={handleSearch}>GO</button>
          </div>
        </form>
      </div>
      {components.results && (
        <div className='search-two'>
          <Transition
            items={results}
            from={{ position: 'relative', top: '-10px', opacity: 0 }}
            enter={{ position: 'relative', top: '0px', opacity: 1 }}
            leave={{ position: 'relative', top: '-20px', opacity: 0 }}>
            {results =>
              results &&
              (props => (
                <div style={props}>
                  <SearchList
                    items={fetchedSearch}
                    activeState={boxState}
                    isActive={isActive}
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
