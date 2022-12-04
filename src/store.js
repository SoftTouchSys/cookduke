import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import {
  userLoginReducer,
  userRegisterReducer,
  userVerifyEmailReducer,
  forgetPasswordReducer,
  resetPasswordReducer,
  profileDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
  resendEmailReducer ,
  updateProfileReducer,
  createdPostReducer,
  subscriberReducer,
  myProfileReducer
} from './Reducers/userReducers'

import { allPhotoReducer, allVideosReducer, singlePostReducer, subscribingPostReducer } from './Reducers/postReducer'

import {
  chefsDataReducer
} from "./Reducers/chefReducers"

import {
  todoProduct
} from "./Reducers/cartReducers"

import {
  restaurantsDataReducer
} from "./Reducers/restaurantReducers"
import { notificationReducer } from './Reducers/notificationReducer'
import {getConversationReducer,getMessageReducer} from "./Reducers/messageReducer"

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  profileDetails: profileDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  userValidate:userVerifyEmailReducer,
  userForgetPassword:forgetPasswordReducer,
  userResetPassword:resetPasswordReducer,
  userResendEmail:resendEmailReducer ,
  updateUserProfile:updateProfileReducer,
  postCreated:createdPostReducer,
  chefsData:chefsDataReducer,
  restaurantsData:restaurantsDataReducer,
  subscribingPost:subscribingPostReducer,
  notification:notificationReducer,
  subscribersList:subscriberReducer,
  myProfileData:myProfileReducer,
  singlePost:singlePostReducer,
  allPhotos:allPhotoReducer,
  allVideos:allVideosReducer,
  conversation:getConversationReducer,
  messages:getMessageReducer,
  _todoProduct:todoProduct
  // localCart:localCartReducer,

})


const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : localStorage.setItem("token",null)


const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
