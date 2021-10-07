const SET_VIDEOPLAYER = 'SET_VIDEOPLAYER'

export const setVideoPlayer = (videoPlayer) => ({
  type: SET_VIDEOPLAYER,
  payload: videoPlayer,

})

const initialState ={
  videoPlayer: null,
}

const videoPlayer = (state = initialState, action) => {
  switch (action.type) {
    case SET_VIDEOPLAYER:
      return { ...state, videoPlayer: action.payload }
    default:
      return state;
  }
}

export default videoPlayer;