import {    
    SUBSCRIBING_POST_DETAILS_FAIL,
    SUBSCRIBING_POST_DETAILS_REQUEST,
    SUBSCRIBING_POST_DETAILS_SUCCESS,
    SINGLE_POST_DETAILS_FAIL,
    SINGLE_POST_DETAILS_REQUEST,
    SINGLE_POST_DETAILS_SUCCESS,
    GET_ALL_PHOTOS_DETAILS_FAIL,
    GET_ALL_PHOTOS_DETAILS_REQUEST,
    GET_ALL_PHOTOS_DETAILS_SUCCESS,
    GET_ALL_VIDEOS_DETAILS_FAIL,
    GET_ALL_VIDEOS_DETAILS_REQUEST,
    GET_ALL_VIDEOS_DETAILS_SUCCESS,

  } from '../Constants/postConstants'
import axiosInstance from '../helper/axios'

export const getSubscribingPost = (page) => async (dispatch, getState) => {

    try {
      dispatch({
        type: SUBSCRIBING_POST_DETAILS_REQUEST,
      })
  
      const { data } = await axiosInstance.get(`/subscribingPosts?page=${page || 1}`)

      dispatch({
        type: SUBSCRIBING_POST_DETAILS_SUCCESS,
        payload: data,
      })
  
    } catch (error) {
  
      dispatch({
        type: SUBSCRIBING_POST_DETAILS_FAIL,
        payload:
          error.response && error.response.data?.message
            ? error.response.data?.message
            : error?.message,
      })
    }
  }

  export const getSinglePost = (id) => async (dispatch, getState) => {
    
    try {
      dispatch({
        type: SINGLE_POST_DETAILS_REQUEST,
      })
  
      const { data } = await axiosInstance.get(`/singlePost/${id}`)
  
      dispatch({
        type: SINGLE_POST_DETAILS_SUCCESS,
        payload: data,
      })
  // console.log(data)
    } catch (error) {
      console.log(error)
      dispatch({
        type: SINGLE_POST_DETAILS_FAIL,
        payload:
          error.response && error.response.data?.message
            ? error.response.data?.message
            : error?.message,
      })
    }
  }

  export const getAllPhotos = (id) => async (dispatch, getState) => {
    
    try {
      dispatch({
        type: GET_ALL_PHOTOS_DETAILS_REQUEST,
      })
  
      const { data } = await axiosInstance.get(`/allUserPhotos/${id}`)
  
      dispatch({
        type: GET_ALL_PHOTOS_DETAILS_SUCCESS,
        payload: data,
      })
  
    } catch (error) {
  
      dispatch({
        type: GET_ALL_PHOTOS_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

  export const getAllVideos = (id) => async (dispatch, getState) => {
    
    try {
      dispatch({
        type: GET_ALL_VIDEOS_DETAILS_REQUEST,
      })
  
      const { data } = await axiosInstance.get(`/allUserVideos/${id}`)
  
      dispatch({
        type: GET_ALL_VIDEOS_DETAILS_SUCCESS,
        payload: data,
      })
  
    } catch (error) {
  
      dispatch({
        type: GET_ALL_VIDEOS_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }