import React from 'react'
import './Forms.css'
import Container from 'react-bootstrap/Container';

import LanguageSelect from '../../Language';
import {
    Link,
  } from "react-router-dom";
  import { useTranslation } from 'react-i18next';
  import { GoThreeBars } from "react-icons/go";


  const FormsNavbar = () => {
    const {t}=useTranslation()

  return (
    <>
        <Container fluid className='form_navbar'>
            <a href='/'>
              <div className='form_logo'>
                <span className="logo">
                {t("logo")}
                </span>
            </div></a>
            <div className='list_container'>
                <GoThreeBars className='list_bars' />
                <div className="lists">
                    <Link to="/about"><span>{t("about")}</span></Link>
                    <Link to="/advertising"><span>{t("advertising")}</span></Link>
                    <Link to="/career"><span>{t("career")}</span></Link>
                    <Link to="/privacy-policy"><span>{t("terms_of_use")}</span></Link>
                    <Link to="/contact"><span>{t("contact")}</span></Link>
                </div>
                <LanguageSelect/>
                <div className='form_button'>
                <Link to="/login"><span>{t("login")}</span></Link>
                </div>
            </div>
        </Container>
    </>
  )
}

export default FormsNavbar