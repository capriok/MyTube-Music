import axios from 'axios';
const KEY = 'AIzaSyBs_y-gyjJ9ACgPoXFiaLvdn1p04BMk-vk';

// MAIN KEY // AIzaSyBs_y-gyjJ9ACgPoXFiaLvdn1p04BMk-vk //
// ALT KEY // AIzaSyANq1oGYM_kIzVqJV4y8RQYNvU47O0X9gM //
// ALT KEY // AIzaSyDOTNyAxNX1X3BjLdMKxFJk8KZc_XModCk //

export const params = {
   video: {
      part: "snippet",
      maxResults: 3,
      key: KEY
   },
   playlist: {
      part: "snippet",
      maxResults: 3,
      type: 'playlist',
      key: KEY
   },
   playlistItems: {
      part: "snippet",
      maxResults: 3,
      key: KEY
   }
}

export default axios.create({
   baseURL: "https://www.googleapis.com/youtube/v3",
   params: params
});
