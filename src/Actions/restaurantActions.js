
import {
    GET_RESTAURANTS_DATA_REQUEST,
    GET_RESTAURANTS_DATA_SUCCESS,
    GET_RESTAURANTS_DATA_FAIL
} from '../Constants/restaurantConstants'

import axiosInstance from "../helper/axios"

export const getRestaurantsData = () => async (dispatch, getState) => {

    try {
      dispatch({
        type: GET_RESTAURANTS_DATA_REQUEST,
      })
  
  
      const { data } = await axiosInstance.get("/restaurants")
  
      dispatch({
        type: GET_RESTAURANTS_DATA_SUCCESS,
        payload: data,
      })
    } catch (error) {
  
      dispatch({
        type: GET_RESTAURANTS_DATA_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
  