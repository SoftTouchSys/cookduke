import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom"
import axiosInstance from '../../helper/axios';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux'
import { connect } from "react-redux";
import { AddCart } from '../../Actions/cartActions';

const FeedMenu = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [sideMenu, setSideMenu] = useState('')

  useEffect(() => {
    axiosInstance.get('/feedMenu').then((res) => {
      setSideMenu(res.data)
    })
  }, [])

  const notify = () => toast.success('Item added to cart.', {
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

  return (
    <div className='feed_banner_scroll_right'>
      <Toaster position="top-right" containerStyle={{ top: 70 }} />
      {sideMenu && sideMenu?.slice(0, 10)?.map((obj, i) => {
        return <div className='feed_banner_scroll_right_items' key={i}>
          <div className='feed_banner_right_items_info'>
            <h3>{t("order_meal")}</h3>
            <Link to={`/orderMeal/${obj?._id}`}> <h6>{t("see_all")}</h6></Link>
          </div>
          <div className='feed_banner_right_items_profile'>
            <img className='feed_banner_left_header_image' src={obj?.profilePicture || "https://colegioclassea.com.br/wp-content/themes/PageLand/assets/img/avatar/avatar.jpg"} />
            <div className='feed_banner_left_header_content'>
              <Link to={`/profile/${obj?._id}`}><h1>{obj?.role === "restaurant" ? obj?.restaurantName ? obj?.restaurantName : obj?.firstName + ' ' + obj?.lastName : obj?.firstName + ' ' + obj?.lastName}</h1></Link>
              <p style={{ color: "#FFF3E0" }}>hey</p>
            </div>
          </div>

          {
            obj?.menu && [obj?.menu[obj?.menu?.length - 1]]?.map((item, i) => {
              return <div key={i} style={{ width: "100%", wordWrap: "break-word" }}>
                <div className='feed_banner_right_header_image'>
                  <img src={item?.itemImage || 'data:image/jpeg;base64,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'} />
                </div>
                <div style={{ wordWrap: "break-word" }}>
                  <h1 className='feed_banner_right_header_heading'>{item?.itemName}</h1>
                  <p style={{ width: "100%", wordWrap: "break-word" }} className='feed_banner_right_header_para'>{item?.ingrediants}</p>
                </div>
                <div style={{ cursor: "pointer" }} className='feed_banner_right_header_cart' onClick={() => {
                  localStorage.setItem('vendor', obj?._id)
                  if (localStorage.getItem("vendor") === null || JSON.parse(localStorage.getItem("localCart"))?.vendor === "" || localStorage.getItem("vendor") === JSON.parse(localStorage.getItem("localCart")).vendor) {
                    notify();
                    dispatch(AddCart(item, obj?._id));
                  } else {
                    toast.error('To order from another place, please clear the previose cart.', {
                      style: {
                        border: '1px solid #63A44C',
                        padding: '16px',
                        color: '#63A44C',
                      },
                      iconTheme: {
                        primary: 'red',
                        secondary: '#fff3e0',
                      },
                    })
                  };
                }}>
                  <div className='feed_banner_right_header_cart1'>Rs. {item?.price}</div>
                  <div className='feed_banner_right_header_cart2'>{t("add_to_cart")}</div>
                </div>
              </div>
            })}

        </div>
      })}

    </div>
  )
}
const mapStateToProps = state => {
  return {
    _products: state._todoProduct,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    // actFetchProductsRequest:()=>dispatch(actFetchProductsRequest()),
    AddCart: item => dispatch(AddCart(item))

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedMenu)