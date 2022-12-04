import React, { useEffect, useState } from 'react'
import './SetupAccount.css'
import NavBar from '../NavBar/Navbar';
import { useDispatch, useSelector } from 'react-redux'
import FormsFooter from '../Forms/FormsFooter';
import icon from "../images/Icons.png"
import { useTranslation } from 'react-i18next';
import { BsPencil } from "react-icons/bs"
import { userSetupUpdate, manageTime, removeMenu, addUserMenu, getMyProfile, editUserMenu } from "../../Actions/userActions"

import toast, { Toaster } from 'react-hot-toast';


import 'bootstrap/dist/css/bootstrap.css'; // or include from a CDN
import 'react-bootstrap-country-select/dist/react-bootstrap-country-select.css';


import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 420,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 0,
};

const SetupAccount = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  // edit

  const [editData, setEditData] = useState('')

  const [openEditMenu, setOpenEditMenu] = React.useState(false);
  const handleOpenEditMenu = (menu_id, user_id) => {
    setEditData(user?.menu?.filter(item => item._id === menu_id));
    setOpenEditMenu(true);
  }
  const handleCloseEditMenu = () => {
    setOpenEditMenu(false);
    setEditData("");
  }


  const openPopup = () => {
    var pop = document.querySelector(".menu_popup")
    pop.style.display = "flex"
  }

  const [restaurantName, setRestaurantName] = useState("")
  const [about, setAbout] = useState("")
  const [coverPicture, setCoverPicture] = useState("")

  const [pic, setPic] = useState("")
  const [newMessage, setMessage] = useState('')

  const updateUserProfile = useSelector((state) => state.updateUserProfile)
  const { userData } = updateUserProfile
  const umessage = userData?.message

  const myProfileData = useSelector((state) => state.myProfileData)
  const { myProfile } = myProfileData

  const [user, newUser] = useState(myProfile && myProfile?.user)

  useEffect(() => {
    dispatch(getMyProfile())
  }, [])

  useEffect(() => {
    newUser(myProfile && myProfile?.user)
    document.querySelector(".menu_frame2").classList.remove("d-none")
    document.querySelector(".adMore").classList.remove("d-none")
  }, [myProfile])

  const handleChangeImage = (e) => {
    setPic(URL.createObjectURL(e.target.files[0]))
    setCoverPicture(e.target.files[0])
  }

  const setupAccount = () => {
    if (restaurantName || coverPicture || about) {
      dispatch(userSetupUpdate({ restaurantName, about, coverPicture }, userInfo?.user._id))
    } else {
      alert("please fill all fields")
    }

  }

  useEffect(() => {
    setMessage(umessage)
    window.scroll(0, 0)
    if (umessage === "user updated successfully") {
      dispatch(getMyProfile())
      setPic("")
      setTimeout(function () {
        setMessage("")
      }, 2000);
    } else if (umessage === "menu added successfully") {
      dispatch(getMyProfile())
      setTimeout(function () {
        setMessage("")
      }, 2000);
    } else if (umessage === "menu deleted successfully") {
      dispatch(getMyProfile())
      setTimeout(function () {
        setMessage("")
      }, 2000);
    } else if (umessage === "menu updated successfully") {
      dispatch(getMyProfile())
      setTimeout(function () {
        setMessage("")
      }, 2000);
    }
    else if (umessage === "time updated successfully") {
      dispatch(getMyProfile())
      setTimeout(function () {
        setMessage("")
      }, 2000);
    }

  }, [umessage])



  const [everyday, setEveryday] = useState(false)

  useEffect(() => {
    if (everyday == true) {
      document.querySelector(".every-day").style.display = "block"
      document.querySelector(".individually-days").style.display = "none"
    } else {
      document.querySelector(".every-day").style.display = "none"
      document.querySelector(".individually-days").style.display = "block"
    }
  }, [everyday])



  const [times, setTimes] = useState([])

  useEffect(() => {
    setTimes(userInfo && userInfo?.user?.openingTime)
  }, [])

  useEffect(() => {
    if (times && times?.find(item => item.everday === true)) {
      document.querySelector(".every-day").style.display = "block"
      document.querySelector(".individually-days").style.display = "none"
      setEveryday(true)
    } else if (times && times?.find(item => item.everday === false)) {
      document.querySelector(".every-day").style.display = "none"
      document.querySelector(".individually-days").style.display = "block"
      setEveryday(false)
    }
  }, [])




  // console.log(userInfo?.user?.openingTime,"times")

  const [opens, setOpens] = useState("")
  const [closes, setCloses] = useState("")



  const setOpen = (day, time) => {
    setOpens({ "day": day, "open": time })
  }

  const setClose = (day, time) => {
    setCloses({ "day": day, "close": time })
  }

  const [monday, setMonday] = useState(false)
  const [tuesday, setTuesday] = useState(false)
  const [wednesday, setWednesday] = useState(false)
  const [thursday, setThursday] = useState(false)
  const [friday, setFriday] = useState(false)
  const [saturday, setSaturday] = useState(false)
  const [sunday, setSunday] = useState(false)

  useEffect(() => {

    if (everyday && everyday !== false) {
      if (opens !== "" && closes !== "" && closes?.day === "everyday" && opens?.day === "everyday") {
        setTimes([
          { everday: true, monday: monday && monday === true ? { "open": opens?.open, "close": closes?.close } : null },
          { everday: true, tuesday: tuesday && tuesday === true ? { "open": opens?.open, "close": closes?.close } : null },
          { everday: true, wednesday: wednesday && wednesday === true ? { "open": opens?.open, "close": closes?.close } : null },
          { everday: true, thursday: thursday && thursday === true ? { "open": opens?.open, "close": closes?.close } : null },
          { everday: true, friday: friday && friday === true ? { "open": opens?.open, "close": closes?.close } : null },
          { everday: true, saturday: saturday && saturday === true ? { "open": opens?.open, "close": closes?.close } : null },
          { everday: true, sunday: sunday && sunday === true ? { "open": opens?.open, "close": closes?.close } : null }
        ])
        //   if(times?.length !== 0 && times?.find(item => item.everday !== true)){
        //     setTimes([{ [openTime.key]: {everday: false, "open": openTime.value, "close": closeTime.value } }])
        // }else{
        //   setTimes(
        //     [...times, { [openTime.key]: {everday: false, "open": openTime.value, "close": closeTime.value } }]
        //   )
        // }
      }
    }
  }, [opens, closes, everyday])

  const [_monday, _setMonday] = useState(false)
  const [_tuesday, _setTuesday] = useState(false)
  const [_wednesday, _setWednesday] = useState(false)
  const [_thursday, _setThursday] = useState(false)
  const [_friday, _setFriday] = useState(false)
  const [_saturday, _setSaturday] = useState(false)
  const [_sunday, _setSunday] = useState(false)

  const [openTime, setOpenTime] = useState('')
  const [closeTime, setCloseTime] = useState('')

  console.log(openTime,closeTime,".../.../../",newMessage)
  useEffect(() => {
    if (openTime !== "" && closeTime !== "" && openTime?.key === closeTime?.key) {
      if (times?.length !== 0 && times?.find(item => item.everday === true)) {
        setTimes([{ [openTime.key]: { everday: false, "open": openTime.value, "close": closeTime.value } }])
      } else {
        setTimes(
          [...times, { [openTime.key]: { everday: false, "open": openTime.value, "close": closeTime.value } }]
        )
      }
    }
  }, [openTime, closeTime, everyday])


  const timeManagement = () => {
    if (times !== '' || times !== []) {

      if (everyday === true) {
        if (opens == "" || closes == "") {

        } else {
          dispatch(manageTime(times, userInfo?.user?._id))
        }
      } else {
        if (_monday === true && times?.find(item => Object.keys(item)[0] === "monday" && item.everday !== true)?.monday === undefined ||
          _tuesday === true && times?.find(item => Object.keys(item)[0] === "tuesday" && item.everday !== true)?.tuesday === undefined ||
          _wednesday === true && times?.find(item => Object.keys(item)[0] === "wednesday" && item.everday !== true)?.wednesday === undefined ||
          _thursday === true && times?.find(item => Object.keys(item)[0] === "thursday" && item.everday !== true)?.thursday === undefined ||
          _friday === true && times?.find(item => Object.keys(item)[0] === "friday" && item.everday !== true)?.friday === undefined ||
          _saturday === true && times?.find(item => Object.keys(item)[0] === "saturday" && item.everday !== true)?.saturday === undefined ||
          _sunday === true && times?.find(item => Object.keys(item)[0] === "sunday" && item.everday !== true)?.sunday === undefined) {
          // ----
        } else {
          dispatch(manageTime(times, userInfo?.user?._id))
        }

      }

    } else {
      newMessage("please Choose time first")
    }
  }


  const unSelect = (status, day) => {
    if (status === true) {
      document.getElementsByName(day)[0].value = "";
      document.getElementsByName(day)[1].value = "";
      document.getElementsByName(day)[0].defaultValue = "";
      document.getElementsByName(day)[1].defaultValue = "";

      const newTime = times?.filter((item, i) => {
        return Object.keys(item)[0] !== day
      })
      setTimes(newTime);
    }

  }


  const unSlt = (status, day) => {
    if (status === true) {
      const newTime = times?.filter((item, i) => {
        return Object.keys(item)[0] !== day
      })
      setTimes(newTime);
    }

  }

  // console.log(everyday,times,"ttt")

  // -------------------

  const closePopup = () => {
    var pop = document.querySelector(".menu_popup")
    pop.style.display = "none"
    document.querySelector(".itemName").value = ("")
    document.querySelector(".ingrediants").value = ("")
    document.querySelector(".typeS").value = ("")
    document.querySelector(".priceM").value = ("")
    document.querySelector(".ItemImage").value = ("")
  }

  const [menuList, setMenuList] = useState([])
  const [itemName, setItemName] = useState("")
  const [ingrediants, setIngrediants] = useState("")
  const [type, setType] = useState("")
  const [price, setPrice] = useState("")
  const [image, setImage] = useState("")

  const addMenuItems = () => {
    if (itemName !== "" && ingrediants !== "" && type !== "" && price !== "" && image !== "") {

      // setMenuList([...menuList, { itemName: itemName, ingrediants: ingrediants, type: type, price: price, itemImage: image }])

      dispatch(addUserMenu({ itemName, ingrediants, type, price, image }))
      closePopup()
      setMenuList([])
      setItemName("")
      setIngrediants("")
      setType("")
      setPrice("")
      setImage("")
      document.querySelector(".itemName").value = ""
      document.querySelector(".ingrediants").value = ""
      document.querySelector(".typeS").value = ""
      document.querySelector(".priceM").value = ""
      document.querySelector(".ItemImage").value = ""

      closePopup()
      // document.querySelector(".menu_frame2").classList.add("d-none")
      // document.querySelector(".adMore").classList.add("d-none")

      // document.querySelector(".itemName").value=("")
      // document.querySelector(".ingrediants").value=("")
      // document.querySelector(".typeS").value=("")
      // document.querySelector(".priceM").value=("")
      // document.querySelector(".ItemImage").value=("")
      // setItemName("")
      // setIngrediants("")
      // setType("")
      // setPrice("")
      // setImage("")

    } else {
      alert("please fill all the fields")
    }
  }



  const removeMenuItems = (menu_id, user_id) => {
    toast((t) => (
      <span>
        <b>Are you sure! You want to Delete Menu.</b><br /><br />
        <button className="btn btn-danger m-2 float-right" onClick={() => { dispatch(removeMenu(menu_id, user_id)); toast.dismiss(t.id) }}>
          Delete Menu
        </button>
        <button className="btn btn-success m-2 float-right" onClick={() => toast.dismiss(t.id)}>
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

  const editMenu = (menu_id, user_id) => {

    dispatch(editUserMenu(menu_id,
      user_id,
      itemName ? itemName : editData[0]?.itemName,
      ingrediants ? ingrediants : editData[0]?.ingrediants,
      type ? type : editData[0]?.type,
      price ? price : editData[0]?.price,
      image ? image : editData[0]?.itemImage,
      editData[0]?.cl_itemImage_id
    ))
    setOpenEditMenu(false)



  }

  const saveMenu = () => {

    if (menuList.length === 0) {
      alert("please add menu")
    } else {
      dispatch(addUserMenu({ itemName, ingrediants, type, price, image }))
      setMenuList([])
      setItemName("")
      setIngrediants("")
      setType("")
      setPrice("")
      setImage("")
      document.querySelector(".itemName").value = ""
      document.querySelector(".ingrediants").value = ""
      document.querySelector(".typeS").value = ""
      document.querySelector(".priceM").value = ""
      document.querySelector(".ItemImage").value = ""

    }
  }
  return (
    <div>
      <Toaster
        position="top-center"
        containerStyle={{ top: 150 }}
        reverseOrder={false}
      />
      <NavBar />
      <div className="cont">
        <h3 className="setup_your_account_heading1">{t("setup_your_account")}</h3>
        {newMessage && <div className="message">{newMessage}</div>}
        <div className='setup_your_account_container'>
          <div className='setup_your_account_column'>
            <h6>{t("upload_cover_photo")}
              <small style={{ fontSize: "12px" }}>{t("Ideal size is above (800 x 400)")}</small>
            </h6>

            <div className="image_frame">
              <form>
                <label for="formFile">
                  <img src={icon} alt="" />
                  {!pic ? user?.coverPicture ? <img className="img" src={(user?.coverPicture)} alt="user image" /> :
                    null : <img className="img" src={pic} alt="not found pic" />
                  }
                </label>
                <input
                  className="ppic-input ml-4"
                  type="file"
                  name="coverPicture"
                  id="formFile"
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={(e) => { handleChangeImage(e) }}
                />
              </form>
              <p>{t("save")}</p>
            </div>
            {userInfo?.user?.role === "restaurant" ?
              <form className="account_inputs">
                <h6>{t("Add Restaurant Name")}</h6>
                <input placeholder="Restaurant Name" defaultValue={user?.restaurantName || ""} onChange={(e) => { setRestaurantName(e.target.value) }} />
              </form> : null}
            <form className="account_inputs">
              <h6>{t("Add Bio/About")}</h6>
              <input placeholder="About" defaultValue={user?.about || ""} onChange={(e) => { setAbout(e.target.value) }} />
            </form>
            <form className="account_inputs">
            </form>
            <button className='save_btn' onClick={setupAccount}>{t("save")}</button>
          </div>

          <div className='setup_your_account_column'>
            <h6>{t("sopening_time_hours")}</h6>
            <div className='check-box-box'>
              <div className='signup_terms_main'>
                <input classname="geekmark signup_terms_main" type="checkbox" name="terms" onChange={(e) => { setEveryday(everyday === true ? false : everyday === false ? true : "") }} id="terms"
                  checked={everyday === true ? true : false} />
                <label for="terms" className="mt-2 signup_terms_text2 signup_terms_text1">&nbsp;<b>{t("same_everyday")}</b></label>
              </div>
            </div>
            <div className='every-day'>
              <div className="weak-days">

                <span className={
                  times && times?.length !== 0 && times?.find(item => Object.keys(item)[0] === "monday" && item.everday === true) ? 'opened' :
                    monday && monday === true ? 'opened' : "closed"
                }
                  onClick={() => { setMonday(monday === false ? true : false); unSlt(monday, "monday") }}>{t("m")}</span>
                <span className={
                  times && times?.length !== 0 && times?.find(item => Object.keys(item)[0] === "tuesday" && item.everday === true) ? 'opened' :
                    tuesday && tuesday === true ? 'opened' : "closed"
                }
                  onClick={(e) => { setTuesday(tuesday === false ? true : false); unSlt(tuesday, "tuesday") }} >{t("t")}</span>
                <span className={
                  times && times?.length !== 0 && times?.find(item => Object.keys(item)[0] === "wednesday" && item.everday === true) ? 'opened' :
                    wednesday && wednesday === true ? 'opened' : "closed"
                }
                  onClick={(e) => { setWednesday(wednesday === false ? true : false); unSlt(wednesday, "wednesday") }} >{t("w")}</span>
                <span className={
                  times && times?.length !== 0 && times?.find(item => Object.keys(item)[0] === "thursday" && item.everday === true) ? 'opened' :
                    thursday && thursday === true ? 'opened' : "closed"
                }
                  onClick={(e) => { setThursday(thursday === false ? true : false); unSlt(thursday, "thursday") }} >{t("t")}</span>
                <span className={
                  times && times?.length !== 0 && times?.find(item => Object.keys(item)[0] === "friday" && item.everday === true) ? 'opened' :
                    friday && friday === true ? 'opened' : "closed"
                }
                  onClick={(e) => { setFriday(friday === false ? true : false); unSlt(friday, "friday") }} >{t("f")}</span>
                <span className={
                  times && times?.length !== 0 && times?.find(item => Object.keys(item)[0] === "saturday" && item.everday === true) ? 'opened' :
                    saturday && saturday === true ? 'opened' : "closed"
                }
                  onClick={(e) => { setSaturday(saturday === false ? true : false); unSlt(saturday, "saturday") }} >{t("s")}</span>
                <span className={
                  times && times?.length !== 0 && times?.find(item => Object.keys(item)[0] === "sunday" && item.everday === true) ? 'opened' :
                    sunday && sunday === true ? 'opened' : "closed"
                }
                  onClick={(e) => { setSunday(sunday === false ? true : false); unSlt(sunday, "sunday") }} >{t("s")}</span>
              </div>
              <br />
              <input type='time' name='open'
                defaultValue={times &&
                  times?.find(item => Object?.keys(item)[1] !== "_id" && Object?.keys(item)[1] && item.everday === true) &&
                  Object?.values(times && times?.find(item => Object?.keys(item)[1] !== "_id" && Object?.keys(item)[1]))[0]?.open}
                onChange={(e) => { setOpen("everyday", e.target.value.hasOwnProperty('value')!==''&&e.target.value) }} />
              <span>-</span>
              <input type='time' name='close'
                defaultValue={times &&
                  times?.find(item => Object?.keys(item)[1] !== "_id" && Object?.keys(item)[1] && item.everday === true) &&
                  Object?.values(times && times?.find(item => Object?.keys(item)[1] !== "_id" && Object?.keys(item)[1]))[0]?.close}
                onChange={(e) => { setClose("everyday", e.target.value.hasOwnProperty('value')!==''&&e.target.value) }} />

            </div>
            {/* ------------------------------------------------------------------------- */}
            <div className='individually-days'>
              <div className='each-day'>
                <div className="weak-days">
                  <span className={times?.length !== 0 && times?.find(item => Object.keys(item)[0] === "monday" && item.everday !== true) ? 'opened' :
                    // times && times?.find(item => Object.keys(item)[0] === "monday") ? 'opened' :
                    _monday && _monday === true ? 'opened' : 'closed'}
                    onClick={() => { _setMonday(_monday === false ? true : false); unSelect(_monday === false ? true : false, "monday") }}
                  >{t("m")}</span>
                </div>
                <div className="timming">

                  <input type='time' name='monday'
                    defaultValue={times && times?.find(item => Object.keys(item)[0] === "monday" && item.everday !== true)?.monday?.open}
                    disabled={_monday && _monday === true ? false : true}
                    onChange={(e) => { setOpenTime(e.target.value.hasOwnProperty('value')!==''&&{ key: "monday", value: e.target.value }) }}
                  />
                  <span>-</span>
                  <input type='time' name='monday'
                    defaultValue={times && times?.find(item => Object.keys(item)[0] === "monday" && item.everday !== true)?.monday?.close}
                    disabled={_monday && _monday === true ? false : true}
                    onChange={(e) => { setCloseTime(e.target.value.hasOwnProperty('value')!==''&&{ key: "monday", value: e.target.value }) }}
                  />
                </div>
              </div>
              <div className='each-day'>
                <div className="weak-days">
                  <span className={times?.length !== 0 && times?.find(item => Object.keys(item)[0] === "tuesday" && item.everday !== true) ? 'opened' :
                    // times && times?.find(item => Object.keys(item)[0] === "tuesday") ? 'opened' :
                    _tuesday && _tuesday === true ? 'opened' : 'closed'}
                    onClick={() => { _setTuesday(_tuesday === false ? true : false); unSelect(_tuesday === false ? true : false, "tuesday") }}
                  >{t("t")}</span>
                </div>
                <div className="timming">
                  <input type='time' name='tuesday'
                    defaultValue={times && times?.find(item => Object.keys(item)[0] === "tuesday" && item.everday !== true)?.tuesday?.open}
                    disabled={_tuesday && _tuesday === true ? false : true}
                    onChange={(e) => { setOpenTime(e.target.value.hasOwnProperty('value')!==''&&{ key: "tuesday", value: e.target.value }) }}
                  />
                  <span>-</span>
                  <input type='time' name='tuesday'
                    defaultValue={times && times?.find(item => Object.keys(item)[0] === "tuesday" && item.everday !== true)?.tuesday?.close}
                    disabled={_tuesday && _tuesday === true ? false : true}
                    onChange={(e) => { setCloseTime(e.target.value.hasOwnProperty('value')!==''&&{ key: "tuesday", value: e.target.value }) }}
                  />
                </div>
              </div>
              <div className='each-day'>
                <div className="weak-days">
                  <span className={times?.length !== 0 && times?.find(item => Object.keys(item)[0] === "wednesday" && item.everday !== true) ? 'opened' :
                    // times && times?.find(item => Object.keys(item)[0] === "wednesday") ? 'opened' :
                    _wednesday && _wednesday === true ? 'opened' : 'closed'}
                    onClick={() => { _setWednesday(_wednesday === false ? true : false); unSelect(_wednesday === false ? true : false, "wednesday") }}
                  >{t("w")}</span>
                </div>
                <div className="timming">
                  <input type='time' name='wednesday'
                    defaultValue={times && times?.find(item => Object.keys(item)[0] === "wednesday" && item.everday !== true)?.wednesday?.open}
                    disabled={_wednesday && _wednesday === true ? false : true}
                    onChange={(e) => { setOpenTime(e.target.value.hasOwnProperty('value')!==''&&{ key: "wednesday", value: e.target.value }) }}
                  />
                  <span>-</span>
                  <input type='time' name='wednesday'
                    defaultValue={times && times?.find(item => Object.keys(item)[0] === "wednesday" && item.everday !== true)?.wednesday?.close}
                    disabled={_wednesday && _wednesday === true ? false : true}
                    onChange={(e) => { setCloseTime(e.target.value.hasOwnProperty('value')!==''&&{ key: "wednesday", value: e.target.value }) }}
                  />
                </div>
              </div>
              <div className='each-day'>
                <div className="weak-days">
                  <span className={times?.length !== 0 && times?.find(item => Object.keys(item)[0] === "thursday" && item.everday !== true) ? 'opened' :
                    // times && times?.find(item => Object.keys(item)[0] === "thursday") ? 'opened' :
                    _thursday && _thursday === true ? 'opened' : 'closed'}
                    onClick={() => { _setThursday(_thursday === false ? true : false); unSelect(_thursday === false ? true : false, "thursday") }}
                  >{t("t")}</span>
                </div>
                <div className="timming">
                  <input type='time' name='thursday'
                    defaultValue={times && times?.find(item => Object.keys(item)[0] === "thursday" && item.everday !== true)?.thursday?.open}
                    disabled={_thursday && _thursday === true ? false : true}
                    onChange={(e) => { setOpenTime(e.target.value.hasOwnProperty('value')!==''&&{ key: "thursday", value: e.target.value }) }}
                  />
                  <span>-</span>
                  <input type='time' name='thursday'
                    defaultValue={times && times?.find(item => Object.keys(item)[0] === "thursday" && item.everday !== true)?.thursday?.close}
                    disabled={_thursday && _thursday === true ? false : true}
                    onChange={(e) => { setCloseTime(e.target.value.hasOwnProperty('value')!==''&&{ key: "thursday", value: e.target.value }) }}
                  />
                </div>
              </div>
              <div className='each-day'>
                <div className="weak-days">
                  <span className={times?.length !== 0 && times?.find(item => Object.keys(item)[0] === "friday" && item.everday !== true) ? 'opened' :
                    // times && times?.find(item => Object.keys(item)[0] === "friday") ? 'opened' :
                    _friday && _friday === true ? 'opened' : 'closed'}
                    onClick={() => { _setFriday(_friday === false ? true : false); unSelect(_friday === false ? true : false, "friday") }}
                  >{t("f")}</span>
                </div>
                <div className="timming">
                  <input type='time' name='friday'
                    defaultValue={times && times?.find(item => Object.keys(item)[0] === "friday" && item.everday !== true)?.friday?.open}
                    disabled={_friday && _friday === true ? false : true}
                    onChange={(e) => { setOpenTime(e.target.value.hasOwnProperty('value')!==''&&{ key: "friday", value: e.target.value }) }}
                  />
                  <span>-</span>
                  <input type='time' name='friday'
                    defaultValue={times && times?.find(item => Object.keys(item)[0] === "friday" && item.everday !== true)?.friday?.close}
                    disabled={_friday && _friday === true ? false : true}
                    onChange={(e) => { setCloseTime(e.target.value.hasOwnProperty('value')!==''&&{ key: "friday", value: e.target.value }) }}
                  />
                </div>
              </div>
              <div className='each-day'>
                <div className="weak-days">
                  <span className={times?.length !== 0 && times?.find(item => Object.keys(item)[0] === "saturday" && item.everday !== true) ? 'opened' :
                    // times && times?.find(item => Object.keys(item)[0] === "saturday") ? 'opened' :
                    _saturday && _saturday === true ? 'opened' : 'closed'}
                    onClick={() => { _setSaturday(_saturday === false ? true : false); unSelect(_saturday === false ? true : false, "saturday") }}
                  >{t("s")}</span>
                </div>
                <div className="timming">
                  <input type='time' name='saturday'
                    defaultValue={times && times?.find(item => Object.keys(item)[0] === "saturday" && item.everday !== true)?.saturday?.open}
                    disabled={_saturday && _saturday === true ? false : true}
                    onChange={(e) => { setOpenTime(e.target.value.hasOwnProperty('value')!==''&&{ key: "saturday", value: e.target.value }) }}
                  />
                  <span>-</span>
                  <input type='time' name='saturday'
                    defaultValue={times && times?.find(item => Object.keys(item)[0] === "saturday" && item.everday !== true)?.saturday?.close}
                    disabled={_saturday && _saturday === true ? false : true}
                    onChange={(e) => { setCloseTime(e.target.value.hasOwnProperty('value')!==''&&{ key: "saturday", value: e.target.value }) }}

                  />
                </div>
              </div>
              <div className='each-day'>
                <div className="weak-days">
                  <span className={times?.length !== 0 && times?.find(item => Object.keys(item)[0] === "sunday" && item.everday !== true) ? 'opened' :
                    // times && times?.find(item => Object.keys(item)[0] === "sunday") ? 'opened' :
                    _sunday && _sunday === true ? 'opened' : 'closed'}
                    onClick={() => { _setSunday(_sunday === false ? true : false); unSelect(_sunday === false ? true : false, "sunday") }}
                  >{t("s")}</span>
                </div>
                <div className="timming">
                  <input type='time' name='sunday'
                    defaultValue={times && times?.find(item => Object.keys(item)[0] === "sunday" && item.everday !== true)?.sunday?.open}
                    // onChange={(e)=>{setOpen("sunday",e.target.value)}}
                    disabled={_sunday && _sunday === true ? false : true}
                    onChange={(e) => { setOpenTime(e.target.value.hasOwnProperty('value')!==''&&{ key: "sunday", value: e.target.value }) }}
                  />
                  <span>-</span>
                  <input type='time' name='sunday'
                    defaultValue={times && times?.find(item => Object.keys(item)[0] === "sunday" && item.everday !== true)?.sunday?.close}
                    // onChange={(e)=>{setClose("sunday",e.target.value)}}
                    disabled={_sunday && _sunday === true ? false : true}
                    onChange={(e) => { setCloseTime(e.target.value.hasOwnProperty('value')!==''&&{ key: "sunday", value: e.target.value }) }}
                  />
                </div>
              </div>
            </div>
            {/* <div>
         <h6>{t("social_media_accounts")}<small>{t("add_more")}</small></h6>

         <div className="account_boxes">http://localhost:3000/setup-account
         <span>x</span>
         </div>
         <div className="account_boxes">http://localhost:3000/setup-account
         <span>x</span>
         </div>
         </div> */}
            <button className='save_btn' onClick={timeManagement}>{t("save")}</button>
          </div>

          <div className='setup_your_account_column setup_your_account_column3'>
            <h6 className='adMore' onClick={openPopup}>{t("add_menu")}<small>{t("add_more")}</small></h6>
            {menuList && menuList.map((obj, i) => {
              return <div className="menu_frame1" key={i}>
                <h6 > {obj?.itemName}<span className='spn'>({obj?.type})</span> <small>Rs.{obj?.price}
                  {/* <span>x</span> */}
                </small></h6>
                <span>{obj.ingrediants} ...</span>
              </div>
            })}

            {
              user && user?.menu?.map((obj, i) => {
                return <div className="menu_frame1" key={i}>

                  <h6>
                    <span style={{border:"1px solid #63a44c",borderRadius:"50%",padding:".8%",boxSizing:"border-box",right:"2.5%"}} onClick={(e) => { removeMenuItems(obj?._id, user?._id) }} className="position-absolute top-0 spn">x</span>
                    
                    {obj?.itemName}<span className='spn'>({obj?.type})</span> <br /><small>Rs.{obj?.price}
                      &nbsp;<BsPencil onClick={() => handleOpenEditMenu(obj?._id, user?._id)} />

                    </small></h6>

                  <span>{obj?.ingrediants?.slice(0, 20)} ...</span>
                </div>
              })}

            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              open={openEditMenu}
              onClose={handleCloseEditMenu}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={openEditMenu}>
                <Box sx={style}>
                  <div className="">

                    <div className="menu_container">
                      <span className='cross_menu' onClick={handleCloseEditMenu}>x</span>
                      <h3>{t("Edit Menu")}</h3>

                      <p>{t("item_name")}</p>
                      <input defaultValue={editData[0]?.itemName} className='itemName' onChange={(e) => setItemName(e.target.value)} placeholder='Salad' />
                      <p>{t("ingredients")}</p>
                      <input defaultValue={editData[0]?.ingrediants} className='ingrediants' onChange={(e) => setIngrediants(e.target.value)} placeholder='Carrot, Apple' />
                      <p>{t("type")}</p>
                      <input defaultValue={editData[0]?.type} className='typeS' onChange={(e) => setType(e.target.value)} placeholder='Starter' />
                      <p>{t("price")}</p>
                      <input defaultValue={editData[0]?.price} className='priceM' type="number" onChange={(e) => setPrice(e.target.value)} placeholder='100 Rs.' />
                      <p>Item Image {editData[0]?.itemImage ? <img src={editData[0]?.itemImage} width="50" alt="imgitem" /> : null}</p>

                      <input
                        className='ItemImage form-control'
                        onChange={(e) => setImage(e.target.files[0])}
                        type="file"
                        id="formFile"
                        accept="image/png, image/jpeg, image/jpg" />
                      <button onClick={() => editMenu(editData[0]?._id, user?._id)} className='btn w-100 mt-2 btn-success save_btn'>{t("Update")}</button>

                    </div>
                  </div>
                </Box>
              </Fade>
            </Modal>
            <div className="menu_frame2" onClick={openPopup}><p>{t("add_menu_item")}</p></div>
            {/* <button onClick={saveMenu} className='save_btn'>{t("save")}</button> */}
          </div>

        </div>
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
            <input className='priceM' type="number" onChange={(e) => setPrice(e.target.value)} placeholder='100 Rs.' />
            <p>Item Image</p>
            <input
              className='ItemImage form-control py-1'
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              id="formFile"
              accept="image/png, image/jpeg, image/jpg" />
            <button className='btn w-100 mt-3 btn-success save_btn' onClick={addMenuItems}>{t("add")}</button>

          </div>
        </div>
      </div>
      <FormsFooter />
    </div>
  )
}

export default SetupAccount
