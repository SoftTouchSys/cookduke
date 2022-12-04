
import {
  GET_CHEFS_DATA_REQUEST,
  GET_CHEFS_DATA_SUCCESS,
  GET_CHEFS_DATA_FAIL
} from '../Constants/chefConstants'

import axiosInstance from "../helper/axios"

export const getChefsData = () => async (dispatch, getState) => {

  try {
    dispatch({
      type: GET_CHEFS_DATA_REQUEST,
    })


    const { data } = await axiosInstance.get("/chefs")

    dispatch({
      type: GET_CHEFS_DATA_SUCCESS,
      payload: data,
    })
    
  } catch (error) {

    dispatch({
      type: GET_CHEFS_DATA_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
