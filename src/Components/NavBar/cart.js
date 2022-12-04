import React, { Component } from 'react'
import { connect } from "react-redux";
import {IncreaseQuantity,DecreaseQuantity,DeleteCart} from '../../Actions/cartActions';
import { AiOutlinePlusSquare,AiOutlinePlus,AiOutlineMinusSquare } from "react-icons/ai";
import { RiDeleteBinFill } from "react-icons/ri";
import { Link } from 'react-router-dom'

function Cart({items,IncreaseQuantity,DecreaseQuantity,DeleteCart}){
  //  console.log(items)
    let ListCart = [];
    let TotalCart=0;
    Object.keys(items.Carts).forEach(function(item){
        TotalCart+=items.Carts[item].quantity * items.Carts[item].price;
        ListCart.push(items.Carts[item]);
    });
    
    function TotalPrice(price,tonggia){
        return Number(price * tonggia).toLocaleString('en-US');
    }
    return(
        <div>   
                {
                    ListCart.map((item,key)=>{
                        return <><div className='cart_main'>
                      <div className='cart_main_image'>
                        <img src={item.image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpxN8_LMYdlXwv1RRzpMis6tGp0cF808R-1w&usqp=CAU"} alt="" />
                      </div>
          
                      <div className='cart_main_quantity'>
                      <div className="carts_items">
                        <p>{item.name}</p>
                        <small onClick={()=>DeleteCart(key)}><RiDeleteBinFill /></small>
                        </div>
                        <div className="carts_items mt-1">
                        <div className='cart_quantity'>
                          <span onClick={()=>DecreaseQuantity(key)}><AiOutlineMinusSquare /></span>
                          <span>&nbsp; {item.quantity} &nbsp;</span>
                          <span onClick={()=>IncreaseQuantity(key)}><AiOutlinePlusSquare /></span>
                        </div>
                        {/* <div className='cart_price'>
                          <span>Rs {item.price}</span>
                        </div> */}
                        <div className='cart_price'>
                          <span>Rs { TotalPrice(item.price,item.quantity)}</span>
                        </div>
                        </div>
                      </div>
                      
                    </div>

                        </>
                    })
                        
                }
                
                        {TotalCart !== 0 && <Link to="/addtocart"><button className='mt-2'>Check out  {Number(TotalCart).toLocaleString('en-US')}</button></Link>}
            
        </div>
    )
}
const mapStateToProps = state =>{
  //  console.log(state)
    return{
        items:state._todoProduct
    }
}

export default connect(mapStateToProps,{IncreaseQuantity,DecreaseQuantity,DeleteCart})(Cart)
