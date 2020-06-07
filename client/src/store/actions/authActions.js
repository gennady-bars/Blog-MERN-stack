import axios from "axios";
import { SET_USER } from "./types";

export const loginUser = (loginData) => {
  return async (dispatch) => {
    try {
      const res = await axios.post("/api/users/login", loginData);
      dispatch(setUser(res.data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const setUser = (user) => {
  return { type: SET_USER, user };
};
