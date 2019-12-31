import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app';
import { StateProvider } from './state'


function Index() {
  const initialState = {
    auth: {
      isAuthenticated: false,
      token: '',
      user: {}
    },
    result: {
      title: '',
      id: '',
      description: '',
      thumb: '',
    }
  }

  const reducer = (state, action) => {
    switch (action.type) {
      case 'login':
        return {
          ...state,
          auth: action.auth
        }
      case 'select':
        return {
          ...state,
          result: action.result
        }
      default:
        return state
    }
  }

  useEffect(() => {
    let authorize = localStorage.getItem('token')
    if (authorize) {
      initialState.auth.isAuthenticated = true
      console.log('Welcome to YT Player')
      console.log('Auth Status', initialState.auth.isAuthenticated);
    }
  }, [initialState.auth.isAuthenticated])

  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <App />
    </StateProvider>
  )
}

ReactDOM.render(<Index />, document.getElementById('root'));
