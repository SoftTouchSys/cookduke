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

import _ from "lodash"


  export const subscribingPostReducer = (state = { post:[]}, action) => {
    switch (action.type) {
      case SUBSCRIBING_POST_DETAILS_REQUEST:
        return { ...state, loading: true }
      case SUBSCRIBING_POST_DETAILS_SUCCESS:
        return { loading: false,  
            post:state.post.concat(action.payload.posts).reduce(function(prev, current, index, array){ 
              prev.result.map((obj,i)=>{
                if(!obj['page']){
                  obj['page']=action.payload.page
                }
              })
            if(!(current._id in prev.keys)) {
               prev.keys[current._id] = index;
               prev.result.push(current);   
            } 
            else{
                prev.result[prev.keys[current._id]] = current;
            }  
            // console.log(prev,"......")
            return prev;
         },{result: [], keys: {}}).result,
           page:action.payload.page,
           totalPostCount:action.payload.totalPostCount,
           message:action.payload.message}
      case SUBSCRIBING_POST_DETAILS_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }

  export const singlePostReducer = (state = { user: {} }, action) => {
    switch (action.type) {
      case SINGLE_POST_DETAILS_REQUEST:
        return { ...state, loading: true ,post:''}
      case SINGLE_POST_DETAILS_SUCCESS:
        return { loading: false, post: action.payload, message:action.payload.message}
      case SINGLE_POST_DETAILS_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }

  export const allPhotoReducer = (state = { user: {} }, action) => {
    switch (action.type) {
      case GET_ALL_PHOTOS_DETAILS_REQUEST:
        return { ...state, loading: true }
      case GET_ALL_PHOTOS_DETAILS_SUCCESS:
        return { loading: false, photos: action.payload, message:action.payload.message}
      case GET_ALL_PHOTOS_DETAILS_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }

  export const allVideosReducer = (state = { user: {} }, action) => {
    switch (action.type) {
      case GET_ALL_VIDEOS_DETAILS_REQUEST:
        return { ...state, loading: true }
      case GET_ALL_VIDEOS_DETAILS_SUCCESS:
        return { loading: false, videos: action.payload, message:action.payload.message}
      case GET_ALL_VIDEOS_DETAILS_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }