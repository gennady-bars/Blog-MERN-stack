import axios from "axios";
import js_cookie from 'js-cookie'
import { SET_USER, LOGOUT_USER, AUTH_ERROR, CLEAR_ERRORS } from "./types";

export const loginUser = (loginData) => {
  return async (dispatch) => {
    try {
      const res = await axios.post("/api/users/login", loginData);
      dispatch(setUser(res.data.user));
    } catch (error) {
      dispatch(authError(error.response.data));
    }
  };
};
export const registerUser = (registerData) => {
  return async (dispatch) => {
    try {
      const res = await axios.post("/api/users/register", registerData);
      dispatch(setUser(res.data.user));
    } catch (error) {
      dispatch(authError(error.response.data));
    }
  };
};

export const setUser = (user) => {
  return { type: SET_USER, user };
};
export const logoutUser = () => {
  js_cookie.remove('jwt')
  return { type: LOGOUT_USER };
};
export const authError = (error) => {
  return { type: AUTH_ERROR, error };
};
export const clearErrors = () => {
  return { type: CLEAR_ERRORS };
};
