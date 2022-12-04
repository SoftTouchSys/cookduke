import {    
    GET_CONVERSATION_DETAILS_FAIL,
    GET_CONVERSATION_DETAILS_REQUEST,
    GET_CONVERSATION_DETAILS_SUCCESS,
    GET_MESSAGE_DETAILS_FAIL,
    GET_MESSAGE_DETAILS_REQUEST,
    GET_MESSAGE_DETAILS_SUCCESS,
  } from '../Constants/messageConstants'

  import axiosInstance from '../helper/axios'


  export const getConversations = (id) => async (dispatch, getState) => {

    try {
      dispatch({
        type: GET_CONVERSATION_DETAILS_REQUEST,
      })
  
      const { data } = await axiosInstance.get(`/conversations`)
      let newArr = [];
      data?.conversations?.forEach(item => {
        
        item?.recipients?.forEach(cv => {
          if(cv._id !== id){
            newArr.push({...cv, text: item.text, media: item.media,createdAt:item.createdAt});
          }
        })
    })
  
      dispatch({
        type: GET_CONVERSATION_DETAILS_SUCCESS,
        payload: {newArr, result: data.result},
      })
  
    } catch (error) {
  
      dispatch({
        type: GET_CONVERSATION_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

  export const getMessage = (id) => async (dispatch, getState) => {
    
    try {
      dispatch({
        type: GET_MESSAGE_DETAILS_REQUEST,
      })
  
      const { data } = await axiosInstance.get(`/message/${id}`)
                        await axiosInstance.get('/set-read')
      dispatch({
        type: GET_MESSAGE_DETAILS_SUCCESS,
        payload: data,
      })
  
    } catch (error) {
  
      dispatch({
        type: GET_MESSAGE_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }