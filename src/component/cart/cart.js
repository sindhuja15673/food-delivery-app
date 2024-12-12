
import React, { useState, useEffect } from 'react';
import './cart.css';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, incrementQuantity, decrementQuantity } from '../../saga/action/action';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const imageMap = {
  'logo.png': logo,
};

const Cart = () => {
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading delay for demonstration
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); 

    return () => clearTimeout(timer);
  }, []);

  const calculateTotal = () => {
    let total = cart.reduce((acc, item) => {
      let price = 0;
      if (item.price) {
        if (typeof item.price === 'string') {
          price = parseFloat(item.price.replace('$', ''));
        } else if (typeof item.price === 'number') {
          price = item.price;
        }
      }
      return acc + (price * item.quantity);
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
       {isLoading ? (
          <div className='cart-skeleton'>
            <skeleton height={50} width={200} />
            <Skeleton height={50} width={200} />
            <Skeleton height={20} width={150} count={3} style={{ marginTop: 10 }} />
          </div>
        ) : (
          <div>
        <h1>Your Cart</h1>
        {cart.length === 0 ? (
          <div className='empty-cart'>
            <h2>It looks like your cart is empty</h2>
            <h5>Not sure where your items went?</h5>
            <div className='cart-actions'>
              <Link to='/menu'><button className='cart-button'>Continue Shopping</button></Link>
            </div>
          </div>
        ) : (
          cart.map((item, index) => (
            <div key={index} className='cart-item'>
              <img src={imageMap[item.img]} alt={item.name} />
              <div className='item-details'>
                <h3>{item.name}</h3>
                <p>${parseFloat(item.price).toFixed(2)}</p>
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
      )}
      </div>
        {isLoading ? (
          <div className='summary-skeleton'>
            <Skeleton height={30} width={200} />
            <Skeleton height={20} width={150} count={4} style={{ marginTop: 10 }} />
          </div>
        ) : (
      <div className='cart-summary'>
        <h2>Order Summary</h2>
          <div className='summary-details'>
            <p>Total: ${total.toFixed(2)}</p>
            <p>GST (18%): ${gst.toFixed(2)}</p>
            <p>Discount (10%): -${discount.toFixed(2)}</p>
            <h3>Final Total: ${finalTotal.toFixed(2)}</h3>
          </div>
        {!isLoading && <button className='checkout-button'>Payment</button>}
      </div>
        )}
        </div>
  );
};

export default Cart;
