import React, { useEffect, useState } from 'react'
import './Orders.css'
import NavBar from "../NavBar/Navbar"
import { useTranslation } from "react-i18next";
import Table from "react-bootstrap/Table";
import RestaurantSidebar from '../Dashboards/RestaurantDashboard/RestaurantSidebar';
import ChefSidebar from '../Dashboards/ChefDashboard/ChefSidebar';
import { useSelector } from 'react-redux';
import axiosInstance from '../../helper/axios';
import moment from 'moment';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import FeedSideBar from '../Feed/FeedSidebar';

const UserOrders = () => {
    const { t } = useTranslation();

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin
    const [orders, setOrders] = useState('')
    const [lgShow, setLgShow] = useState(false);
    const [key, setKey] = useState(0);
    
    

    useEffect(() => {
        axiosInstance.get('/user-orders').then((res) => {
            setOrders(res.data.myOrders)
        })
    }, [orders])


    const showOrder = (id) => {
        return <Modal
            size="lg"
            show={lgShow}
            onHide={() => setLgShow(false)}
            aria-labelledby="example-modal-sizes-title-lg"
            fullscreen={true}
        >
            <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-lg">
                    Order# {orders[key]?.orderNumber} || {orders[key]?.status}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div style={{ width: '100%', fontFamily: 'arial, "helvetica neue", helvetica, sans-serif', padding: 0, margin: 0 }}>
                    <div className="es-wrapper-color" style={{ backgroundColor: '#EFEFEF' }}>
                        <table className="es-wrapper " width="100%" style={{ msoTableLspace: '0pt', msoTableRspace: '0pt', borderCollapse: 'collapse', borderSpacing: '0px', padding: 0, margin: 0, width: '100%', height: '100%', backgroundRepeat: 'repeat', backgroundPosition: 'center top' }}>
                            <tbody><tr style={{ borderCollapse: 'collapse' }}>
                                <td valign="top" style={{ padding: 0, margin: 0 }}>

                                    <table className="es-content" cellSpacing={0} cellPadding={0} align="center" style={{ msoTableLspace: '0pt', msoTableRspace: '0pt', borderCollapse: 'collapse', borderSpacing: '0px', tableLayout: 'fixed !important', width: '100%' }}>
                                        <tbody><tr style={{ borderCollapse: 'collapse' }}>
                                            <td align="center" style={{ padding: 0, margin: 0 }}>

                                                <table className="es-content-body" cellSpacing={0} cellPadding={0} bgcolor="#ffffff" align="center" style={{ msoTableLspace: '0pt', msoTableRspace: '0pt', borderCollapse: 'collapse', borderSpacing: '0px', backgroundColor: '#FFFFFF', width: '700px' }}>
                                                    <b ><h4 style={{ textAlign: "center", margin: 0, WebkitTextSizeAdjust: 'none', msTextSizeAdjust: 'none', msoLineHeightRule: 'exactly', fontFamily: 'arial, "helvetica neue", helvetica, sans-serif', lineHeight: '17px', color: '#333333', fontSize: '18px', fontWeight: "bold" }}>
                                                        {orders[key]?.seller?.restaurantName?orders[key]?.seller?.restaurantName:orders[key]?.seller?.firstName+' '+orders[key]?.seller?.lastName}</h4></b>
                                                    <tbody><tr style={{ borderCollapse: 'collapse' }}>

                                                        <td align="left" style={{ margin: 0, paddingTop: '20px', paddingLeft: '20px', paddingRight: '20px', paddingBottom: '30px' }}>

                                                            <table className="es-left" cellSpacing={0} cellPadding={0} align="left" style={{ msoTableLspace: '0pt', msoTableRspace: '0pt', borderCollapse: 'collapse', borderSpacing: '0px', float: 'left' }}>
                                                                <tbody><tr style={{ borderCollapse: 'collapse' }}>
                                                                    <td className="es-m-p20b" align="left" style={{ padding: 0, margin: 0, width: '280px' }}>

                                                                        <table style={{ msoTableLspace: '0pt', msoTableRspace: '0pt', borderCollapse: 'separate', borderSpacing: '0px', borderColor: '#efefef', borderWidth: '0px 0px 0px 0px', borderStyle: 'solid' }} width="100%" cellSpacing={0} cellPadding={0} role="presentation">
                                                                            <tbody><tr style={{ borderCollapse: 'collapse' }}>
                                                                                <td align="left" style={{ margin: 0, paddingBottom: '10px', paddingTop: '20px', paddingLeft: '20px', paddingRight: '20px' }}>
                                                                                    <h4 style={{ margin: 0, lineHeight: '120%', msoLineHeightRule: 'exactly', fontFamily: '"trebuchet ms", helvetica, sans-serif' }}>
                                                                                        SUMMARY:</h4>
                                                                                </td>
                                                                            </tr>
                                                                                <tr style={{ borderCollapse: 'collapse' }}>
                                                                                    <td align="left" style={{ padding: 0, margin: 0, paddingBottom: '20px', paddingLeft: '20px', paddingRight: '20px' }}>
                                                                                        <table style={{ msoTableLspace: '0pt', msoTableRspace: '0pt', borderCollapse: 'collapse', borderSpacing: '0px', width: '100%' }} className="cke_show_border" cellSpacing={1} cellPadding={1} border={0} align="left" role="presentation">
                                                                                            <tbody>
                                                                                                <tr style={{ borderCollapse: 'collapse' }}>
                                                                                                    <td style={{ padding: 0, margin: 0 }}><span style={{ fontSize: '14px', lineHeight: '21px' }}>Order
                                                                                                        Date:</span></td>
                                                                                                    <td style={{ padding: 0, margin: 0 }}><span style={{ fontSize: '14px', lineHeight: '21px' }}>{moment(orders[key]?.createdAt).format("MMM Do, YYYY")}</span></td>
                                                                                                </tr>
                                                                                                <tr style={{ borderCollapse: 'collapse' }}>
                                                                                                    <td style={{ padding: 0, margin: 0 }}><span style={{ fontSize: '14px', lineHeight: '21px' }}>Order
                                                                                                        Total:</span></td>
                                                                                                    <td style={{ padding: 0, margin: 0 }}><span style={{ fontSize: '14px', lineHeight: '21px' }}><b>Rs. {orders[key]?.orderPrice}</b></span>
                                                                                                    </td>
                                                                                                </tr>
                                                                                            </tbody></table>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody></table>
                                                                    </td>
                                                                </tr>
                                                                </tbody></table>
                                                            <table className="es-right" cellSpacing={0} cellPadding={0} align="right" style={{ msoTableLspace: '0pt', msoTableRspace: '0pt', borderCollapse: 'collapse', borderSpacing: '0px', float: 'right' }}>
                                                                <tbody><tr style={{ borderCollapse: 'collapse' }}>
                                                                    <td align="left" style={{ padding: 0, margin: 0, width: '280px' }}>
                                                                        <table style={{ msoTableLspace: '0pt', msoTableRspace: '0pt', borderCollapse: 'separate', borderSpacing: '0px', borderWidth: '0px', borderStyle: 'solid', borderColor: '#efefef' }} width="100%" cellSpacing={0} cellPadding={0} role="presentation">
                                                                            <tbody><tr style={{ borderCollapse: 'collapse' }}>
                                                                                <td align="left" style={{ margin: 0, paddingBottom: '10px', paddingTop: '20px', paddingLeft: '20px', paddingRight: '20px' }}>
                                                                                    <h4 style={{ margin: 0, lineHeight: '120%', msoLineHeightRule: 'exactly', fontFamily: '"trebuchet ms", helvetica, sans-serif' }}>
                                                                                        SHIPPING ADDRESS:<br /></h4>
                                                                                </td>
                                                                            </tr>
                                                                                <tr style={{ borderCollapse: 'collapse' }}>
                                                                                    <td align="left" style={{ padding: 0, margin: 0, paddingBottom: '20px', paddingLeft: '20px', paddingRight: '20px' }}>

                                                                                        <p style={{ margin: 0, WebkitTextSizeAdjust: 'none', msTextSizeAdjust: 'none', msoLineHeightRule: 'exactly', fontFamily: 'arial, "helvetica neue", helvetica, sans-serif', lineHeight: '21px', color: '#333333', fontSize: '14px' }}>
                                                                                            {orders[key]?.mobile}</p>
                                                                                        <p style={{ margin: 0, WebkitTextSizeAdjust: 'none', msTextSizeAdjust: 'none', msoLineHeightRule: 'exactly', fontFamily: 'arial, "helvetica neue", helvetica, sans-serif', lineHeight: '21px', color: '#333333', fontSize: '14px' }}>
                                                                                            {orders[key]?.address}
                                                                                        </p>
                                                                                        <p style={{ margin: 0, WebkitTextSizeAdjust: 'none', msTextSizeAdjust: 'none', msoLineHeightRule: 'exactly', fontFamily: 'arial, "helvetica neue", helvetica, sans-serif', lineHeight: '21px', color: '#333333', fontSize: '14px' }}>
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
                                    <table className="es-content" cellSpacing={0} cellPadding={0} align="center" style={{ msoTableLspace: '0pt', msoTableRspace: '0pt', borderCollapse: 'collapse', borderSpacing: '0px', tableLayout: 'fixed !important', width: '100%' }}>
                                        <tbody><tr style={{ borderCollapse: 'collapse' }}>
                                            <td align="center" style={{ padding: 0, margin: 0 }}>
                                                <table className="es-content-body" cellSpacing={0} cellPadding={0} bgcolor="#ffffff" align="center" style={{ msoTableLspace: '0pt', msoTableRspace: '0pt', borderCollapse: 'collapse', borderSpacing: '0px', backgroundColor: '#FFFFFF', width: '700px' }}>
                                                    <tbody><tr style={{ borderCollapse: 'collapse' }}>
                                                        <td align="left" style={{ margin: 0, paddingTop: '10px', paddingBottom: '10px', paddingLeft: '20px', paddingRight: '20px' }}>
                                                            {/*[if mso]><table style="width:560px" cellpadding="0" cellspacing="0"><tr><td style="width:270px" valign="top"><![endif]*/}
                                                            <table className="es-left" cellSpacing={0} cellPadding={0} align="left" style={{ msoTableLspace: '0pt', msoTableRspace: '0pt', borderCollapse: 'collapse', borderSpacing: '0px', float: 'left' }}>
                                                                <tbody><tr style={{ borderCollapse: 'collapse' }}>
                                                                    <td className="es-m-p0r es-m-p20b" valign="top" align="center" style={{ padding: 0, margin: 0, width: '270px' }}>
                                                                        <table width="100%" cellSpacing={0} cellPadding={0} role="presentation" style={{ msoTableLspace: '0pt', msoTableRspace: '0pt', borderCollapse: 'collapse', borderSpacing: '0px' }}>
                                                                            <tbody><tr style={{ borderCollapse: 'collapse' }}>
                                                                                <td align="left" style={{ padding: 0, margin: 0, paddingLeft: '20px' }}>
                                                                                    <h4 style={{ margin: 0, lineHeight: '120%', msoLineHeightRule: 'exactly', fontFamily: '"trebuchet ms", helvetica, sans-serif' }}>
                                                                                        ITEMS ORDERED</h4>
                                                                                </td>
                                                                            </tr>
                                                                            </tbody></table>
                                                                    </td>
                                                                </tr>
                                                                </tbody></table>
                                                            {/*[if mso]></td><td style="width:20px"></td><td style="width:270px" valign="top"><![endif]*/}
                                                            <table cellSpacing={0} cellPadding={0} align="right" style={{ msoTableLspace: '0pt', msoTableRspace: '0pt', borderCollapse: 'collapse', borderSpacing: '0px' }}>
                                                                <tbody><tr style={{ borderCollapse: 'collapse' }}>
                                                                    <td align="left" style={{ padding: 0, margin: 0, width: '270px' }}>
                                                                        <table width="100%" cellSpacing={0} cellPadding={0} role="presentation" style={{ msoTableLspace: '0pt', msoTableRspace: '0pt', borderCollapse: 'collapse', borderSpacing: '0px' }}>
                                                                            <tbody><tr style={{ borderCollapse: 'collapse' }}>
                                                                                <td align="left" style={{ padding: 0, margin: 0 }}>
                                                                                    <table style={{ msoTableLspace: '0pt', msoTableRspace: '0pt', borderCollapse: 'collapse', borderSpacing: '0px', width: '100%' }} className="cke_show_border" cellSpacing={1} cellPadding={1} border={0} role="presentation">
                                                                                        <tbody><tr style={{ borderCollapse: 'collapse' }}>
                                                                                            <td style={{ padding: 0, margin: 0 }}><span style={{ fontSize: '13px' }}>NAME</span>
                                                                                            </td>
                                                                                            <td style={{ padding: 0, margin: 0, width: '60px', textAlign: 'center' }}>
                                                                                                <span style={{ fontSize: '13px' }}><span style={{ lineHeight: '100%' }}>QTY</span></span>
                                                                                            </td>
                                                                                            <td style={{ padding: 0, margin: 0, width: '100px', textAlign: 'center' }}>
                                                                                                <span style={{ fontSize: '13px' }}><span style={{ lineHeight: '100%' }}>PRICE</span></span>
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
                                                        <tr style={{ borderCollapse: 'collapse' }}>
                                                            <td align="left" style={{ padding: 0, margin: 0, paddingLeft: '20px', paddingRight: '20px' }}>
                                                                <table width="100%" cellSpacing={0} cellPadding={0} style={{ msoTableLspace: '0pt', msoTableRspace: '0pt', borderCollapse: 'collapse', borderSpacing: '0px' }}>
                                                                    <tbody><tr style={{ borderCollapse: 'collapse' }}>
                                                                        <td valign="top" align="center" style={{ padding: 0, margin: 0, width: '560px' }}>
                                                                            <table width="100%" cellSpacing={0} cellPadding={0} role="presentation" style={{ msoTableLspace: '0pt', msoTableRspace: '0pt', borderCollapse: 'collapse', borderSpacing: '0px' }}>
                                                                                <tbody><tr style={{ borderCollapse: 'collapse' }}>
                                                                                    <td align="center" style={{ padding: 0, margin: 0, paddingBottom: '10px', fontSize: 0 }}>
                                                                                        <table width="100%" height="100%" cellSpacing={0} cellPadding={0} border={0} role="presentation" style={{ msoTableLspace: '0pt', msoTableRspace: '0pt', borderCollapse: 'collapse', borderSpacing: '0px' }}>
                                                                                            <tbody><tr style={{ borderCollapse: 'collapse' }}>
                                                                                                <td style={{ padding: 0, margin: '0px', borderBottom: '1px solid #efefef', background: '#FFFFFF none repeat scroll 0% 0%', height: '1px', width: '100%' }}>
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
                                                            return <tr style={{ borderCollapse: 'collapse' }} key={i}>
                                                                <td align="left" style={{ margin: 0, paddingTop: '5px', paddingBottom: '10px', paddingLeft: '20px', paddingRight: '20px' }}>
                                                                    <table className="es-left" cellSpacing={0} cellPadding={0} align="left" style={{ msoTableLspace: '0pt', msoTableRspace: '0pt', borderCollapse: 'collapse', borderSpacing: '0px', float: 'left' }}>
                                                                        <tbody><tr style={{ borderCollapse: 'collapse' }}>
                                                                            <td className="es-m-p0r es-m-p20b" valign="top" align="center" style={{ padding: 0, margin: 0, width: '178px' }}>
                                                                                <table width="100%" cellSpacing={0} cellPadding={0} role="presentation" style={{ msoTableLspace: '0pt', msoTableRspace: '0pt', borderCollapse: 'collapse', borderSpacing: '0px' }}>
                                                                                    <tbody><tr style={{ borderCollapse: 'collapse' }}>
                                                                                        <td align="center" style={{ padding: 0, margin: 0, fontSize: 0 }}><a href="#" target="_blank" style={{ WebkitTextSizeAdjust: 'none', msTextSizeAdjust: 'none', msoLineHeightRule: 'exactly', textDecoration: 'underline', color: '#D48344', fontSize: '14px' }}>
                                                                                            <img src={obj?.image} alt={obj?.name} className="adapt-img" width={125} style={{ display: 'block', border: 0, outline: 'none', textDecoration: 'none', msInterpolationMode: 'bicubic' }} /></a>
                                                                                        </td>
                                                                                    </tr>
                                                                                    </tbody></table>
                                                                            </td>
                                                                        </tr>
                                                                        </tbody></table>
                                                                    <table cellSpacing={0} cellPadding={0} align="right" style={{ msoTableLspace: '0pt', msoTableRspace: '0pt', borderCollapse: 'collapse', borderSpacing: '0px' }}>
                                                                        <tbody>

                                                                            <tr style={{ borderCollapse: 'collapse' }}>
                                                                                <td align="left" style={{ padding: 0, margin: 0, width: '362px' }}>
                                                                                    <table width="100%" cellSpacing={0} cellPadding={0} role="presentation" style={{ msoTableLspace: '0pt', msoTableRspace: '0pt', borderCollapse: 'collapse', borderSpacing: '0px' }}>
                                                                                        <tbody><tr style={{ borderCollapse: 'collapse' }}>
                                                                                            <td align="left" style={{ padding: 0, margin: 0 }}>
                                                                                                <p style={{ margin: 0, WebkitTextSizeAdjust: 'none', msTextSizeAdjust: 'none', msoLineHeightRule: 'exactly', fontFamily: 'arial, "helvetica neue", helvetica, sans-serif', lineHeight: '21px', color: '#333333', fontSize: '14px' }}>
                                                                                                </p>
                                                                                                <table style={{ msoTableLspace: '0pt', msoTableRspace: '0pt', borderCollapse: 'collapse', borderSpacing: '0px', width: '100%' }} className="cke_show_border" cellSpacing={1} cellPadding={1} border={0} role="presentation">
                                                                                                    <tbody><tr style={{ borderCollapse: 'collapse' }}>
                                                                                                        <td style={{ padding: 0, margin: 0 }}>{obj?.name}
                                                                                                        </td>
                                                                                                        <td style={{ padding: 0, margin: 0, width: '60px', textAlign: 'center' }}>
                                                                                                            {obj?.quantity}</td>
                                                                                                        <td style={{ padding: 0, margin: 0, width: '100px', textAlign: 'center' }}>
                                                                                                            Rs. {obj?.price}</td>
                                                                                                    </tr>
                                                                                                    </tbody></table>
                                                                                                <p style={{ margin: 0, WebkitTextSizeAdjust: 'none', msTextSizeAdjust: 'none', msoLineHeightRule: 'exactly', fontFamily: 'arial, "helvetica neue", helvetica, sans-serif', lineHeight: '21px', color: '#333333', fontSize: '14px' }}>
                                                                                                </p>
                                                                                            </td>
                                                                                        </tr>
                                                                                        </tbody></table>
                                                                                </td>
                                                                            </tr>

                                                                        </tbody></table>
                                                                </td>
                                                            </tr>
                                                        })}
                                                        <tr style={{ borderCollapse: 'collapse' }}>
                                                            <td align="left" style={{ padding: 0, margin: 0, paddingLeft: '20px', paddingRight: '20px' }}>
                                                                <table width="100%" cellSpacing={0} cellPadding={0} style={{ msoTableLspace: '0pt', msoTableRspace: '0pt', borderCollapse: 'collapse', borderSpacing: '0px' }}>
                                                                    <tbody><tr style={{ borderCollapse: 'collapse' }}>
                                                                        <td valign="top" align="center" style={{ padding: 0, margin: 0, width: '560px' }}>
                                                                            <table width="100%" cellSpacing={0} cellPadding={0} role="presentation" style={{ msoTableLspace: '0pt', msoTableRspace: '0pt', borderCollapse: 'collapse', borderSpacing: '0px' }}>
                                                                                <tbody><tr style={{ borderCollapse: 'collapse' }}>
                                                                                    <td align="center" style={{ padding: 0, margin: 0, paddingBottom: '10px', fontSize: 0 }}>
                                                                                        <table width="100%" height="100%" cellSpacing={0} cellPadding={0} border={0} role="presentation" style={{ msoTableLspace: '0pt', msoTableRspace: '0pt', borderCollapse: 'collapse', borderSpacing: '0px' }}>
                                                                                            <tbody><tr style={{ borderCollapse: 'collapse' }}>
                                                                                                <td style={{ padding: 0, margin: '0px', borderBottom: '1px solid #efefef', background: '#FFFFFF none repeat scroll 0% 0%', height: '1px', width: '100%' }}>
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
                                                        <tr style={{ borderCollapse: 'collapse' }}>
                                                            <td align="left" style={{ margin: 0, paddingTop: '5px', paddingLeft: '20px', paddingBottom: '30px', paddingRight: '40px' }}>
                                                                <table width="100%" cellSpacing={0} cellPadding={0} style={{ msoTableLspace: '0pt', msoTableRspace: '0pt', borderCollapse: 'collapse', borderSpacing: '0px' }}>
                                                                    <tbody><tr style={{ borderCollapse: 'collapse' }}>
                                                                        <td valign="top" align="center" style={{ padding: 0, margin: 0, width: '540px' }}>
                                                                            <table width="100%" cellSpacing={0} cellPadding={0} role="presentation" style={{ msoTableLspace: '0pt', msoTableRspace: '0pt', borderCollapse: 'collapse', borderSpacing: '0px' }}>
                                                                                <tbody><tr style={{ borderCollapse: 'collapse' }}>
                                                                                    <td align="right" style={{ padding: 0, margin: 0 }}>
                                                                                        <table style={{ msoTableLspace: '0pt', msoTableRspace: '0pt', borderCollapse: 'collapse', borderSpacing: '0px', width: '500px' }} className="cke_show_border" cellSpacing={1} cellPadding={1} border={0} align="right" role="presentation">
                                                                                            <tbody><tr style={{ borderCollapse: 'collapse' }}>
                                                                                                <td style={{ padding: 0, margin: 0, textAlign: 'right', fontSize: '18px', lineHeight: '27px' }}>
                                                                                                    <strong>Delivery Charges:</strong></td>
                                                                                                <td style={{ padding: 0, margin: 0, textAlign: 'right', fontSize: '18px', lineHeight: '27px' }}>
                                                                                                    <strong>+ Rs. {orders[key]?.deliveryFee || 0}</strong></td>
                                                                                            </tr>
                                                                                                <tr style={{ borderCollapse: 'collapse' }}>
                                                                                                    <td style={{ padding: 0, margin: 0, textAlign: 'right', fontSize: '18px', lineHeight: '27px' }}>
                                                                                                        <strong>Discount:</strong></td>
                                                                                                    <td style={{ padding: 0, margin: 0, textAlign: 'right', fontSize: '18px', lineHeight: '27px' }}>
                                                                                                        <strong>- Rs. {orders[key]?.discount || 0}</strong></td>
                                                                                                </tr>
                                                                                                <tr style={{ borderCollapse: 'collapse' }}>
                                                                                                    <td style={{ padding: 0, margin: 0, textAlign: 'right', fontSize: '18px', lineHeight: '27px' }}>
                                                                                                        <strong>exc. Tax:</strong></td>
                                                                                                    <td style={{ padding: 0, margin: 0, textAlign: 'right', fontSize: '18px', lineHeight: '27px' }}>
                                                                                                        <strong>Rs. {orders[key]?.excTax || 0}</strong></td>
                                                                                                </tr>
                                                                                                <tr style={{ borderCollapse: 'collapse' }}>
                                                                                                    <td style={{ padding: 0, margin: 0, textAlign: 'right', fontSize: '18px', lineHeight: '27px' }}>
                                                                                                        <strong>Order Total:</strong></td>
                                                                                                    <td style={{ padding: 0, margin: 0, textAlign: 'right', fontSize: '18px', lineHeight: '27px', color: '#d48344' }}>
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
                <Button variant="danger" onClick={() => setLgShow(false)} >
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    }

    return (
        <div className='orders_main'>
            <NavBar />
            {userInfo?.user?.role === "restaurant" ? <RestaurantSidebar /> : userInfo?.user?.role === "chef" ? <ChefSidebar /> : <FeedSideBar/>}
            <div className='orders_main_scroll'>
                <h3 className='orders_main_heading'>Orders</h3>
                <Table striped>
                    <thead>
                        <tr>
                            <th>{t("no")}</th>
                            <th>{t("id")}</th>
                            <th>{t("date_text")}</th>
                            <th>{t("Restaurant / Chef Name")}</th>
                            <th>{t("amount")}</th>
                            <th>{t("status_order")}</th>
                            <th>{t("action")}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders ? orders?.map((obj, i) => {
                            return <tr key={i}>
                                <td>{i + 1}</td>
                                <td onClick={() => { setLgShow(true); setKey(i) }}>{obj?.orderNumber}</td>
                                <td>{moment(obj?.createdAt).format(
                                    "D/M/YYYY"
                                )}</td>
                                <td>{obj?.seller?.restaurantName?obj?.seller?.restaurantName:obj?.seller?.firstName+' '+obj?.seller?.lastName}</td>
                                <td>Rs. {obj?.orderPrice}</td>
                                <td ><p className={`badge badge-${obj?.status === "processing" ? "warning" : obj?.status === "onDelivery" ? "info" : obj?.status === "completed" ? "success" : obj?.status === "reject" ? "danger" : "danger"} text-capitalize`}>
                                    {obj?.status}
                                </p></td>
                                <td><button className="btn" onClick={() => { setLgShow(true); setKey(i) }}>View</button></td>
                            </tr>
                        }) : <p>No data</p>}
                    </tbody>
                </Table>
            </div>
            {showOrder()}
        </div>
    )
}

export default UserOrders