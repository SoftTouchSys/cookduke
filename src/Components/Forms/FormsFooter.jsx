import React from 'react'
import Container from 'react-bootstrap/Container';
import { TiSocialFacebook } from "react-icons/ti";
import { AiOutlineInstagram } from "react-icons/ai";
import { AiOutlineTwitter } from "react-icons/ai";
import { useTranslation } from 'react-i18next';
import {Link} from "react-router-dom"
const FormsFooter = () => {
  const {t}=useTranslation()
  return (
    <Container fluid className='form_footer'>
        <div className="footer_lists">
            <div className="footer_list">
                <span className="footer_logo">{t("logo")}</span>
                <div className="footer_links">
                <Link to="/about"><span>{t("about")}</span></Link>
                <Link to="/advertising"><span>{t("advertising")}</span></Link>
                <Link to="/career"><span>{t("career")}</span></Link>
                    <Link to="/privacy-policy"><span>{t("terms_of_use")}</span></Link>
                    <Link to="/contact"><span>{t("contact")}</span></Link>
                </div>
                <div className="footer_Social_media">
                    <TiSocialFacebook className='footer_icon'/>
                    <AiOutlineInstagram className='footer_icon'/>
                    <AiOutlineTwitter className='footer_icon'/>
                </div>
            </div>
            <div className="footer_subscribe">
                <span className="footer_subscribe_text">{t("subscribe")}</span>
                <form className="footer_subscribe_form">
                    <input placeholder='Enter you Email' />
                    <button>{t("subscribe")}</button>
                </form>
                <div className="footer_subscribe_content">{t("by_subscribing_you_agree_to_with_our_Privacy_Policy")}</div>
            </div>
        </div>
        <div className="footer_border"></div>
        <div className="footer_copyright">
            <div className="footer_copyright_lists">
                <Link to="/privacy-policy"><span className="Privacy-Policy">{t("privacy_policy")}</span></Link>
                <Link to="/privacy-policy"><span className="Privacy-Policy">{t("terms_of_service")}</span></Link>
                <Link to="/privacy-policy"><span className="Privacy-Policy">{t("cookies_settings")}</span></Link>
            </div>
            <div className='footer_copyright_text'>{t("2022_cookduke._All_right_reserved.")}</div>
        </div>
    </Container>
  )
}

export default FormsFooter