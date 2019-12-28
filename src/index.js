import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ReactDOM from 'react-dom';
import GoogleLogin from 'react-google-login';
import Navbar from './components/navbar'
import Hometile from './components/hometile'
import SearchOps from './components/searchops'
import SearchForm from './components/searchform'
import ItemList from './components/itemlist.js'
import searchicon from './img/search.png'
import profileicon from './img/profile.png'
import playlisticon from './img/playlist.png'
import settingsicon from './img/settings.png'
import youtube, { baseParams } from "./components/apis/youtube"
import './index.css';
import ItemDisplay from './components/itemdisplay';

function Player() {
  const [search, setSearch] = useState('')
  const [searched, setSearched] = useState(false)
  const [videos, setVideos] = useState([])
  const [authorized, setAuthorization] = useState(false)

  // GOOGLE LOGIN
  const googleSuccess = (res) => {
    console.log(res);
    setAuthorization(true)
    localStorage.setItem('token', res.Zi.access_token)
  }
  const googleFailure = (res) => {
    console.log(res);
    setAuthorization(false)
  }
  // TOKEN CHECK => AUTH
  useEffect(() => {
    localStorage.getItem('token') === null ? setAuthorization(false) : setAuthorization(true)
  }, [])
  // GOOGLE LOGIN END //

  const handleSearch = async (e) => {
    e.preventDefault()
    if (search) {
      const res = await youtube
        .get("/search", {
          params: {
            ...baseParams,
            q: search
          }
        })
      let videos = res.data.items
      setVideos(videos)
      console.log('hounded: ', videos);
    } else return
    setSearched(true)
  }

  return (
    <div className="App">
      <Navbar search={searchicon} profile={profileicon} playlist={playlisticon} settings={settingsicon} />
      {!authorized ?
        <GoogleLogin
          clientId="455189255968-imf2slc5b11vjdbuq010k14rr9ccb76u.apps.googleusercontent.com"
          buttonText="LOGIN WITH GOOGLE"
          onSuccess={googleSuccess}
          onFailure={googleFailure}
        // scope="https://www.googleapis.com/auth/youtube.force-ssl"
        />
        :
        <Router>
          <Switch>
            <Route exact path='/' render={() =>
              <div className="TilePage">
                <Hometile to="/search" title="Search" img={searchicon} />
                <Hometile to="/playlist" title="Playlist" img={playlisticon} />
                <Hometile to="/profile" title="Profile" img={profileicon} />
                <Hometile to="/settings" title="Settings" img={settingsicon} />
              </div>
            } />
            <Route exact path='/search' render={() =>
              <div className="SearchPage">
                <div className="form">
                  <SearchOps />
                  <SearchForm handleSearch={handleSearch} setSearch={setSearch} />
                </div>
              </div>
            } />
            <Route exact path='/search/results' render={() =>
              <div className="PlaylistPage">
                <ItemList />
                <ItemDisplay />
              </div>
            } />
            <Route exact path='/playlist' render={() =>
              <div className="PlaylistPage">
                <ItemList />
                <ItemDisplay />
              </div>
            } />
            <Route exact path='/profile' render={() =>
              <>profile</>
            } />
            <Route exact path='/settings' render={() =>
              <>
                <form onSubmit={() => localStorage.removeItem("token")}>
                  <button>LOGOUT</button>
                </form>
              </>
            } />
          </Switch>
        </Router>}
    </div>
  );
}

ReactDOM.render(<Player />, document.getElementById('root'));