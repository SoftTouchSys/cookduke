import React, { useEffect, useState, useRef } from 'react'
import './Messages.css'
import NavBar from "../NavBar/Navbar"
import { useTranslation } from "react-i18next";
import FeedSidebar from "../Feed/FeedSidebar"
import { IoSearchOutline, IoPaperPlaneOutline } from "react-icons/io5";
import { MdTagFaces } from "react-icons/md";
import { HiArrowLongLeft } from "react-icons/hi";
import { BsArrowLeft,BsCheck2All, BsCheck2} from "react-icons/bs";
import { GrStatusGoodSmall } from "react-icons/gr";
import axiosInstance from '../../helper/axios';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getProfileDetails } from '../../Actions/userActions';
import { getConversations, getMessage } from '../../Actions/messageAction';
import moment from 'moment';
import { socketNode } from '../../socket';
import InputEmoji from 'react-input-emoji'
import { getNotification } from '../../Actions/notificationActions';


const Messages = () => {
    const { t } = useTranslation();
    const navigate=useNavigate()

// const containerRef=useRef(null)
// const [isVisible, setIsVisible]=useState(false)

// const callbackFunction=async(entries)=>{
       
    // if(entries[0].isIntersecting ) {
        // console.log(entries[0].target.id, ": ", entries[0].intersectionRatio)
        // message.innerHTML = entries[0].target.textContent;
    //   }
    // const [entry]=entries
    // console.log(entry.target.id)
    // await axiosInstance(`/set-read/${entry.target.id}`)
    // setIsVisible(entry.isIntersecting)
    // console.log(entries[0].target.textContent, ": ", entries[0].intersectionRatio)
// }

// const options={
// // root:null,
// // rootMargin:"0px",
// threshold:.1
// }


    const token = JSON.parse(localStorage.getItem('userInfo'))?.token
    if (!token) {
      window.location = '/';
    }
  

// console.log(containerRef?.current?.id    ,"visible....")

// useEffect(()=>{
// const observer=new IntersectionObserver(callbackFunction,options)
// if(containerRef.current) observer.observe(containerRef?.current)
// return()=>{
// if(containerRef.current) observer.unobserve(containerRef?.current)
// }

// },[containerRef, options])

    const [sendMessage, setSendMessage] = useState('')


    const dispatch = useDispatch();

    const location = useLocation();

    const profileDetails = useSelector((state) => state.profileDetails);
    const { profile, loading } = profileDetails;

    const { conversation } = useSelector((state) => state.conversation);

    const { message } = useSelector((state) => state.messages);
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin



    const [userId, setUserId] = useState()

    useEffect(() => {
        conversation && conversation?.newArr && setUserId(location?.pathname?.split("/")[2] && location?.pathname?.split("/")[2])

        
            dispatch(
                getProfileDetails(
                    userId && userId , 1
                )
            );
    


    }, [location])



    const [messageId, setMessageId] = useState('')
    
    useEffect(() => {
        dispatch(getConversations(userInfo?.user?._id))

        if (userId) {
            conversation && conversation?.newArr?.length>0 && dispatch(getMessage(userId ||location?.pathname?.split("/")[2] && location?.pathname?.split("/")[2]))
            // console.log(userId,"id.....")
        
        }
        else if (conversation && conversation?.newArr) {
            conversation && conversation?.newArr?.length>0 && dispatch(getMessage(conversation && conversation?.newArr[0]?._id))
            setMessageId(conversation && conversation?.newArr[0]?._id ||location?.pathname?.split("/")[2] && location?.pathname?.split("/")[2])
            setUserId(conversation?.newArr[0]?._id)
            conversation && conversation?.newArr?.length>0 && navigate(`/message/${conversation?.newArr[0]?._id}`)
            
        }

        // console.log("ok....")
        // socketNode.on('addMessageToClient',(msg)=>{
        //     dispatch(getMessage(msg.recipient))
        // })

    }, [conversation])

    const [onlineUsers,setOnlineUsers]=useState(JSON.parse(localStorage.getItem("o")))
    
    useEffect(()=>{
        socketNode.on('onlineUsers',(response)=>{
            localStorage.setItem("o",JSON.stringify(response))
            setOnlineUsers(JSON.parse(localStorage.getItem("o")))
        })
        
        
    },[onlineUsers, socketNode])

    // console.log(conversation?.newArr?.filter(o=>onlineUsers.some(o2=>o._id === o2._id)))
    
    

    const showMessage = (id) => {
        setUserId(id)
        conversation && conversation?.newArr?.length>0 && dispatch(getMessage(id||location?.pathname?.split("/")[2] && location?.pathname?.split("/")[2]))
        setMessageId(id)
        setSearchedUser([])
        conversation && conversation?.newArr?.length>0 && navigate(`/message/${id||location?.pathname?.split("/")[2] && location?.pathname?.split("/")[2]}`)
        viewMessages()
    }

    const showMessages = (id) => {
        setUserId(location?.pathname?.split("/")[2] && location?.pathname?.split("/")[2])
        // dispatch(location?.pathname?.split("/")[2] && location?.pathname?.split("/")[2])
        setMessageId(location?.pathname?.split("/")[2] && location?.pathname?.split("/")[2])
        setSearchedUser([])
    }

    const sumbitMessage = async (e) => {
        if (sendMessage !== "") {
            await axiosInstance.post('/message', { recipient: messageId === "" ? location?.pathname?.split("/")[2] : messageId || location?.pathname?.split("/")[2] && location?.pathname?.split("/")[2], text: sendMessage })
            dispatch(getConversations(userInfo?.user?._id))
            dispatch(getMessage(messageId === "" ? location?.pathname?.split("/")[2] : messageId || location?.pathname?.split("/")[2] && location?.pathname?.split("/")[2]))
            // socketNode.on('addMessageToClient', (msg) => {
            //     dispatch(getMessage(msg.recipient))
            // })
        }

        setSendMessage("")
        // document.querySelector('#messageWrite').value = "";
    }
    const [searchedUser, setSearchedUser] = useState('')
    const searchUser = async (value) => {
        // if(value?.length > 3){
        var { data } = await axiosInstance.get(`/searchUsers?text=${value}`)
        setSearchedUser(data)
        setUserId(location?.pathname?.split("/")[2] && location?.pathname?.split("/")[2])
        // }


    }


    const viewMessages=()=>{
        const messageChat = document.querySelector(".messages_main_rightSide")
        const messagesMainLeftSide = document.querySelector(".messages_main_leftSide")
        messageChat.classList.remove('hideMessage')
        messageChat.classList.add('showMessage')
        messagesMainLeftSide.classList.remove('showMessage')
        messagesMainLeftSide.classList.add('hideMessage')
    }
    
    const backMessages=()=>{
        const messageChat = document.querySelector(".messages_main_rightSide")
        const messagesMainLeftSide = document.querySelector(".messages_main_leftSide")
        messageChat.classList.remove('showMessage')
        messageChat.classList.add('hideMessage')
        messagesMainLeftSide.classList.remove('hideMessage')
        messagesMainLeftSide.classList.add('showMessage')
    }
    

    return (
        <div className='roles_main'>
            <NavBar />
            <FeedSidebar />
            <div className='messages_main_scroll'>
                <div className='messages_main_leftSide'>
                    <div className='messages_leftSide_search'>
                        <div className='messages_leftSide_searchـmain position-relative'>
                            <IoSearchOutline className='messages_leftSide_icon' />
                            <input placeholder='Search' onChange={(e) => searchUser(e.target.value)} />
                            {searchedUser.length > 0 && <ul style={{ top: "40px",zIndex:"25"}} class="list-group w-100 position-absolute">
                                {searchedUser.length > 0 ? searchedUser.map((obj, i) => {
                                    return obj?._id !== userInfo?.user?._id && <Link to={`/message/${obj?._id}`}><li onClick={() => showMessage(obj?._id)} class="list-group-item">{obj?.restaurantName
                                        ? obj?.restaurantName
                                        : obj?.firstName + " " + obj?.lastName}</li></Link>
                                }) : <li class="list-group-item">no user found</li>}
                            </ul>}
                        </div><br />

                    </div>
                    {/* {console.log(conversation?.newArr?.find(id=> id._id === location?.pathname?.split("/")[2]))} */}
                    {
                        location?.pathname?.split("/")?.length === 3 && conversation?.newArr?.find(id => id._id === location?.pathname?.split("/")[2]) === undefined ?
                        <div className='messages_leftSide_user'>
                                <div className='messages_user_picture'>
                                    <img src={profile?.user?.profilePicture || 'https://w7.pngwing.com/pngs/754/2/png-transparent-samsung-galaxy-a8-a8-user-login-telephone-avatar-pawn-blue-angle-sphere-thumbnail.png'} />
                                </div>
                                <div className='messages_user_name'>

                                    <h6>{profile?.user?.restaurantName
                                        ? profile?.user?.restaurantName
                                        : profile?.user &&
                                        profile?.user?.firstName + " " + profile?.user?.lastName}</h6>
                                    <p className='text-light'>some mesage</p>
                                </div>
                                <div className='messages_user_timing'>
                                    <p className='text-light tranparent'>19-02-22</p>
                                    <span className='text-light bg-transparent'>1</span>
                                </div>
                            </div>
                            : null}

                    {conversation ? conversation?.newArr?.map((obj, i) => {
                        return <div className={userId && userId === obj?._id ?"activeCon messages_leftSide_user":"messages_leftSide_user"} key={i} onClick={() => showMessage(obj?._id)} >
                            <div className='messages_user_picture position-relative'>
                                <img src={obj?.profilePicture || 'https://w7.pngwing.com/pngs/754/2/png-transparent-samsung-galaxy-a8-a8-user-login-telephone-avatar-pawn-blue-angle-sphere-thumbnail.png'} />
                                {/* {console.log(onlineUsers?.some(o=>o._id === obj?._id))} */}
                                <GrStatusGoodSmall style={{color:onlineUsers?.some(o=>o._id === obj?._id)?"green":"gray"}} className='online-status'/>
                            </div>
                            <div className='messages_user_name'>

                                <h6>{obj?.restaurantName
                                    ? obj?.restaurantName
                                    : obj &&
                                    obj?.firstName + " " + obj?.lastName}</h6>
                                <p>{obj?.text}</p>
                            </div>
                            <div className='messages_user_timing'>
                                <p>{moment(obj?.createdAt).format(
                                    "D-M-YYYY"
                                )}</p>
                                {/* {console.log(message?.messages?.filter(conv=>conv.conversation))} */}
                                {/* { message?.messages?.some(o=>o.unread?<span></span>:"")} */}
                            </div>
                        </div>
                    }) : profile?.user?._id !== userInfo?.user?._id ?
                        <div className='messages_leftSide_user'>
                            <div className='messages_user_picture'>
                                <img src={profile?.user?.profilePicture || 'https://w7.pngwing.com/pngs/754/2/png-transparent-samsung-galaxy-a8-a8-user-login-telephone-avatar-pawn-blue-angle-sphere-thumbnail.png'} />
                            </div>
                            <div className='messages_user_name'>

                                <h6>{profile?.user?.restaurantName
                                    ? profile?.user?.restaurantName
                                    : profile?.user &&
                                    profile?.user?.firstName + " " + profile?.user?.lastName}</h6>
                                <p>some mesage</p>
                            </div>
                            <div className='messages_user_timing'>
                                <p>19-02-22</p>
                                <span>1</span>
                            </div>
                        </div> : null
                    }


                </div>
                <div className='messages_main_rightSide'>
                    <div className='messages_rightSide_container'>
                        <div className='messages_main_container'>
                            <span className='messages_LeftArrow border'><BsArrowLeft onClick={backMessages} /></span>

                            {message && message?.messages?.length > 0 ? message?.messages?.map((obj, i) => {
                                return obj?.sender === userInfo?.user?._id ? <div className='messages_chat_right'>
                                    <div className='messages_chat_right_main text-dark' >
                                      {obj?.text}<br />
                                        <small style={{color:"silver"}} className='text-right  float-right'>{moment(obj?.createdAt).fromNow()} 
                                         &nbsp;{obj?.unread === true?<BsCheck2 />:<BsCheck2All className='text-light' />}
                                        </small> 
                                        </div>

                                </div> : <div className='messages_chat_left'>
                                    <div className='messages_chat_left_main text-dark'>{obj?.text}<br />
                                    <small style={{color:"silver"}} className='text-right float-right'>
                                        {moment(obj?.createdAt).fromNow()} 
                                        </small>
                                        
                                            </div>
                                </div>
                            }) :
                                <div>
                                    <p>Start a new conversation</p>
                                </div>

                            }
                        </div>
                        <form onSubmit={(e) => sumbitMessage(e)}>
                            <div className='messages_main_type'>
                                <InputEmoji
                                    value={sendMessage}
                                    onChange={setSendMessage}
                                    cleanOnEnter
                                    onEnter={sumbitMessage}
                                    placeholder="Type a message"
                                />
                            <IoPaperPlaneOutline className='messages_main_icon' onClick={(e) => sumbitMessage(e)} />

                                {/* <MdTagFaces className='messages_main_icon' />
                                <div className='messages_type_search'>
                                    <input id="messageWrite" placeholder='Write a message...' onChange={(e) => setSendMessage(e.target.value)} />
                                    <IoPaperPlaneOutline className='messages_main_icon' onClick={(e) => sumbitMessage(e)} />
                                </div> */}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Messages