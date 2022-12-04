
import {
  PROFILE_DETAILS_FAIL,
  PROFILE_DETAILS_REQUEST,
  PROFILE_DETAILS_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_VERIFY_FAIL,
  USER_VERIFY_REQUEST,
  USER_VERIFY_SUCCESS,
  FORGET_PASSWORD_FAIL,
  FORGET_PASSWORD_REQUEST,
  FORGET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESEND_EMAIL_FAIL,
  RESEND_EMAIL_REQUEST,
  RESEND_EMAIL_SUCCESS,
  PROFILE_UPDATE_FAIL,
  PROFILE_UPDATE_REQUEST,
  PROFILE_UPDATE_SUCCESS,
  CREATE_POST_FAIL,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  SUBSCRIBING_USER_FAIL,
  SUBSCRIBING_USER_REQUEST,
  SUBSCRIBING_USER_SUCCESS,
  MY_PROFILE_FAIL,
  MY_PROFILE_REQUEST,
  MY_PROFILE_SUCCESS,

  USER_LIST_RESET,
  LOGOUT_SUCCESS

} from '../Constants/userConstants'
import { googleLogout } from '@react-oauth/google';

import axiosInstance from "../helper/axios"
import { Navigate } from 'react-router-dom';

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    })
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const { data } = await axiosInstance.post(
      '/login',
      { email, password },
      config
    )
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    })
    localStorage.setItem('login_id', JSON.stringify(data?.user))
    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {

    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data
          ? error.response.data.message
          : error.message,
    })
  }
}

export const logout = () => (dispatch) => {
  googleLogout();
  localStorage.removeItem('userInfo')
  localStorage.removeItem('cartItems')
  localStorage.removeItem('shippingaddress')
  localStorage.removeItem('paymentMethod')


  axiosInstance.post('/logout');


  localStorage.clear();
  dispatch({ type: LOGOUT_SUCCESS })
  dispatch({ type: USER_LOGOUT })
  dispatch({ type: USER_LIST_RESET })

  return <Navigate to="/" replace />
}

export const register = (firstName, lastName, phone, country, city, street, houseNo, role, email, password, address) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    })


    const { data } = await axiosInstance.post(
      '/register',
      { firstName, lastName, phone, country, city, street, houseNo, role, email, password, address: JSON.stringify(address) }
    )


    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    })
    localStorage.setItem('register_id', JSON.stringify(data?.user?._id))
  } catch (error) {

    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data
          ? error.response.data.message
          : error.error,
    })
  }
}

export const emailExist = (email) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    })
    const { data } = await axiosInstance.post(
      '/check-email-exist',
      { email },
    )
    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    })
    console.log(data)
    localStorage.setItem('register_id', JSON.stringify(data?.user?._id))
  } catch (error) {
    console.log(error)
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data
          ? error.response.data.message
          : error.error,
    })
  }
}

export const GoogleRegister = (tokenId, role) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axiosInstance.post(
      '/google/callback',
      { tokenId, role },
      config
    )

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    })
    localStorage.setItem('userInfo', JSON.stringify(data))
    return data.user.role === "chef" ?
      <Navigate to="./chef/dashboard" replace /> :
      data.user.role === "restaurant" ? <Navigate to="./chef/dashboard" replace /> :
        <Navigate to="./restaurant/dashboard" replace />
  } catch (error) {

    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data
          ? error.response.data.message
          : error.error,
    })
  }
}

export const verifyEmail = (token, id) => async (dispatch) => {
  try {
    dispatch({
      type: USER_VERIFY_REQUEST,
    })

    const { data } = await axiosInstance.post(
      `/validate?token=${token}&id=${id}`,

    )
    dispatch({
      type: USER_VERIFY_SUCCESS,
      payload: data,
    })


    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    })

    localStorage.setItem('userInfo', JSON.stringify(data))

  } catch (error) {
    dispatch({
      type: USER_VERIFY_FAIL,
      payload:
        error.response && error.response.data
          ? error.response.data.message
          : error.message,
    })
  }
}


export const forgetPassword = (email) => async (dispatch, getState) => {
  try {
    dispatch({
      type: FORGET_PASSWORD_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axiosInstance.post("/forget-password", { email: email }, config)

    dispatch({
      type: FORGET_PASSWORD_SUCCESS,
      payload: data,
    })


  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: FORGET_PASSWORD_FAIL,
      payload: message,
    })
  }
}

export const resetPassword = (token, id, password) => async (dispatch, getState) => {
  try {
    dispatch({
      type: RESET_PASSWORD_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axiosInstance.post(`/reset-password?token=${token}&id=${id}`, { password: password }, config)

    dispatch({
      type: RESET_PASSWORD_SUCCESS,
      payload: data,
    })


  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: RESET_PASSWORD_FAIL,
      payload: message,
    })
  }
}


