import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../Dashboards.css'
import Table from 'react-bootstrap/Table';

import { BsArrowRight, BsEmojiSmile } from "react-icons/bs";
import { FaImage } from "react-icons/fa";
import { AiFillVideoCamera, AiFillYoutube } from "react-icons/ai";

import NavBar from '../../NavBar/Navbar'
import RestaurantSidebar from './RestaurantSidebar';
import CreatePost from "../CreatePost"
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { getConversations } from '../../../Actions/messageAction';
import axiosInstance from '../../../helper/axios';

import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';


const RestaurantDashboard = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const [lgShow, setLgShow] = useState(false);
  const [key, setKey] = useState(0);

  const openPost = () => {
    var pop = document.querySelector(".post_popup")
    pop.style.display = "flex"
  }


  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const { conversation } = useSelector((state) => state.conversation);

  const postCreated = useSelector((state) => state.postCreated)
  const msg = postCreated?.message

  const [orderUpdate, setOrderUpdate]=useState({orderId:"",status:""})

  const [postType, setPostType] = useState("")
  const [newMessage, setMessage] = useState('')

  const [orders,setOrders]=useState('')

  useEffect(() => {
    setMessage('')
  }, [])


  useEffect(()=>{
      axiosInstance.get('/my-orders').then((res)=>{
        setOrders(res.data.myOrders)
      })
  },[orders])

  useEffect(() => {
    dispatch(getConversations(userInfo?.user?._id))
    if (msg === "post created successfully") {
      setTimeout(function () {
        setMessage(msg)
      }, 3000);
    }

  }, [conversation, msg])


  const handleUpdateStatus = ()=>{
        axiosInstance.post('/update-order',orderUpdate).then((res)=>{
        setLgShow(false)
    })
  }
  const showOrder=(id)=>{
    return <Modal
    size="lg"
    show={lgShow}
    onHide={() => setLgShow(false)}
    aria-labelledby="example-modal-sizes-title-lg"
    fullscreen={true}
  >
    <Modal.Header closeButton>
      <Modal.Title id="example-modal-sizes-title-lg">
        Order# {orders[key]?.orderNumber} || {orders[key]?.payment === "COD" ? "Cash on Delivery" : ""}
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <div style={{width: '100%', fontFamily: 'arial, "helvetica neue", helvetica, sans-serif', padding: 0, margin: 0}}>
  <div className="es-wrapper-color" style={{backgroundColor: '#EFEFEF'}}>   
    <table className="es-wrapper " width="100%" style={{msoTableLspace: '0pt', msoTableRspace: '0pt', borderCollapse: 'collapse', borderSpacing: '0px', padding: 0, margin: 0, width: '100%', height: '100%', backgroundRepeat: 'repeat', backgroundPosition: 'center top'}}>
      <tbody><tr style={{borderCollapse: 'collapse'}}>
          <td valign="top" style={{padding: 0, margin: 0}}>
            
            <table className="es-content" cellSpacing={0} cellPadding={0} align="center" style={{msoTableLspace: '0pt', msoTableRspace: '0pt', borderCollapse: 'collapse', borderSpacing: '0px', tableLayout: 'fixed !important', width: '100%'}}>
              <tbody><tr style={{borderCollapse: 'collapse'}}>
                  <td align="center" style={{padding: 0, margin: 0}}>

                    <table className="es-content-body" cellSpacing={0} cellPadding={0} bgcolor="#ffffff" align="center" style={{msoTableLspace: '0pt', msoTableRspace: '0pt', borderCollapse: 'collapse', borderSpacing: '0px', backgroundColor: '#FFFFFF', width: '700px'}}>
                      <b><h4 style={{textAlign:"center",margin: 0, WebkitTextSizeAdjust: 'none', msTextSizeAdjust: 'none', msoLineHeightRule: 'exactly', fontFamily: 'arial, "helvetica neue", helvetica, sans-serif', lineHeight: '17px', color: '#333333', fontSize: '18px',fontWeight:"bold"}}>
                        {orders[key]?.fullName}</h4>
                      </b>
                      <tbody><tr style={{borderCollapse: 'collapse'}}>
                        
                          <td align="left" style={{margin: 0, paddingTop: '20px', paddingLeft: '20px', paddingRight: '20px', paddingBottom: '30px'}}>
                            
                            <table className="es-left" cellSpacing={0} cellPadding={0} align="left" style={{msoTableLspace: '0pt', msoTableRspace: '0pt', borderCollapse: 'collapse', borderSpacing: '0px', float: 'left'}}>
                              <tbody><tr style={{borderCollapse: 'collapse'}}>
                                  <td className="es-m-p20b" align="left" style={{padding: 0, margin: 0, width: '280px'}}>
                                  
                                    <table style={{msoTableLspace: '0pt', msoTableRspace: '0pt', borderCollapse: 'separate', borderSpacing: '0px', borderColor: '#efefef', borderWidth: '0px 0px 0px 0px', borderStyle: 'solid'}} width="100%" cellSpacing={0} cellPadding={0}  role="presentation">
                                      <tbody><tr style={{borderCollapse: 'collapse'}}>
                                          <td align="left" style={{margin: 0, paddingBottom: '10px', paddingTop: '20px', paddingLeft: '20px', paddingRight: '20px'}}>
                                            <h4 style={{margin: 0, lineHeight: '120%', msoLineHeightRule: 'exactly', fontFamily: '"trebuchet ms", helvetica, sans-serif'}}>
                                              SUMMARY:</h4>
                                          </td>
                                        </tr>
                                        <tr style={{borderCollapse: 'collapse'}}>
                                          <td align="left" style={{padding: 0, margin: 0, paddingBottom: '20px', paddingLeft: '20px', paddingRight: '20px'}}>
                                            <table style={{msoTableLspace: '0pt', msoTableRspace: '0pt', borderCollapse: 'collapse', borderSpacing: '0px', width: '100%'}} className="cke_show_border" cellSpacing={1} cellPadding={1} border={0} align="left" role="presentation">
                                              <tbody>
                                                <tr style={{borderCollapse: 'collapse'}}>
                                                  <td style={{padding: 0, margin: 0}}><span style={{fontSize: '14px', lineHeight: '21px'}}>Order
                                                      Date:</span></td>
                                                  <td style={{padding: 0, margin: 0}}><span style={{fontSize: '14px', lineHeight: '21px'}}>{moment(orders[key]?.createdAt).format("MMM Do, YYYY")}</span></td>
                                                </tr>
                                                <tr style={{borderCollapse: 'collapse'}}>
                                                  <td style={{padding: 0, margin: 0}}><span style={{fontSize: '14px', lineHeight: '21px'}}>Order
                                                      Total:</span></td>
                                                  <td style={{padding: 0, margin: 0}}><span style={{fontSize: '14px', lineHeight: '21px'}}><b>Rs. {orders[key]?.orderPrice}</b></span>
                                                  </td>
                                                </tr>
                                                <tr style={{borderCollapse: 'collapse'}}>
                                                  <td style={{padding: 0, margin: 0}}><span style={{fontSize: '14px', lineHeight: '21px'}}>Order
                                                      Status:</span></td>
                                                  <td style={{padding: 0, margin: 0, color: 'crimson'}}><span style={{fontSize: '14px', lineHeight: '21px'}}>
                                                    <select defaultValue={orders[key]?.status} onChange={(e)=>setOrderUpdate({status:e.target.value,orderId:orders[key]?._id})}>
                                                       <option value="processing">Processing</option>
                                                      <option value="onDelivery">In delivery</option>
                                                      <option value="completed">Completed</option>
                                                      <option value="reject">Reject</option>
                                                    </select>
                                                    
                                                    </span>
                                                  </td>
                                                </tr>
                                              </tbody></table>                                            
                                          </td>
                                        </tr>
                                      </tbody></table>
                                  </td>
                                </tr>
                              </tbody></table>
                            <table className="es-right" cellSpacing={0} cellPadding={0} align="right" style={{msoTableLspace: '0pt', msoTableRspace: '0pt', borderCollapse: 'collapse', borderSpacing: '0px', float: 'right'}}>
                              <tbody><tr style={{borderCollapse: 'collapse'}}>
                                  <td align="left" style={{padding: 0, margin: 0, width: '280px'}}>
                                    <table style={{msoTableLspace: '0pt', msoTableRspace: '0pt', borderCollapse: 'separate', borderSpacing: '0px', borderWidth: '0px', borderStyle: 'solid', borderColor: '#efefef'}} width="100%" cellSpacing={0} cellPadding={0}  role="presentation">
                                      <tbody><tr style={{borderCollapse: 'collapse'}}>
                                          <td align="left" style={{margin: 0, paddingBottom: '10px', paddingTop: '20px', paddingLeft: '20px', paddingRight: '20px'}}>
                                            <h4 style={{margin: 0, lineHeight: '120%', msoLineHeightRule: 'exactly', fontFamily: '"trebuchet ms", helvetica, sans-serif'}}>
                                              SHIPPING ADDRESS:<br /></h4>
                                          </td>
                                        </tr>
                                        <tr style={{borderCollapse: 'collapse'}}>
                                          <td align="left" style={{padding: 0, margin: 0, paddingBottom: '20px', paddingLeft: '20px', paddingRight: '20px'}}>
                                          
                                            <p style={{margin: 0, WebkitTextSizeAdjust: 'none', msTextSizeAdjust: 'none', msoLineHeightRule: 'exactly', fontFamily: 'arial, "helvetica neue", helvetica, sans-serif', lineHeight: '21px', color: '#333333', fontSize: '14px'}}>
                                              {orders[key]?.mobile}</p>
                                            <p style={{margin: 0, WebkitTextSizeAdjust: 'none', msTextSizeAdjust: 'none', msoLineHeightRule: 'exactly', fontFamily: 'arial, "helvetica neue", helvetica, sans-serif', lineHeight: '21px', color: '#333333', fontSize: '14px'}}>
                                              {orders[key]?.address}
                                            </p>
                                            <p style={{margin: 0, WebkitTextSizeAdjust: 'none', msTextSizeAdjust: 'none', msoLineHeightRule: 'exactly', fontFamily: 'arial, "helvetica neue", helvetica, sans-serif', lineHeight: '21px', color: '#333333', fontSize: '14px'}}>
                                              {orders[key]?.area}
                                            </p>
                                          </td>
                                        </tr>
                                      </tbody></table>
                                  </td>
                                </tr>
                              </tbody></table>
                          </td>
                        </tr>
                      </tbody></table>
                  </td>
                </tr>
              </tbody></table>
            <table className="es-content" cellSpacing={0} cellPadding={0} align="center" style={{msoTableLspace: '0pt', msoTableRspace: '0pt', borderCollapse: 'collapse', borderSpacing: '0px', tableLayout: 'fixed !important', width: '100%'}}>
              <tbody><tr style={{borderCollapse: 'collapse'}}>
                  <td align="center" style={{padding: 0, margin: 0}}>
                    <table className="es-content-body" cellSpacing={0} cellPadding={0} bgcolor="#ffffff" align="center" style={{msoTableLspace: '0pt', msoTableRspace: '0pt', borderCollapse: 'collapse', borderSpacing: '0px', backgroundColor: '#FFFFFF', width: '700px'}}>
                      <tbody><tr style={{borderCollapse: 'collapse'}}>
                          <td align="left" style={{margin: 0, paddingTop: '10px', paddingBottom: '10px', paddingLeft: '20px', paddingRight: '20px'}}>
                            {/*[if mso]><table style="width:560px" cellpadding="0" cellspacing="0"><tr><td style="width:270px" valign="top"><![endif]*/}
                            <table className="es-left" cellSpacing={0} cellPadding={0} align="left" style={{msoTableLspace: '0pt', msoTableRspace: '0pt', borderCollapse: 'collapse', borderSpacing: '0px', float: 'left'}}>
                              <tbody><tr style={{borderCollapse: 'collapse'}}>
                                  <td className="es-m-p0r es-m-p20b" valign="top" align="center" style={{padding: 0, margin: 0, width: '270px'}}>
                                    <table width="100%" cellSpacing={0} cellPadding={0} role="presentation" style={{msoTableLspace: '0pt', msoTableRspace: '0pt', borderCollapse: 'collapse', borderSpacing: '0px'}}>
                                      <tbody><tr style={{borderCollapse: 'collapse'}}>
                                          <td align="left" style={{padding: 0, margin: 0, paddingLeft: '20px'}}>
                                            <h4 style={{margin: 0, lineHeight: '120%', msoLineHeightRule: 'exactly', fontFamily: '"trebuchet ms", helvetica, sans-serif'}}>
                                              ITEMS ORDERED</h4>
                                          </td>
                                        </tr>
                                      </tbody></table>
                                  </td>
                                </tr>
                              </tbody></table>
                            {/*[if mso]></td><td style="width:20px"></td><td style="width:270px" valign="top"><![endif]*/}
                            <table cellSpacing={0} cellPadding={0} align="right" style={{msoTableLspace: '0pt', msoTableRspace: '0pt', borderCollapse: 'collapse', borderSpacing: '0px'}}>
                              <tbody><tr style={{borderCollapse: 'collapse'}}>
                                  <td align="left" style={{padding: 0, margin: 0, width: '270px'}}>
                                    <table width="100%" cellSpacing={0} cellPadding={0} role="presentation" style={{msoTableLspace: '0pt', msoTableRspace: '0pt', borderCollapse: 'collapse', borderSpacing: '0px'}}>
                                      <tbody><tr style={{borderCollapse: 'collapse'}}>
                                          <td align="left" style={{padding: 0, margin: 0}}>
                                            <table style={{msoTableLspace: '0pt', msoTableRspace: '0pt', borderCollapse: 'collapse', borderSpacing: '0px', width: '100%'}} className="cke_show_border" cellSpacing={1} cellPadding={1} border={0} role="presentation">
                                              <tbody><tr style={{borderCollapse: 'collapse'}}>
                                                  <td style={{padding: 0, margin: 0}}><span style={{fontSize: '13px'}}>NAME</span>
                                                  </td>
                                                  <td style={{padding: 0, margin: 0, width: '60px', textAlign: 'center'}}>
                                                    <span style={{fontSize: '13px'}}><span style={{lineHeight: '100%'}}>QTY</span></span>
                                                  </td>
                                                  <td style={{padding: 0, margin: 0, width: '100px', textAlign: 'center'}}>
                                                    <span style={{fontSize: '13px'}}><span style={{lineHeight: '100%'}}>PRICE</span></span>
                                                  </td>
                                                </tr>
                                              </tbody></table>
                                          </td>
                                        </tr>
                                      </tbody></table>
                                  </td>
                                </tr>
                              </tbody></table>
                            {/*[if mso]></td></tr></table><![endif]*/}
                          </td>
                        </tr>
                        <tr style={{borderCollapse: 'collapse'}}>
                          <td align="left" style={{padding: 0, margin: 0, paddingLeft: '20px', paddingRight: '20px'}}>
                            <table width="100%" cellSpacing={0} cellPadding={0} style={{msoTableLspace: '0pt', msoTableRspace: '0pt', borderCollapse: 'collapse', borderSpacing: '0px'}}>
                              <tbody><tr style={{borderCollapse: 'collapse'}}>
                                  <td valign="top" align="center" style={{padding: 0, margin: 0, width: '560px'}}>
                                    <table width="100%" cellSpacing={0} cellPadding={0} role="presentation" style={{msoTableLspace: '0pt', msoTableRspace: '0pt', borderCollapse: 'collapse', borderSpacing: '0px'}}>
                                      <tbody><tr style={{borderCollapse: 'collapse'}}>
                                          <td align="center" style={{padding: 0, margin: 0, paddingBottom: '10px', fontSize: 0}}>
                                            <table width="100%" height="100%" cellSpacing={0} cellPadding={0} border={0} role="presentation" style={{msoTableLspace: '0pt', msoTableRspace: '0pt', borderCollapse: 'collapse', borderSpacing: '0px'}}>
                                              <tbody><tr style={{borderCollapse: 'collapse'}}>
                                                  <td style={{padding: 0, margin: '0px', borderBottom: '1px solid #efefef', background: '#FFFFFF none repeat scroll 0% 0%', height: '1px', width: '100%'}}>
                                                  </td>
                                                </tr>
                                              </tbody></table>
                                          </td>
                                        </tr>
                                      </tbody></table>
                                  </td>
                                </tr>
                              </tbody></table>
                          </td>
                        </tr>
                        {orders[key]?.items?.map((obj, i) => {
                        return <tr style={{borderCollapse: 'collapse'}} key={i}>
                          <td align="left" style={{margin: 0, paddingTop: '5px', paddingBottom: '10px', paddingLeft: '20px', paddingRight: '20px'}}>
                            <table className="es-left" cellSpacing={0} cellPadding={0} align="left" style={{msoTableLspace: '0pt', msoTableRspace: '0pt', borderCollapse: 'collapse', borderSpacing: '0px', float: 'left'}}>
                              <tbody><tr style={{borderCollapse: 'collapse'}}>
                                  <td className="es-m-p0r es-m-p20b" valign="top" align="center" style={{padding: 0, margin: 0, width: '178px'}}>
                                    <table width="100%" cellSpacing={0} cellPadding={0} role="presentation" style={{msoTableLspace: '0pt', msoTableRspace: '0pt', borderCollapse: 'collapse', borderSpacing: '0px'}}>
                                      <tbody><tr style={{borderCollapse: 'collapse'}}>
                                          <td align="center" style={{padding: 0, margin: 0, fontSize: 0}}><a href="#" target="_blank" style={{WebkitTextSizeAdjust: 'none', msTextSizeAdjust: 'none', msoLineHeightRule: 'exactly', textDecoration: 'underline', color: '#D48344', fontSize: '14px'}}>
                                            <img src={obj?.image} alt={obj?.name} className="adapt-img" width={125} style={{display: 'block', border: 0, outline: 'none', textDecoration: 'none', msInterpolationMode: 'bicubic'}} /></a>
                                          </td>
                                        </tr>
                                      </tbody></table>
                                  </td>
                                </tr>
                              </tbody></table>
                            <table cellSpacing={0} cellPadding={0} align="right" style={{msoTableLspace: '0pt', msoTableRspace: '0pt', borderCollapse: 'collapse', borderSpacing: '0px'}}>
                              <tbody>
                        
                                <tr style={{borderCollapse: 'collapse'}}>
                                  <td align="left" style={{padding: 0, margin: 0, width: '362px'}}>
                                    <table width="100%" cellSpacing={0} cellPadding={0} role="presentation" style={{msoTableLspace: '0pt', msoTableRspace: '0pt', borderCollapse: 'collapse', borderSpacing: '0px'}}>
                                      <tbody><tr style={{borderCollapse: 'collapse'}}>
                                          <td align="left" style={{padding: 0, margin: 0}}>
                                            <p style={{margin: 0, WebkitTextSizeAdjust: 'none', msTextSizeAdjust: 'none', msoLineHeightRule: 'exactly', fontFamily: 'arial, "helvetica neue", helvetica, sans-serif', lineHeight: '21px', color: '#333333', fontSize: '14px'}}>
                                            </p>
                                            <table style={{msoTableLspace: '0pt', msoTableRspace: '0pt', borderCollapse: 'collapse', borderSpacing: '0px', width: '100%'}} className="cke_show_border" cellSpacing={1} cellPadding={1} border={0} role="presentation">
                                              <tbody><tr style={{borderCollapse: 'collapse'}}>
                                                  <td style={{padding: 0, margin: 0}}>{obj?.name}
                                                  </td>
                                                  <td style={{padding: 0, margin: 0, width: '60px', textAlign: 'center'}}>
                                                    {obj?.quantity}</td>
                                                  <td style={{padding: 0, margin: 0, width: '100px', textAlign: 'center'}}>
                                                    Rs. {obj?.price}</td>
                                                </tr>
                                              </tbody></table>
                                            <p style={{margin: 0, WebkitTextSizeAdjust: 'none', msTextSizeAdjust: 'none', msoLineHeightRule: 'exactly', fontFamily: 'arial, "helvetica neue", helvetica, sans-serif', lineHeight: '21px', color: '#333333', fontSize: '14px'}}>
                                            </p>
                                          </td>
                                        </tr>
                                      </tbody></table>
                                  </td>
                                </tr>
                    
                              </tbody></table>
                          </td>
                        </tr>})}
                        <tr style={{borderCollapse: 'collapse'}}>
                          <td align="left" style={{padding: 0, margin: 0, paddingLeft: '20px', paddingRight: '20px'}}>
                            <table width="100%" cellSpacing={0} cellPadding={0} style={{msoTableLspace: '0pt', msoTableRspace: '0pt', borderCollapse: 'collapse', borderSpacing: '0px'}}>
                              <tbody><tr style={{borderCollapse: 'collapse'}}>
                                  <td valign="top" align="center" style={{padding: 0, margin: 0, width: '560px'}}>
                                    <table width="100%" cellSpacing={0} cellPadding={0} role="presentation" style={{msoTableLspace: '0pt', msoTableRspace: '0pt', borderCollapse: 'collapse', borderSpacing: '0px'}}>
                                      <tbody><tr style={{borderCollapse: 'collapse'}}>
                                          <td align="center" style={{padding: 0, margin: 0, paddingBottom: '10px', fontSize: 0}}>
                                            <table width="100%" height="100%" cellSpacing={0} cellPadding={0} border={0} role="presentation" style={{msoTableLspace: '0pt', msoTableRspace: '0pt', borderCollapse: 'collapse', borderSpacing: '0px'}}>
                                              <tbody><tr style={{borderCollapse: 'collapse'}}>
                                                  <td style={{padding: 0, margin: '0px', borderBottom: '1px solid #efefef', background: '#FFFFFF none repeat scroll 0% 0%', height: '1px', width: '100%'}}>
                                                  </td>
                                                </tr>
                                              </tbody></table>
                                          </td>
                                        </tr>
                                      </tbody></table>
                                  </td>
                                </tr>
                              </tbody></table>
                          </td>
                        </tr>
                        <tr style={{borderCollapse: 'collapse'}}>
                          <td align="left" style={{margin: 0, paddingTop: '5px', paddingLeft: '20px', paddingBottom: '30px', paddingRight: '40px'}}>
                            <table width="100%" cellSpacing={0} cellPadding={0} style={{msoTableLspace: '0pt', msoTableRspace: '0pt', borderCollapse: 'collapse', borderSpacing: '0px'}}>
                              <tbody><tr style={{borderCollapse: 'collapse'}}>
                                  <td valign="top" align="center" style={{padding: 0, margin: 0, width: '540px'}}>
                                    <table width="100%" cellSpacing={0} cellPadding={0} role="presentation" style={{msoTableLspace: '0pt', msoTableRspace: '0pt', borderCollapse: 'collapse', borderSpacing: '0px'}}>
                                      <tbody><tr style={{borderCollapse: 'collapse'}}>
                                          <td align="right" style={{padding: 0, margin: 0}}>
                                            <table style={{msoTableLspace: '0pt', msoTableRspace: '0pt', borderCollapse: 'collapse', borderSpacing: '0px', width: '500px'}} className="cke_show_border" cellSpacing={1} cellPadding={1} border={0} align="right" role="presentation">
                                              <tbody><tr style={{borderCollapse: 'collapse'}}>
                                                  <td style={{padding: 0, margin: 0, textAlign: 'right', fontSize: '18px', lineHeight: '27px'}}>
                                                    <strong>Delivery Charges:</strong></td>
                                                  <td style={{padding: 0, margin: 0, textAlign: 'right', fontSize: '18px', lineHeight: '27px'}}>
                                                    <strong>+ Rs. {orders[key]?.deliveryFee  || 0}</strong></td>
                                                </tr>
                                                <tr style={{borderCollapse: 'collapse'}}>
                                                  <td style={{padding: 0, margin: 0, textAlign: 'right', fontSize: '18px', lineHeight: '27px'}}>
                                                    <strong>Discount:</strong></td>
                                                  <td style={{padding: 0, margin: 0, textAlign: 'right', fontSize: '18px', lineHeight: '27px'}}>
                                                    <strong>- Rs. {orders[key]?.discount  || 0}</strong></td>
                                                </tr>
                                                <tr style={{borderCollapse: 'collapse'}}>
                                                  <td style={{padding: 0, margin: 0, textAlign: 'right', fontSize: '18px', lineHeight: '27px'}}>
                                                    <strong>exc. Tax:</strong></td>
                                                  <td style={{padding: 0, margin: 0, textAlign: 'right', fontSize: '18px', lineHeight: '27px'}}>
                                                    <strong>Rs. {orders[key]?.excTax || 0}</strong></td>
                                                </tr>
                                                <tr style={{borderCollapse: 'collapse'}}>
                                                  <td style={{padding: 0, margin: 0, textAlign: 'right', fontSize: '18px', lineHeight: '27px'}}>
                                                    <strong>Order Total:</strong></td>
                                                  <td style={{padding: 0, margin: 0, textAlign: 'right', fontSize: '18px', lineHeight: '27px', color: '#d48344'}}>
                                                    <strong>Rs. {orders[key]?.orderPrice}</strong></td>
                                                </tr>
                                              </tbody></table>
                                          </td>
                                        </tr>
                                      </tbody></table>
                                  </td>
                                </tr>
                              </tbody></table>
                          </td>
                        </tr>
                      </tbody></table>
                  </td>
                </tr>
              </tbody></table>
          </td>
        </tr>
      </tbody></table>
  </div>
</div>
    </Modal.Body>
    <Modal.Footer >
                <Button variant="success" onClick={handleUpdateStatus}>
                        Update Status
                    </Button>
                    <Button variant="danger" onClick={() => setLgShow(false)} >
                        Close
                    </Button>
        </Modal.Footer>
  </Modal>
  }


  return (
    <div className="dashboard_container">
      <NavBar />
      <RestaurantSidebar />
      <div className="chef_dash_container">
        <div className='upper'>
          <div className="social">
            {newMessage && <div className='message'>{newMessage}</div>}
            <div className="social_form">
              <div className="social_form_img"><img src={userInfo?.user?.profilePicture || "https://colegioclassea.com.br/wp-content/themes/PageLand/assets/img/avatar/avatar.jpg"} alt="img" /></div>
              <form action=""><input type="text" onClick={() => { setPostType("content"); openPost() }} placeholder="What's on your mind?" /></form>
            </div>
            <div className="social_buttons">
              <button onClick={() => { setPostType("video"); openPost() }} > <AiFillVideoCamera className='social_icons' />{t("video")}</button>
              <button onClick={() => { setPostType("photo"); openPost() }} ><FaImage className='social_icons' />{t("photo")}</button>
              <button onClick={() => { setPostType("link"); openPost() }} ><AiFillYoutube className='social_icons' />{t("youtube_link")}</button>
            </div>
          </div>
          <div className="messages">
            <h6 className='head_msg'>{t("new_messages")}<Link to="/messages"><span><BsArrowRight /></span></Link></h6>
            {conversation ? conversation?.newArr?.slice(0, 2)?.map((obj, i) => {
              return <div className="message_one">
                <img src={obj?.profilePicture || 'https://w7.pngwing.com/pngs/754/2/png-transparent-samsung-galaxy-a8-a8-user-login-telephone-avatar-pawn-blue-angle-sphere-thumbnail.png'} alt="dao-imh" />
                <div className="text">
                  <h6>{obj?.restaurantName
                    ? obj?.restaurantName
                    : obj &&
                    obj?.firstName + " " + obj?.lastName}</h6>
                  <small>{obj?.text}</small>
                </div>
                <div className="number">1</div>
              </div>

            }) : null}
          </div>
        </div>
        {/* ------- */}
        <div className="lower lower-a">
          <h6>{t("menu")}</h6>
          {/* <small>{t("date")}</small> */}
          {userInfo?.user?.menu?.length > 0 ? (
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
                {userInfo?.user?.menu
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
        {/* ----- */}
        <div className="lower lower-a">
          <h6>{t("order_list")}</h6>
          <Table striped>
            <thead>
              <tr>
                <th>{t("no")}</th>
                <th>{t("id")}</th>
                <th>{t("date_text")}</th>
                <th>{t("full_name")}</th>
                <th>{t("address")}</th>
                <th>{t("amount")}</th>
                <th>{t("status_order")}</th>
                <th>{t("action")}</th>
              </tr>
            </thead>
            <tbody>
              {orders ? orders?.map((obj,i)=>{
                return <tr key={i}>
                <td>{i+1}</td>
                <td onClick={()=>{setLgShow(true);setKey(i)}}>{obj?.orderNumber}</td>
                <td>{moment(obj?.createdAt).format(
                            "D/M/YYYY"
                          )}</td>
                <td>{obj?.fullName}</td>
                <td>{obj?.address}, {obj?.area}</td>
                <td>Rs. {obj?.orderPrice}</td>
                <td ><p className={`badge badge-${obj?.status==="processing"?"warning":obj?.status==="onDelivery"?"info":obj?.status==="completed"?"success":obj?.status==="reject"?"danger":"danger"} text-capitalize`}>
                  {obj?.status}
                  </p></td>
                <td><button className="btn" onClick={()=>{setLgShow(true);setKey(i)}}>View/Edit Status</button></td>
              </tr>
              }):<p>No data</p>}
              
            </tbody>
          </Table>
        </div>
        {/* --------- */}

      </div>
      <div className="menu_popup post_popup">
        <CreatePost postType={postType} />
      </div>
      {showOrder()}
      
    </div>
  )
}

export default RestaurantDashboard