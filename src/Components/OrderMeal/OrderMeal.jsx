import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import './OrderMeal.css'
import NavBar from "../NavBar/Navbar"
import FeedSidebar from "../Feed/FeedSidebar"
import { BiSearch } from "react-icons/bi";
import CircularProgress from "../NavBar/Loader"
import { connect } from "react-redux";

import { getProfileDetails } from '../../Actions/userActions';
import { AddCart } from '../../Actions/cartActions';
import toast, { Toaster } from 'react-hot-toast';


const OrderMeal = () => {
  const { t } = useTranslation()

  const dispatch = useDispatch()
  const location = useLocation();

  const profileDetails = useSelector((state) => state.profileDetails);
  const { profile, loading } = profileDetails;
  const [deleteTrue,setDeleteTrue]=useState(false)
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('userInfo'))?.token
    if (!token) {
      window.location = '/';
    }

    dispatch(
      getProfileDetails(
        location?.pathname?.split("/")[2] && location?.pathname?.split("/")[2], 1
      )
    );
    setVendor(location?.pathname?.split("/")[2] && location?.pathname?.split("/")[2])

  }, [])

  const [items, setItems] = useState('')
  const [vendor, setVendor] = useState(location?.pathname?.split("/")[2] && location?.pathname?.split("/")[2])

  const addItemToCart = (item) => {
    setItems([...items, item])
  }
  // useEffect(()=>{
  //   // dispatch(AddCart(items))
  // },[items])

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
    <div className='main_ordermeal'>

      <NavBar />
      <FeedSidebar />
      <div className='ordermeal_container'>
        <div className='orders_container'>

          {/* <div className='orders_header_search'>
            <BiSearch className='orders_header_search_icon' />
            <input placeholder='Search Meal' />
          </div> */}
          <div className='ordermeal_main'>

            {profile?.user?.menu?.length > 0 ?
              profile?.user?.menu?.map((obj, i) => {
                return <div key={i} className='ordermeal_main_chef'>
                  <div><img src={obj?.itemImage || "data:image/jpeg;base64,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"} /></div>
                  <h1>{obj?.itemName}</h1>
                  <p>{obj?.ingrediants}</p>
                  <button onClick={() => {
                    localStorage.setItem('vendor', vendor)
                    if (localStorage.getItem("vendor") === null || JSON.parse(localStorage.getItem("localCart"))?.vendor === "" || localStorage.getItem("vendor") === JSON.parse(localStorage.getItem("localCart")).vendor) {
                      notify();
                      dispatch(AddCart(obj, vendor));
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
                    <div>PKR {obj?.price}</div>
                    <div >Add to Cart</div>
                  </button>
                </div>
              })
              : <p className='text-center m-4'>Menu Not Available yet</p>}
            <Toaster position="top-right" containerStyle={{ top: 70 }} />
          </div>

        </div>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(OrderMeal) 