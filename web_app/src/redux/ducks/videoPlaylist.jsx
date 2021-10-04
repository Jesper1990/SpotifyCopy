const SET_VIDEOPLAYLIST = 'SET_VIDEOPLAYLIST'

export const setVideoPlaylist = (videoPlaylist) => ({
  type: SET_VIDEOPLAYLIST,
  payload: videoPlaylist,
})

const initialState = {
  videoPlaylist: null,
}

const videoPlaylist = (state = initialState, action) => {
  switch (action.type) {
    case SET_VIDEOPLAYLIST:
      return { ...state, videoPlaylist: action.payload }
    default:
      return state;
  }
}

export default videoPlaylist;