export const resendEmail = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: RESEND_EMAIL_REQUEST,
    })


    const { data } = await axiosInstance.post("/resend-email", { id: id })

    dispatch({
      type: RESEND_EMAIL_SUCCESS,
      payload: data,
    })


  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: RESEND_EMAIL_FAIL,
      payload: message,
    })
  }
}


export const userUpdate = (user, id) => async (dispatch, getState) => {

  try {
    dispatch({
      type: PROFILE_UPDATE_REQUEST,
    })

    const formData = new FormData()
    formData.append("userId", id)
    formData.append("firstName", user.firstName)
    formData.append("lastName", user.lastName)
    formData.append("phone", user.phone)
    formData.append("profilePicture", user.files)
    formData.append("country", user.country)
    formData.append("city", user.city)
    formData.append("address", JSON.stringify(user.address))
    formData.append("street", user.street)
    formData.append("houseNo", user.houseNo)


    const { data } = await axiosInstance.post("/edit/profile", formData)

    dispatch({
      type: PROFILE_UPDATE_SUCCESS,
      payload: data,
    })

    var info = JSON.parse(localStorage.getItem('userInfo'))
    info.user = data.user

    localStorage.setItem("userInfo", JSON.stringify(info))

  } catch (error) {

    dispatch({
      type: PROFILE_UPDATE_FAIL,
      payload:
        error.response && error.response.data?.message
          ? error.response.data?.message
          : error?.message,
    })
  }
}


