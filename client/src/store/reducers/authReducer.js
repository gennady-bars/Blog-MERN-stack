import { SET_USER } from "../actions/types";

const initialState = {
  user: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return { user: action.user };
    default:
      return state;
  }
};

export default authReducer;
