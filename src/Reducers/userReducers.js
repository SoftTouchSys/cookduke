import {
  PROFILE_DETAILS_FAIL,
  PROFILE_DETAILS_REQUEST,
  PROFILE_DETAILS_SUCCESS,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_RESET,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_VERIFY_FAIL,
  USER_VERIFY_REQUEST,
  USER_VERIFY_SUCCESS,
  FORGET_PASSWORD_FAIL,
  FORGET_PASSWORD_REQUEST,
  FORGET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_UPDATE_RESET,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  RESEND_EMAIL_REQUEST,
  RESEND_EMAIL_SUCCESS,
  RESEND_EMAIL_FAIL,
  PROFILE_UPDATE_FAIL,
  PROFILE_UPDATE_REQUEST,
  PROFILE_UPDATE_SUCCESS,
  CREATE_POST_FAIL,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  SUBSCRIBING_USER_FAIL,
  SUBSCRIBING_USER_REQUEST,
  SUBSCRIBING_USER_SUCCESS,
  MY_PROFILE_FAIL,
  MY_PROFILE_REQUEST,
  MY_PROFILE_SUCCESS,
} from '../Constants/userConstants'

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true }
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload, message:action.payload }
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload }
    case USER_LOGOUT:
      return {}
    default:
      return state
  }
}

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true }
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload, message:action.payload.message }
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload }
    case USER_LOGOUT:
      return {}
    default:
      return state
  }
}


export const userVerifyEmailReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_VERIFY_REQUEST:
      return { loading: true }
    case USER_VERIFY_SUCCESS:
      return { loading: false, success:action.payload.success,message:action.payload.message}
    case USER_VERIFY_FAIL:
      return { loading: false, error: action.payload }
    case USER_LOGOUT:
      return {}
    default:
      return state
  }
}

export const forgetPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case FORGET_PASSWORD_REQUEST:
      return { loading: true }
    case FORGET_PASSWORD_SUCCESS:
      return { loading: false, success:action.payload.success,message:action.payload.message}
    case FORGET_PASSWORD_FAIL:
      return { loading: false, error: action.payload }
    case USER_LOGOUT:
      return {}
    default:
      return state
  }
}

export const resetPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case RESET_PASSWORD_REQUEST:
      return { loading: true }
    case RESET_PASSWORD_SUCCESS:
      return { loading: false, success:action.payload.success,message:action.payload.message}
    case RESET_PASSWORD_FAIL:
      return { loading: false, error: action.payload }
    case USER_LOGOUT:
      return {}
    default:
      return state
  }
}

export const profileDetailsReducer = (state = { posts:[] }, action) => {
  switch (action.type) {
    case PROFILE_DETAILS_REQUEST:
      return { ...state, loading: true}
    case PROFILE_DETAILS_SUCCESS:
      // console.log(state.user?._id,action.payload.user?._id)
      if(state.user?._id === action.payload.user?._id){
        return { loading: false, 
        posts:state.posts.concat(action.payload.posts).reduce(function(prev, current, index, array){ 
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
          // console.log(prev,".....")
          return prev;
       },{result: [], keys: {}}).result,
         page:action.payload.page,
         totalPostCount:action.payload.totalPostCount,
         user:action.payload.user,
         profile:action.payload,
         subscriber:action.payload.subscriber,
        message:action.payload.message}
      }else{
        return { loading: false, 
          posts:action.payload.posts,
           page:action.payload.page,
           totalPostCount:action.payload.totalPostCount,
           user:action.payload.user,
           profile:action.payload,
           subscriber:action.payload.subscriber,
          message:action.payload.message}
      }
    case PROFILE_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const userUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return { loading: true }
    case USER_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload }
    case USER_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const userListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return { loading: true }
    case USER_LIST_SUCCESS:
      return { loading: false, users: action.payload }
    case USER_LIST_FAIL:
      return { loading: false, error: action.payload }
    case USER_LIST_RESET:
      return { users: [] }
    default:
      return state
  }
}

export const userDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DELETE_REQUEST:
      return { loading: true }
    case USER_DELETE_SUCCESS:
      return { loading: false, success: true }
    case USER_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const userUpdateReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { loading: true }
    case USER_UPDATE_SUCCESS:
      return { loading: false, success: true }
    case USER_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case USER_UPDATE_RESET:
      return {
        user: {},
      }
    default:
      return state
  }
}

export const resendEmailReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case RESEND_EMAIL_REQUEST:
      return { loading: true }
    case RESEND_EMAIL_SUCCESS:
      return { loading: false, message:action.payload.message }
    case RESEND_EMAIL_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}


export const updateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case PROFILE_UPDATE_REQUEST:
      return { loading: true }
    case PROFILE_UPDATE_SUCCESS:
      return { loading: false, userData:action.payload }
    case PROFILE_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const createdPostReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_POST_REQUEST:
      return { loading: true }
    case CREATE_POST_SUCCESS:
      return { loading: false, message:action.payload.message }
    case CREATE_POST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const subscriberReducer = (state = {}, action) => {
  switch (action.type) {
    case SUBSCRIBING_USER_REQUEST:
      return { loading: true }
    case SUBSCRIBING_USER_SUCCESS:
      return { loading: false, subscribers:action.payload }
    case SUBSCRIBING_USER_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const myProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case MY_PROFILE_REQUEST:
      return { loading: true }
    case MY_PROFILE_SUCCESS:
      return { loading: false, myProfile:action.payload }
    case MY_PROFILE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}