const SET_VIDEOINDEX = 'SET_VIDEOINDEX'

export const setVideoIndex = (videoIndex) => ({
  type: SET_VIDEOINDEX,
  payload: videoIndex,
})

const initialState = {
  videoIndex: null,
}

const videoIndex = (state = initialState, action) => {
  switch (action.type) {
    case SET_VIDEOINDEX:
      return { ...state, videoIndex: action.payload };
    default:
      return state;
  }
};

export default videoIndex;