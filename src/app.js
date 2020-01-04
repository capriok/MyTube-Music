import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { useStateValue } from './state'
import GoogleLogin from 'react-google-login'
import youtube, { params } from "./components/apis/youtube"
import playlisticon from './img/playlist.png'
import settingsicon from './img/settings.png'
import Navbar from './components/navbar'
import SearchForm from './components/search-form'
import SearchList from './components/search-list'
import SelectedDisplay from './components/video-display'
import Playlists from './components/playlist-list'
import './index.css'
import './components/components.css'

export default function App({ googleSuccess, googleFailure, logout }) {
   const [{ auth, channelId }, dispatch] = useStateValue()
   const [fetchedSearch, setFetchedSearch] = useState([])
   const [fetchedPlaylists, setFetchedPlaylists] = useState([])
   const [isDisplayed, toDisplay] = useState(false)
   const [searchItemsOpen, setSearchItemsOpen] = useState(false)
   const [playlistsOpen, setPlaylistsOpen] = useState(true)

   //////////////////////////////////// COMPONENT STATES
   const initialComponentState = () => {
      setSearchItemsOpen(false)
      setPlaylistsOpen(true)
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
               // scope="https://www.googleapis.com/auth/youtube.force-ssl"
               />
               :
               <Router>
                  <Switch>
                     <Route exact path='/' render={() =>
                        <>
                           <div className="section one">
                              <SearchForm setSearchItemsOpen={setSearchItemsOpen} setFetchedSearch={setFetchedSearch} />
                           </div>
                           {isDisplayed &&
                              <div className="section four">
                                 <h1>Currently Playing</h1>
                                 <SelectedDisplay />
                              </div>
                           }
                           {searchItemsOpen &&
                              <div className="section two">
                                 <h1>Results</h1>
                                 <SearchList items={fetchedSearch} toDisplay={toDisplay} setPlaylistsOpen={setPlaylistsOpen} />
                              </div>
                           }
                           {playlistsOpen &&
                              <div className="section two">
                                 <Playlists fetchedPlaylists={fetchedPlaylists} toDisplay={toDisplay} />
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