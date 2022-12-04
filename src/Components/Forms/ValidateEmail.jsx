
import React, { useState, useEffect } from 'react'
import queryString from "query-string"
import { useDispatch, useSelector } from 'react-redux'
import {verifyEmail} from "../../Actions/userActions"
import { useNavigate, useLocation, Navigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom'

import {resendEmail} from "../../Actions/userActions"

export const ValidateEmail = () => {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const location=useLocation()
    const {t}=useTranslation()


    const [newMessage, setMessage] = useState('')
    const [id,setId]=useState("")
    
useEffect(()=>{
    const {token, id} = queryString.parse(location.search) 
    if(!token && !id){
      window.location = "/"
    }else{
      dispatch(verifyEmail(token,id))
      setId(id)
    }

    
},[])

const userValidate = useSelector((state) => state.userValidate)
const {success, message} = userValidate

const userResendEmail = useSelector((state) => state.userResendEmail)
const rmessage  = userResendEmail.message



useEffect(()=>{
setMessage(rmessage)
},[rmessage])

useEffect(()=>{
if(success===true){
    navigate("/login")
}
setMessage(message)

},[success,message])

const usrResendEmail=()=>{
  dispatch(resendEmail(id && id))
 
}
  return (
    <div className="checkmail_box">
    <div className="check_your_email check_your_email2">
      <h3> {t("email_validation")}</h3>
      {newMessage && <div className="message">{newMessage}</div>}
    {newMessage && newMessage === "Reset Token Not Found" || newMessage==="Reset Token is Invalid"?
      <button>Please Try Again! OR <u onClick={usrResendEmail}>Resend Email</u></button>:
      newMessage==="User Already Verified" ? <Link to="/login"><button>Login</button></Link>:
      <Link to="/signup"><button>SignUp or Login</button></Link>}

    </div>

  </div>

  )
}
