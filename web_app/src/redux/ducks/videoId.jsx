const SET_VIDEOID = 'SET_VIDEOID';
const REMOVE_VIDEOID = 'REMOVE_VIDEOID';

export const setVideoId = (videoId) => ({
  type: SET_VIDEOID,
  payload: videoId,
});

export const removeVideoId = () => ({
  type: REMOVE_VIDEOID,
});

const initialState = {
  videoId: null,
};

const videoId = (state = initialState, action) => {
  switch (action.type) {
    case SET_VIDEOID:
      return { ...state, videoId: action.payload };
    case REMOVE_VIDEOID:
      return { ...state, videoId: null };
    default:
      return state;
  }
};

export default videoId;
