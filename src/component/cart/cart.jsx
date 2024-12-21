
import React, { useState, useEffect } from 'react';
import './cart.css';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, incrementQuantity, decrementQuantity } from '../../saga/action/action';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import pizza from '../../assets/pizza.jpg';
import burger from '../../assets/burger.jpg';
import chickenpizza from '../../assets/chicken pizza.jpg';
import wings from '../../assets/chicken wings.jpg';
import springRolls from '../../assets/spring-rolls.jpg';
import fries from '../../assets/fries.jpeg';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { loadStripe } from '@stripe/stripe-js'; // Load Stripe library
import { Helmet } from 'react-helmet';
import HelmetComponent from '../helmet/helmet';


const imageMap = {
  'logo.png': logo,
  'pizza.jpg':pizza,
  'burger.jpg':burger,
  'chicken pizza.jpg':chickenpizza,
  'chicken wings.jpg':wings,
  'spring-rolls.jpg':springRolls,
  'fries.jpeg':fries
};

const Cart = () => {
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false); 

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

// const handleCheckout = async () => {
//   const cartData = cart.map(item => ({
//     name: item.name,
//     price: item.price,
//     img: item.img,
//     quantity: item.quantity,
//   }));

//   console.log('Cart Data:', cartData);  // Debug cart data

//   try {

//     console.log('API Base URL:', process.env.REACT_APP_API_BASE_URL);
//     console.log('Stripe Public Key:', process.env.REACT_APP_STRIPE_PUBLIC_KEY);


//     const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/create-checkout-session`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ cart: cartData }),
//     });

//     const session = await response.json();
//     console.log('Session:', session);  // Debug session data

//     const stripe = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
//     const { error } = await stripe.redirectToCheckout({
//       sessionId: session.id,
//     });

//     if (error) {
//       console.error('Stripe Checkout Error:', error);
//     }
//   } catch (error) {
//     console.error('Error during checkout:', error);
//   }
//   finally {
//       setIsCheckoutLoading(false); // Stop loading after the request finishes
//     }
// };
const handleCheckout = async () => {
  setIsCheckoutLoading(true); // Start loading when checkout begins

  const cartData = cart.map(item => ({
    name: item.name,
    price: item.price,
    img: item.img,
    quantity: item.quantity,
  }));

  console.log('Cart Data:', cartData);  // Debug cart data

  try {
    console.log('API Base URL:', process.env.REACT_APP_API_BASE_URL);
    console.log('Stripe Public Key:', process.env.REACT_APP_STRIPE_PUBLIC_KEY);

    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/create-checkout-session`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cart: cartData }),
    });

    const session = await response.json();
    console.log('Session:', session);  // Debug session data

    const stripe = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
    const { error } = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (error) {
      console.error('Stripe Checkout Error:', error);
    }
  } catch (error) {
    console.error('Error during checkout:', error);
  } finally {
    setIsCheckoutLoading(false); // Stop loading after the request finishes
  }
};

 
  return (
    <div className='cart-page'>

<HelmetComponent
        title="Shopping Cart"
        description="Review and manage your cart items before proceeding to checkout."
        keywords="shopping cart, food, e-commerce, checkout, products"
        ogTitle="Shopping Cart"
        ogDescription="Review and manage your cart items before proceeding to checkout."
        ogUrl="http://192.168.0.107:3000/cart"
        ogImage="http://192.168.0.107:3000/assets/logo.png"
        ogImageAlt="Delicious food banner"
        ogImageWidth="300"
        ogImageHeight="200"
      />
     
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
                <div className="quantity-control">
                  <button className='minus' onClick={() => dispatch(decrementQuantity(item.id))}>-</button>
                  <span>{item.quantity}</span>
                  <button className='plus' onClick={() => dispatch(incrementQuantity(item.id))}>+</button>
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

            <button 
            className='checkout-button' 
            onClick={handleCheckout} 
            disabled={isCheckoutLoading} // Disable button during loading
          >
            {isCheckoutLoading ? (
              <div className="spinner"></div> // Show spinner when loading
            ) : (
              'Proceed to Payment'
            )}
          </button> 
       
        
      </div>
        )}
        </div>
        
  );
};

export default Cart;