import {    
    GET_CONVERSATION_DETAILS_FAIL,
    GET_CONVERSATION_DETAILS_REQUEST,
    GET_CONVERSATION_DETAILS_SUCCESS,
    GET_MESSAGE_DETAILS_FAIL,
    GET_MESSAGE_DETAILS_REQUEST,
    GET_MESSAGE_DETAILS_SUCCESS,


  } from '../Constants/messageConstants'

  export const getConversationReducer = (state = { user: {} }, action) => {
    switch (action.type) {
      case GET_CONVERSATION_DETAILS_REQUEST:
        return { ...state, loading: false }
      case GET_CONVERSATION_DETAILS_SUCCESS:
        return { loading: false, conversation: action.payload, message:action.payload.message}
      case GET_CONVERSATION_DETAILS_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }

  export const getMessageReducer = (state = { user: {} }, action) => {
    switch (action.type) {
      case GET_MESSAGE_DETAILS_REQUEST:
        return { ...state, loading: false }
      case GET_MESSAGE_DETAILS_SUCCESS:
        return { loading: false, message: action.payload, result:action.payload.message}
      case GET_MESSAGE_DETAILS_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }
