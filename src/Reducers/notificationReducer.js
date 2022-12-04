import {    
    NOTIFICATION_DETAILS_FAIL,
    NOTIFICATION_DETAILS_REQUEST,
    NOTIFICATION_DETAILS_SUCCESS,

  } from '../Constants/postConstants'

  export const notificationReducer = (state = { user: {} }, action) => {
    switch (action.type) {
      case NOTIFICATION_DETAILS_REQUEST:
        return { ...state, loading: false }
      case NOTIFICATION_DETAILS_SUCCESS:
        return { loading: false, notification: action.payload, message:action.payload.message}
      case NOTIFICATION_DETAILS_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }