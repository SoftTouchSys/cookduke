import React,{useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import NavBar from "../NavBar/Navbar"
import FeedSidebar from "../Feed/FeedSidebar"
import CircularProgress from "../NavBar/Loader"

import { RiSearchLine } from "react-icons/ri";
import {getChefsData} from "../../Actions/chefActions"

const Chefs = () => {
    const {t} = useTranslation()
    const dispatch = useDispatch()


    const chefsData = useSelector((state) => state.chefsData)
    const { chefs,loading } = chefsData
    
    
    useEffect(()=>{
      const token = JSON.parse(localStorage.getItem('userInfo'))?.token
      if(!token){
        window.location = '/';
      }
      dispatch(getChefsData())
    },[])
    return (
    <div className='main_chefprofile'>
      <NavBar/>
      <FeedSidebar />
      <div className='chefprofile_container'>
        <div className='chefs_container'>
          <h2>Chefs</h2>
          {loading && loading === true? <CircularProgress/>
          :<div className='chefprofile_main'>
            {chefs && chefs?.map((obj,i)=>{
              return  <div className='chefprofile_main_chef' key={i}>
              <div><img src={obj?.profilePicture ? obj?.profilePicture :"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEuAEJdVru_Y-9OXwqOSEv90zG6z4AyacI1w&usqp=CAU"} /></div>
              <a href={`/#/profile/${obj?._id}`}><h6>{obj?.firstName && obj?.firstName} {obj?.lastName && obj?.lastName}</h6></a>
              <Link to={`/orderMeal/${obj?._id}`}><p className='text-center btn-order'>Order Meal</p></Link>
            </div>
            })}
          
          </div>}
        </div>
      </div>
    </div>
  )
}

export default Chefs