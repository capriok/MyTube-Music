import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { useStateValue } from './state'
import GoogleLogin from 'react-google-login'
import youtube, { params } from './components/apis/youtube'
import playlisticon from './img/playlist.png'
import settingsicon from './img/settings.png'
import Navbar from './components/navbar'
import SearchForm from './components/search-form'
import Player from './components/player'
import Playlists from './components/playlist-list'
import Queue from './components/queue'
import './index.css'

export default function App({ googleSuccess, googleFailure, logout }) {
  const [
    { components, queue, auth, channelId, display },
    dispatch
  ] = useStateValue()
  const [fetchedSearch, setFetchedSearch] = useState([])
  const [fetchedPlaylists, setFetchedPlaylists] = useState([])
  const [fetchError, throwFetchError] = useState(false)
  //////////////////////////////////// COMPONENT STATES
  const initialComponentState = async () => {
    await dispatch({
      type: 'manage',
      components: {
        queue: false,
        audioState: false,
        search: true,
        results: false,
        miniPlayer: true,
        fullPlayer: false,
        playlist: true
      }
    })
  }
  //////////////////////////////////// USEEFFECT
  useEffect(() => {
    const token = localStorage.getItem('YTP-token')
    const user = localStorage.getItem('YTP-user')
    if (token !== null) {
      dispatch({
        type: 'login',
        auth: {
          isAuthenticated: true,
          token: token,
          user: user
        }
      })
    }
    const youtubePlaylists = async () => {
      await youtube
        .get('/search', {
          params: {
            ...params.playlist,
            channelId: channelId
          }
        })
        .then(res => {
          console.log('playlists', res.data.items)
          throwFetchError(false)
          setFetchedPlaylists(res.data.items)
          dispatch({
            type: 'manage',
            components: { ...components, playlistItems: false }
          })
          if (res.data.items.length === 0) {
            throwFetchError(true)
          } else {
            dispatch({
              type: 'select',
              display: {
                ...display,
                channelTitle: res.data.items[0].snippet.channelTitle
              }
            })
          }
        })
        .catch(error => console.log(error))
    }
    youtubePlaylists()
  }, [dispatch, channelId])

  useEffect(() => {
    if (queue.length < 1) {
      dispatch({
        type: 'manage',
        components: { ...components, queue: false }
      })
    }
  }, [queue])

  return (
    <div className='App'>
      <Navbar
        playlist={playlisticon}
        settings={settingsicon}
        initialComponentState={initialComponentState}
      />
      <div className='Main'>
        {!auth.isAuthenticated ? (
          <GoogleLogin
            clientId='455189255968-imf2slc5b11vjdbuq010k14rr9ccb76u.apps.googleusercontent.com'
            buttonText='LOGIN WITH GOOGLE'
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            className='login-button'
            theme='dark'
          />
        ) : (
          <Router>
            <Switch>
              <Route
                exact
                path='/'
                render={() => (
                  <>
                    <div className='section nav'></div>
                    {components.search && (
                      <div className='section search'>
                        <SearchForm
                          fetchedSearch={fetchedSearch}
                          setFetchedSearch={setFetchedSearch}
                        />
                      </div>
                    )}
                    {components.playlist && (
                      <div className='section playlist'>
                        <Playlists
                          fetchedPlaylists={fetchedPlaylists}
                          fetchError={fetchError}
                        />
                      </div>
                    )}
                    {components.miniPlayer && (
                      <div
                        className={
                          components.fullPlayer ? 'section' : 'section player'
                        }
                        style={{ marginTop: 'auto' }}>
                        <Player />
                      </div>
                    )}
                    {components.queue && (
                      <div className='section queue'>
                        <Queue />
                      </div>
                    )}
                  </>
                )}
              />
              <Route
                exact
                path='/settings'
                render={() => (
                  <button onClick={logout} className='logout-button'>
                    LOGOUT
                  </button>
                )}
              />
            </Switch>
          </Router>
        )}
      </div>
    </div>
  )
}
