import axios from 'axios'
import { SET_POSTS, SET_POST } from '../actions/types'

export const getPosts = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get('/api/posts')
      dispatch(setPosts(res.data))
    } catch (error) {
      
    }
  }
}

export const getPost = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`/api/posts/${id}`)
      dispatch(setPost(res.data))
    } catch (error) {
      
    }
  }
}


export const setPosts = (posts) => {
  return { type: SET_POSTS, posts}
}
export const setPost = (post) => {
  return { type: SET_POST, post}
}