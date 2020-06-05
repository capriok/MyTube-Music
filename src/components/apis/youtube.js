import axios from 'axios'
const KEY = process.env.API_KEY

export const params = {
  video: {
    part: 'snippet',
    maxResults: 10,
    key: KEY
  },
  playlist: {
    part: 'snippet',
    maxResults: 10,
    type: 'playlist',
    key: KEY
  },
  playlistItems: {
    part: 'snippet',
    maxResults: 10,
    key: KEY
  }
}

export default axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3',
  params: params
})