export const userSetupUpdate = (user, id) => async (dispatch, getState) => {

  try {
    dispatch({
      type: PROFILE_UPDATE_REQUEST,
    })

    const formData = new FormData()
    formData.append("userId", id)
    formData.append("restaurantName", user.restaurantName)
    formData.append("about", user.about)
    formData.append("coverPicture", user.coverPicture)

    const { data } = await axiosInstance.post("/edit/account", formData)

    dispatch({
      type: PROFILE_UPDATE_SUCCESS,
      payload: data,
    })

    var info = JSON.parse(localStorage.getItem('userInfo'))
    info.user = data.user

    localStorage.setItem("userInfo", JSON.stringify(info))

  } catch (error) {

    dispatch({
      type: PROFILE_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const userSocialUpdate = (id, socialLinks) => async (dispatch, getState) => {

  try {
    dispatch({
      type: PROFILE_UPDATE_REQUEST,
    })

    const obj = { userId: id, socialLinks }


    const { data } = await axiosInstance.post("/edit/profile", obj)

    dispatch({
      type: PROFILE_UPDATE_SUCCESS,
      payload: data,
    })
    var info = JSON.parse(localStorage.getItem('userInfo'))
    info.user = data.user

    localStorage.setItem("userInfo", JSON.stringify(info))

  } catch (error) {

    dispatch({
      type: PROFILE_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const addUserMenu = (menu) => async (dispatch, getState) => {

  try {
    dispatch({
      type: PROFILE_UPDATE_REQUEST,
    })

    const formData = new FormData()

    formData.append("itemName", menu.itemName)
    formData.append("ingrediants", menu.ingrediants)
    formData.append("type", menu.type)
    formData.append("price", menu.price)
    formData.append("itemImage", menu.image)

    const { data } = await axiosInstance.post("/add/menu", formData)

    dispatch({
      type: PROFILE_UPDATE_SUCCESS,
      payload: data,
    })


  } catch (error) {

    dispatch({
      type: PROFILE_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}


export const getProfileDetails = (id, page) => async (dispatch, getState) => {

  try {
    dispatch({
      type: PROFILE_DETAILS_REQUEST,
    })

    const { data } = await axiosInstance.post(`/profile/${id}/?page=${page || 1}`)

    dispatch({
      type: PROFILE_DETAILS_SUCCESS,
      payload: data,
    })

  } catch (error) {

    dispatch({
      type: PROFILE_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}




export const manageTime = (openingTime, userId) => async (dispatch, getState) => {

  try {
    dispatch({
      type: PROFILE_UPDATE_REQUEST,
    })

    const { data } = await axiosInstance.post("/manage/time", { openingTime, userId })

    dispatch({
      type: PROFILE_UPDATE_SUCCESS,
      payload: data,
    })
    var info = JSON.parse(localStorage.getItem('userInfo'))
    info.user = data.user
    localStorage.setItem("userInfo", JSON.stringify(info))
  } catch (error) {

    dispatch({
      type: PROFILE_UPDATE_FAIL,
      payload:
        error.response && error.response.data?.message
          ? error.response.data?.message
          : error?.message,
    })
  }
}

export const removeSocialLink = (linkId, userId) => async (dispatch, getState) => {

  try {
    dispatch({
      type: PROFILE_UPDATE_REQUEST,
    })


    const { data } = await axiosInstance.post("/remove-link", { linkId, userId })

    dispatch({
      type: PROFILE_UPDATE_SUCCESS,
      payload: data,
    })
    var info = JSON.parse(localStorage.getItem('userInfo'))
    info.user = data.user

    localStorage.setItem("userInfo", JSON.stringify(info))

  } catch (error) {

    dispatch({
      type: PROFILE_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}



export const removeMenu = (menuId, userId) => async (dispatch, getState) => {

  try {
    dispatch({
      type: PROFILE_UPDATE_REQUEST,
    })


    const { data } = await axiosInstance.post("/remove/menu", { menuId, userId })

    dispatch({
      type: PROFILE_UPDATE_SUCCESS,
      payload: data,
    })
    var info = JSON.parse(localStorage.getItem('userInfo'))
    info.user = data.user

    localStorage.setItem("userInfo", JSON.stringify(info))

  } catch (error) {

    dispatch({
      type: PROFILE_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const editUserMenu = (menuId, userId,itemName, ingrediants, type, price, image,cl_itemImage_id) => async (dispatch, getState) => {
  
  try {
    dispatch({
      type: PROFILE_UPDATE_REQUEST,
    })
    const formData = new FormData()

    formData.append("menuId", menuId)
    formData.append("userId", userId)
    formData.append("itemName", itemName)
    formData.append("ingrediants", ingrediants)
    formData.append("type", type)
    formData.append("price", price)
    formData.append("itemImage", image)
    formData.append("cl_itemImage_id",cl_itemImage_id)

    const { data } = await axiosInstance.post("/edit/menu", formData)
    dispatch({
      type: PROFILE_UPDATE_SUCCESS,
      payload: data,
    })
    var info = JSON.parse(localStorage.getItem('userInfo'))
    info.user = data.user

    localStorage.setItem("userInfo", JSON.stringify(info))

  } catch (error) {
    dispatch({
      type: PROFILE_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updatePassword = (prePassword, password, userId) => async (dispatch, getState) => {

  try {
    dispatch({
      type: PROFILE_UPDATE_REQUEST,
    })

    const { data } = await axiosInstance.post("/update-password", { prePassword, password, userId })

    dispatch({
      type: PROFILE_UPDATE_SUCCESS,
      payload: data,
    })

    var info = JSON.parse(localStorage.getItem('userInfo'))
    info.user = data.user

    localStorage.setItem("userInfo", JSON.stringify(info))

  } catch (error) {

    dispatch({
      type: PROFILE_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updatePassword2 = (password, userId) => async (dispatch, getState) => {

  try {
    dispatch({
      type: PROFILE_UPDATE_REQUEST,
    })

    const { data } = await axiosInstance.post("/update-password", { password, userId })

    dispatch({
      type: PROFILE_UPDATE_SUCCESS,
      payload: data,
    })

    var info = JSON.parse(localStorage.getItem('userInfo'))
    info.user = data.user

    localStorage.setItem("userInfo", JSON.stringify(info))

  } catch (error) {

    dispatch({
      type: PROFILE_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}


export const postCreate = (obj) => async (dispatch, getState) => {
  // console.log(obj)
  try {
    dispatch({
      type: CREATE_POST_REQUEST,
    })


    const formData = new FormData()
    formData.append("video", obj.link)
    formData.append("content", obj.content)
    formData.append("image", obj.image)
    formData.append("post_video", obj.video)
    formData.append("postType", obj.postType)

    const { data } = await axiosInstance.post("/addPost", formData, obj.postType === "video" ? obj.options : {})

    dispatch({
      type: CREATE_POST_SUCCESS,
      payload: data,
    })

  } catch (error) {
    dispatch({
      type: CREATE_POST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const userSubscribing = (id) => async (dispatch, getState) => {

  try {
    dispatch({
      type: SUBSCRIBING_USER_REQUEST,
    })

    const { data } = await axiosInstance.post(`/subscribe/${id}`)

    dispatch({
      type: SUBSCRIBING_USER_SUCCESS,
      payload: data,
    })

  } catch (error) {

    dispatch({
      type: SUBSCRIBING_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getMyProfile = (id) => async (dispatch, getState) => {

  try {
    dispatch({
      type: MY_PROFILE_REQUEST,
      payload: {},
    })

    const { data } = await axiosInstance.get('/myprofile')

    dispatch({
      type: MY_PROFILE_SUCCESS,
      payload: data,
    })

  } catch (error) {

    dispatch({
      type: MY_PROFILE_FAIL,
      payload:
        error.response && error.response.data?.message
          ? error.response.data?.message
          : error?.message,
    })
  }
}