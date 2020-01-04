import axios from 'axios';
const KEY = 'AIzaSyDOTNyAxNX1X3BjLdMKxFJk8KZc_XModCk ';

// MAIN KEY // AIzaSyBs_y-gyjJ9ACgPoXFiaLvdn1p04BMk-vk //
//ALT KEY // AIzaSyANuw6USNNTupLH1nlzhwjHFNJfk19JaOQ //
//ALT KEY // AIzaSyBX5XQWH8-f5fXVbd4Qeu9xjwl_renyCUI //
//ALT KEY // AIzaSyANq1oGYM_kIzVqJV4y8RQYNvU47O0X9gM //
//ALT KEY // AIzaSyDOTNyAxNX1X3BjLdMKxFJk8KZc_XModCk //


export const params = {
   video: {
      part: "snippet",
      maxResults: 2,
      type: 'video',
      key: KEY
   },
   playlist: {
      part: "snippet",
      maxResults: 2,
      type: 'playlist',
      key: KEY
   },
   playlistItems: {
      part: "snippet",
      maxResults: 2,
      key: KEY
   }
}

export default axios.create({
   baseURL: "https://www.googleapis.com/youtube/v3",
   params: params
});
