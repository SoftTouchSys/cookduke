import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import NavBar from "../NavBar/Navbar";
import FeedSidebar from "../Feed/FeedSidebar";
import Menu from "../Menu/Menu";
import CircularProgress from "../NavBar/Loader";

import "./ChefRestaurantProfile.css";

import { TbBellMinus, TbDots } from "react-icons/tb";
import { BiChat, BiEdit } from "react-icons/bi";
import { FiLoader } from "react-icons/fi";
import {

  BsInstagram,
  BsTwitter,

} from "react-icons/bs";
import {
  AiFillYoutube,
  AiOutlineHeart,
  AiFillHeart,
} from "react-icons/ai";
import { GiCookingPot } from "react-icons/gi";
import { FaFacebookF } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { MdError, MdLocationPin, MdAccessTimeFilled } from "react-icons/md";
import {
  getProfileDetails,
  userSubscribing,
  getMyProfile,
} from "../../Actions/userActions";
import { Link } from "react-router-dom";
import {
  getAllPhotos,
  getAllVideos,
} from "../../Actions/postActions";

import moment from "moment";
import { socketNode } from "../../socket";
import Table from "react-bootstrap/Table";
import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";

import ReactPlayer from "react-player";
import FeedPost from "../Feed/FeedPost";

import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axiosInstance from "../../helper/axios";


