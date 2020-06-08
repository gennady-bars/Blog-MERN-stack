import { SET_POSTS, SET_POST, DELETE_POST } from "../actions/types";

const initialState = {
  post: null,
  posts: null,
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_POSTS:
      return { ...state, posts: action.posts };
    case SET_POST:
      return { ...state, post: action.post };
    case DELETE_POST:
      return { ...state, post: null };
    default:
      return state;
  }
};

export default postReducer;
