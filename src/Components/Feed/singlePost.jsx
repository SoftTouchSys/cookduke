import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Container from "react-bootstrap/Container"
import NavBar from '../NavBar/Navbar'
import FeedSideBar from "./FeedSidebar"
import FeedMenu from "./FeedMenu"
import CommentView from './CommentView';

import CircularProgress from "../NavBar/Loader"
import './feed.css'
import { Link, useLocation } from "react-router-dom";
import ReactPlayer from "react-player"
import InputEmoji from 'react-input-emoji'
import moment from "moment"
import { getSinglePost, getSubscribingPost } from '../../Actions/postActions'
import { AiOutlineLike, AiOutlineComment } from "react-icons/ai";
import { CgMore } from "react-icons/cg";

import { useTranslation } from 'react-i18next';

import { BsEmojiSmile } from "react-icons/bs";
import { socketNode } from "../../socket"


const SinglePostFeed = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const location = useLocation();
  //   const postDetails = useSelector((state) => state.subscribingPost)
  //   const { post, loading } = postDetails

  const singlePost = useSelector((state) => state.singlePost)
  const { loading } = singlePost

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const [addComment, setAddComment] = useState('')

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('userInfo')).token
    if (!token) {
      window.location = '/';
    }
    dispatch(getSinglePost(location?.pathname?.split("/")[1]))
  }, [])


  const handleLike = (id) => {
    socketNode.emit("addReaction", { postId: id, reaction: "like" })
    dispatch(getSubscribingPost())
  }
  const submitComment = (e, id, i) => {
    e.preventDefault()
    socketNode.emit("addComment", { postId: id, comment: addComment })
    socketNode.on("comment", (response) => {
    })
    document.querySelector('#comm_input').value = ''
    dispatch(getSubscribingPost())
    dispatch(getSinglePost(id))
  }


   // -------------------
   const openBoxx=(e,i)=>{
    if (
      document
        .querySelector(`.edit_delete_boxx`)
        .classList.contains("d-none")
    ) {
      document
        .querySelector(`.edit_delete_boxx`)
        .classList.remove("d-none");
    } else {
      document
        .querySelector(`.edit_delete_boxx`)
        .classList.add("d-none");
    }
  
  }

  // ------
  const deletePost=()=>{

  }
console.log(singlePost)
  return (
    <Container fluid className='feed_container'>
      <NavBar />
      <div className='feed_banner'>
        <FeedSideBar />
        {loading && loading === true ? <CircularProgress />
          : <div className='feed_banner_scroll'>
            <div className='feed_banner_scroll_left'>




              <div className='feed_banner_scroll_left_items'>
                <div className='feed_banner_left_header'>
                  <div className='feed_banner_left_header_image'>
                    <img src={singlePost?.post?.post?.author && singlePost?.post?.post?.author?.profilePicture ? singlePost?.post?.post?.author?.profilePicture : 'https://colegioclassea.com.br/wp-content/themes/PageLand/assets/img/avatar/avatar.jpg'} alt="ig" />
                  </div>
                  <Link to={`/profile/${singlePost?.post?.post?.author?._id}`}><div className='feed_banner_left_header_content'>
                    <h1>{singlePost?.post?.post?.author && singlePost?.post?.post?.author?.role === "restaurant" ? singlePost?.post?.post?.author?.restaurantName : singlePost?.post?.post?.author?.firstName + ' ' + singlePost?.post?.post?.author?.lastName}</h1>
                    <p>{moment(singlePost?.post?.post?.createdAt).fromNow()}</p>
                  </div></Link>
                  <div className='feed_banner_left_header_bars'
                      onClick={(e)=>{openBoxx(e)}}>
          <span className="edit_delete_icon" ><CgMore/></span>
          <div className={`edit_delete_boxx d-none`}>
             {/* ---------------- */}
            {
              singlePost?.post?.post?.author._id === userInfo?.user?._id ?
              <small onClick={(e)=>{ deletePost(e,singlePost?.post?.post?.author?._id)}}>Delete</small>
              :null}

                <small>More Info</small>
            </div>
                      </div>
                </div>
                {singlePost?.post?.post?.content ?
                  <div className='post_content'>
                    {singlePost?.post?.post?.content}
                  </div> : null}
                {/* -------- */}
                {singlePost?.post?.post?.image ? <img className="post-image" src={singlePost?.post?.post?.image} alt="" /> : null}
                {singlePost?.post?.post?.post_video ? <ReactPlayer
                  controls
                  url={singlePost?.post?.post?.post_video}
                  className='react-player'
                  width='100%'
                  height='100%'
                  config={{
                    file: {
                      attributes: {
                        controlsList: 'nodownload',
                        onContextMenu: e => e.preventDefault()
                      }
                    }
                  }}
                /> : null}
                {/* ------- */}
                <div className='feed_banner_left_likes'>
                  <div><AiOutlineLike /><span>{singlePost?.post?.numOfLikes}</span><span>{t("likes")}</span></div>
                  <div><span>{singlePost?.post?.numOfComments}</span><span>{t("comments")}</span></div>
                </div>
                <div className='feed_banner_left_comments'>
                  <div style={{ cursor: "pointer" }} onClick={() => handleLike(singlePost?.post?.post?._id)}>
                    {singlePost?.post?.myReaction[0]?.user === userInfo?.user?._id ?
                      <div style={{ color: 'green' }}><AiOutlineLike /> <span style={{ color: 'green' }}>{t("liked")}</span></div> :
                      <div><AiOutlineLike /> <span>{t("like")}</span></div>
                    }

                  </div>
                  <div style={{ cursor: "pointer" }} className=''><AiOutlineComment /> <span>{t("comment")}</span></div>
                </div>

                <div className={`commentsDetails w-100 `} >
                  <div className='feed_banner_left_search'>
                    <div className='feed_banner_left_search_image'>
                      <img src={userInfo && userInfo?.user?.profilePicture || "https://colegioclassea.com.br/wp-content/themes/PageLand/assets/img/avatar/avatar.jpg"} alt="user-avatar" />
                    </div>
                    <div className='feed_banner_left_search_search'>
                      <form onSubmit={(e) => submitComment(e, singlePost?.post?.post?._id)}>
                      <InputEmoji
                      value={addComment}
                      theme="light"
                      onChange={setAddComment}
                      cleanOnEnter
                      onEnter={(e) => submitComment(e, singlePost?.post?.post?._id)}
                      placeholder="Type a comment"
                    />
                        {/* <input onChange={(e) => setAddComment(e.target.value)} id="comm_input" placeholder='Write a Comment' /> */}
                      </form>
                      {/* <div>
                        <BsEmojiSmile className='feed_banner_left_search_search_icon' />
                      </div> */}
                    </div>
                  </div>
                  {/* --- */}
                  <CommentView obj={singlePost?.post} i={"1"}/>
                </div>
              </div>
            </div>

            <FeedMenu />
          </div>}
      </div>
    </Container>
  )
}

export default SinglePostFeed