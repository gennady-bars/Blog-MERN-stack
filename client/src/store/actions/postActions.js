import axios from "axios";
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

export const getPosts = () => {
  return async (dispatch) => {
    dispatch(setPostError(null));
    try {
      const res = await axios.get("/api/posts");
      dispatch(setPosts(res.data));
    } catch (error) {
      dispatch(setPostError(error));
    }
  };
};

export const getPost = (id) => {
  return async (dispatch) => {
    dispatch(setPostError(null));
    try {
      const res = await axios.get(`/api/posts/${id}`);

      dispatch(setPost(res.data));
    } catch (error) {
      console.log(error);

      dispatch(setPostError(error));
    }
  };
};

export const deletePostThunk = (id, history) => {
  return async (dispatch) => {
    dispatch(setPostError(null));
    try {
      await axios.delete(`/api/posts/${id}`);

      dispatch(deletePost());
      history.replace("/");
    } catch (error) {
      dispatch(setPostError(error));
    }
  };
};

export const addPostThunk = (post, history) => {
  return async (dispatch) => {
    dispatch(setPostError(null));
    try {
      await axios.post("/api/posts", post);

      dispatch(addPost());
      history.push("/");
    } catch (error) {
      dispatch(setPostError(error));
    }
  };
};

export const editPostThunk = (id, post, history) => {
  return async (dispatch) => {
    dispatch(setPostError(null));
    try {
      await axios.put(`/api/posts/${id}`, post);

      dispatch(editPost());
      history.push(`/`);
    } catch (error) {
      dispatch(setPostError(error));
    }
  };
};

export const addCommentThunk = (id, comment) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(`/api/posts/comment/${id}`, comment);

      dispatch(addComment(res.data));
    } catch (error) {}
  };
};
export const deleteCommentThunk = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios.delete(`/api/posts/comment/${id}`);

      dispatch(deleteComment(res.data));
    } catch (error) {}
  };
};

export const deleteComment = (post) => {
  return { type: DELETE_COMMENT, post };
};
export const addComment = (post) => {
  return { type: ADD_COMMENT, post };
};
export const addPost = () => {
  return { type: ADD_POST };
};
export const editPost = () => {
  return { type: EDIT_POST };
};

export const setPosts = (posts) => {
  return { type: SET_POSTS, posts };
};
export const setPost = (post) => {
  return { type: SET_POST, post };
};
export const deletePost = () => {
  return { type: DELETE_POST };
};
export const setPostError = (error) => {
  return { type: SET_POST_ERROR, error };
};
