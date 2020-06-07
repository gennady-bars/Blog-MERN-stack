import { SET_USER, LOGOUT_USER, AUTH_ERROR } from "../actions/types";

const initialState = {
  user: null,
  authErrors: {}
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {...state, user: action.user, authErrors: {} };
    case LOGOUT_USER:
      return {...state, user: null };
    case AUTH_ERROR:
      return {...state, authErrors: {...action.error} };
    default:
      return state;
  }
};

export default authReducer;
