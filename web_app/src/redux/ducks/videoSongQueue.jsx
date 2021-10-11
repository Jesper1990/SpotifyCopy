const SET_VIDEOSONGQUEUE = 'SET_VIDEOSONGQUEUE'

export const setVideoSongQueue = (videoSongQueue) => ({
  type: SET_VIDEOSONGQUEUE,
  payload: videoSongQueue,
})

const initialState = {
  videoSongQueue: null,
}

const videoSongQueue = (state = initialState, action) => {
  switch (action.type) {
    case SET_VIDEOSONGQUEUE:
      return { ...state, videoSongQueue: action.payload }
    default:
      return state;
  }
}

export default videoSongQueue