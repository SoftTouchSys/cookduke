import React, { useEffect, useState, useRef, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom"
import { useTranslation } from 'react-i18next';
import ReactPlayer from "react-player"
import ReactYTPlayer from "react-player/youtube"
import './feed.css'
import { useLocation } from "react-router-dom";

import { AiOutlineLike, AiOutlineComment } from "react-icons/ai";
import { CgMore } from "react-icons/cg";
import { BsEmojiSmile } from "react-icons/bs";

import moment from "moment"
import { socketNode } from "../../socket"
import { getSinglePost, getSubscribingPost } from '../../Actions/postActions'

import CommentView from './CommentView';
import InputEmoji from 'react-input-emoji'
import axiosInstance from '../../helper/axios';
import { FaRegUserCircle } from 'react-icons/fa';
import { IoMdShareAlt } from 'react-icons/io';
import toast, { Toaster } from 'react-hot-toast';
import Modal from 'react-bootstrap/Modal';
import EmojiPicker from "emoji-picker-react";

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import Truncate from './truncate';

import { ProgressBar } from 'react-bootstrap';

import {
  getProfileDetails,
} from "../../Actions/userActions";
import { Button } from 'react-bootstrap';
import { Skeleton } from '@mui/material';
import { RiImageAddFill, RiVideoAddFill } from 'react-icons/ri';

const FeedPost = (props) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const location = useLocation();

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const singlePost = useSelector((state) => state.singlePost)

  const [addComment, setAddComment] = useState('')

  const [pic, setPic] = useState("")
  const [image, setImage] = useState("")
  const [vid, setVid] = useState("")
  const [video, setVideo] = useState("")
  const [content, setContent] = useState("")
  const [link, setLink] = useState("")

  const [report,setReport]=useState("")




  const [showLikeModal, setShowLikeModal] = useState(false);
  //  const [page, setPage]=useState(props?.page)
  const handleCloseLikeModal = () => setShowLikeModal(false);
  const handleShowLikeModal = (id) => {
    dispatch(getSinglePost(id))
    setShowLikeModal(true)
  };

  const [showEditFeed, setShowEditFeed] = useState(false);
  const [editPost, setEditPost] = useState("")
  
  const handleCloseEditFeed = () => {
    setPic('');
    setImage('');
    setVid('');
    setVideo('');
    setContent('');
    setLink('');
    setEditPost('');
    setShowEditFeed(false);
  }
  const handleShowEditFeed = (post) => {
    setEditPost(post)
    setShowEditFeed(true)
  };

  const [showReportPost, setShowReportPost] = useState(false);
  const [reportPost, setReportPost] = useState("")
  
  const handleCloseReportPost = () => {
    setPic('');
    setImage('');
    setVid('');
    setVideo('');
    setContent('');
    setLink('');
    setReportPost('');
    setShowReportPost(false);
  }
  const handleShowReportPost = (post) => {
    setReportPost(post)
    setShowReportPost(true)
  };

  const handleLike = (id, page) => {
    socketNode.emit("addReaction", { postId: id, reaction: "like" })

    if (location?.pathname?.split("/")[2]) {
      dispatch(
        getProfileDetails(
          location?.pathname?.split("/")[2] && location?.pathname?.split("/")[2], Number(page)
        )
      );
    } else {
      dispatch(getSubscribingPost(Number(page)))
    }

  }

  const submitComment = (e, id, i, page) => {
    if (addComment) {
      socketNode.emit("addComment", { postId: id, comment: addComment })
      socketNode.on("comment", (response) => {
      })
      // document.querySelector('#comm_input').value = ''
      dispatch(getSubscribingPost(Number(page)))
      dispatch(getSinglePost(id))
    }
  }



  const handleChangeImage = (e) => {
    setPic(URL.createObjectURL(e.target.files[0]))
    setImage(e.target.files[0])
  }

  const handleChangeVideo = (e) => {
    if (e.target.files[0].size > 15000000) {
      alert('file too big allowed size 15mb')
    } else {
      setVid(URL.createObjectURL(e.target.files[0]))
      var vidzz = URL.createObjectURL(e.target.files[0])
      document.querySelector("#reactPlayerVid").style.display = 'none';
      document.querySelector("#viewVideo").style.display = 'block';

      var video = document.querySelector("#viewVideo")
      var source = document.createElement('source');
      source.setAttribute('src', vidzz);
      source.setAttribute('type', 'video/mp4');
      video.appendChild(source);
      video.play();

      setVideo(e.target.files[0])
    }

  }

  const [uploadProg, setUploadProg] = useState(0)

  // window.onclick = function (e) {
  //   var dots=document.querySelectorAll(".feed_banner_left_header_bars")
  //   for (let j = 0; j < dots.length; j++) {
  //   if( !dots[j].contains(e.target)){
  //     var btn = document.querySelectorAll(`.edit_delete_boxx`);
  //     for (let i = 0; i < btn.length; i++) {
  //       btn[i].classList.add("d-none");
  //     }
  //   }
  // }
  // }

  const handleComment = (id, i) => {

    var btn = document.querySelectorAll(`.commentsDetails`)
    dispatch(getSinglePost(id))
    if (singlePost?.post !== '') {
      for (let i = 0; i < btn?.length; i++) {
        btn[i].classList.add("d-none")
      }
      document.querySelector(`.commentsDetails_${i}`).classList.remove("d-none");
    }
  }




  const handleShare = (id, i) => {
    axiosInstance.get(`/sharePost/${id}`).then((res) => {
      toast.success('Post shared.', {
        style: {
          border: '1px solid #63A44C',
          padding: '16px',
          color: '#63A44C',
        },
        iconTheme: {
          primary: '#63A44C',
          secondary: '#fff3e0',
        },
      });
    })
  }

  const [reserve, setReserve] = useState('')

  useEffect(() => {
    axiosInstance.get('/get-user-reservation').then((res) => {
      var arr = res.data.reservation
      setReserve(arr?.filter(o => o.status === "processing"))
    })
  }, [])

  const setStatusOfTable = (id) => {
    var data = {
      reserveId: id,
      status: "canceledByUser"
    }
    // console.log(data)
    axiosInstance.post('update-reservation', data)
    alert('Table Canceled')
  }
  const openBoxx = (e, i) => {
    if (
      document
        .querySelector(`.edit_delete_boxx_${i}`)
        .classList.contains("d-none")
    ) {
      var btn = document.querySelectorAll(`.edit_delete_boxx`);
      for (let i = 0; i < btn.length; i++) {
        btn[i].classList.add("d-none");
      }
      document
        .querySelector(`.edit_delete_boxx_${i}`)
        .classList.remove("d-none");
    } else {
      document
        .querySelector(`.edit_delete_boxx_${i}`)
        .classList.add("d-none");
    }

  }

  const [deleteTrue, setDeleteTrue] = useState(false)

  const deletePost = (e, postId) => {
    setDeleteTrue(true)

    toast((t) => (
      <span>
        <b>Are you sure! You want to Delete Post.</b><br /><br />
        <button className="btn btn-danger m-2 float-right" onClick={() => {
          axiosInstance.delete(`deletePost/${postId}`).then((resp) => {
            setDeleteTrue(false);
            toast.success('Post deleted.', {
              style: {
                border: '1px solid #63A44C',
                padding: '16px',
                color: '#63A44C',
              },
              iconTheme: {
                primary: '#63A44C',
                secondary: '#fff3e0',
              },
            });
            window.location.reload()
          })
          if (props?.userId) {
            dispatch(
              getProfileDetails(
                props.userId, Number(props?.page)
              )
            );
          } else {
            dispatch(getSubscribingPost(Number(props?.page)))
          }
          toast.dismiss(t.id);
          // setDeleteTrue(false);
        }}>
          Delete Post
        </button>
        <button className="btn btn-success m-2 float-right" onClick={() => { toast.dismiss(t.id); }}>
          Dismiss
        </button>
      </span>
    ), {
      duration: "5000",
      style: {
        border: '1px solid #63A44C',
        padding: '16px',
        color: '#63A44C',
      },
      iconTheme: {
        primary: 'red',
        secondary: '#fff3e0',
      },
    });
  }

  // implement infinite scrolling with intersection observer
  let bottomBoundaryRef = useRef(null);

  const scrollObserver = useCallback(
    node => {
      new IntersectionObserver(entries => {
        entries.forEach(en => {
          if (en.intersectionRatio > 0) {

            if (props?.userId) {
              dispatch(
                getProfileDetails(
                  props.userId, Number(props?.page) + 1
                )
              );
            } else {
              dispatch(getSubscribingPost(Number(props?.page) + 1))
            }

          }
        });
      }).observe(node);
    },
    [props.post]);

  useEffect(() => {
    if (bottomBoundaryRef.current) {
      scrollObserver(bottomBoundaryRef.current);
    }
  }, [scrollObserver, bottomBoundaryRef]);

  const updatePost = () => {
    const options = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent
        let percent = Math.floor(loaded * 100 / total)
        console.log(`${loaded}kb of ${total}kb | ${percent}%`)
        if (percent < 100) {
          setUploadProg(percent)
        }
      }
    }

    if (content || link) {

      var data = {
        content: content,
        video: link
      }
      axiosInstance.post(`/updatePost/${editPost?._id}`, data).then((resp) => {
        toast.success("Post Updated")
        if (props?.userId) {
          dispatch(
            getProfileDetails(
              props.userId, Number(props?.page)
            )
          );
        } else {
          dispatch(getSubscribingPost(Number(props?.page)))
        }
        if (resp.data) {
          handleCloseEditFeed()
          setUploadProg('');
        }
      })


    }
    if (image) {
      const formData = new FormData()
      formData.append("image", image)

      axiosInstance.put(`/updatePostImage/${editPost?._id}`, formData, options).then((resp) => {
        toast.success("Post Updated")

        if (props?.userId) {
          dispatch(
            getProfileDetails(
              props.userId, Number(props?.page)
            )
          );
        } else {
          dispatch(getSubscribingPost(Number(props?.page)))
        }
        if (resp.data) {
          handleCloseEditFeed()
          setUploadProg('');
        }
      })
    }
    if (video) {
      const formData = new FormData()
      formData.append("post_video", video)
      axiosInstance.put(`/updatePostVideo/${editPost?._id}`, formData, options).then((resp) => {
        toast.success("Post Updated")
        if (props?.userId) {
          dispatch(
            getProfileDetails(
              props.userId, Number(props?.page)
            )
          );
        } else {
          dispatch(getSubscribingPost(Number(props?.page)))
        }
        if (resp.data) {
          handleCloseEditFeed()
          setUploadProg('');
        }
      })
    }
    // console.log(content, image, vid, video, link)


  }

  const submitReport = () => {
      var data= {
        post:reportPost?._id,
        reportType:"Post",
        report:report
      }
      axiosInstance.post("/reportPost", data).then((resp)=>{
        toast.success(resp.data.message)
        handleCloseReportPost()
      })
  }
  return (<>
    {
      deleteTrue
        ?
        null
        :
        <Toaster position="top-right" containerStyle={{ top: 70 }} />
    }

    <div className='feed_banner_scroll_left mt-3' style={{ backgroundColor: "#fff3e0", margin: "0% 2%" }}>
      {reserve.length > 0 && location?.pathname?.split("/")[1] !== "profile" ? <div className='reservationInFeed' >
        <h6>Your Reservation</h6>
        {reserve ? reserve?.map((res, i) => {
          return <div className='reserveDetail' style={{ backgroundColor: "#fff3e0" }} key={i}>
            <div className='d-flex'>
              <div className='feed_banner_left_header_image'>
                {<img src={res?.restaurant?.profilePicture || 'https://colegioclassea.com.br/wp-content/themes/PageLand/assets/img/avatar/avatar.jpg'} alt="ig" />}
              </div>
              <Link to={`/profile/${res?.restaurant?._id}`}><div className='feed_banner_left_header_content'>
                <h1>{res?.restaurant?.role === "restaurant" ? res?.restaurant?.restaurantName : res?.restaurant?.firstName + ' ' + res?.restaurant?.lastName}</h1>
                <p>{res?.bookDate} @ {res?.time}</p>
              </div></Link>
            </div>
            <div className='mt-2'>
              <span className='me-4'><FaRegUserCircle className='text-success me-2 h4' />{res?.guest} People</span>
              <button onClick={() => setStatusOfTable(res?._id)} className='btn btn-danger'>Cancel</button>
            </div>
          </div>

        }) : null}
      </div> : null}

      {
        props?.post && props.post?.map((obj, i) => {

          return obj?.sharedPost &&
            obj?.sharedBy[0]?._id === location?.pathname?.split("/")[2] ?
            <div className='sharedWaliPost feed_banner_scroll_left_items' key={i}>
              <div className='feed_banner_left_header' >
                <div className='feed_banner_left_header_image'>
                  {obj?.sharedBy && obj?.sharedBy[0] ? <img src={obj?.sharedBy[0]?.profilePicture ? obj?.sharedBy[0]?.profilePicture : 'https://colegioclassea.com.br/wp-content/themes/PageLand/assets/img/avatar/avatar.jpg'} alt="ig" /> :
                    props?.user ? <img src={props?.user?.profilePicture ? props?.user?.profilePicture : 'https://colegioclassea.com.br/wp-content/themes/PageLand/assets/img/avatar/avatar.jpg'} alt="ig" /> : null}
                </div>
                {obj?.sharedBy && obj?.sharedBy[0] ?
                  <Link to={`/profile/${obj?.sharedBy[0]?._id}`}><div className='feed_banner_left_header_content'>
                    <h1>{obj?.sharedBy[0]?.role === "restaurant" ? obj?.sharedBy[0]?.restaurantName : obj?.sharedBy[0]?.firstName + ' ' + obj?.sharedBy[0]?.lastName}</h1>
                    <p>{moment(obj?.createdAt).fromNow()}</p>
                  </div></Link> : props?.user ?
                    <Link to={`/profile/${props.user?._id}`}><div className='feed_banner_left_header_content'>
                      <h1>{props.user?.role === "restaurant" ? props.user?.restaurantName : props.user?.firstName + ' ' + props.user?.lastName}</h1>
                      <p>{moment(obj?.createdAt).fromNow()}</p>
                    </div></Link> : null}
                <div className='feed_banner_left_header_bars' style={{ zIndex: 2 }}
                  onClick={(e) => { openBoxx(e, i) }}>
                  <span className="edit_delete_icon" ><CgMore /></span>
                  <div className={`edit_delete_boxx d-none edit_delete_boxx_${i}`}>
                    {/* ---------------- */}
                    {obj?.author[0]?._id === userInfo?.user?._id && !obj?.sharedPost ?
                      obj?.content ? <small onClick={() => { handleShowEditFeed(obj) }}>Edit Post Content</small> : null : null}
                    {obj?.author[0]?._id === userInfo?.user?._id && !obj?.sharedPost ?
                      obj?.image ? <small onClick={() => { handleShowEditFeed(obj) }}>Edit Photo</small> : null : null}
                    {obj?.author[0]?._id === userInfo?.user?._id && !obj?.sharedPost ?
                      obj?.post_video ? <small onClick={() => { handleShowEditFeed(obj) }}>Edit Video</small> : null : null}
                    {obj?.author[0]?._id === userInfo?.user?._id && !obj?.sharedPost ?
                      obj?.video ? <small onClick={() => { handleShowEditFeed(obj) }}>Edit Youtube Link</small> : null : null}

                    {
                      obj?.author[0]?._id === userInfo?.user?._id || obj?.sharedBy[0]?._id === userInfo?.user?._id ?
                        !obj?.sharedPost || obj?.sharedBy[0]?._id === userInfo?.user?._id ? <small onClick={(e) => { deletePost(e, obj?._id) }}>Delete</small> : null
                        : null}

                    {obj?.author[0]?._id === userInfo?.user?._id ? null : obj?.sharedBy[0]?._id === userInfo?.user?._id ? null : <small onClick={()=>{handleShowReportPost(obj)}}>Report Post</small>}


                  </div>
                </div>
              </div>
              <div className='p-1' style={{ border: "1px solid gainsboro", width: "88%" }}   >
                <div className='feed_banner_left_header' >
                  <div className='feed_banner_left_header_image'>
                    {obj?.author && obj?.author[0] ? <img src={obj?.author[0]?.profilePicture ? obj?.author[0]?.profilePicture : 'https://colegioclassea.com.br/wp-content/themes/PageLand/assets/img/avatar/avatar.jpg'} alt="ig" /> :
                      props?.user ? <img src={props?.user?.author?.profilePicture ? props?.user?.author?.profilePicture : 'https://colegioclassea.com.br/wp-content/themes/PageLand/assets/img/avatar/avatar.jpg'} alt="ig" /> : null}
                  </div>
                  {obj?.author && obj?.author[0] ?
                    <Link to={`/profile/${obj?.author[0]?._id}`}><div className='feed_banner_left_header_content'>
                      <h1>{obj?.author[0]?.role === "restaurant" ? obj?.author[0]?.restaurantName : obj?.author[0]?.firstName + ' ' + obj?.author[0]?.lastName}</h1>
                      <p>{moment(obj?.postTime).fromNow()}</p>
                    </div></Link> : props?.user ?
                      <Link to={`/profile/${props.user?.author?._id}`}><div className='feed_banner_left_header_content'>
                        <h1>{props.user?.role === "restaurant" ? props.user?.restaurantName : props.user?.firstName + ' ' + props.user?.lastName}</h1>
                        <p>{moment(obj?.postTime).fromNow()}</p>
                      </div></Link> : null}
                  {/* <div className='feed_banner_left_header_bars'
                      onClick={(e)=>{openBoxx(e,i)}}>
                <span className="edit_delete_icon" ><CgMore/></span>
                <div className={`edit_delete_boxx d-none edit_delete_boxx_${i}`}>

            {
              props.user?._id === userInfo?.user?._id ?
              <small onClick={(e)=>{ deletePost(e,props.user?._id)}}>Delete</small>
              :null}

                <small>More Info</small>
            </div>
                      </div> */}
                </div>
                {obj?.content ?
                  <div className='post_content'>

                    <Truncate body={obj?.content} id={obj?._id} />

                  </div> : null}
                {/* -------- */}
                {obj?.image ? <img className="post-image" src={obj?.image} alt="" /> : null}

                {obj?.post_video ? <ReactPlayer
                  controls
                  url={obj?.post_video}
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
                {obj?.video ? <ReactYTPlayer
                  url={obj?.video}
                  // className='react-player'
                  width='100%'
                  // height='380px'
                  config={{
                    youtube: {
                      playerVars: { showinfo: 1 }
                    },
                  }}
                /> : null}
                {/* ------- */}
              </div>
              <div className='feed_banner_left_likes'>
                <div style={{ cursor: "pointer" }} onClick={() => handleShowLikeModal(obj?._id)}>
                  <AiOutlineLike />
                  <span >{obj?.like}</span>
                  <span>{t("likes")}</span>
                </div>
                <div><span>{obj?.numOfComments}</span><span>{t("comments")}</span></div>
              </div>
              <div className='feed_banner_left_comments'>
                <div style={{ cursor: "pointer" }} onClick={() => handleLike(obj?._id, obj?.page)}>
                  {obj?.myReaction[0]?.user === userInfo?.user?._id ?
                    <div style={{ color: 'green' }}><AiOutlineLike /> <span style={{ color: 'green' }}>{t("liked")}</span></div> :
                    <div><AiOutlineLike /> <span>{t("like")}</span></div>
                  }

                </div>
                <div onClick={(e) => (obj?._id, i)} style={{ cursor: "pointer" }} className=''><AiOutlineComment /> <span>{t("comment")}</span></div>


                {userInfo?.user?.role === "restaurant" || userInfo?.user?.role === "chef" ? obj?.author[0]?._id === userInfo?.user?._id ? null : obj?.shareBy === userInfo?.user?._id ? null : <div className="ml-3" onClick={(e) => handleShare(obj?._id, i)} style={{ cursor: "pointer" }} ><IoMdShareAlt /> <span>{t("Share")}</span></div> : null}
              </div>

              <div className={`commentsDetails w-100 d-none commentsDetails_${i}`} key={i}>
                <div className='feed_banner_left_search'>
                  <div className='feed_banner_left_search_image'>
                    <img src={userInfo && userInfo?.user?.profilePicture || "https://colegioclassea.com.br/wp-content/themes/PageLand/assets/img/avatar/avatar.jpg"} alt="user-vat" />
                  </div>
                  <div className='feed_banner_left_search_search'>
                    <form onSubmit={(e) => submitComment(e, obj?._id, i, obj?.page)}>
                      <InputEmoji
                        value={addComment}
                        theme="light"
                        onChange={setAddComment}
                        cleanOnEnter
                        onEnter={(e) => submitComment(e, obj?._id, i, obj?.page)}
                        placeholder="Type a comment"
                      />
                    </form>
                  </div>
                </div>
                {/* --- */}
                <CommentView obj={obj} i={i} page={props.page} />
              </div>

            </div> : obj?.sharedPost &&
              location?.pathname?.split("/")[2] === undefined ? <div className='sharedWaliPost feed_banner_scroll_left_items' key={i}>
              <div className='feed_banner_left_header' >
                <div className='feed_banner_left_header_image'>
                  {obj?.sharedBy && obj?.sharedBy[0] ? <img src={obj?.sharedBy[0]?.profilePicture ? obj?.sharedBy[0]?.profilePicture : 'https://colegioclassea.com.br/wp-content/themes/PageLand/assets/img/avatar/avatar.jpg'} alt="ig" /> :
                    props?.user ? <img src={props?.user?.profilePicture ? props?.user?.profilePicture : 'https://colegioclassea.com.br/wp-content/themes/PageLand/assets/img/avatar/avatar.jpg'} alt="ig" /> : null}
                </div>
                {obj?.sharedBy && obj?.sharedBy[0] ?
                  <Link to={`/profile/${obj?.sharedBy[0]?._id}`}><div className='feed_banner_left_header_content'>
                    <h1>{obj?.sharedBy[0]?.role === "restaurant" ? obj?.sharedBy[0]?.restaurantName : obj?.sharedBy[0]?.firstName + ' ' + obj?.sharedBy[0]?.lastName}</h1>
                    <p>{moment(obj?.createdAt).fromNow()}</p>
                  </div></Link> : props?.user ?
                    <Link to={`/profile/${props.user?._id}`}><div className='feed_banner_left_header_content'>
                      <h1>{props.user?.role === "restaurant" ? props.user?.restaurantName : props.user?.firstName + ' ' + props.user?.lastName}</h1>
                      <p>{moment(obj?.createdAt).fromNow()}</p>
                    </div></Link> : null}
                <div className='feed_banner_left_header_bars'
                  style={{ zIndex: 2 }}
                  onClick={(e) => { openBoxx(e, i) }}>
                  <span className="edit_delete_icon" ><CgMore /></span>
                  <div className={`edit_delete_boxx d-none edit_delete_boxx_${i}`}>
                    {/* ---------------- */}
                    {obj?.author[0]?._id === userInfo?.user?._id && !obj?.sharedPost ?
                      obj?.content ? <small onClick={() => { handleShowEditFeed(obj) }}>Edit Post Content</small> : null : null}
                    {obj?.author[0]?._id === userInfo?.user?._id && !obj?.sharedPost ?
                      obj?.image ? <small onClick={() => { handleShowEditFeed(obj) }}>Edit Photo</small> : null : null}
                    {obj?.author[0]?._id === userInfo?.user?._id && !obj?.sharedPost ?
                      obj?.post_video ? <small onClick={() => { handleShowEditFeed(obj) }}>Edit Video</small> : null : null}
                    {obj?.author[0]?._id === userInfo?.user?._id && !obj?.sharedPost ?
                      obj?.video ? <small onClick={() => { handleShowEditFeed(obj) }}>Edit Youtube Link</small> : null : null}

                    {
                      obj?.author[0]?._id === userInfo?.user?._id || obj?.sharedBy[0]?._id === userInfo?.user?._id ?
                        !obj?.sharedPost || obj?.sharedBy[0]?._id === userInfo?.user?._id ? <small onClick={(e) => { deletePost(e, obj?._id) }}>Delete</small> : null
                        : null}
                    {obj?.author[0]?._id === userInfo?.user?._id ? null : obj?.sharedBy[0]?._id === userInfo?.user?._id ? null : <small onClick={()=>{handleShowReportPost(obj)}}>Report Post</small>}

                  </div>
                </div>
              </div>
              <div className='p-1' style={{ border: "1px solid gainsboro", width: "88%" }}   >
                <div className='feed_banner_left_header' >
                  <div className='feed_banner_left_header_image'>
                    {obj?.author && obj?.author[0] ? <img src={obj?.author[0]?.profilePicture ? obj?.author[0]?.profilePicture : 'https://colegioclassea.com.br/wp-content/themes/PageLand/assets/img/avatar/avatar.jpg'} alt="ig" /> :
                      props?.user ? <img src={props?.user?.author?.profilePicture ? props?.user?.author?.profilePicture : 'https://colegioclassea.com.br/wp-content/themes/PageLand/assets/img/avatar/avatar.jpg'} alt="ig" /> : null}
                  </div>
                  {obj?.author && obj?.author[0] ?
                    <Link to={`/profile/${obj?.author[0]?._id}`}><div className='feed_banner_left_header_content'>
                      <h1>{obj?.author[0]?.role === "restaurant" ? obj?.author[0]?.restaurantName : obj?.author[0]?.firstName + ' ' + obj?.author[0]?.lastName}</h1>
                      <p>{moment(obj?.postTime).fromNow()}</p>
                    </div></Link> : props?.user ?
                      <Link to={`/profile/${props.user?.author?._id}`}><div className='feed_banner_left_header_content'>
                        <h1>{props.user?.role === "restaurant" ? props.user?.restaurantName : props.user?.firstName + ' ' + props.user?.lastName}</h1>
                        <p>{moment(obj?.postTime).fromNow()}</p>
                      </div></Link> : null}
                  {/* <div className='feed_banner_left_header_bars'
                    onClick={(e)=>{openBoxx(e,i)}}>
              <span className="edit_delete_icon" ><CgMore/></span>
              <div className={`edit_delete_boxx d-none edit_delete_boxx_${i}`}>

          {
            props.user?._id === userInfo?.user?._id ?
            <small onClick={(e)=>{ deletePost(e,props.user?._id)}}>Delete</small>
            :null}

              <small>More Info</small>
          </div>
                    </div> */}
                </div>
                {obj?.content ?
                  <div className='post_content'>



                    <Truncate body={obj?.content} id={obj?._id} />



                  </div> : null}
                {/* -------- */}
                {obj?.image ? <img className="post-image" src={obj?.image} alt="" /> : null}

                {obj?.post_video ? <ReactPlayer
                  controls
                  url={obj?.post_video}
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
                {obj?.video ? <ReactYTPlayer
                  url={obj?.video}
                  // className='react-player'
                  width='100%'
                  // height='380px'
                  config={{
                    youtube: {
                      playerVars: { showinfo: 1 }
                    },
                  }}
                /> : null}
                {/* ------- */}
              </div>
              <div className='feed_banner_left_likes'>
                <div style={{ cursor: "pointer" }} onClick={() => handleShowLikeModal(obj?._id)}><AiOutlineLike /><span>{obj?.like}</span><span>{t("likes")}</span></div>
                <div><span>{obj?.numOfComments}</span><span>{t("comments")}</span></div>
              </div>
              <div className='feed_banner_left_comments'>
                <div style={{ cursor: "pointer" }} onClick={() => handleLike(obj?._id, obj?.page)}>
                  {obj?.myReaction[0]?.user === userInfo?.user?._id ?
                    <div style={{ color: 'green' }}><AiOutlineLike /> <span style={{ color: 'green' }}>{t("liked")}</span></div> :
                    <div><AiOutlineLike /> <span>{t("like")}</span></div>
                  }

                </div>
                <div onClick={(e) => handleComment(obj?._id, i)} style={{ cursor: "pointer" }} className=''><AiOutlineComment /> <span>{t("comment")}</span></div>


                {userInfo?.user?.role === "restaurant" || userInfo?.user?.role === "chef" ? obj?.author[0]?._id === userInfo?.user?._id ? null : obj?.shareBy === userInfo?.user?._id ? null : <div className="ml-3" onClick={(e) => handleShare(obj?._id, i)} style={{ cursor: "pointer" }} ><IoMdShareAlt /> <span>{t("Share")}</span></div> : null}
              </div>

              <div className={`commentsDetails w-100 d-none commentsDetails_${i}`} key={i}>
                <div className='feed_banner_left_search'>
                  <div className='feed_banner_left_search_image'>
                    <img src={userInfo && userInfo?.user?.profilePicture || "https://colegioclassea.com.br/wp-content/themes/PageLand/assets/img/avatar/avatar.jpg"} alt="user-vat" />
                  </div>
                  <div className='feed_banner_left_search_search'>
                    <form onSubmit={(e) => submitComment(e, obj?._id, i, obj?.page)}>
                      <InputEmoji
                        value={addComment}
                        theme="light"
                        onChange={setAddComment}
                        cleanOnEnter
                        onEnter={(e) => submitComment(e, obj?._id, i, obj?.page)}
                        placeholder="Type a comment"
                      />

                    </form>
                  </div>
                </div>
                {/* --- */}
                <CommentView obj={obj} i={i} page={props.page} />
              </div>

            </div> :
              !obj?.sharedPost && <div className='NormalWaliPost feed_banner_scroll_left_items' key={i} >
                <div className='feed_banner_left_header' >
                  <div className='feed_banner_left_header_image'>
                    {obj?.author && obj?.author[0] ? <img src={obj?.author[0]?.profilePicture ? obj?.author[0]?.profilePicture : 'https://colegioclassea.com.br/wp-content/themes/PageLand/assets/img/avatar/avatar.jpg'} alt="ig" /> :
                      props?.user ? <img src={props?.user?.profilePicture ? props?.user?.profilePicture : 'https://colegioclassea.com.br/wp-content/themes/PageLand/assets/img/avatar/avatar.jpg'} alt="ig" /> : null}
                  </div>
                  {obj?.author && obj?.author[0] ?
                    <Link to={`/profile/${obj?.author[0]?._id}`}><div className='feed_banner_left_header_content'>
                      <h1>{obj?.author[0]?.role === "restaurant" ? obj?.author[0]?.restaurantName : obj?.author[0]?.firstName + ' ' + obj?.author[0]?.lastName}</h1>
                      <p>{moment(obj?.createdAt).fromNow()}</p>
                    </div></Link> : props?.user ?
                      <Link to={`/profile/${props.user?._id}`}><div className='feed_banner_left_header_content'>
                        <h1>{props.user?.role === "restaurant" ? props.user?.restaurantName : props.user?.firstName + ' ' + props.user?.lastName}</h1>
                        <p>{moment(obj?.createdAt).fromNow()}</p>
                      </div></Link> : null}
                  <div className='feed_banner_left_header_bars' style={{ zIndex: 2 }}
                    onClick={(e) => { openBoxx(e, i) }}>
                    <span className="edit_delete_icon" ><CgMore /></span>
                    <div className={`edit_delete_boxx d-none edit_delete_boxx_${i}`}>
                      {/* ---------------- */}
                      {obj?.author[0]?._id === userInfo?.user?._id && !obj?.sharedPost ?
                        obj?.content ? <small onClick={() => { handleShowEditFeed(obj) }}>Edit Post Content</small> : null : null}
                      {obj?.author[0]?._id === userInfo?.user?._id && !obj?.sharedPost ?
                        obj?.image ? <small onClick={() => { handleShowEditFeed(obj) }}>Edit Photo</small> : null : null}
                      {obj?.author[0]?._id === userInfo?.user?._id && !obj?.sharedPost ?
                        obj?.post_video ? <small onClick={() => { handleShowEditFeed(obj) }}>Edit Video</small> : null : null}
                      {obj?.author[0]?._id === userInfo?.user?._id && !obj?.sharedPost ?
                        obj?.video ? <small onClick={() => { handleShowEditFeed(obj) }}>Edit Youtube Link</small> : null : null}

                      {
                        obj?.author[0]?._id === userInfo?.user?._id || obj?.sharedBy[0]?._id === userInfo?.user?._id ?

                          !obj?.sharedPost || obj?.sharedBy[0]?._id === userInfo?.user?._id ? <small onClick={(e) => { deletePost(e, obj?._id) }}>Delete</small> : null
                          : null}

                      {obj?.author[0]?._id === userInfo?.user?._id ? null : obj?.sharedBy[0]?._id === userInfo?.user?._id ? null : <small onClick={()=>{handleShowReportPost(obj)}}>Report Post</small>}


                    </div>
                  </div>
                </div>
                {obj?.content ?
                  <div className='post_content'>



                    <Truncate body={obj?.content} id={obj?._id} />



                  </div> : null}
                {/* -------- */}
                {obj?.image ? <img className="post-image" src={obj?.image} alt="" /> : null}

                {obj?.post_video ? <ReactPlayer
                  controls
                  url={obj?.post_video}
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
                {obj?.video ? <ReactYTPlayer
                  url={obj?.video}
                  // className='react-player'
                  width='100%'
                  // height='380px'
                  config={{
                    youtube: {
                      playerVars: { showinfo: 1 }
                    },
                  }}
                /> : null}
                {/* ------- */}
                <div className='feed_banner_left_likes'>
                  <div style={{ cursor: "pointer" }} onClick={() => handleShowLikeModal(obj?._id)}><AiOutlineLike /><span>{obj?.like}</span><span>{t("likes")}</span></div>
                  <div><span>{obj?.numOfComments}</span><span>{t("comments")}</span></div>
                </div>
                <div className='feed_banner_left_comments'>
                  <div style={{ cursor: "pointer" }} onClick={() => handleLike(obj?._id, obj?.page)}>
                    {obj?.myReaction[0]?.user === userInfo?.user?._id ?
                      <div style={{ color: 'green' }}><AiOutlineLike /> <span style={{ color: 'green' }}>{t("liked")}</span></div> :
                      <div><AiOutlineLike /> <span>{t("like")}</span></div>
                    }
                  </div>
                  <div onClick={(e) => handleComment(obj?._id, i)} style={{ cursor: "pointer" }} className=''><AiOutlineComment /> <span>{t("comment")}</span></div>
                  {userInfo?.user?.role === "restaurant" || userInfo?.user?.role === "chef" ? obj?.author[0]?._id === userInfo?.user?._id ? null : obj?.shareBy === userInfo?.user?._id ? null : <div className="ml-3" onClick={(e) => handleShare(obj?._id, i)} style={{ cursor: "pointer" }} ><IoMdShareAlt /> <span>{t("Share")}</span></div> : null}
                </div>

                <div className={`commentsDetails w-100 d-none commentsDetails_${i}`} key={i}>
                  <div className='feed_banner_left_search'>
                    <div className='feed_banner_left_search_image'>
                      <img src={userInfo && userInfo?.user?.profilePicture || "https://colegioclassea.com.br/wp-content/themes/PageLand/assets/img/avatar/avatar.jpg"} alt="user-vat" />
                    </div>
                    <div className='feed_banner_left_search_search'>
                      <form onSubmit={(e) => submitComment(e, obj?._id, i, obj?.page)}>
                        <InputEmoji
                          value={addComment}
                          theme="light"
                          onChange={setAddComment}
                          cleanOnEnter
                          onEnter={(e) => submitComment(e, obj?._id, i, obj?.page)}
                          placeholder="Type a comment"
                        />
                      </form>

                    </div>
                  </div>
                  {/* --- */}
                  <CommentView obj={obj} i={i} page={props.page} />
                </div>
                {/* <div className="page_number py-1" ref={pageNumberRef}></div> */}
              </div>
        })
      }
      {/* { props.type === "chefRest" ? console.log(props?.post?.length, props?.count):null} */}
      {props?.count <= props?.post?.length ? null : <div
        className="saving text-center"
        id="dotss" ref={bottomBoundaryRef}>
        <span>.</span>
        <span>.</span>
        <span>.</span>
        <span>.</span>

      </div>}
    </div>
    <Modal show={showLikeModal} onHide={handleCloseLikeModal}>
      {/* <Modal.Header >
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header> */}
      <Modal.Body closeButton>
        <Tabs
          defaultActiveKey="likes"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          <Tab eventKey="likes" title={<span> <AiOutlineLike /> Likes</span>}>
            {singlePost?.loading ? <div style={{ marginLeft: "50px" }}><div className="row" >
              <Skeleton sx={{ bgcolor: '#F0F2F5' }} animation="wave" variant="circular" width={45} height={45} style={{ marginTop: 2 }} />
              <Skeleton
                sx={{ bgcolor: '#F0F2F5' }}
                animation="wave"
                height={57}
                width="50%"
                style={{ marginLeft: 6, marginTop: -8 }}
              />
            </div>
              <div className="row" >
                <Skeleton sx={{ bgcolor: '#F0F2F5' }} animation="wave" variant="circular" width={45} height={45} style={{ marginTop: 2 }} />
                <Skeleton
                  sx={{ bgcolor: '#F0F2F5' }}
                  animation="wave"
                  height={57}
                  width="60%"
                  style={{ marginLeft: 6, marginTop: -8 }}
                />
              </div>
              <div className="row" >
                <Skeleton sx={{ bgcolor: '#F0F2F5' }} animation="wave" variant="circular" width={45} height={45} style={{ marginTop: 2 }} />
                <Skeleton
                  sx={{ bgcolor: '#F0F2F5' }}
                  animation="wave"
                  height={57}
                  width="40%"
                  style={{ marginLeft: 6, marginTop: -8 }}
                />
              </div></div> :
              singlePost?.post?.reactions?.map((obj, i) => {
                return <div className="likes_leftSide_user" key={i}  >
                  <div className='likes_user_picture position-relative'>
                    <img src={obj?.user?.profilePicture || 'https://w7.pngwing.com/pngs/754/2/png-transparent-samsung-galaxy-a8-a8-user-login-telephone-avatar-pawn-blue-angle-sphere-thumbnail.png'} />
                    <AiOutlineLike className='like-status' />
                  </div>
                  <div className='messages_user_name'>
                    <h6>{obj?.user?.restaurantName
                      ? obj?.user?.restaurantName
                      : obj &&
                      obj?.user?.firstName + " " + obj?.user?.lastName}</h6>
                  </div>
                </div>
              })
            }
          </Tab>
          {/* <Tab eventKey="celebrate" title="Celebrate">
      <h6>Hey2</h6>
      </Tab> */}

        </Tabs>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseLikeModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>

    <Modal show={showEditFeed} onHide={handleCloseEditFeed}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Post</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form action="" id="">

          {editPost?.content ? <div><textarea
            rows="4"
            id="ContentInp"
            defaultValue={editPost?.content}
            onChange={(e) => { setContent(e.target.value) }}
            placeholder={`What's on your mind, ${userInfo?.user?.firstName} ?`}
            spellcheck="false"
            required></textarea>
          </div> : null}

          {editPost?.post_video ?
            <div className="">
              <ReactPlayer
                controls
                url={editPost?.post_video}
                className='react-player'
                id="reactPlayerVid"
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
              />
              <label for="formFile">
                <video width="450" style={{ display: "none" }} controls id="viewVideo">
                  Your browser does not support HTML5 video.
                </video>
                <RiVideoAddFill className='h2 p-0 m-0' />
              </label>
              <input
                className="ppic-input ml-4"
                type="file"
                name="image"
                id="formFile"
                accept="video/mp4"
                onChange={(e) => { handleChangeVideo(e) }}
              />
            </div> : null}
          {editPost?.image ?
            <div>
              <img width="450" src={pic ? pic : editPost?.image} alt="not found pic" />

              <div className="image_button">

                <label for="formFile">

                  {!pic ? <RiImageAddFill className='h2 p-0 m-0' /> :
                    <img className="img" src={pic} alt="not found pic" />
                  }
                </label>
                <input
                  className="ppic-input ml-4"
                  type="file"
                  name="image"
                  id="formFile"
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={(e) => { handleChangeImage(e) }}
                />
              </div></div> : null}
          {editPost?.video ?
            <input defaultValue={editPost?.video} type="text" className="mt-2 form-control w-100" onChange={(e) => { setLink(e.target.value) }} placeholder="Add video link +" /> : null}

        </form>
        {uploadProg > 0 && <ProgressBar now={uploadProg} active label={`${uploadProg}%`} />}
        {/* {JSON.stringify(editPost)} */}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseEditFeed}>
          Close
        </Button>
        <Button variant="success" onClick={updatePost}>
          Update Post
        </Button>
      </Modal.Footer>
    </Modal>

    <Modal show={showReportPost} onHide={handleCloseReportPost}>
      <Modal.Header closeButton>
        <Modal.Title>Report Post</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form action="" id="">

          <div>
            <textarea
              rows="5"
              id="ContentInp"
              onChange={(e) => { setReport(e.target.value) }}
              placeholder={"Briefly Describe What Happening."}
              spellcheck="false"
              required></textarea>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseReportPost}>
          Close
        </Button>
        <Button variant="success" onClick={submitReport}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>

  </>
  )
}

export default FeedPost
