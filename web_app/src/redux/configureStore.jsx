import { combineReducers, createStore } from 'redux';
import videoId from './ducks/videoId';
import videoPlaylist from './ducks/videoPlaylist';
import videoPlayer from './ducks/videoPlayer'

const reducer = combineReducers({
  videoId: videoId,
  videoPlaylist: videoPlaylist,
  videoPlayer: videoPlayer,
});

const store = createStore(reducer)

export default store;


/* FÖRSÖK TILL ATT SÄTTA IN ID:T I LOCALSTORAGE SÅ SPELAREN KAN SPELAS ÄVEN EFTER REFRESH PÅ SIDAN */

// const saveToLocalStorage = ({ videoId }) => {
//   try {
//     localStorage.setItem('videoId', JSON.stringify(videoId))
//   } catch (err) {
//     console.error(err)
//     console.log(err);
//   }
// }

// const loadFromLocalStorage = () => {
//   try {
//     const idString = localStorage.getItem('videoId')
//     return idString ? JSON.parse(idString) : undefined
//   } catch (err) {
//     console.error(err)
//     console.log(err)
//     return undefined
//   }
// }

// const persistedStore = loadFromLocalStorage()

// store.subscribe(() => {
//   saveToLocalStorage(store.getState())
// })

// const store = createStore(reducer, persistedStore);

/* SLUT PÅ LOCALSTORAGE FUNKTIONEN */


