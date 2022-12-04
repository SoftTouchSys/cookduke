import React from 'react'
import '../../Feed/feed.css'
import { useDispatch } from 'react-redux';
import { GiHotMeal,GiShoppingBag } from "react-icons/gi";
import { TiMessages } from "react-icons/ti";
import {CgMenuBoxed} from "react-icons/cg"
import { MdOutlineAccessTime,MdDashboard,MdOutlineAttractions,MdGroups } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { RiLogoutCircleLine } from "react-icons/ri";
import { useTranslation } from 'react-i18next';
import {logout} from "../../../Actions/userActions"
import { NavLink } from 'react-router-dom';

const Feed_profile_sidebar = () => {
    const {t} = useTranslation()
    const dispatch=useDispatch

    const logOut=()=>{
        dispatch(logout())
    }
  return (
    <div className='feed_sidebar'>
   <NavLink to="/restaurant/dashboard" className='feed_sidebar_items'>
        <MdDashboard className='feed_sidebar_items_icon' />
            <span>{t("dashboard")}</span>
        </NavLink>
        <NavLink to="/restaurant/orders" className='feed_sidebar_items '>
            <GiShoppingBag className='feed_sidebar_items_icon' />
            <span>{t("orders")}</span>
        </NavLink>
        {/* <NavLink to="/tracking" className='feed_sidebar_items'>
            <MdOutlineAttractions className='feed_sidebar_items_icon' />
            <span>{t("tracking")}</span>
        </NavLink> */}
        <NavLink to="/tablereservation" className='feed_sidebar_items'>
            <GiHotMeal className='feed_sidebar_items_icon' />
            <span>{t("table_reservation")}</span>
        </NavLink>
        {/* <NavLink to="/menu" className='feed_sidebar_items'>
            <CgMenuBoxed className='feed_sidebar_items_icon' />
            <span>{t("menu")}</span>
        </NavLink> */}
        <NavLink to="/messages" className='feed_sidebar_items'>
            <TiMessages className='feed_sidebar_items_icon' />
            <span>{t("messages")}</span>
        </NavLink>
        {/* <NavLink to="/restaurant/groups" className='feed_sidebar_items'>
            <MdGroups className='feed_sidebar_items_icon' />
            <span>{t("groups")}</span>
        </NavLink> */}
        <NavLink to="/history" className='feed_sidebar_items'>
            <MdOutlineAccessTime className='feed_sidebar_items_icon' />
            <span>{t("history")}</span>
        </NavLink>
        <NavLink to="/setup-account" className='feed_sidebar_items'>
            <IoSettingsOutline className='feed_sidebar_items_icon' />
            <span>{t("settings")}</span>
        </NavLink>
        <NavLink to="/logout" className='feed_sidebar_items' onClick={logOut}>
            <RiLogoutCircleLine className='feed_sidebar_items_icon' />
            <span>{t("logout")}</span>
        </NavLink>
    </div>
  )
}

export default Feed_profile_sidebar