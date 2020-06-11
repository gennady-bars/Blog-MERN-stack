import {
  SET_POSTS,
  SET_POST,
  DELETE_POST,
  ADD_POST,
  EDIT_POST,
  SET_POST_ERROR,
  ADD_COMMENT,
  DELETE_COMMENT,
} from "../actions/types";

const initialState = {
  post: null,
  posts: null,
  error: null
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_POSTS:
      return { ...state, posts: action.posts };
    case DELETE_POST:
    case EDIT_POST:
      return { ...state, post: null };
    case ADD_POST:
      return { ...state, posts: null };
    case SET_POST_ERROR:
      return { ...state, error: action.error };
    case SET_POST:
    case ADD_COMMENT:
    case DELETE_COMMENT:
      return { ...state, post: action.post};
    default:
      return state;
  }
};

export default postReducer;
