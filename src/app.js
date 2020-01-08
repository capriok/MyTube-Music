import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { useStateValue } from './state'
import GoogleLogin from 'react-google-login'
import youtube, { params } from "./components/apis/youtube"
import playlisticon from './img/playlist.png'
import settingsicon from './img/settings.png'
import Navbar from './components/navbar'
import SearchForm from './components/search-form'
import Player from './components/player'
import Playlists from './components/playlist-list'
import './index.css'

export default function App({ googleSuccess, googleFailure, logout }) {
   const [{ components, auth, channelId }, dispatch] = useStateValue()
   const [fetchedSearch, setFetchedSearch] = useState([])
   const [fetchedPlaylists, setFetchedPlaylists] = useState([])
   //////////////////////////////////// COMPONENT STATES
   const initialComponentState = () => {
      dispatch({
         type: 'manage',
         components: {
            results: false,
            miniPlayer: true,
            fullPlayer: false,
            playlist: true,
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
            .get("/search", {
               params: {
                  ...params.playlist,
                  channelId: channelId,
               }
            })
            .then(res => {
               console.log('playlists', res.data.items)
               setFetchedPlaylists(res.data.items)
            })
            .catch(error => console.log(error))
      }
      youtubePlaylists()
   }, [dispatch])

   return (
      <div className="App">
         <Navbar playlist={playlisticon} settings={settingsicon} initialComponentState={initialComponentState} />
         <div className="Main">
            {!auth.isAuthenticated ?
               <GoogleLogin
                  clientId="455189255968-imf2slc5b11vjdbuq010k14rr9ccb76u.apps.googleusercontent.com"
                  buttonText="LOGIN WITH GOOGLE"
                  onSuccess={googleSuccess}
                  onFailure={googleFailure}
                  className="login-button"
                  theme="dark"
               />
               :
               <Router>
                  <Switch>
                     <Route exact path='/' render={() =>
                        <>
                           <div className="section nav"></div>
                           <div className="section search">
                              <SearchForm
                                 setFetchedSearch={setFetchedSearch}
                                 fetchedSearch={fetchedSearch}
                              />
                           </div>
                           {components.playlist &&
                              <div className="section playlist">
                                 <Playlists fetchedPlaylists={fetchedPlaylists} />
                              </div>
                           }
                           {components.miniPlayer &&
                              <div className={components.fullPlayer ? "section" : "section player"} style={{ marginTop: "auto" }} >
                                 <Player />
                              </div>
                           }
                        </>
                     } />
                     <Route exact path='/settings' render={() =>
                        <button onClick={logout} className="logout-button">LOGOUT</button>
                     } />
                  </Switch>
               </Router>
            }
         </div>
      </div>
   );
}