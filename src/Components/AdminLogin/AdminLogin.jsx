import React from 'react'
import { Container } from 'react-bootstrap';
import FormsNavbar from '../Forms/FormsNavbar';
import FormsFooter from '../Forms/FormsFooter';
import { GoogleLogin } from '@react-oauth/google';
import { useTranslation } from 'react-i18next';

const AdminLogin = () => {

  const { t } = useTranslation()
  return (
    <>
      <FormsNavbar />
      {/* --------------------------- */}

      <Container className='main_signup'>
        <div className='signup_container signup_container1'>
          <div className='signup_container_header'>
            <h3 className="Register-with">{t("login_your_account")}</h3>
            <div className="Rectangle">
              <GoogleLogin/>
            </div>
            <span className="or mb-2">{t("or")}</span>
          </div>
          <form className='signup_container_footer'>
            <div className='signup_inputs'>
              <input placeholder='Your Email' type="email"/>
              <input placeholder='Create Password' type="password"/>
            </div>
            <div className='signup_terms mt-4'>

              <div className='signup_terms_main'>
                <input
                  classname="geekmark signup_terms_main"
                  type="checkbox" name="terms"
                />
                <label for="terms" className="mt-2 signup_terms_text2 signup_terms_text1">&nbsp;{t("i_aggree_the")}</label>

              </div>

            </div>
            <button type="submit"><span>{t("login")}</span></button>
          </form>
        </div>

      </Container>
      <FormsFooter />
    </>
  )
}

export default AdminLogin