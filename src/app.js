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
  const [{ init, components, queue, vidObj, playlistObj, channelObj, user, auth }, dispatch] = useStateValue()
  const [fetchedSearch, setFetchedSearch] = useState([])
  const [fetchedPlaylists, setFetchedPlaylists] = useState([])
  const [fetchError, throwFetchError] = useState(false)

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

  useEffect(() => {
    const token = localStorage.getItem('MT-token')
    const user = localStorage.getItem('MT-user')
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

    const fetchPlaylistsFromChannelId = async () => {
      await youtube
        .get('/search', {
          params: {
            type: 'playlist',
            ...params.playlist,
            channelId: channelObj.channelId
          }
        })
        .then(res => {
          if (res.items === undefined && auth.isAuthenticated) { console.log('playlists', res.data.items) }
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
              type: 'playlistObj',
              playlistObj: {
                playlistId: res.data.items[0].id.playlistId,
                channletId: res.data.items[0].snippet.channelId,
                snippet: res.data.items[0].snippet
              }
            })
          }
        })
        .catch(error => console.log(error))
    }
    fetchPlaylistsFromChannelId()
  }, [channelObj.channelId])

  useEffect(() => {
    if (queue.length < 1) {
      dispatch({
        type: 'manage',
        components: { ...components, queue: false }
      })
    }
  }, [queue])

  useEffect(() => {
    const authed = localStorage.getItem('MT-user')
    if (authed) {
      dispatch({
        type: 'auth',
        user: {
          email: JSON.parse(authed).email,
          avatar: JSON.parse(authed).imageUrl,
          firstName: JSON.parse(authed).familyName,
          lastName: JSON.parse(authed).givenName,
          fullName: JSON.parse(authed).name,
        }
      })
    }
  }, [user])

  useEffect(() => {
    if (channelObj.channelId === '') {
      dispatch({
        type: 'manage',
        components: {
          ...components,
          playlist: false,
          miniPlayer: false
        }
      })
    }
  }, [])

  return (
    <div className='App'>
      <Navbar
        playlist={playlisticon}
        settings={settingsicon}
        initialComponentState={initialComponentState}
      />
      <div className='Main'>
        {!auth.isAuthenticated ? (
          <div className="log-box">
            <GoogleLogin
              clientId='455189255968-imf2slc5b11vjdbuq010k14rr9ccb76u.apps.googleusercontent.com'
              buttonText='LOGIN WITH GOOGLE'
              onSuccess={googleSuccess}
              onFailure={googleFailure}
              className='login-button'
              theme='dark'
            />
          </div>
        ) : (
            <Router>
              <Switch>
                <Route
                  exact
                  path='/'
                  render={() => (
                    <>
                      <div className='section nav'></div>
                      {init && <div className="init-welcome">
                        <h1>Welcome to MyTube Music</h1>
                        <p>Search for a channel to begin</p>
                      </div>}
                      {components.search && (
                        <div className={init ? 'section search init' : 'section search'}>
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