const ChefRestaurantProfile = () => {


  const { t } = useTranslation();
  const dispatch = useDispatch();
  const location = useLocation();

  const profileDetails = useSelector((state) => state.profileDetails);
  const { profile, subscriber, user, posts, page, totalPostCount, loading } = profileDetails;



  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const subscribersList = useSelector((state) => state.subscribersList);
  const { subscribers } = subscribersList;


  const [subBtnLoading, setSubBtnLoading] = useState(false)
  const [pageDataLoading, setPageDataLoading] = useState(false)

  const myProfileData = useSelector((state) => state.myProfileData);
  const { myProfile } = myProfileData;

  const singlePost = useSelector((state) => state.singlePost);
  const comLoader = singlePost?.loading;

  const allPhotos = useSelector((state) => state.allPhotos);
  const allVideos = useSelector((state) => state.allVideos);
  console.log(allVideos,'allVideos3')


  const [subscriber_, setSubscriber_] = useState('');

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const openPopup = () => {
    var pop = document.querySelector(".menu_popup");
    pop.style.display = "flex";
  };

  const token = JSON.parse(localStorage.getItem("userInfo"))?.token;
  if (!token) {
    window.location = "/";
  }

  useEffect(() => {

    dispatch(
      getProfileDetails(
        location?.pathname?.split("/")[2] && location?.pathname?.split("/")[2], Number(1)
      )
    );
  }, [profile])

  useEffect(() => {
    setPageDataLoading(true)
  }, [location])

  useEffect(() => {

    dispatch(getMyProfile());
    dispatch(
      getAllPhotos(
        location?.pathname?.split("/")[2] && location?.pathname?.split("/")[2], Number(1)
      )
    );
    dispatch(
      getAllVideos(
        location?.pathname?.split("/")[2] && location?.pathname?.split("/")[2]
      )
    );
    // setSubscriber(myProfile?.user?.subscribing);

  }, []);



  const subscribeNow = () => {

    setSubBtnLoading(true)

    dispatch(userSubscribing(user?._id));
    if (subscriber) {
      socketNode.emit("unsubscribe", { id: user?._id });
    } else {
      socketNode.emit("subscribe", { id: user?._id });
    }

    dispatch(
      getProfileDetails(
        location?.pathname?.split("/")[2], 1
      )
    );

    setTimeout(() => {
      // Assume success here
      setSubBtnLoading(false)
    }, 3000);
  };


  useEffect(() => {
    setSubscriber_(subscribers?.subscribersCounts[0]?.subscribingArray[0]);
  }, [subscriber]);
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    console.log(newValue, 'value')
    setValue(newValue);
  };



  const [bookTime, setBookTime] = useState('')
  const [guest, setGuest] = useState('')
  const [bookDate, setBookDate] = useState('')

  const bookNow = () => {
    var data = {
      restaurant: location?.pathname?.split("/")[2] && location?.pathname?.split("/")[2],
      bookDate,
      guest: parseInt(guest),
      bookTime
    }
    axiosInstance.post('reserve-table', data)
    alert('request submited')
    handleClose()
  }


  const [favourite, setFavourite] = useState('')

  const addFav = (id) => {
    axiosInstance.post(`/favourite/${id}`).then((res) => {
      setFavourite(res.data.message)
    })
  }

  // useEffect(()=>{
  //   axiosInstance.get('/favourite').then((res)=>{
  //     setFavourite(res.data)
  //   })
  // },[favourite])

  setTimeout(() => {
    // Assume success here
    setPageDataLoading(false)
  }, 3000);

  return (
    <div className="main_chefprofile">
      <NavBar />
      <FeedSidebar />
      <div className="chefprofile_container">
        {pageDataLoading && pageDataLoading === true ? (
          <CircularProgress />
        ) : (
          <div className="chefprofile_container_main">
            <div className="chefprofile_container_header">
              <img
                src={
                  profile?.user && profile?.user?.coverPicture
                    ? profile?.user?.coverPicture
                    : "http://townsquare.media/site/555/files/2013/01/PopeUnderHatbigger.jpg"
                }
              />
            </div>

            <div className="chefprofile_container_profile">
              <div className="chefprofile_container_profile_image">
                <img
                  src={
                    profile?.user && profile?.user?.profilePicture
                      ? profile?.user?.profilePicture
                      : "https://w7.pngwing.com/pngs/754/2/png-transparent-samsung-galaxy-a8-a8-user-login-telephone-avatar-pawn-blue-angle-sphere-thumbnail.png"
                  }
                />
              </div>
              <div className="chefprofile_container_profile_left">
                <h3>
                  {" "}
                  {profile?.user?.restaurantName
                    ? profile?.user?.restaurantName
                    : profile?.user &&
                    profile?.user?.firstName + " " + profile?.user?.lastName}
                </h3>
                <div className="chefprofile_container_profile_right">
                  {profile && profile?.user?._id === userInfo?.user?._id || profile?.user?.role === "user" ? null : (
                    <button
                      load={<div class="spinner-border" role="status">
                        <span class="sr-only">Loading...</span>
                      </div>}
                      onClick={subscribeNow}
                    >
                      {subBtnLoading ? null : <TbBellMinus />}

                      <span>
                        {subBtnLoading ?
                          <FiLoader />
                          : subscriber
                            ? "UnSubscribe"
                            : "Subscribe"}
                      </span>
                    </button>
                  )}
                  {profile?.user._id !== userInfo?.user?._id ? <Link to={`/message/${profile?.user?._id}`}> <button>
                    <BiChat />
                    <span>Messages</span>
                  </button>
                  </Link> : null}
                  {profile?.user && profile?.user?.role === "restaurant" ? (
                    profile?.user?._id !== userInfo?.user?._id &&
                    <button onClick={handleShow}>
                      <GiCookingPot />
                      <span>Reservation</span>
                    </button>
                  ) : null}
                </div>
              </div>
            </div>

            {profile?.user?.role !== "user" ? <div className="chefprofile_navbar">
              <Box
                className="tabs_box"
                sx={{ width: "100%", height: "100%", typography: "body1" }}
              >
                <TabContext value={value}>
                  <Box>
                    <TabList
                      className="profile_banner_tabs"
                      onChange={handleChange}
                      aria-label="lab API tabs example"
                    >
                      <Tab
                        iconPosition="start"
                        className="profile_banner_tab"
                        label="Home"
                        value="1"
                      />
                      <Tab
                        iconPosition="start"
                        className="profile_banner_tab"
                        label="Menu"
                        value="2"
                      />
                      <Tab
                        iconPosition="start"
                        className="profile_banner_tab"
                        label="Photos"
                        value="3"
                      />
                      <Tab
                        iconPosition="start"
                        className="profile_banner_tab"
                        label="Videos"
                        value="4"
                      />
                      <Tab
                        iconPosition="start"
                        className="profile_banner_tab"
                        label="About"
                        value="5"
                      />
                    </TabList>
                  </Box>
                  <TabPanel value="1" style={{ margin: "0", padding: "0" }}>
                    {/* {loading && loading === true ? (
                      <CircularProgress />
                    ) : ( */}

                    <div className="chefprofile_scroll">
                      <FeedPost post={posts} user={profile?.user} page={page} userId={location?.pathname?.split("/")[2] && location?.pathname?.split("/")[2]} type="chefRest" count={totalPostCount} />

                      <div className="chefprofile_scroll_right">
                        <div className="feed_banner_scroll_right_items pl-0">
                          <div className="feed_banner_right_items_info">
                            <h3 onClick={() => setValue("5")}>About</h3>
                            <h6 onClick={() => setValue("5")}>{t("see_all")}</h6>
                          </div>
                          {profile?.user?.about ? <div className="feed_banner_right_items_info_div main_AboutTabs_info1">
                            <MdError className="feed_right_icon" />
                            <span>
                              {profile?.user?.about}
                            </span>
                            {/* <BiEdit className="feed_right_icon1" /> */}
                          </div> : null}

                          <div className="feed_banner_right_items_info_div">
                            <AiFillHeart className="feed_right_icon" />
                            <span>{profile?.user?.subscribing?.length} people love this</span>
                          </div>
                          {profile?.user?.address[0] !== undefined ? <div className="feed_banner_right_items_info_div">
                            <MdLocationPin className="feed_right_icon" />
                            <span>{JSON.parse(profile?.user?.address[0])?.display_name}</span>
                          </div> : null}

                          {profile?.user?.openingTime.length > 0 ?
                            <div className="feed_banner_right_items_info_div main_AboutTabs_info1">
                              <MdAccessTimeFilled className="feed_right_icon" /> <small>Timming</small> <br />
                              {profile?.user?.openingTime?.map((obj, i) => {
                                return Object.keys(obj)[0] === 'everday' ? '' :
                                    <span style={{ textTransform: "capitalize" }}>{`${Object.keys(obj)[0]} 
                               (${obj[Object.keys(obj)[0]]?.open} 
                               - ${obj[Object.keys(obj)[0]]?.close} )`}<br />
                                    </span>
                                  

                              })}

                              {/* <BiEdit className="feed_right_icon1" /> */}
                            </div> : null}

                          {/* <div className="feed_banner_right_items_info_div">
                          <AiFillYoutube className="feed_right_icon" />
                          <span>http://gaetano.name</span>
                        </div> */}
                        </div>

                        <div className="feed_banner_scroll_right_items pl-0">
                          <div className="feed_banner_right_items_info">
                            <h3 onClick={() => setValue("3")}>Photos</h3>
                            <h6 onClick={() => setValue("3")}>{t("see_all")}</h6>
                          </div>
                          {allPhotos?.photos?.length > 0 ? (
                            <div className="feed_banner_right_items_info1">
                              {allPhotos &&
                                allPhotos?.photos?.map((obj, i) => {
                                  return (
                                    <div key={i}>
                                      <img src={obj} alt={i} />
                                    </div>
                                  );
                                })}
                            </div>
                          ) : (
                            <p>no photos</p>
                          )}
                        </div>
                      </div>
                    </div>
                    {/* )} */}
                  </TabPanel>
                  <TabPanel value="2">
                    {profile?.user?._id === userInfo?.user?._id ? (
                      <div className="menuTabs_Add" onClick={openPopup}>
                        + Add Menu item
                      </div>
                    ) : null}

                    <div className="menuTabs">
                      <div className="lower">
                        {profile?.user?.menu?.length > 0 ? (
                          <Table striped>
                            <thead>
                              <tr>
                                <th>{t("no")}</th>
                                <th>{t("date_text")}</th>
                                <th>{t("image")}</th>
                                <th>{t("item")}</th>
                                <th>{t("ingredients")}</th>
                                <th>{t("price")}</th>
                                <th>{t("type")}</th>
                              </tr>
                            </thead>
                            <tbody>
                              {profile?.user?.menu
                                ?.sort(
                                  (a, b) =>
                                    new Date(b.createdAt) -
                                    new Date(a.createdAt)
                                )
                                .map((obj, i) => {
                                  return (
                                    <tr>
                                      <td>{i + 1}</td>
                                      <td>
                                        {moment(obj?.createdAt).format(
                                          "D/M/YYYY"
                                        )}
                                      </td>
                                      <td>
                                        <img
                                          className="itemOrderImage"
                                          src={obj?.itemImage}
                                          alt="orderImage"
                                        />
                                      </td>
                                      <td>{obj?.itemName}</td>
                                      <td>{obj?.ingrediants}</td>
                                      <td>Rs. {obj?.price}</td>
                                      <td>{obj?.type}</td>
                                    </tr>
                                  );
                                })}
                            </tbody>
                          </Table>
                        ) : (
                          <p>No data</p>
                        )}
                      </div>
                    </div>
                  </TabPanel>
                  <TabPanel value="3">
                    {allPhotos?.photos?.length > 0 ? (
                      <div className="photos_container">
                        {allPhotos &&
                          allPhotos?.photos?.map((obj, i) => {
                            return (
                              <div key={i} className="photos_box">
                                <img src={obj} alt={i} />
                              </div>
                            );
                          })}
                      </div>
                    ) : (
                      <p>Nothing to show</p>
                    )}
                  </TabPanel>
                  <TabPanel value="4">
                    <div className="videos_container">
                      {allVideos && allVideos?.videos?.length > 0
                       ? allVideos?.videos?.map((obj, i) => {
                         return <ReactPlayer
                          controls
                          url={obj}
                          className='videos_box'
                          width='20%'
                          height='20%'
                          config={{
                            file: {
                              attributes: {
                                controlsList: 'nodownload',
                                onContextMenu: e => e.preventDefault()
                              }
                            }
                          }}
                        />
                      }) : <p>Nothing to show</p>}
                    </div>


                  </TabPanel>
                  <TabPanel value="5">
                    <div className="main_AboutTabs">
                      <div className="main_AboutTabs_info ">
                        {profile?.user?.about ?
                          <div className="feed_banner_right_items_info_div main_AboutTabs_info1">
                            <MdError className="feed_right_icon" />
                            <span>
                              {profile?.user?.about}
                            </span>
                            {/* <BiEdit className="feed_right_icon1" /> */}
                          </div> : null}

                        <div className="feed_banner_right_items_info_div main_AboutTabs_info1">
                          <AiFillHeart className="feed_right_icon" />
                          <span>{profile?.user?.subscribing?.length} people love this</span>
                        </div>
                        {profile?.user?.address[0] !== undefined ?
                          <div className="feed_banner_right_items_info_div">
                            <MdLocationPin className="feed_right_icon" />
                            <span>{JSON.parse(profile?.user?.address[0])?.display_name}</span>
                          </div> : null}
                        {profile?.user?.openingTime.length > 0 ?
                          <div className="feed_banner_right_items_info_div main_AboutTabs_info1">
                            <MdAccessTimeFilled className="feed_right_icon" /> <small>Timming</small> <br />
                            {profile?.user?.openingTime?.map((obj, i) => {
                              return obj?.everday === false ?
                                Object.keys(obj)[0] === 'everday' ? '' :
                                  <span style={{ textTransform: "capitalize" }}>{`${Object.keys(obj)[0]} 
                               (${obj[Object.keys(obj)[0]]?.open} 
                               - ${obj[Object.keys(obj)[0]]?.close} )`}<br />
                                  </span>
                                : null

                            })}

                            {/* <BiEdit className="feed_right_icon1" /> */}
                          </div> : null}
                      </div>
                      <div className="main_AboutTabs_social">
                        {profile?.user?.socialLinks.length > 0 ?
                          profile?.user?.socialLinks.map((obj, i) => {
                            return <>{obj?.type === "facebook" ?
                              <div className="main_AboutTabs_social_main">
                                <FaFacebookF className="main_AboutTabs_social_icon" />
                                <span>{obj?.type === "facebook" && obj?.link}</span>
                              </div> : null}
                              {obj?.type === "instagram" ?
                                <div className="main_AboutTabs_social_main">
                                  <BsInstagram className="main_AboutTabs_social_icon" />
                                  <span>{obj?.type === "instagram" && obj?.link}</span>
                                </div> : null}
                              {obj?.type === "twitter" ?
                                <div className="main_AboutTabs_social_main">
                                  <BsTwitter className="main_AboutTabs_social_icon" />
                                  <span>{obj?.type === "twitter" && obj?.link}</span>
                                </div> : null}
                              {obj?.type === "youtube" ?
                                <div className="main_AboutTabs_social_main">
                                  <AiFillYoutube className="main_AboutTabs_social_icon" />
                                  <span>{obj?.type === "youtube" && obj?.link}</span>
                                  {/* <BiEdit className="feed_right_icon1" /> */}
                                </div> : null}

                            </>
                          })
                          : null}
                      </div>
                    </div>
                  </TabPanel>
                </TabContext>
              </Box>

              <div className="chefprofile_navbar_icons_main">
                {/* <div>
                <BsChatRight />
              </div> */}
                <div style={{ cursor: "pointer" }} onClick={() => addFav(profile?.user?._id)}>
                  {/* {console.log(favourite && favourite.filter((a)=>a.myfavourite._id===profile?.user?._id))} */}
                  {favourite && favourite === "favourite added" || profile && profile?.favourite === true ? <AiFillHeart style={{ color: "red" }} /> : <AiOutlineHeart />}
                </div>
                <div>
                  <TbDots />
                </div>
              </div>
              <Menu />
            </div>
              : null}
          </div>
        )}
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Reserve Table</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                autoFocus
                onChange={(e) => setBookDate(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>No. of Guests</Form.Label>
              <Form.Control
                type="number"
                placeholder="Max 10 allowed"
                autoFocus
                onChange={(e) => setGuest(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Time</Form.Label>
              <Form.Control
                type="time"
                placeholder="Max 10 allowed"
                autoFocus
                onChange={(e) => setBookTime(e.target.value)}
              />
            </Form.Group>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-success w-75" onClick={bookNow}>
            Book Now
          </button>
          <button className="btn btn-danger" onClick={handleClose}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </div >
  );
};

export default ChefRestaurantProfile;
