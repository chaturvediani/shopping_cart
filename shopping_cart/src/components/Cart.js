import React from 'react'
import axios from 'axios';
export default function Cart(props) {
    const { cartItems,onAdd,onRemove}=props;
    // console.log(cartItems)
    const itemsPrice = cartItems.reduce((a, c) => a + c.qty * c.price, 0);
    const taxPrice = itemsPrice * 0.14;
    const shippingPrice = itemsPrice > 2000 ? 0 : 20;
    const totalPrice = itemsPrice + taxPrice + shippingPrice;
    var cart=localStorage.getItem("Cart");
    var cartele = JSON.parse(localStorage.getItem("Cart"));
    cartItems.push.apply(cartItems,cartele)
    // var cartele = JSON.parse(localStorage.getItem("Cart"));
    // cartItems.push.apply(cartItems,cartele)
   
    const idgenerator=()=>{
      var id = "";
      // ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz
      var p = "0123456789";
    
      for (var i = 0; i < 5; i++)
        id += p.charAt(Math.floor(Math.random() * p.length));
    
      return id;
    }
    const onSubmitHandler=(e)=>{

       e.preventDefault();
       console.log("hey")
    //    const id=idgenerator();
    //    try {
    //     const config={
    //       headers:{
    //         "Content-type":"application/json"
    //       }
    //     }
    //       const { data }=  axios.post("http://localhost:8000/checkout",
    //       {id,name,quantity,amount},
    //       config
    //     )
    // }catch (error) {
    //   console.log(error)
    // }
  }
  return (
    <div className="block col-1">
      <h2>Cart Items</h2>
        
      <div>
        {cartItems.length===0 && <div>cart is Empty</div>} 
        {cartItems.map((item) => (
          <div key={item.id} className="row">
            <div className="col-2">{item.name}</div>
            <div className="col-2">
              <button onClick={() => onRemove(item)} className="remove">
                -
              </button>{' '}
              <button onClick={() => onAdd(item)} className="add">
                +
              </button>
            </div>

            <div className="col-2 text-right">
              {item.qty} x Rs.{item.price.toFixed(2)}
            </div>
          </div>
        ))}

        {cartItems.length !== 0 && (
          <>
            <hr></hr>
            <div className="row">
              <div className="col-2">Items Price</div>
              <div className="col-1 text-right">Rs.{itemsPrice.toFixed(2)}</div>
            </div>
            <div className="row">
              <div className="col-2">Tax Price</div>
              <div className="col-1 text-right">Rs.{taxPrice.toFixed(2)}</div>
            </div>
            <div className="row">
              <div className="col-2">Shipping Price</div>
              <div className="col-1 text-right">
                Rs.{shippingPrice.toFixed(2)}
              </div>
            </div>

            <div className="row">
              <div className="col-2">
                <strong>Total Price</strong>
              </div>
              <div className="col-1 text-right">
                <strong>Rs.{totalPrice.toFixed(2)}</strong>
              </div>
            </div>
            <hr />
            <div className="row">
              <button onClick={() => {onSubmitHandler()}}>
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
        }