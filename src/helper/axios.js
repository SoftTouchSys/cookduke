import axios from "axios";
import { URL } from "../config";
import store from "../store"
import {logout} from "../Actions/userActions"
import { Navigate } from "react-router-dom";
import {USER_LOGOUT,LOGOUT_SUCCESS} from "../Constants/userConstants.js"

const token = window.localStorage.getItem('token')

const axiosInstance = axios.create({
    baseURL: URL,
    headers:{
        'Authorization': token ? `Bearer ${token}` : ''
    }
})

axiosInstance.interceptors.request.use((req)=>{
    const {userLogin} = store.getState();
    if(userLogin?.userInfo?.token){
        req.headers.Authorization = `Bearer ${userLogin?.userInfo?.token}`;
    }
    return req;
})

axiosInstance.interceptors.response.use((res)=>{
     return res;
}, (error)=>{
  
    const status = error.response ? error.response.status : 500;
    if(status === 500 || status === 503){
        localStorage.clear()
        store.dispatch({type:LOGOUT_SUCCESS})
        store.dispatch({type:USER_LOGOUT})
        store.dispatch(logout())
         Navigate("/")
         window.location.reload()
    }
    return Promise.reject(error)
})
export default axiosInstance
