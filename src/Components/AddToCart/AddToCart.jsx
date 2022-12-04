import React, { useState } from 'react'
import './AddToCart.css'
import NavBar from "../NavBar/Navbar"
import { BsArrowLeft } from "react-icons/bs";
import { MdPayments } from "react-icons/md";
import { AiOutlinePlusSquare,AiOutlinePlus,AiOutlineMinusSquare } from "react-icons/ai";
import { RiDeleteBinFill } from "react-icons/ri";

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import Cart from '../NavBar/cart';
import Checkout from './checkout';
import { Link } from 'react-router-dom';

const AddToCart = (props) => {

  const localCart = useSelector((state) => state._todoProduct)
  const userLogin = useSelector((state) => state.userLogin)

  const { userInfo } = userLogin

  const { t } = useTranslation()

  const [fullName,setFullName]=useState("")
  const [mobile,setMobile]=useState("")
  const [email,setEmail]=useState("")
  const [address,setAddress]=useState("")
  const [area,setArea]=useState("")
  const [payment,setPayment]=useState("COD")

  return (
    <div className='main_AddToCart'>
      <NavBar />
      <div className='container_AddToCart'>
        <div className='AddToCart_left'>

          <div className='AddToCart_left_button'>
          <Link to={`/orderMeal/${localCart?.vendor}`}><BsArrowLeft /></Link>
            <span>Checkout</span>
          </div>

          <h5>Customer Detail</h5>
          <div className='left_input'>
            <label>Full Name</label>
            <input placeholder='Full Name' onChange={(e)=>setFullName(e.target.value)} />
          </div>
          <div className='left_input'>
            <label>Email</label>
            <input placeholder='earlryan@gmail.com' onChange={(e)=>setEmail(e.target.value)} />
          </div>
          <div className='left_input'>
            <label>Mobile Number</label>
            <input placeholder='923224895195'  onChange={(e)=>setMobile(e.target.value)}/>
          </div>
          
          <h5>Delivery Address</h5>
          <div className='left_input'>
            <label>Address Line</label>
            <input placeholder='Enter your address' onChange={(e)=>setAddress(e.target.value)} />
          </div>
          <div className='left_input'>
            <label>Area/City</label>
            <input placeholder='Anything...../' onChange={(e)=>setArea(e.target.value)} />
          </div>

          <h5>Payment Method</h5>
          <div className='left_payment'>
            <div className='left_payment_method'>
              <MdPayments className='left_payment_icon' />
              <span>Cash on Delivery</span>
            </div>
            {/* <div className='left_payment_method'>
              <MdPayments className='left_payment_icon' />
              <span>Credit/Debit Card</span>
            </div> */}
          </div>

        </div>

        <div className='AddToCart_right'>
          <h5>Order Summary</h5>
          {localCart?.Carts ? 
          <Checkout 
          fullName={fullName}
          email={email}
          mobile={mobile}
          address={address}
          area={area}
          payment={payment}
          user={userInfo?.user}
          vendor={localCart?.vendor}
          />
          :null}
            

        </div>

      </div>
    </div>
  )
}

export default AddToCart