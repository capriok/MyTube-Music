import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { StateProvider } from './state'
import App from './app'
import './index.css'

function Index() {
  let initialState = {
    init: true,
    auth: {
      isAuthenticated: false,
      token: '',
    },
    user: {
      email: '',
      avatar: '',
      firstName: '',
      lastName: '',
      fullName: '',
    },
    components: {
      queue: false,
      audioState: false,
      search: true,
      results: false,
      miniPlayer: true,
      fullPlayer: false,
      playlist: true,
      playlistItems: false
    },
    display: {
      title: '',
      id: '',
      channelTitle: ''
    },
    queue: [],
    playlistObj: {
      id: '',
      snippet: {}
    },
    channelId: localStorage.getItem('MT-channelid') || ''
  }
  // UC7Zyh4_j6BZEZtjnuS-PMOg
  const reducer = (state, action) => {
    switch (action.type) {
      case 'init':
        return {
          ...state,
          init: action.init
        }
      case 'manage':
        return {
          ...state,
          components: action.components
        }
      case 'login':
        return {
          ...state,
          auth: action.auth,
        }
      case 'auth':
        return {
          ...state,
          user: action.user,
        }
      case 'logout':
        return {
          ...initialState.auth
        }
      case 'select':
        return {
          ...state,
          display: action.display
        }
      case 'addtoq':
        return {
          ...state,
          queue: action.queue
        }
      case 'cId':
        return {
          ...state,
          channelId: action.channelId
        }
      case 'pId':
        return {
          ...state,
          playlistObj: action.playlistObj
        }
      default:
        return state
    }
  }

  const googleSuccess = res => {
    initialState.auth.isAuthenticated = true
    initialState.auth.token = res.tokenObj.access_token
    localStorage.setItem('MT-token', res.tokenObj.access_token)
    localStorage.setItem('MT-user', JSON.stringify(res.profileObj))
    window.location.href = '/'
  }
  const googleFailure = res => {
    console.log(res)
  }

  const logout = () => {
    localStorage.removeItem('MT-token')
    window.location.href = '/'
  }

  useEffect(() => {
    if (initialState.queue.length > 0) {
      console.log(initialState.queue)
    }
  }, [initialState.queue])

  useEffect(() => {
    if (!initialState.display.id) {
      initialState.components.fullPlayer = false
    }
  }, [initialState.display.id, initialState.components.fullPlayer])

  useEffect(() => {
    let authorize = localStorage.getItem('MT-token')
    if (authorize) {
      initialState.auth.isAuthenticated = true
      console.log('Welcome to YT Player')
      console.log('Auth Status ->', initialState.auth.isAuthenticated)
      console.log('Logged in as ->', JSON.parse(localStorage.getItem('MT-user')).name)
      console.log('channelFetchId ->', initialState.channelId)
      console.log('----------GOALS----------');
      console.log('in useEffect listening for auth.isAuth.. if no channel id to fetch, have user search for their channel in position(modified) search component');
      console.log('----------TODOS----------');
      console.log('fix onEnd playing nextTrack when queue is dragged');
      console.log('set playlist title to channel title');
      console.log('when playlist item selected from search, then goBack fires a fetch to items channelId');
      console.log('set playlist titile to fetched channelid\'s  name');

      console.log('-----------END-----------');
    }

  }, [initialState.auth.isAuthenticated, initialState.channelId, initialState.user.name])

  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <App
        googleSuccess={googleSuccess}
        googleFailure={googleFailure}
        logout={logout}
      />
    </StateProvider>
  )
}

ReactDOM.render(<Index />, document.getElementById('root'))
