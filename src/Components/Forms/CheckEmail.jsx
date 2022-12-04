import React, { useState, useEffect } from 'react'
import queryString from "query-string"
import { useDispatch, useSelector } from 'react-redux'
import FormsNavbar from './FormsNavbar';
import FormsFooter from './FormsFooter';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom'
import {resendEmail} from "../../Actions/userActions"

import {
  Link,useNavigate, useLocation,
} from "react-router-dom";

const CheckEmail = () => {
  const {t} = useTranslation()
  const dispatch=useDispatch()
  const location=useLocation()

  const [newMessage, setMessage] = useState('')
  
  const userResendEmail = useSelector((state) => state.userResendEmail)
  const rmessage  = userResendEmail.message
  
  
  
  useEffect(()=>{
  setMessage(rmessage)
  },[rmessage])


  const usrResendEmail=()=>{
    const { id} = queryString.parse(location.search) 
if(id){
dispatch(resendEmail(id)) 
}
}
  return (

  <>
   <FormsNavbar />
    <div className="checkmail_box">
      <div className="check_your_email">
        <h3>{t("check_your_email")}</h3>
        <p>
        {t("we_heve_sent_a_link_to_your_email_address")}
  <span className="text-style-2">{t("email_address")}</span>
</p>
{newMessage && <div className="message">{newMessage}</div>}
<button onClick={usrResendEmail}>{t("resend")}</button>
      </div>
  
    </div>
    <FormsFooter />
    </>
  )
}

export default CheckEmail