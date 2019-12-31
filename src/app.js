import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { useStateValue } from './state'
import GoogleLogin from 'react-google-login';
import searchVideo, { videoParams } from "./components/apis/v3-search-video"
import searchPlaylist, { playlistParams } from "./components/apis/v3-search-playlist"
import searchPlaylistItems, { playlistItemsParams } from "./components/apis/v3-playlistitems"
import playlisticon from './img/playlist.png'
import settingsicon from './img/settings.png'
import Navbar from './components/navbar'
import SearchForm from './components/searchform'
import SearchList from './components/searchlist';
import PlaylistList from './components/playlistlist';
import Playlist from './components/playlist';
import SelectedDisplay from './components/selecteddisplay'
import './index.css';
import './components/components.css';

export default function App() {
   const [{ auth, result }, dispatch] = useStateValue()
   const [selected, setSelected] = useState(false)
   const [search, setSearch] = useState('beico')
   const [searchResults, setSearchResults] = useState([])
   const [playlistResults, setPlaylistResults] = useState([])
   const [playlistItemsResults, setPlaylistItemsResults] = useState([])
   const [playlistSelectResults, setPlaylistSelectResults] = useState([])
   const [resultsOpen, setResultsOpen] = useState(false)
   const [playlistsOpen, setPlaylistsOpen] = useState(true)
   const [playlistSelectOpen, setPlaylistSelectOpen] = useState(false)

   // GOOGLE LOG
   const googleSuccess = (res) => {
      dispatch({
         type: 'login',
         auth: {
            isAuthenticated: true,
            token: res.Zi.access_token,
            user: res.w3.ig
         }
      })
      localStorage.setItem('token', res.Zi.access_token)
      localStorage.setItem('user', res.w3.ig)
      window.location.href = '/'
   }
   const googleFailure = (res) => {
      console.log(res);
   }

   const logout = () => {
      window.location.href = 'google.com'
      localStorage.removeItem('token')
   }
   // GOOGLE LOG END //

   const setPlaylists = async () => {
      const playlists = await searchPlaylist
         .get("/search", {
            params: {
               ...playlistParams,
               channelId: "UC7Zyh4_j6BZEZtjnuS-PMOg",

            }
         })
      console.log('playlists', playlists);

      setPlaylistResults(playlists.data.items);
   }

   const handlePlaylistItems = async () => {

   }

   const handleSearch = async (e) => {
      e.preventDefault()
      if (search) {
         const res = await searchVideo
            .get("/search", {
               params: {
                  ...videoParams,
                  q: search
               }
            })
         let results = res.data.items
         setSearchResults(results)
         console.log('hounded ', results);
      } else return
      setResultsOpen(true)
   }

   const handleSelect = (item) => {
      setPlaylistsOpen(false)
      dispatch({
         type: 'select',
         result: {
            title: item.snippet.title,
            id: item.id.videoId,
            description: item.snippet.description,
            thumb: item.snippet.thumbnails.high
         }
      })
      setSelected(true)
   }

   const handlePlaylistSelect = async (item) => {
      setPlaylistSelectOpen(true)
      console.log('selected item', item);
      setPlaylistSelectResults(item)
      const KEY = 'AIzaSyANq1oGYM_kIzVqJV4y8RQYNvU47O0X9gM';
      let id = playlistSelectResults.id.playlistId
      console.log('id', id);
      const playlistitems = await searchPlaylistItems
         .get("/playlistItems", {
            params: {
               ...playlistItemsParams,
               playlistId: id,
               key: KEY
            }
         })
      console.log('playlist items', playlistitems);
      setPlaylistItemsResults(playlistitems.data.items)
      console.log(playlistItemsResults);

   }


   useEffect(() => {
      const token = localStorage.getItem('token')
      const user = localStorage.getItem('user')
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
      setPlaylists()
   }, [App])

   return (
      <div className="App">
         <Navbar playlist={playlisticon} settings={settingsicon} />
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
                              <SearchForm handleSearch={handleSearch} setSearch={setSearch} />
                           </div>
                           {selected &&
                              <div className="section four">
                                 <h1>Currently Playing</h1>
                                 <SelectedDisplay selected={selected} />
                              </div>
                           }
                           {resultsOpen &&
                              <div className="section two">
                                 <h1>Results</h1>
                                 <SearchList items={searchResults} handleSelect={handleSelect} />
                              </div>
                           }
                           {playlistsOpen &&
                              <div className="section three">
                                 <h1>Playlists</h1>
                                 <PlaylistList items={playlistResults} playlistSelect={handlePlaylistSelect} />
                              </div>
                           }
                           {playlistSelectOpen &&
                              <div className="section five">
                                 <h1>playlist items</h1>
                                 <Playlist items={playlistItemsResults} handleSelect={handleSelect} />
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