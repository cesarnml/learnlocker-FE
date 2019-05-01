import { LOADING_SUGGESTED, LOADED_SUGGESTED } from '../actions/types';

const initialState = {
  suggested: false,
  auth: false,
  user: false,
  profile: false,
  social: false,
  courses: false,
  articles: false,
  bookmarks: false,
  feed: false,
  likes: false,
};

export const loadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_SUGGESTED:
      return { ...state, suggested: true };
    case LOADED_SUGGESTED:
      return { ...state, suggested: false };
    default:
      return state;
  }
};
