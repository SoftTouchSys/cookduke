import {    
    NOTIFICATION_DETAILS_FAIL,
    NOTIFICATION_DETAILS_REQUEST,
    NOTIFICATION_DETAILS_SUCCESS,

  } from '../Constants/postConstants'
import axiosInstance from '../helper/axios'

export const getNotification = (id) => async (dispatch, getState) => {

    try {
      dispatch({
        type: NOTIFICATION_DETAILS_REQUEST,
      })
  
      const { data } = await axiosInstance.get('/myNotifications')
  
      dispatch({
        type: NOTIFICATION_DETAILS_SUCCESS,
        payload: data,
      })
  
    } catch (error) {
  
      dispatch({
        type: NOTIFICATION_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }