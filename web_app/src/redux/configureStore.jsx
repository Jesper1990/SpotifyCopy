import { combineReducers, createStore } from 'redux';
import videoId from './ducks/videoId';

const reducer = combineReducers({
  videoId: videoId,
});

const store = createStore(reducer);

export default store;
