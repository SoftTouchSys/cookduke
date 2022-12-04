import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import queryString from "query-string"
import { BsCheck2 } from "react-icons/bs";
import { Container } from 'react-bootstrap';
import FormsNavbar from './FormsNavbar';
import FormsFooter from './FormsFooter';
import { GiForkKnifeSpoon } from "react-icons/gi";
import { SiCodechef } from "react-icons/si";
import { FaUser } from "react-icons/fa";
import { GoogleRegister, register, resendEmail, emailExist } from "../../Actions/userActions"
import { GoogleLogin } from '@react-oauth/google';

import 'bootstrap/dist/css/bootstrap.css'; // or include from a CDN
import 'react-bootstrap-country-select/dist/react-bootstrap-country-select.css';
import CountrySelect from 'react-bootstrap-country-select';

import {
  Link, useNavigate, useLocation,
} from "react-router-dom";
import { useTranslation } from 'react-i18next';


const SignUp = () => {

  const dispatch = useDispatch()
  const location = useLocation()
  const { t } = useTranslation()
  const navigate = useNavigate()


  const userLogin = useSelector((state) => state.userLogin)

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')

  const [address, setAddress] = useState("")

  const [country, setCountry] = useState(null)
  const [city, setCity] = useState('')
  const [street, setStreet] = useState('')
  const [houseNo, setHouseNo] = useState('')
  const [postCode, setPostCode] = useState('')
  const [role, setRole] = useState('')
  const [terms, setTerms] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [newMessage, setMessage] = useState('')
  const [newError, setError] = useState('')


  const userRegister = useSelector((state) => state.userRegister)
  console.log(userRegister)
  const { error, message } = userRegister
  const userResendEmail = useSelector((state) => state.userResendEmail)
  const rmessage = userResendEmail.message



  const selectAcc = (e, type) => {
    setRole(type)
    var list = document.querySelectorAll(".Account-Type")
    for (var i = 0; i <= list.length - 1; i++) {
      list[i].classList.remove("active")
    }
    if (e.target.classList !== "Account-Type" && e.target.parentElement.classList === "Account-Type") {
      e.target.parentElement.classList.add('active')
    } else if (e.target.classList !== "Account-Type" && e.target.parentElement.parentElement.classList === "Account-Type") {
      e.target.parentElement.parentElement.classList.add('active')
    } else {
      e.target.classList.add('active')
    }

    var acc = document.querySelector(".select_account")
    acc.style.display = "none"
    var cont1 = document.querySelector(".signup_container1")
    cont1.style.display = "block"

  }

  const confirmInfo = (e) => {
    e.preventDefault()
    if (firstName === "" || lastName === "" || address === "") {
      setMessage("Please fill required fields")
    } else {
      dispatch(register(firstName, lastName, phone, country?.name, city, street, houseNo, role, email, password,address))
    }
  }

  const responseGoogle = (response) => {
    let tokenId = response.credential;
    dispatch(GoogleRegister(tokenId, role))
  }

  const errorGoogle = (response) => {

  }

  useEffect(() => {
    if (userLogin?.userInfo?.token) {
      navigate('/')
    }
  }, [userLogin])


  useEffect(() => {
    setMessage("")
    setTimeout(function () { setError("") }, 0);
    var main = document.querySelector(".select_account")
    main.style.display = "flex"
    var cont1 = document.querySelector(".signup_container1")
    cont1.style.display = "none"

    var cont2 = document.querySelector(".signup_container2")
    cont2.style.display = "none"
  }, [])

  useEffect(() => {
    setError(error)
    setTimeout(function () { setError("") }, 2000);

    if (error === "User already registered") {
      
      var cont1 = document.querySelector(".signup_container1")
      cont1.style.display = "flex"

      var cont2 = document.querySelector(".signup_container2")
      cont2.style.display = "none"

      var main = document.querySelector(".select_account")
      main.style.display = "none"
    }

  }, [error])



  useEffect(() => {
    if (message === "Registered Successfully!, email link sent successfully") {
      setMessage(message)
    } else if (message === "Login Successfull") {
      setMessage(message)
    } else if (message === "User already registered") {
      setMessage(message)
    } else if (message === "no user exist") {
      var cont1 = document.querySelector(".signup_container1")
      cont1.style.display = "none"
      var main = document.querySelector(".select_account")
      main.style.display = "none"
      var cont2 = document.querySelector(".signup_container2")
      cont2.style.display = "block"
      setMessage("")
    }
  }, [message])


  // -----------------------------------
  const userRegisterHandler = (e) => {

    e.preventDefault()
    if (email === "" || password === "" || confirmPassword === "") {
      setMessage("Please fill all the fields")
    } else if (!email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
      setMessage('Email is Invalid')
    } else if (password.length < 6) {
      setMessage('password length is less than 6')
    }
    else if (password !== confirmPassword) {
      setMessage("Password doesn't match")
    }
    else if (terms !== true) {
      setMessage("Please accept the terms and conditions.")
    }
    else {
      dispatch(emailExist(email))
      setMessage("")
      setError("")
    }
  }

  useEffect(() => {
    if (rmessage === "email link sent successfully") {
      setMessage("")
    } else {
      setMessage(rmessage)
    }

  }, [rmessage])


  const usrResendEmail = () => {
    const { id } = queryString.parse(location.search)
    if (id) {
      dispatch(resendEmail(id))
    }
  }
  const [dataOptions, setDataOptions] = useState('')


  const searchAddress = (val) => {
    var xmlhttp = new XMLHttpRequest();
    var url = "https://nominatim.openstreetmap.org/search?format=json&limit=3&q=" + val;
    xmlhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        var myArr = JSON.parse(this.responseText);
        setDataOptions(myArr);
      }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
  }
  const [tempVal, setTempVal] = useState('')
  const onInp = (obj) => {
    setAddress(obj)
    setDataOptions('')
    document.querySelector('#addr').value = ""
  }

  return (
    <>
      <FormsNavbar />
      {/* --------------------------- */}
      <Container className='main_signup'>
        <div className="select_account">
          <div className="check_your_email">
            <h3>{t("select_account_type")}</h3>
            <div className="select_account_boxes">
              <div className="Account-Type" onClick={(e) => { selectAcc(e, "restaurant") }}>
                <GiForkKnifeSpoon />
                <h4>{t("restaurant")}</h4>
              </div>
              <div className="Account-Type" onClick={(e) => { selectAcc(e, "chef") }}>
                <SiCodechef />
                <h4>{t("chef")}</h4>
              </div>
              <div className="Account-Type" onClick={(e) => { selectAcc(e, "user") }}>
                <FaUser />
                <h4>{t("user")}</h4>
              </div>
            </div>
          </div>
        </div>

        {/* -------------------------- */}

        <div className='signup_container signup_container1'>
          <div className='signup_container_header'>
            <h3 className="Register-with">{t("register_with")}</h3>
            <div className="Rectangle">
              <GoogleLogin
                onSuccess={responseGoogle}
                onError={errorGoogle}
                buttonText="Login"
                useOneTap
              />
            </div>
            <span className="or mb-2">{t("or")}</span>
          </div>
          {newError && <div className="error">{newError}</div>}
          {newMessage && <div className="message">{newMessage}</div>}
          <form className='signup_container_footer' onSubmit={userRegisterHandler}>
            <div className='signup_inputs'>
              <input placeholder='Email' type="email" onChange={(e) => setEmail(e.target.value)} />
              <input placeholder='Password' type="password" onChange={(e) => setPassword(e.target.value)} />
              <input placeholder='Confirm Password' type="password" onChange={(e) => setConfirmPassword(e.target.value)} />
            </div>
            <div className='signup_terms mt-4'>

              <div className='signup_terms_main'>
                <input
                  classname="geekmark signup_terms_main"
                  type="checkbox" name="terms"
                  id="terms" onChange={(e) => setTerms(terms === true ? false : terms === false ? true : "")} />
                <label for="terms" className="mt-2 signup_terms_text2 signup_terms_text1">&nbsp;{t("i_aggree_the")} &nbsp;<Link target="_blank" to="/privacy-policy"><b style={{ color: "black" }}>{t("terms_and_conditions")}</b></Link></label>

              </div>

            </div>
            <button type="submit"><span>{t("sign_up")}</span></button>
            <div className='signup_text'>
              <span className="signup_text_Ques">{t("already_have_an_account")}</span>
              <Link className="signup_text_login" to="/login">{t("login")}</Link>
            </div>
          </form>
        </div>

        <div className='signup_container signup_container2'>
          <div className='' style={{ "margin-bottom": "20px" }}>
            <h3 className="Register-with">{t("setup_your_account")}</h3>
          </div>
          {newMessage && <div className="message">{newMessage}</div>}
          {newError && <div className="message">{newError}</div>}
          <form className='signup_container_footer' onSubmit={confirmInfo}>
            <div className='signup_inputs_setup'>
              <input placeholder='First Name *' type="text" onChange={(e) => setFirstName(e.target.value)} />
              <input placeholder='Last Name *' type="text" onChange={(e) => setLastName(e.target.value)} />
              <input placeholder='Phone' type="number" onChange={(e) => setPhone(e.target.value)} />

              <input onChange={(e) => searchAddress(e.target.value)} list="address" name="addr" id="addr" placeholder={address ? address?.display_name : 'Type to search address'} />
              {dataOptions.length > 0 ? <ul style={{ top: "85px", overflow: "scroll", height: "auto", boxSizing: "border-box" }} class=" list-group rounded w-100 position-absolute">
                {dataOptions.length > 0 ? dataOptions.map((obj, i) => {
                  return <li onClick={() => onInp(obj)} class="list-group-item" >
                    {obj?.display_name}
                  </li>
                }) : <li class="list-group-item">no record</li>}
              </ul> : null}

              {/* <CountrySelect 
            className='country_input'
            placeholder='Country *'
           value={country}
           onChange={setCountry}
           /> */}

              {/* <input placeholder='City' type="text" onChange={(e) => setCity(e.target.value)}/>
            <input placeholder='Street' type="text" onChange={(e) => setStreet(e.target.value)}/>
            <input placeholder='House No.' type="text" onChange={(e) => setHouseNo(e.target.value)}/>
            <input placeholder='Post Code' type="text" onChange={(e) => setPostCode(e.target.value)}/> */}
            </div>

            <button type="submit" ><span>{t("submit")}</span></button>
          </form>
        </div>
        {/* ---------------------------- */}
        <div className="signup_container3">
          <div className="checkmail_box">
            <div className="check_your_email check_your_email2">
              <h3>{t("check_your_email")}</h3>
              <p>
                {message && message}

              </p>
              {newMessage && <div className="message">{newMessage}</div>}
              <button onClick={usrResendEmail}>{t("resend")}</button>
            </div>

          </div>
        </div>
      </Container>
      <FormsFooter />
    </>
  )
}

export default SignUp