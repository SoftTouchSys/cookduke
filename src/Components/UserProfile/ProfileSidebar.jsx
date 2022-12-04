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
import { Link, useNavigate } from 'react-router-dom';

const FeedSideBar = () => {
    const {t} = useTranslation()
    const dispatch = useDispatch()
  const navigate=useNavigate()

    const logOut=()=>{
        dispatch(logout())
        navigate("/")
    }
    
  return (
    <div className='feed_sidebar'>
        <Link to='/'><div className='feed_sidebar_items active'>
        <MdDashboard className='feed_sidebar_items_icon' />
            <span>{t("Home")}</span>
        </div></Link>
        <Link to='/restaurants'><div className='feed_sidebar_items '>
        <CgCap className='feed_sidebar_items_icon' />
        <span>{t("restaurants")}</span>
        </div></Link>
        <Link to='/chefs'><div className='feed_sidebar_items'>
            <GiChefToque className='feed_sidebar_items_icon' />
            <span>{t("chefs")}</span>
        </div></Link>

        <div className='feed_sidebar_items'>
            <GiShoppingBag className='feed_sidebar_items_icon' />
            <span>{t("order_a_meal")}</span>
        </div>
        <div className='feed_sidebar_items'>
        <MdOutlineFavoriteBorder className='feed_sidebar_items_icon' />
            <span>{t("favourite")}</span>
        </div>
        <div className='feed_sidebar_items'>
        <TiMessages className='feed_sidebar_items_icon' />
            <span>{t("messages")}</span>
        </div>
        {/* <div className='feed_sidebar_items'>
        <MdGroups className='feed_sidebar_items_icon' />
            <span>{t("groups")}</span>
        </div> */}
        {/* <div className='feed_sidebar_items'>
              <MdOutlineAccessTime className='feed_sidebar_items_icon' />
            <span>{t("history")}</span>
        </div> */}
        <div className='feed_sidebar_items' onClick={logOut}>
            <RiLogoutCircleLine className='feed_sidebar_items_icon' />
            <span>{t("logout")}</span>
        </div>
    </div>
  )
}

export default FeedSideBar