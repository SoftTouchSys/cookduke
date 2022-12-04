import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import FormsNavbar from './FormsNavbar';
import FormsFooter from './FormsFooter';
import {Container, Form }from 'react-bootstrap';
import { BsChevronLeft } from "react-icons/bs";
import { useTranslation } from 'react-i18next';
import { forgetPassword } from '../../Actions/userActions';
import {
  Link,
} from "react-router-dom";

const ForgotPassword = () => {
  const dispatch=useDispatch()
  const {t}=useTranslation()

  
  const userForgetPassword = useSelector((state) => state.userForgetPassword)
const {success,message} = userForgetPassword



useEffect(()=>{
  if(message=="password reset link is sent to your email."){
  }
},[message])


  const [email, setEmail] = useState('')
  const forgetPasswordHandler=(e)=>{
    e.preventDefault()
dispatch(forgetPassword(email))
  }

  return (

    <>
        <FormsNavbar />
        <Container fluid className='main_signup'>
        <div className='signup_container'>
            <div className='signup_container_header'>
            <h3 className="forgetpassword_heading1">{t("forgot_your_password")}</h3>
                <p className='heading_footer' style={{"marginTop":"10px"}}>{t("enter_your_email_to_reset_password")}</p>
                {message &&<div className='message'>{ message}</div>}
                </div>
                <Form className='forget_container_footer' onSubmit={forgetPasswordHandler}>
                  <input className="forgetpassword_input" placeholder='Your Email' type="email" onChange={(e) => setEmail(e.target.value)}/>
                  <span className="forgetpassword_text">{t("please_enter_a_valid_email_address")}</span>
                  <button type="submit"> <span>{t("send")}</span></button>
                  <div className="forgetpassword_container">
                    <BsChevronLeft className="forgetpassword_icon" />
                    <Link className="forgetpassword_text1" to="/login">{t("back_to_login")}</Link>
                  </div>
                </Form>
            </div>
        </Container>
        <FormsFooter />
    </>
  ) 
}

export default ForgotPassword