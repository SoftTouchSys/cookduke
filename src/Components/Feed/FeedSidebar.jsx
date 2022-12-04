import React from 'react'
import '../Feed/feed.css'
import { CgCap } from "react-icons/cg";
import { GiShoppingBag,GiChefToque } from "react-icons/gi";
import { TiMessages } from "react-icons/ti";
import { MdOutlineAccessTime,MdOutlineFavoriteBorder,MdDashboard, MdGroups} from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { RiLogoutCircleLine } from "react-icons/ri";
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { logout } from '../../Actions/userActions';
import { NavLink } from 'react-router-dom';

const FeedSideBar = () => {
    const {t} = useTranslation()
    const dispatch = useDispatch()

    const logOut=()=>{
        dispatch(logout())
    }
    
  return (
    <div className='feed_sidebar'>
        <NavLink to='/' className='feed_sidebar_items'>
        <MdDashboard className='feed_sidebar_items_icon' />
            <span>{t("Home")}</span>
        </NavLink>
        <NavLink to='/restaurants' className='feed_sidebar_items '>
        <CgCap className='feed_sidebar_items_icon' />
            <span>{t("restaurants")}</span>
        </NavLink>
        <NavLink to='/chefs' className='feed_sidebar_items'>
            <GiChefToque className='feed_sidebar_items_icon' />
            <span>{t("chefs")}</span>
        </NavLink>

        {/* <NavLink to='/orderMeal' className='feed_sidebar_items'>
            <GiShoppingBag className='feed_sidebar_items_icon' />
            <span>{t("order_a_meal")}</span>
        </NavLink> */}
        <NavLink to="/favourite" className='feed_sidebar_items'>
        <MdOutlineFavoriteBorder className='feed_sidebar_items_icon' />
            <span>{t("favourite")}</span>
        </NavLink>
        <NavLink to='/messages' className='feed_sidebar_items'>
        <TiMessages className='feed_sidebar_items_icon' />
            <span>{t("messages")}</span>
        </NavLink>
        {/* <NavLink to='/groups' className='feed_sidebar_items'>
        <MdGroups className='feed_sidebar_items_icon' />
            <span>{t("groups")}</span>
        </NavLink> */}
        <NavLink to='/orders' className='feed_sidebar_items'>
              <MdOutlineAccessTime className='feed_sidebar_items_icon' />
            <span>{t("My Orders")}</span>
        </NavLink>
        {/* <NavLink to='' className='feed_sidebar_items'>
        <IoSettingsOutline className='feed_sidebar_items_icon' />
        <span>{t("settings")}</span>
        </NavLink> */}
        <NavLink to='/login' className='feed_sidebar_items' onClick={logOut}>
            <RiLogoutCircleLine className='feed_sidebar_items_icon' />
            <span>{t("logout")}</span>
        </NavLink>
    </div>
  )
}

export default FeedSideBar