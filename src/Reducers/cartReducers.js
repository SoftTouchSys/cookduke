import {GET_NUMBER_CART,ADD_CART, DECREASE_QUANTITY, INCREASE_QUANTITY, DELETE_CART} from  '../Actions/cartActions';

var LS = JSON.parse(localStorage.getItem("localCart"))

const initProduct = {
    vendor:LS?.vendor?LS.vendor:"",
    numberCart:LS?.numberCart?LS.numberCart:0,
    Carts:LS?.Carts?LS.Carts:[],

}

export function todoProduct(state = initProduct,action){
    switch(action.type){
        case GET_NUMBER_CART:
                return{
                    ...state
                }
        case ADD_CART:
            
            if(state.numberCart===0){
                let cart = {
                    id:action.payload._id,
                    quantity:1,
                    name:action.payload.itemName,
                    image:action.payload.itemImage,
                    price:action.payload.price
                } 
                state.Carts.push(cart);
                state.vendor=action.vendor 
            }
            else{
                let check = false;
                state.Carts.map((item,key)=>{
                    if(item.id===action.payload._id){
                        state.Carts[key].quantity++;
                        check=true;
                    }
                });
                if(!check){
                    let _cart = {
                        id:action.payload._id,
                        quantity:1,
                        name:action.payload.itemName,
                        image:action.payload.itemImage,
                        price:action.payload.price
                    }
                    state.Carts.push(_cart);
                }
            
                
            }

            
            return{
                ...state,
                numberCart:state.numberCart+1
            }
            case INCREASE_QUANTITY:
                state.numberCart++
                state.Carts[action.payload].quantity++;
              
               return{
                   ...state
               }
            case DECREASE_QUANTITY:
                let quantity = state.Carts[action.payload].quantity;
                if(quantity>1){
                    state.numberCart--;
                    state.Carts[action.payload].quantity--;
                }
              
                return{
                    ...state
                }
            case DELETE_CART:

                let quantity_ = state.Carts[action.payload].quantity;
                return{
                    ...state,
                    numberCart:state.numberCart - quantity_,
                    vendor:"",
                    Carts:state.Carts.filter(item=>{
                    return item.id!=state.Carts[action.payload].id
                    })
                   
                }
        default:
            return state;
    }
}
// const ShopApp = combineReducers({
//     _todoProduct:todoProduct
// });
// export default todoProduct;


// import {
//     LOCAL_CART_FAIL,
//     LOCAL_CART_REQUEST,
//     LOCAL_CART_SUCCESS,
    
// } from '../Constants/cartConstants'

// export const localCartReducer = (state = {}, action) => {
//     switch (action.type) {
//       case LOCAL_CART_REQUEST:
//         return { loading: true }
//       case LOCAL_CART_SUCCESS:
//         return { loading: false, success: true, items: action.payload }
//       case LOCAL_CART_FAIL:
//       default:
//         return state
//     }
//   }