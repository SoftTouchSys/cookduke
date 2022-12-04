import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom';
import '../Feed/feed.css'
import { BiSearch, BiAlbum, BiBell, BiCartAlt } from "react-icons/bi";
import { useTranslation } from 'react-i18next';
import DropDown from './DropDown';
import $ from 'jquery';
import { getNotification } from '../../Actions/notificationActions';
import { getConversations, getMessage } from '../../Actions/messageAction';
import { socketNode } from '../../socket';
import { GoThreeBars } from "react-icons/go";
import { AiOutlinePlusSquare, AiOutlinePlus, AiOutlineMinusSquare } from "react-icons/ai";
import { RiDeleteBinFill } from "react-icons/ri";
import Cart from './cart';
import axiosInstance from '../../helper/axios';

const Feed_profile_navbar = () => {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const location = useLocation();

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const notificationDetails = useSelector((state) => state.notification)
    const notification = notificationDetails

    const localCart = useSelector((state) => state._todoProduct)

    localStorage.setItem('localCart',JSON.stringify(localCart))

    useEffect(() => {
        dispatch(getNotification());
    }, [])

    useEffect(() => {
        var barIcon = document.querySelector(".feed_header_info_main_icon")
        var feedSidebar = document.querySelector(".feed_sidebar")
        let count = 0;

        barIcon.addEventListener("click", function () {
            count++;
            if (count === 1) {
                feedSidebar.classList.add("sidebar_active")
            }
            else if (count === 2) {
                feedSidebar.classList.remove("sidebar_active")
                count = 0
            }
        })
    }, [])

    const openNotif = (id) => {
        socketNode.emit("opened", { id })
        dispatch(getNotification())
        // setDown(false)
    }

    const [searchedUser, setSearchedUser] = useState('')
    const searchUser = async (value) => {

        var { data } = await axiosInstance.get(`/searchUsers?text=${value}`)
        setSearchedUser(data)

    }

    let widthMatch = window.matchMedia("(min-width: 950px)");
    widthMatch.addEventListener('change', function(mm) {
        if (mm.matches) {
            document.querySelector('.feed_sidebar').style.left="0"
        }
    });
    const openSideBar=()=>{

            if(document.querySelector('.feed_sidebar').style.left==="-200px"){
                document.querySelector('.feed_sidebar').style.left="0"
            }else{
                document.querySelector('.feed_sidebar').style.left="-200px" 
            }


}

const showMessage = (id) => {
    dispatch(getMessage(location?.pathname?.split("/")[2]))
}


window.onclick = function (e) {

    if(e.target.classList.contains("feed_header_info2") || document.getElementsByClassName("click_cart")[0].contains(e.target)){
        if (document.getElementsByClassName("cart_box")[0].classList.contains("d-none")) {
            document.getElementsByClassName("cart_box")[0].classList.remove("d-none")
            document.getElementsByClassName("cart_box")[0].style.zIndex = "2"

        } else {
            document.getElementsByClassName("cart_box")[0].classList.add("d-none")
            document.getElementsByClassName("cart_box")[0].style.zIndex = "1"
        }
    }else if(document.getElementsByClassName("cart_box")[0].contains(e.target)){
        document.getElementsByClassName("cart_box")[0].classList.remove("d-none")  
    }else{
        document.getElementsByClassName("cart_box")[0].classList.add("d-none")
    }
    // ------
    if(e.target.classList.contains("feed_header_info1") || document.getElementsByClassName("click_bell")[0].contains(e.target)){
        if (document.getElementsByClassName("notifications")[0].classList.contains("notification_box")) {
            document.getElementsByClassName("notifications")[0].classList.remove("notification_box")
            document.getElementsByClassName("notifications")[0].classList.add("_notification_box")

        } else {
            document.getElementsByClassName("notifications")[0].classList.add("notification_box")
            document.getElementsByClassName("notifications")[0].classList.remove("_notification_box")
            document.getElementsByClassName("notifications")[0].style.zIndex = "1"
        }
    }else if(document.getElementsByClassName("_notification_box")[0]?.contains(e.target)){
        document.getElementsByClassName("notifications")[0].classList.remove("notification_box")
        document.getElementsByClassName("notifications")[0].classList.add("_notification_box") 
    }else{
        document.getElementsByClassName("notifications")[0].classList.add("notification_box")
        document.getElementsByClassName("notifications")[0].classList.remove("_notification_box")
    }
};

    return (
        <div className='feed_header'>
            <div className='feed_header_main'>
                <a href='/'><div className='feed_header_logo'>{t("feed_logo")}</div></a>
                <div className='feed_header_main_search'>
                    <div className='feed_header_search'>
                        <BiSearch className='feed_header_search_icon' />
                        <input placeholder='Search anything here...' onChange={(e) => searchUser(e.target.value)} />
                        {searchedUser.length > 0 ? <ul style={{ top: "50px",overflow:"scroll",height:"70vh",padding:".5%",boxSizing:"border-box" }} class=" list-group rounded w-50 position-absolute">
                            {searchedUser.length > 0 ? searchedUser.map((obj, i) => {
                                return <Link to={`/profile/${obj?._id}`}>
                                    <li class="list-group-item ml-2" >
                                        <div className='d-flex'>
                                            <div className='feed_banner_left_header_image'>
                                                {<img src={obj?.profilePicture || 'https://colegioclassea.com.br/wp-content/themes/PageLand/assets/img/avatar/avatar.jpg'} alt="ig" />}
                                            </div>
                                            <div className='feed_banner_left_header_content'>
                                                <h1>{obj?.restaurantName
                                                    ? obj?.restaurantName
                                                    : obj?.firstName + " " + obj?.lastName}</h1>
                                                {/* <p>{res?.bookDate} @ {res?.time}</p> */}
                                            </div>
                                        </div>
                                        {obj?.menu?.map((menu,i)=>{
                                            return <article className="media" key={i}>
                                            <img className="img-fluid mr-4" width={60} src={menu?.itemImage || "https://www.kindpng.com/picc/m/79-798754_hoteles-y-centros-vacacionales-dish-placeholder-hd-png.png"} alt="MenuImage" />
                                        <div className="media-body align-self-center ">
                                            <div className="d-flex justify-content-between">
                                                <h3 className="align-self-center text-capitalize h6 font400">{menu?.itemName}</h3>
                                                <div className="align-self-center">
                                                    <strong className="font700">Rs. {menu?.price}</strong>
                                                </div>
                                            </div>
                                        </div>
                                        
                                    </article>
                                        })}
    

                                    </li></Link>
                            }) : <li class="list-group-item">no user found</li>}
                        </ul>:null}
                    </div>
                    <Link to="/map">
                        <div className='feed_header_icon'>
                            <BiAlbum className='feed_header_icon_icon' />
                        </div>
                    </Link>
                </div>
            </div>
            <div className='feed_header_info_main'>
                <div className='feed_header_info_main_icon' onClick={openSideBar}>
                    <GoThreeBars />
                </div>
                <div className='feed_header_info'>
                    <div id="bell" className='feed_header_info1'><div className='click_bell'><BiBell style={{fontSize:'1.5em'}}/><span>{notification?.notification?.newNotification?.length || 0}</span></div>

                        <div className="notifications notification_box">
                            <h2>Notifications - <span>{notification?.notification?.newNotification?.length || 0}</span></h2>
                            {
                                notification && notification?.notification?.newNotification?.map((obj, i) => {

                                    return <div key={i} onClick={() => openNotif(obj?._id)} style={{ backgroundColor: `${!obj?.opened && "white"}` }} className="notifications-item"> <img src={obj?.sender && obj?.sender?.profilePicture ? obj?.sender?.profilePicture : 'https://colegioclassea.com.br/wp-content/themes/PageLand/assets/img/avatar/avatar.jpg'} alt="img" />
                                        <Link to={obj?.type === "subscribe" ? `/profile/${obj?.sender?._id}` : obj?.type === "message" ? `/message/${obj?.sender?._id}` : obj?.type === "comment" && obj?.type === "reply"?`/${obj?.post?._id}`:"/"} ><div className="text">
                                            <h4>{obj?.sender?.role === "restaurant" ? obj?.sender?.restaurantName?obj?.sender?.restaurantName : obj?.sender?.firstName + ' ' + obj?.sender?.lastName:obj?.sender?.firstName + ' ' + obj?.sender?.lastName}</h4>
                                            {obj?.type === "like" ? <p>{obj?.sender?.role === "restaurant" ? obj?.sender?.restaurantName? obj?.sender?.restaurantName + ' ' + "like your post." : obj?.sender?.firstName + ' ' + obj?.sender?.lastName + ' ' + "like your post.":obj?.sender?.firstName + ' ' + obj?.sender?.lastName + ' ' + "like your post."}</p> : null}
                                            {obj?.type === "comment" ? <p>{obj?.sender?.role === "restaurant" ? obj?.sender?.restaurantName?obj?.sender?.restaurantName + ' ' + "commented on your post." : obj?.sender?.firstName + ' ' + obj?.sender?.lastName + ' ' + "commented on your post.":obj?.sender?.firstName + ' ' + obj?.sender?.lastName + ' ' + "commented on your post."}</p> : null}
                                            {obj?.type === "subscribe" ? <p>{obj?.sender?.role === "restaurant" ? obj?.sender?.restaurantName?obj?.sender?.restaurantName + ' ' + "subscribed you." : obj?.sender?.firstName + ' ' + obj?.sender?.lastName + ' ' + "subscribed you.":obj?.sender?.firstName + ' ' + obj?.sender?.lastName + ' ' + "subscribed you."}</p> : null}
                                            {obj?.type === "unsubscribe" ? <p>{obj?.sender?.role === "restaurant" ? obj?.sender?.restaurantName?obj?.sender?.restaurantName + ' ' + "un-subscribed you." : obj?.sender?.firstName + ' ' + obj?.sender?.lastName + ' ' + "un-subscribed you.":obj?.sender?.firstName + ' ' + obj?.sender?.lastName + ' ' + "un-subscribed you."}</p> : null}
                                            {obj?.type === "reply" ? <p>{obj?.sender?.role === "restaurant" ? obj?.sender?.restaurantName?obj?.sender?.restaurantName + ' ' + "replied to your comment" : obj?.sender?.firstName + ' ' + obj?.sender?.lastName + ' ' + "replied to your comment":obj?.sender?.firstName + ' ' + obj?.sender?.lastName + ' ' + "replied to your comment"}</p> : null}
                                            {obj?.type === "message" ? <p>{obj?.sender?.role === "restaurant" ? obj?.sender?.restaurantName?obj?.sender?.restaurantName + ' ' + "send you a message" : obj?.sender?.firstName + ' ' + obj?.sender?.lastName + ' ' + "send you a message":obj?.sender?.firstName + ' ' + obj?.sender?.lastName + ' ' + "send you a message"}</p> : null}
                                            {obj?.type === "order success" ? <p>{"Your order is successfully placed."}</p> : null}
                                            {obj?.type === "new order" ? <p>{"You have a new order."}</p> : null}
                                            {obj?.type === "onDelivery" ? <p>{"Your order Dispatch for delivery."}</p> : null}
                                            {obj?.type === "completed" ? <p>{"Your order is completed."}</p> : null}
                                            {obj?.type === "reject" ? <p>{"Your order is rejected."}</p> : null}
                                        </div></Link>
                                    </div>
                                })
                            }
                            {
                                notification?.oldNotification?.map((obj, i) => {

                                    return <div key={i} onClick={() => openNotif(obj?._id)} style={{ backgroundColor: `${!obj?.opened && "white"}` }} className="notifications-item"> <img src={obj?.sender && obj?.sender?.profilePicture ? obj?.sender?.profilePicture : 'https://colegioclassea.com.br/wp-content/themes/PageLand/assets/img/avatar/avatar.jpg'} alt="img" />
                                        <Link to={obj?.type === "subscribe" ? `/profile/${obj?.sender?._id}` : obj?.type === "message" ? `/message/${obj?.sender?._id}` : obj?.type === "comment" && obj?.type === "reply"?`/${obj?.post?._id}`:"/"}><div className="text">
                                            <h4>{obj?.sender?.role === "restaurant" ? obj?.sender?.restaurantName?obj?.sender?.restaurantName : obj?.sender?.firstName + ' ' + obj?.sender?.lastName:obj?.sender?.firstName + ' ' + obj?.sender?.lastName}</h4>
                                            {obj?.type === "like" ? <p>{obj?.sender?.role === "restaurant" ? obj?.sender?.restaurantName? obj?.sender?.restaurantName + ' ' + "like your post." : obj?.sender?.firstName + ' ' + obj?.sender?.lastName + ' ' + "like your post.":obj?.sender?.firstName + ' ' + obj?.sender?.lastName + ' ' + "like your post."}</p> : null}
                                            {obj?.type === "comment" ? <p>{obj?.sender?.role === "restaurant" ? obj?.sender?.restaurantName?obj?.sender?.restaurantName + ' ' + "commented on your post." : obj?.sender?.firstName + ' ' + obj?.sender?.lastName + ' ' + "commented on your post.":obj?.sender?.firstName + ' ' + obj?.sender?.lastName + ' ' + "commented on your post."}</p> : null}
                                            {obj?.type === "subscribe" ? <p>{obj?.sender?.role === "restaurant" ? obj?.sender?.restaurantName?obj?.sender?.restaurantName + ' ' + "subscribed you." : obj?.sender?.firstName + ' ' + obj?.sender?.lastName + ' ' + "subscribed you.":obj?.sender?.firstName + ' ' + obj?.sender?.lastName + ' ' + "subscribed you."}</p> : null}
                                            {obj?.type === "unsubscribe" ? <p>{obj?.sender?.role === "restaurant" ? obj?.sender?.restaurantName?obj?.sender?.restaurantName + ' ' + "un-subscribed you." : obj?.sender?.firstName + ' ' + obj?.sender?.lastName + ' ' + "un-subscribed you.":obj?.sender?.firstName + ' ' + obj?.sender?.lastName + ' ' + "un-subscribed you."}</p> : null}
                                            {obj?.type === "reply" ? <p>{obj?.sender?.role === "restaurant" ? obj?.sender?.restaurantName?obj?.sender?.restaurantName + ' ' + "replied to your comment" : obj?.sender?.firstName + ' ' + obj?.sender?.lastName + ' ' + "replied to your comment":obj?.sender?.firstName + ' ' + obj?.sender?.lastName + ' ' + "replied to your comment"}</p> : null}
                                            {obj?.type === "message" ? <p>{obj?.sender?.role === "restaurant" ? obj?.sender?.restaurantName?obj?.sender?.restaurantName + ' ' + "send you a message" : obj?.sender?.firstName + ' ' + obj?.sender?.lastName + ' ' + "send you a message":obj?.sender?.firstName + ' ' + obj?.sender?.lastName + ' ' + "send you a message"}</p> : null}
                                            {obj?.type === "order success" ? <p>{"Your order is successfully placed."}</p> : null}
                                            {obj?.type === "new order" ? <p>{"You have a new order."}</p> : null}
                                            {obj?.type === "onDelivery" ? <p>{"Your order Dispatch for delivery."}</p> : null}
                                            {obj?.type === "completed" ? <p>{"Your order is completed."}</p> : null}
                                            {obj?.type === "reject" ? <p>{"Your order is rejected."}</p> : null}
                                        </div></Link>
                                    </div>
                                })
                            }

                        </div>
                    </div>

                    <div className='feed_header_info2' id="cart" ><div className='click_cart'><BiCartAlt style={{fontSize:'1.5em'}}/><span>{localCart?.numberCart || 0}</span></div>
                        <div className="cart_box d-none" style={{zIndex:"999!important"}}>
                            <h5>Cart Items</h5>
                            <Cart />
                        </div>
                    </div>


                    <div className='feed_header_info_profile'>
                        <DropDown />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Feed_profile_navbar