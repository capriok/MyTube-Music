import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { StateProvider } from './state'
import App from './app'
import './index.css'

function Index() {
  const userObj = JSON.parse(localStorage.getItem('MT-user'))
  console.log(userObj);

  let initialState = {
    auth: {
      isAuthenticated: false,
      token: '',
      user: userObj
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
    channelId: 'UC7Zyh4_j6BZEZtjnuS-PMOg'
  }

  const reducer = (state, action) => {
    switch (action.type) {
      case 'manage':
        return {
          ...state,
          components: action.components
        }
      case 'login':
        return {
          ...state,
          auth: action.auth
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
    localStorage.setItem('MT-res', JSON.stringify(res))
    initialState.auth.isAuthenticated = true
    initialState.auth.token = res.Zi.access_token
    initialState.auth.user = res.w3.ig
    localStorage.setItem('MT-token', res.Zi.access_token)
    localStorage.setItem('MT-user', JSON.stringify(res.profileObj))
    window.location.href = '/'
  }
  const googleFailure = res => {
    console.log(res)
  }

  const logout = () => {
    window.location.href = '/'
    localStorage.removeItem('token')
  }

  useEffect(() => {
    if (initialState.queue.length > 0) {
      console.log(initialState.queue)
    }
  }, [initialState.queue])

  useEffect(() => {
    let authorize = localStorage.getItem('MT-token')
    let authedUser = localStorage.getItem('MT-user')
    if (authorize) {
      initialState.auth.isAuthenticated = true
      console.log('Welcome to YT Player')
      console.log('Auth Status ->', initialState.auth.isAuthenticated)
      console.log('Authed User ->', initialState.auth.user.name)
      console.log('channelFetchId ->', initialState.channelId)
    }
    if (!initialState.display.id) {
      initialState.components.fullPlayer = false
    }
  }, [initialState.auth.isAuthenticated, initialState.channelId])

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
