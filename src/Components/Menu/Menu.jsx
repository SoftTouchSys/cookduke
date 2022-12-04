import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation, Navigate } from 'react-router-dom'
import { Container, Form, Row, Col,Button } from 'react-bootstrap';
import { BsCheck2 } from "react-icons/bs";
import { useTranslation } from 'react-i18next';
import { addUserMenu } from "../../Actions/userActions"


const Menu = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin



  const [itemName, setItemName] = useState("")
  const [ingrediants, setIngrediants] = useState("")
  const [type, setType] = useState("")
  const [price, setPrice] = useState("")
  const [image, setImage] = useState("")

  const closePopup = () => {
    setItemName("")
    setIngrediants("")
    setType("")
    setPrice("")
    setImage("")
    var pop = document.querySelector(".menu_popup")
    pop.style.display = "none"
    document.querySelector(".itemName").value=("")
      document.querySelector(".ingrediants").value=("")
      document.querySelector(".typeS").value=("")
      document.querySelector(".priceM").value=("")
      document.querySelector(".ItemImage").value=("")
  }

  const addMenuItems = () => {
    if (itemName !== "" && ingrediants !== "" && type !== "" && price !== "" && image !== "") {

      dispatch(addUserMenu({ itemName, ingrediants, type, price, image }))

      closePopup()
      setItemName("")
      setIngrediants("")
      setType("")
      setPrice("")
      setImage("")
      document.querySelector(".itemName").value=("")
      document.querySelector(".ingrediants").value=("")
      document.querySelector(".typeS").value=("")
      document.querySelector(".priceM").value=("")
      document.querySelector(".ItemImage").value=("")
      document.querySelector("form").reset()
    } else {
      alert("please fill all the fields")
    }
  }

  // --------------------------------------------

  return (
    <div className="menu_popup mt-3">
      <div className="menu_container">
        <span className='cross_menu' onClick={closePopup}>x</span>
        <h3>{t("add_menu_item")}</h3>
        
        <p>{t("item_name")}</p>
        <input className='itemName' onChange={(e) => setItemName(e.target.value)} placeholder='Salad' />
        <p>{t("ingredients")}</p>
        <input className='ingrediants' onChange={(e) => setIngrediants(e.target.value)} placeholder='Carrot, Apple' />
        <p>{t("type")}</p>
        <input className='typeS' onChange={(e) => setType(e.target.value)} placeholder='Starter' />
        <p>{t("price")}</p>
        <input type="number" className='priceM' onChange={(e) => setPrice(e.target.value)} placeholder='100 Rs.' />
        <p>Item Image</p>
        <input 
        onChange={(e) => setImage(e.target.files[0])} 
        className="ItemImage form-control py-1" 
        type="file" 
        id="formFile" 
        accept="image/png, image/jpeg, image/jpg" />
        <button className='btn btn-success w-100 mt-2 save_btn'  onClick={addMenuItems}>{t("add")}</button>
        
      </div>
    </div>
  )
}

export default Menu