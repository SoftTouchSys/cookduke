import React from 'react'
import Container from 'react-bootstrap/Container';
import FormsNavbar from './FormsNavbar';
import FormsFooter from './FormsFooter';
import {
  Link,
} from "react-router-dom";
import { useTranslation } from 'react-i18next';


const SetupAccount = () => {
  const {t}=useTranslation()

  return (
    <>
      <FormsNavbar />
      <Container className='main_signup'>
      <div className='signup_container'>
        <div className='signup_container_header'>
          <span className="Register-with">{t("setup_your_account")}</span>
        </div>
        <div className='signup_container_footer'>
          <div className='signup_inputs_setup'>
            <input placeholder='First Name' />
            <input placeholder='Last Name' />
            <input placeholder='Phone' />
            <input placeholder='Country' />
            <input placeholder='City' />
            <input placeholder='Street' />
            <input placeholder='House No.' />
            <input placeholder='Post Code' />
          </div>
          
          <button><span>{t("confirm")}</span></button>
        </div>
      </div>
    </Container>
    <FormsFooter />
    </>
  )
}

export default SetupAccount