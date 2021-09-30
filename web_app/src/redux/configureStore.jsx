import { combineReducers, createStore } from 'redux';
import videoId from './ducks/videoId';
import videoPlaylist from './ducks/videoPlaylist';

const reducer = combineReducers({
  videoId: videoId,
  videoPlaylist: videoPlaylist,
});

const store = createStore(reducer);

export default store;
