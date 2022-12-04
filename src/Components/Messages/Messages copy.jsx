import React, { useEffect } from 'react'
import './Messages.css'
import NavBar from "../NavBar/Navbar"
import { useTranslation } from "react-i18next";
import FeedSidebar from "../Feed/FeedSidebar"
import { IoSearchOutline, IoPaperPlaneOutline } from "react-icons/io5";
import { MdTagFaces } from "react-icons/md";
import { HiArrowLongLeft } from "react-icons/hi";
import { BsArrowLeft } from "react-icons/bs";
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';


const Messages = () => {
    const { t } = useTranslation();

    const messages = [1, 2]

    return (
        <div className='roles_main'>
            <NavBar />
            <FeedSidebar />
            <div className='messages_main_scroll'>

                <Tab.Container defaultActiveKey="0">
                    <div className='messages_main_leftSide'>
                        <div className='messages_leftSide_search'>
                            <div className='messages_leftSide_searchـmain'>
                                <IoSearchOutline className='messages_leftSide_icon' />
                                <input placeholder='Search' />
                            </div>
                        </div>

                        {messages.map((obj, i) => {
                            return <Nav.Item>
                                <Nav.Link eventKey={i}><div className='messages_leftSide_user' >


                                    <div className='messages_user_picture'>
                                        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLe5PABjXc17cjIMOibECLM7ppDwMmiDg6Dw&usqp=CAU' />
                                    </div>
                                    <div className='messages_user_name'>
                                        <h6>Haris CH</h6>
                                        <p>Give me website solution</p>
                                    </div>
                                    <div className='messages_user_timing'>
                                        <p>19-02-22</p>
                                        <span>1</span>
                                    </div></div></Nav.Link>
                            </Nav.Item>



                        })}

                    </div>
                    <div className='messages_main_rightSide'>
                        <Tab.Content>
                            <Tab.Pane eventKey="0">
                                <div className='messages_rightSide_container'>
                                    <div className='messages_main_container'>
                                        <span className='messages_LeftArrow'><BsArrowLeft /></span>
                                        <div className='messages_chat_right'>
                                            <div className='messages_chat_right_main'>Hi! This is mkyfirst chat with you.</div>
                                        </div>
                                        <div className='messages_chat_left'>
                                            <div className='messages_chat_left_main'>Hello!</div>
                                        </div>
                                        <div className='messages_chat_right'>
                                            <div className='messages_chat_right_main'>Hi! This is mkyfirst chat with you.</div>
                                        </div>
                                        <div className='messages_chat_left'>
                                            <div className='messages_chat_left_main'>Hello!</div>
                                        </div>
                                        <div className='messages_chat_right'>
                                            <div className='messages_chat_right_main'>Hi! This is mkyfirst chat with you.</div>
                                        </div>
                                        <div className='messages_chat_left'>
                                            <div className='messages_chat_left_main'>Hello!</div>
                                        </div>
                                        <div className='messages_chat_right'>
                                            <div className='messages_chat_right_main'>Hi! This is mkyfirst chat with you.</div>
                                        </div>
                                        <div className='messages_chat_left'>
                                            <div className='messages_chat_left_main'>Hello!</div>
                                        </div>
                                    </div>
                                    <div className='messages_main_type'>
                                        <MdTagFaces className='messages_main_icon' />
                                        <div className='messages_type_search'>
                                            <input placeholder='Write a comment...' />
                                            <IoPaperPlaneOutline className='messages_main_icon' />
                                        </div>
                                    </div>
                                </div>
                            </Tab.Pane>
                            <Tab.Pane eventKey="1">
                                <div className='messages_rightSide_container'>
                                    <div className='messages_main_container'>
                                        <span className='messages_LeftArrow'><BsArrowLeft /></span>

                                        <div className='messages_chat_right'>
                                            <div className='messages_chat_right_main'>Hi! This is mkyfirst chat with you.</div>
                                        </div>


                                    </div>
                                    <div className='messages_main_type'>
                                        <MdTagFaces className='messages_main_icon' />
                                        <div className='messages_type_search'>
                                            <input placeholder='Write a comment...' />
                                            <IoPaperPlaneOutline className='messages_main_icon' />
                                        </div>
                                    </div>
                                </div>
                            </Tab.Pane>


                        </Tab.Content>
                    </div>
                </Tab.Container>
            </div >
        </div >
    )
}

export default Messages