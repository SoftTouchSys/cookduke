import React, { Component, useState } from 'react'
import { connect } from "react-redux";
import { IncreaseQuantity, DecreaseQuantity, DeleteCart } from '../../Actions/cartActions';
import { AiOutlinePlusSquare, AiOutlinePlus, AiOutlineMinusSquare } from "react-icons/ai";
import { RiDeleteBinFill } from "react-icons/ri";
import axiosInstance from '../../helper/axios';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Checkout({ items, IncreaseQuantity, DecreaseQuantity, DeleteCart, fullName, email, mobile, address, area, payment, user, vendor }) {

    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
        window.location = "/"
    }
    const handleShow = () => setShow(true);
    //  console.log(items)
    let ListCart = [];
    let TotalCart = 0;
    var deliveryFee = 200
    var discount = 100
    var excTax = 0
    var orderTotal = 0

    Object.keys(items.Carts).forEach(function (item) {
        TotalCart += items.Carts[item].quantity * items.Carts[item].price;
        orderTotal = TotalCart + deliveryFee - discount
        ListCart.push(items.Carts[item]);

    });
    function TotalPrice(price, tonggia) {
        return Number(price * tonggia).toLocaleString('en-US');
    }

    function OrderTotal(totalPrice, deliveryFee, discount) {
        return Number(totalPrice + deliveryFee - discount).toLocaleString('en-US');
    }

    const submitOrder = () => {
        var order = {
            fullName: fullName ? fullName : user?.firstName + ' ' + user?.lastName,
            email: email ? email : user?.email,
            mobile: mobile ? mobile : user?.phone,
            address: address ? address : user?.houseNo + ' ' + user?.street,
            area: area ? area : user?.city + ' ' + user?.country,
            payment,
            vendor,
            items: ListCart,
            deliveryFee,
            discount,
            excTax,
            orderPrice: orderTotal,
        }

        if (mobile && address && area) {
            if (items) {
                axiosInstance.post('create-order', order).then((res) => {
                    handleShow()
                })
            } else {
                alert('Your Cart is empty')
            }
        } else {
            alert('please fill all fields')
        }

        // var c = JSON.parse(localStorage.getItem("localCart"));
        // c.vendor="";
        // c.Carts=[];
        // c.numberCart=0;
        localStorage.removeItem("vendor");
        localStorage.removeItem("localCart");



    }

    return (
        <div>
            {
                ListCart.map((item, key) => {
                    return <>
                        <div className='cart_main' key={key}>
                            <div className='cart_main_image'>
                                <img src={item?.image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpxN8_LMYdlXwv1RRzpMis6tGp0cF808R-1w&usqp=CAU"} alt="" />
                            </div>

                            <div className='cart_main_quantity'>
                                <p>{item?.name}</p>
                                <div className='cart_quantity'>
                                    <AiOutlineMinusSquare className='text-success' onClick={() => DecreaseQuantity(key)} />
                                    <AiOutlinePlus className='cart_quantity_multiply' /><span>{item?.quantity}</span>
                                    <AiOutlinePlusSquare className='text-success' onClick={() => IncreaseQuantity(key)} />
                                </div>
                            </div>
                            <div className='cart_price'>
                                <span>Rs {TotalPrice(item.price, item.quantity)}</span>
                                <div onClick={() => DeleteCart(key)}><RiDeleteBinFill /></div>
                            </div>
                        </div>

                    </>
                })

            }
            <div className='main_totals'>
                <p>Subtotal</p>
                <p>Rs {Number(TotalCart).toLocaleString('en-US')}</p>
            </div>
            <div className='main_totals'>
                <p>Delivery Free</p>
                <p>Rs {deliveryFee}</p>
            </div>
            <div className='main_totals'>
                <p>Discount</p>
                <p>Rs {discount}</p>
            </div>
            <div className='main_totals'>
                <p>Exc. Tax</p>
                <p>Rs {excTax}</p>
            </div>

            <div className='total'>
                <p>Order Total</p>
                <p>Rs {OrderTotal(TotalCart, deliveryFee, discount).toLocaleString('en-US')}</p>
            </div>
            {/* <Link to="/addtocart"><button className='mt-2'>Check out  {Number(TotalCart).toLocaleString('en-US')}</button></Link> */}
            <button onClick={submitOrder}>CHECKOUT {`Rs ${OrderTotal(TotalCart, deliveryFee, discount).toLocaleString('en-US')}` || ""} </button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>

                </Modal.Header>
                <Modal.Body variant="h1 text-center">Your Order is Completed!</Modal.Body>
                <Modal.Body variant="p text-center">You will recieve a confirmation email with order details.</Modal.Body>
                <Modal.Footer>
                    <Button variant="success w-100" onClick={handleClose}>
                        Go Back
                    </Button>
                </Modal.Footer>

            </Modal>
        </div>
    )
}
const mapStateToProps = state => {
    //  console.log(state)
    return {
        items: state._todoProduct
    }
}

export default connect(mapStateToProps, { IncreaseQuantity, DecreaseQuantity, DeleteCart })(Checkout)
