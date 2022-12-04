import {
    GET_RESTAURANTS_DATA_FAIL,
    GET_RESTAURANTS_DATA_REQUEST,
    GET_RESTAURANTS_DATA_SUCCESS,
    
} from '../Constants/restaurantConstants'

export const restaurantsDataReducer = (state = {}, action) => {
    switch (action.type) {
      case GET_RESTAURANTS_DATA_REQUEST:
        return { loading: true }
      case GET_RESTAURANTS_DATA_SUCCESS:
        return { loading: false, success: true, restaurants: action.payload }
      case GET_RESTAURANTS_DATA_FAIL:
      default:
        return state
    }
  }