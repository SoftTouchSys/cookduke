import React,{useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import NavBar from "../NavBar/Navbar"
import FeedSidebar from "../Feed/FeedSidebar"
import CircularProgress from "../NavBar/Loader"

import { RiSearchLine } from "react-icons/ri";
import {getRestaurantsData} from "../../Actions/restaurantActions"
import { getProfileDetails } from '../../Actions/userActions';

const Restaurants = () => {
  const {t} = useTranslation()
  const dispatch = useDispatch()


  const restaurantsData = useSelector((state) => state.restaurantsData)
  const { restaurants,loading } = restaurantsData

  


  
    useEffect(()=>{
      const token = JSON.parse(localStorage.getItem('userInfo'))?.token
      if(!token){
        window.location = '/';
      }
      dispatch(getRestaurantsData())
    

    },[])


    return (
    <div className='main_chefprofile'>
      <NavBar/>
      <FeedSidebar />
      <div className='chefprofile_container'>
        <div className='chefs_container'>
        <h2>Restaurants </h2>
        {loading && loading === true? <CircularProgress/>
        //  <div className='chefprofile_input'>
        //     <RiSearchLine className='chefprofile_icon' />
        //     <input placeholder='Search your favourite chefs' />
        //   </div> 
          :<div className='chefprofile_main'>
            {restaurants && restaurants?.map((obj, i)=>{
              return  <div className='chefprofile_main_chef' key={i}>
              <div><img src={obj?.coverPicture? obj?.coverPicture:"https://cdn.pixabay.com/photo/2014/09/17/20/26/restaurant-449952__340.jpg"} /></div>
              <a href={`/#/profile/${obj?._id}`}><h6>{obj?.restaurantName ? obj?.restaurantName :"UnNamed"}</h6></a>
              <Link to={`/orderMeal/${obj?._id}`}><p className='btn-order'>Order Meal</p></Link>
            </div>
            })}
          </div>}
        </div>
      </div>
    </div>
  )
}

export default Restaurants 