// import callApi from ''
export const INCREASE_QUANTITY = 'INCREASE_QUANTITY';
export const DECREASE_QUANTITY = 'DECREASE_QUANTITY';
export const GET_ALL_PRODUCT = 'GET_ALL_PRODUCT';
export const GET_NUMBER_CART = 'GET_NUMBER_CART';
export const ADD_CART = 'ADD_CART' ;
export const UPDATE_CART = 'UPDATE_CART';
export const DELETE_CART = 'DELETE_CART';

// export const actFetchProductsRequest = () => {
//     return (dispatch) => {
//         return callApi('/products', 'GET', null).then(res => {
          
//             dispatch(GetAllProduct(res.data));
//         });
//     }
// }

/*GET_ALL_PRODUCT*/
export function GetAllProduct(payload){
    return{
        type:'GET_ALL_PRODUCT',
        payload
    }
}

/*GET NUMBER CART*/
export function GetNumberCart(){
    return{
        type:'GET_NUMBER_CART'
    }
}

export function AddCart(payload,vendor){
    return {
        type:'ADD_CART',
        payload:payload,
        vendor:vendor
    }
}
export function UpdateCart(payload){
    return {
        type:'UPDATE_CART',
        payload
    }
}
export function DeleteCart(payload){
    return{
        type:'DELETE_CART',
        payload
    }
}

export function IncreaseQuantity(payload){
    return{
        type:'INCREASE_QUANTITY',
        payload
    }
}
export function DecreaseQuantity(payload){
    return{
        type:'DECREASE_QUANTITY',
        payload
    }
}





// import {    
//     LOCAL_CART_FAIL,
//     LOCAL_CART_REQUEST,
//     LOCAL_CART_SUCCESS,
//   } from '../Constants/cartConstants'

// export const addLocalItems = (items) => async (dispatch, getState) => {
    
//     try {
//       dispatch({
//         type: LOCAL_CART_REQUEST,
//       })
  
//       localStorage.setItem("items",JSON.stringify(items))

//       dispatch({
//         type: LOCAL_CART_SUCCESS,
//         payload: items,
//       })
  
//     } catch (error) {
  
//       dispatch({
//         type: LOCAL_CART_FAIL,
//         payload:
//           error.response && error.response.data.message
//             ? error.response.data.message
//             : error.message,
//       })
//     }
//   }