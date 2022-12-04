
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import queryString from "query-string"
import {resetPassword} from "../../Actions/userActions"
import FormsNavbar from './FormsNavbar';
import FormsFooter from './FormsFooter';
import Container from 'react-bootstrap/Container';
import { BsChevronLeft } from "react-icons/bs";
import {
  Link,
} from "react-router-dom";
import { useTranslation } from 'react-i18next';

const ResetPassword = () => {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const location=useLocation()
    const {t}=useTranslation()

    const userResetPassword = useSelector((state) => state.userResetPassword)
const {success,message} =userResetPassword


const {token,id} = queryString.parse(location.search) 

if(!token && !id){
  window.location = "/"
}


const [password, setPassword] = useState('')
const [confirmPassword, setConfirmPassword] = useState('')

const resetPasswordHandler=(e)=>{
  e.preventDefault()
  if(password===confirmPassword){
    dispatch(resetPassword(token, id, password))
  }else{
    alert("password doesnt match")
  }

}

useEffect(()=>{
if(message==="password reset successfully."){
  navigate("/login")
}
},[message])
  return (
    <div>
             <FormsNavbar />
        <Container fluid className='main_signup'>
        <div className='signup_container'>
            <div className='signup_container_header'>
            <h3 className="forgetpassword_heading1">{t("create_new_password")}</h3>
            <p style={{"margin-top":"10px"}}>{t("do_you_want _to_change_your_password")}</p>
            {message &&<div className='message'>{ message}</div>}
            </div>
                <form className="forget_container_footer" onSubmit={resetPasswordHandler}>
                  <input className="forgetpassword_input" placeholder='New Password' type="password" onChange={(e) => setPassword(e.target.value)}/>
                  <input className="forgetpassword_input" placeholder='Confirm Password' type="password" onChange={(e) => setConfirmPassword(e.target.value)}/>
                  <span className="forgetpassword_text">{t("please_enter_a_new_password")}</span>
                  <button type="submit"><span>{t("submit")}</span></button>
                  <div className="forgetpassword_container">
                    <BsChevronLeft className="forgetpassword_icon" />
                    <Link className="forgetpassword_text1" to="/login">{t("back_to_login")}</Link>
                  </div>
                </form>
                </div>
        </Container>
        <FormsFooter />
    </div>
  )
}

export default ResetPassword