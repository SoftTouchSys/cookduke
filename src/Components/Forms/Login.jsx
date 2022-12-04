import React, { useEffect, useState } from 'react'
import queryString from "query-string"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { GoogleRegister, login ,resendEmail} from "../../Actions/userActions"

import { GoogleLogin } from '@react-oauth/google';
import { BsCheck2 } from "react-icons/bs";
import { Container, Form } from 'react-bootstrap';
import FormsNavbar from './FormsNavbar';
import FormsFooter from './FormsFooter';
 import {URL} from "../../config"
import {
  Link,
} from "react-router-dom";

import { useTranslation } from 'react-i18next';
import axiosInstance from '../../helper/axios';
import Cookies from 'js-cookie';
import { RememberMe } from '@mui/icons-material';

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location=useLocation()
  const { t } = useTranslation()

  const responseGoogle = (response) => {
   
    let tokenId = response.credential;
    dispatch(GoogleRegister(tokenId))
  }

  const errorGoogle = (response) => {
    
  }

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [newMessage, setMessage] = useState('')
   const [remember, setRemember]=useState(false)
  const userLogin = useSelector((state) => state.userLogin)
  const {userInfo,error} = userLogin
  


  const userResendEmail = useSelector((state) => state.userResendEmail)
  const {message } = userResendEmail
  
  

  useEffect(()=>{
    if( message==="email link sent successfully"){
      setTimeout(function () { 
        setMessage(message)
       }, 3000);
     
    }

  },[message])

  const userValidate = useSelector((state) => state.userValidate)
  const { success } = userValidate


  useEffect(() => {
if(userInfo?.message === "Login Successfull"){}

    if (userInfo?.message === "Login Successfull") {
      if(remember===true){
        Cookies.set('cd_email', email, { path: 'https://cookduke.ellaclosset.com/#/' })
        // Cookies.set('cd_password', password, { path: 'http://localhost:3000/' })
      }

      if (userInfo?.user) {
        if(userInfo.user?.role==="user"){
          navigate("/")
        }else if(userInfo.user?.role==="chef"){
          if(userInfo.user?.loginCount===1){
            navigate("/setup-account")
          }else{
            navigate("/chef/dashboard")
          }

        }else if(userInfo.user?.role==="restaurant"){
          if(userInfo.user?.loginCount===1){
            navigate("/setup-account")
          }else{
          navigate("/restaurant/dashboard")
        }
        }
      }
    } else {
      setMessage(userInfo?.message)
    }
  }, [userInfo])

  const userResetPassword = useSelector((state) => state.userResetPassword)
  const fpMessage = userResetPassword.message


  useEffect(() => {
    setTimeout(function () { 
      setMessage(fpMessage)
     }, 3000);
  }, [fpMessage])


  useEffect(() => {
    if (success === true) {
      setTimeout(function () { 
        setMessage("Verified Successfully, You may login.")
       }, 3000);
 
    }
  }, [success])


  const userLoginHandler = (e) => {
    e.preventDefault()
    if (email === "" || password === "") {
      setMessage("Please fill all the fields")
    } else {
      dispatch(login(email, password))
    }
  }

//   const usrResendEmail=()=>{
//     const { id} = queryString.parse(location.search) 
// if(id){
// dispatch(resendEmail(id)) 
// }
// }

const usrResendEmail=()=>{
  const id=JSON.parse(localStorage.getItem('login_id'))
if(id){
dispatch(resendEmail(id)) 
}

}

  useEffect(()=>{
const email=Cookies.get("cd_email")?Cookies.get("cd_email"):""
// const password=Cookies.get("cd_password")
document.getElementById("email").value=email
// document.getElementById("password").value=password
setEmail(email)
// setPassword(password)

  },[])

  return (
    <>
      <FormsNavbar />
      <Container className='main_signup'>
        <div className='signup_container'>
          <div className='signup_container_header'>
            <h3 className="Register-with">{t("Login")}</h3>
            <div className="Rectangle">
              <GoogleLogin
                onSuccess={responseGoogle}
                onError={errorGoogle}
                buttonText="Login"
                useOneTap 
              />
            </div>
            <span className="or">{t("or")}</span>
          </div>
          {newMessage && newMessage === "user is not verified" ? <div className="message">{newMessage}. <u onClick={usrResendEmail}> Resend Email</u></div>:
          newMessage && <div className="message">{newMessage}</div>}
          {error && <div className="message text-danger">{error}</div>}
          <Form className='signup_container_footer' onSubmit={userLoginHandler}>
            <div className='signup_inputs'>
              <input placeholder='Email' id="email" type="email" onChange={(e) => setEmail(e.target.value)} />
              <input placeholder='Enter Password' id="password" type="password" onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className='signup_terms'>
                            <div className='signup_terms_main'>
                <input classname="geekmark signup_terms_main" type="checkbox" name="terms" value="accepted" id="terms" onClick={()=>{setRemember(remember===false?true:false)}}/>
                 <label for="terms" className="mt-2 signup_terms_text2 signup_terms_text1">&nbsp;{t("remember_me")}</label>
                <span className="signup_terms_text2 signup_terms_text1">&nbsp;</span>
              </div>
              <Link className="signup_terms_text2 signup_terms_text3" to="/forgot-password">{t("forgot_password")}?</Link>
            </div>
            <button type="submit"><span>{t("login")}</span></button>
            <div className='signup_text'>
              <span className="signup_text_Ques">{t("login_your_account")}</span>
              <Link className="signup_text_login" to="/signup">{t("sign_up")}</Link>
            </div>
          </Form>
        </div>
      </Container>
      <FormsFooter />
    </>
  )
}

export default Login