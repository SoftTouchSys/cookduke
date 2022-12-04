import React, { useEffect, useState } from 'react'
import NavBar from "../NavBar/Navbar"
import FeedSidebar from "../Feed/FeedSidebar"
// import { useTranslation } from 'react-i18next';
import { RiSearchLine } from "react-icons/ri";
import { AiFillHeart } from "react-icons/ai";
import { FaHeartBroken } from "react-icons/fa";
import './Favourite.css'
import { Link } from 'react-router-dom';
import axiosInstance from '../../helper/axios';
const Favourite = () => {
  // const {t} = useTranslation()

  const token = JSON.parse(localStorage.getItem('userInfo'))?.token
  if (!token) {
    window.location = '/';
  }

  const [favourite, setFavourite] = useState('')

  useEffect(() => {
    axiosInstance.get('/favourite').then((res) => {
      setFavourite(res.data)
    })
  }, [favourite])

  const unfav = (id)=>{
    axiosInstance.post(`removefavourite/${id}`)
  }

  return (
    <div className='main_chefprofile'>
      <NavBar />
      <FeedSidebar />
      <div className='chefprofile_container'>
        <div className='chefs_container'>
          <h2>Favourites</h2>
          {/* <div className='chefprofile_input'>
            <RiSearchLine className='chefprofile_icon' />
            <input placeholder='Search your favourite chefs' />
          </div> */}
          <div className='chefprofile_main'>

            {favourite && favourite?.map((obj, i) => {
              return <div className='chefprofile_main_chefs' key={i}>
                <div><img src={obj?.myfavourite?.profilePicture || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEuAEJdVru_Y-9OXwqOSEv90zG6z4AyacI1w&usqp=CAU'} /></div>
                <Link to="/profile">
                  <h6>
                  {obj?.myfavourite?.role === "restaurant" ? obj?.myfavourite?.restaurantName ? obj?.myfavourite?.restaurantName : obj?.myfavourite?.firstName+' '+obj?.myfavourite?.lastName :obj?.myfavourite?.firstName+' '+obj?.myfavourite?.lastName}
                  </h6></Link>
                <button onClick={()=>unfav(obj._id)}>
                  <FaHeartBroken className='text-danger' /> &nbsp; UnFavourite</button>
              </div>
            })}


          </div>
        </div>
      </div>
    </div>
  )
}

export default Favourite