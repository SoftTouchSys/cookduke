import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation, Navigate } from 'react-router-dom'
import './Profile.css'
import Container from "react-bootstrap/Container"
import Navbar from "../NavBar/Navbar"
import ProfileSidebar from "./ProfileSidebar"
import ProfileTabs from './ProfileTabs'
import {getMyProfile } from "../../Actions/userActions"

const Profile = () => {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const location = useLocation()


    const token = JSON.parse(localStorage.getItem('userInfo'))?.token
    if (!token) {
      window.location = '/';
    }
  

    return (
    <Container fluid className='profile_container'>
        <Navbar/>
        <div className='profile_banner'>
            <ProfileSidebar/>
            <div className='profile_banner_side'>
            <ProfileTabs/>
            </div>
        </div>
    </Container>
  )
}

export default Profile