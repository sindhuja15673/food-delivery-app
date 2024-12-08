import React from 'react';
import './cart.css';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, incrementQuantity, decrementQuantity } from '../../saga/action/action';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';

const imageMap = {
  'logo.png': logo,
};

const Cart = () => {
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();

  const calculateTotal = () => {
    let total = cart.reduce((acc, item) => {
      let price = parseFloat(item.price.replace('$', ''));
      return acc + (price || 0) * item.quantity;
    }, 0);
    return total;
  };

  const total = calculateTotal();
  const gst = total * 0.18;
  const discount = total * 0.10;
  const finalTotal = total + gst - discount;

  return (
    <div className='cart-page'>
      <div className='cart-items'>
        <h1>Your Cart</h1>
        {cart.length === 0 ? (
          <div className='empty-cart'>
            <h2>It looks like your cart is empty</h2>
            <h5>Not sure where your items went?</h5>
            <div className='cart-actions'>
              <Link to='/'><button className='cart-button'>Continue Shopping</button></Link>
              <Link to='/signin'><button className='sign-button'>Sign in</button></Link>
            </div>
          </div>
        ) : (
          cart.map((item, index) => (
            <div key={index} className='cart-item'>
              <img src={imageMap[item.img]} alt={item.name} />
              <div className='item-details'>
                <h3>{item.name}</h3>
                <p>${parseFloat(item.price.replace('$', '')).toFixed(2)}</p>
                <div className="quantity-controls">
                  <button onClick={() => dispatch(decrementQuantity(item.id))}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => dispatch(incrementQuantity(item.id))}>+</button>
                </div>
              </div>
              <button className='remove-button' onClick={() => dispatch(removeFromCart(item))}>Remove</button>
            </div>
          ))
        )}
      </div>
      <div className='cart-summary'>
        <h2>Order Summary</h2>
        <div className='summary-details'>
          <p>Total: ${total.toFixed(2)}</p>
          <p>GST (18%): ${gst.toFixed(2)}</p>
          <p>Discount (10%): -${discount.toFixed(2)}</p>
          <h3>Final Total: ${finalTotal.toFixed(2)}</h3>
        </div>
        <button className='checkout-button'>Checkout</button>
      </div>
    </div>
  );
};

export default Cart;
