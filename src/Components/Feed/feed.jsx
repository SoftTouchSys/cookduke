import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Container from "react-bootstrap/Container"
import NavBar from '../NavBar/Navbar'
import FeedSideBar from "./FeedSidebar"
import FeedMenu from "./FeedMenu"
import FeedPost from './FeedPost'
import CircularProgress from "../NavBar/Loader"
import Scraper from "../Scraper/Scraper"
import './feed.css'



import { getSubscribingPost } from '../../Actions/postActions'

const Feed = () => {
  const dispatch = useDispatch()

  const postDetails = useSelector((state) => state.subscribingPost)
  const { post,page,totalPostCount, loading } = postDetails

  const token = JSON.parse(localStorage.getItem('userInfo')).token
  if (!token) {
    window.location = '/';
  }



  useEffect(() => {
    dispatch(getSubscribingPost(1))
  }, [])



  return (
    <Container fluid className='feed_container'>
      <NavBar />
      <div className='feed_banner'>
        <FeedSideBar />

        <div className='feed_banner_scroll'>

          <FeedPost post={post} page={page} count={totalPostCount} />
          <FeedMenu />
        </div>
      </div>
    </Container>
  )
}

export default Feed