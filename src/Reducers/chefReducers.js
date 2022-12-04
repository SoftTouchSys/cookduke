import {
    GET_CHEFS_DATA_FAIL,
    GET_CHEFS_DATA_REQUEST,
    GET_CHEFS_DATA_SUCCESS,
    
} from '../Constants/chefConstants'

export const chefsDataReducer = (state = {}, action) => {
    switch (action.type) {
      case GET_CHEFS_DATA_REQUEST:
        return { loading: true }
      case GET_CHEFS_DATA_SUCCESS:
        return { loading: false, success: true, chefs: action.payload }
      case GET_CHEFS_DATA_FAIL:
      default:
        return state
    }
  }