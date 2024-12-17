
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

const handleCheckout = async () => {
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
  }
};

 
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
            <button className='checkout-button' onClick={handleCheckout}>
            Proceed to Payment
            </button>
       
        
      </div>
        )}
        </div>
        
  );
};

export default Cart;



// import React, { useState, useEffect } from 'react';
// import './cart.css';
// import { useSelector, useDispatch } from 'react-redux';
// import { removeFromCart, incrementQuantity, decrementQuantity } from '../../saga/action/action';
// import { Link } from 'react-router-dom';
// import logo from '../../assets/logo.png';
// import pizza from '../../assets/pizza.jpg';
// import burger from '../../assets/burger.jpg';
// import chickenpizza from '../../assets/chicken pizza.jpg';
// import wings from '../../assets/chicken wings.jpg';
// import springRolls from '../../assets/spring-rolls.jpg';
// import fries from '../../assets/fries.jpeg';
// import Skeleton from 'react-loading-skeleton';
// import 'react-loading-skeleton/dist/skeleton.css';
// import { loadStripe } from '@stripe/stripe-js'; // Load Stripe library

// const imageMap = {
//   'logo.png': logo,
//   'pizza.jpg':pizza,
//   'burger.jpg':burger,
//   'chicken pizza.jpg':chickenpizza,
//   'chicken wings.jpg':wings,
//   'spring-rolls.jpg':springRolls,
//   'fries.jpeg':fries
// };

// const Cart = () => {
//   const cart = useSelector((state) => state.cart.cart);
//   const dispatch = useDispatch();
//   const [isLoading, setIsLoading] = useState(true);

//   // Simulate loading delay for demonstration
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsLoading(false);
//     }, 1000);

//     return () => clearTimeout(timer);
//   }, []);

//   const calculateTotal = () => {
//     let total = cart.reduce((acc, item) => {
//       let price = 0;
//       if (item.price) {
//         if (typeof item.price === 'string') {
//           price = parseFloat(item.price.replace('$', ''));
//         } else if (typeof item.price === 'number') {
//           price = item.price;
//         }
//       }
//       return acc + (price * item.quantity);
//     }, 0);
//     return total;
//   };

//   const total = calculateTotal();
//   const gst = total * 0.18;
//   const discount = total * 0.10;
//   const finalTotal = total + gst - discount;

//   // Function to handle Stripe checkout
//   // const handleCheckout = async () => {
//   //   // Prepare the cart data to send to the backend
//   //   const cartData = cart.map(item => ({
//   //     name: item.name,
//   //     price: item.price,
//   //     img: item.img,
//   //     quantity: item.quantity,
//   //   }));

//   //   try {
//   //     // Call the backend to create a checkout session
//   //     const response = await fetch('http://localhost:5000/api/create-checkout-session', {
//   //       method: 'POST',
//   //       headers: { 'Content-Type': 'application/json' },
//   //       body: JSON.stringify({ cart: cartData }),
//   //     });

//   //     const session = await response.json();
//   //     const stripe = await loadStripe('pk_test_51QVtvYBlMzhjf0i5jpZ9qZGFX37xUN4b6pcS6evsmysWhtRgS4m1iTH2uAxcUAWsGY0qzGXIjSQOUw4Re6q2RSF200jklxIYzE'); // Use your Stripe public key
//   //     const { error } = await stripe.redirectToCheckout({
//   //       sessionId: session.id,
//   //     });

//   //     if (error) {
//   //       console.error('Stripe Checkout Error:', error);
//   //     }
//   //   } catch (error) {
//   //     console.error('Error during checkout:', error);
//   //   }
//   // };

  
//   const handleCheckout = async () => {
//     const cartData = cart.map(item => ({
//       name: item.name,
//       price: item.price,
//       img: item.img,
//       quantity: item.quantity,
//     }));
  
//     console.log('Cart Data:', cartData);  // Debug cart data
  
//     try {
//       const response = await fetch('http://localhost:5000/api/create-checkout-session', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ cart: cartData }),
//       });
  
//       const session = await response.json();
//       console.log('Session:', session);  // Debug session data
  
//       const stripe = await loadStripe('pk_test_51QVtvYBlMzhjf0i5jpZ9qZGFX37xUN4b6pcS6evsmysWhtRgS4m1iTH2uAxcUAWsGY0qzGXIjSQOUw4Re6q2RSF200jklxIYzE');
//       const { error } = await stripe.redirectToCheckout({
//         sessionId: session.id,
//       });
  
//       if (error) {
//         console.error('Stripe Checkout Error:', error);
//       }
//     } catch (error) {
//       console.error('Error during checkout:', error);
//     }
//   };
  

//   return (
//     <div className='cart-page'>
//       <div className='cart-items'>
//         {isLoading ? (
//           <div className='cart-skeleton'>
//             <Skeleton height={50} width={200} />
//             <Skeleton height={50} width={200} />
//             <Skeleton height={20} width={150} count={3} style={{ marginTop: 10 }} />
//           </div>
//         ) : (
//           <div>
//             <h1>Your Cart</h1>
//             {cart.length === 0 ? (
//               <div className='empty-cart'>
//                 <h2>It looks like your cart is empty</h2>
//                 <h5>Not sure where your items went?</h5>
//                 <div className='cart-actions'>
//                   <Link to='/menu'><button className='cart-button'>Continue Shopping</button></Link>
//                 </div>
//               </div>
//             ) : (
//               cart.map((item, index) => (
//                 <div key={index} className='cart-item'>
//                   <img src={imageMap[item.img]} alt={item.name} />
//                   <div className='item-details'>
//                     <h3>{item.name}</h3>
//                     <p>${parseFloat(item.price).toFixed(2)}</p>
//                     <div className="quantity-control">
//                       <button className='minus' onClick={() => dispatch(decrementQuantity(item.id))}>-</button>
//                       <span>{item.quantity}</span>
//                       <button className='plus' onClick={() => dispatch(incrementQuantity(item.id))}>+</button>
//                     </div>
//                   </div>
//                   <button className='remove-button' onClick={() => dispatch(removeFromCart(item))}>Remove</button>
//                 </div>
//               ))
//             )}
//           </div>
//         )}
//       </div>

//       {isLoading ? (
//         <div className='summary-skeleton'>
//           <Skeleton height={30} width={200} />
//           <Skeleton height={20} width={150} count={4} style={{ marginTop: 10 }} />
//         </div>
//       ) : (
//         <div className='cart-summary'>
//           <h2>Order Summary</h2>
//           <div className='summary-details'>
//             <p>Total: ${total.toFixed(2)}</p>
//             <p>GST (18%): ${gst.toFixed(2)}</p>
//             <p>Discount (10%): -${discount.toFixed(2)}</p>
//             <h3>Final Total: ${finalTotal.toFixed(2)}</h3>
//           </div>
//           <button className='checkout-button' onClick={handleCheckout}>
//             Proceed to Payment
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Cart;



// // import React, { useState, useEffect, useCallback } from 'react';
// // import './cart.css';
// // import { useSelector, useDispatch } from 'react-redux';
// // import { removeFromCart, incrementQuantity, decrementQuantity } from '../../saga/action/action';
// // import { Link } from 'react-router-dom';
// // import { loadStripe } from '@stripe/stripe-js';
// // import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
// // import axios from 'axios';
// // import logo from '../../assets/logo.png';
// // import pizza from '../../assets/pizza.jpg';
// // import burger from '../../assets/burger.jpg';
// // import chickenpizza from '../../assets/chicken pizza.jpg';
// // import wings from '../../assets/chicken wings.jpg';
// // import springRolls from '../../assets/spring-rolls.jpg';
// // import fries from '../../assets/fries.jpeg';
// // import Skeleton from 'react-loading-skeleton';
// // import 'react-loading-skeleton/dist/skeleton.css';

// // const stripePromise = loadStripe('pk_test_51QVtvYBlMzhjf0i5jpZ9qZGFX37xUN4b6pcS6evsmysWhtRgS4m1iTH2uAxcUAWsGY0qzGXIjSQOUw4Re6q2RSF200jklxIYzE'); // Replace with your public key

// // const imageMap = {
// //   'logo.png': logo,
// //   'pizza.jpg': pizza,
// //   'burger.jpg': burger,
// //   'chicken pizza.jpg': chickenpizza,
// //   'chicken wings.jpg': wings,
// //   'spring-rolls.jpg': springRolls,
// //   'fries.jpeg': fries
// // };

// // const Cart = () => {
// //   const cart = useSelector((state) => state.cart.cart);
// //   const dispatch = useDispatch();
// //   const [isLoading, setIsLoading] = useState(true);
// //   const [clientSecret, setClientSecret] = useState('');

// //   const calculateTotal = useCallback(() => {
// //     let total = cart.reduce((acc, item) => {
// //       let price = 0;
// //       if (item.price) {
// //         if (typeof item.price === 'string') {
// //           price = parseFloat(item.price.replace('$', ''));
// //         } else if (typeof item.price === 'number') {
// //           price = item.price;
// //         }
// //       }
// //       return acc + (price * item.quantity);
// //     }, 0);
// //     return total;
// //   }, [cart]);

// //   useEffect(() => {
// //     if (cart.length > 0) {
// //       const createPaymentIntent = async () => {
// //         try {
// //           const response = await axios.post('http://localhost:5000/create-payment-intent', {
// //             amount: calculateTotal() * 100, // Amount in cents
// //           });
// //           setClientSecret(response.data.clientSecret);
// //           setIsLoading(false);
// //         } catch (error) {
// //           console.error('Error creating payment intent:', error);
// //           setIsLoading(false);
// //         }
// //       };
// //       createPaymentIntent();
// //     } else {
// //       setIsLoading(false);
// //     }
// //   }, [cart, calculateTotal]);

// //   const total = calculateTotal();
// //   const gst = total * 0.18;
// //   const discount = total * 0.10;
// //   const finalTotal = total + gst - discount;

// //   return (
// //     <div className='cart-page'>
// //       <div className='cart-items'>
// //         {isLoading ? (
// //           <div className='cart-skeleton'>
// //             <Skeleton height={50} width={200} />
// //             <Skeleton height={50} width={200} />
// //             <Skeleton height={20} width={150} count={3} style={{ marginTop: 10 }} />
// //           </div>
// //         ) : (
// //           <div>
// //             <h1>Your Cart</h1>
// //             {cart.length === 0 ? (
// //               <div className='empty-cart'>
// //                 <h2>It looks like your cart is empty</h2>
// //                 <h5>Not sure where your items went?</h5>
// //                 <div className='cart-actions'>
// //                   <Link to='/menu'><button className='cart-button'>Continue Shopping</button></Link>
// //                 </div>
// //               </div>
// //             ) : (
// //               cart.map((item, index) => (
// //                 <div key={index} className='cart-item'>
// //                   <img src={imageMap[item.img]} alt={item.name} />
// //                   <div className='item-details'>
// //                     <h3>{item.name}</h3>
// //                     <p>${parseFloat(item.price).toFixed(2)}</p>
// //                     <div className="quantity-control">
// //                       <button className='minus' onClick={() => dispatch(decrementQuantity(item.id))}>-</button>
// //                       <span>{item.quantity}</span>
// //                       <button className='plus' onClick={() => dispatch(incrementQuantity(item.id))}>+</button>
// //                     </div>
// //                   </div>
// //                   <button className='remove-button' onClick={() => dispatch(removeFromCart(item))}>Remove</button>
// //                 </div>
// //               ))
// //             )}
// //           </div>
// //         )}
// //       </div>
// //       {isLoading ? (
// //         <div className='summary-skeleton'>
// //           <Skeleton height={30} width={200} />
// //           <Skeleton height={20} width={150} count={4} style={{ marginTop: 10 }} />
// //         </div>
// //       ) : (
// //         <div className='cart-summary'>
// //           <h2>Order Summary</h2>
// //           <div className='summary-details'>
// //             <p>Total: ${total.toFixed(2)}</p>
// //             <p>GST (18%): ${gst.toFixed(2)}</p>
// //             <p>Discount (10%): -${discount.toFixed(2)}</p>
// //             <h3>Final Total: ${finalTotal.toFixed(2)}</h3>
// //           </div>
// //           {clientSecret && (
// //             <Elements stripe={stripePromise} options={{ clientSecret }}>
// //               <CheckoutForm clientSecret={clientSecret} />
// //             </Elements>
// //           )}
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // const CheckoutForm = ({ clientSecret }) => {
// //   const stripe = useStripe();
// //   const elements = useElements();
  
// //   const handleSubmit = async (event) => {
// //     event.preventDefault();
    
// //     if (!stripe || !elements) {
// //       return;
// //     }

// //     const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
// //       payment_method: {
// //         card: elements.getElement(CardElement),
// //         billing_details: {
// //           name: 'Test User',
// //         },
// //       },
// //     });

// //     if (error) {
// //       console.error(error);
// //     } else if (paymentIntent.status === 'succeeded') {
// //       console.log('Payment successful!');
// //       // Handle post-payment actions here
// //     }
// //   };

// //   return (
// //     <form onSubmit={handleSubmit}>
// //       <CardElement />
// //       <button type="submit" disabled={!stripe}>
// //         Pay
// //       </button>
// //     </form>
// //   );
// // };

// // export default Cart;


// import React, { useState, useEffect } from 'react';
// import './cart.css';
// import { useSelector, useDispatch } from 'react-redux';
// import { removeFromCart, incrementQuantity, decrementQuantity } from '../../saga/action/action';
// import { Link } from 'react-router-dom';
// import logo from '../../assets/logo.png';
// import pizza from '../../assets/pizza.jpg';
// import burger from '../../assets/burger.jpg';
// import chickenpizza from '../../assets/chicken pizza.jpg';
// import wings from '../../assets/chicken wings.jpg';
// import springRolls from '../../assets/spring-rolls.jpg';
// import fries from '../../assets/fries.jpeg';
// import Skeleton from 'react-loading-skeleton';
// import 'react-loading-skeleton/dist/skeleton.css';

// const imageMap = {
//   'logo.png': logo,
//   'pizza.jpg': pizza,
//   'burger.jpg': burger,
//   'chicken pizza.jpg': chickenpizza,
//   'chicken wings.jpg': wings,
//   'spring-rolls.jpg': springRolls,
//   'fries.jpeg': fries
// };

// const Cart = () => {
//   const cart = useSelector((state) => state.cart.cart);
//   const dispatch = useDispatch();
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsLoading(false);
//     }, 1000); 

//     return () => clearTimeout(timer);
//   }, []);

//   const calculateTotal = () => {
//     return cart.reduce((acc, item) => {
//       let price = 0;
//       if (item.price) {
//         if (typeof item.price === 'string') {
//           price = parseFloat(item.price.replace('$', ''));
//         } else if (typeof item.price === 'number') {
//           price = item.price;
//         }
//       }
//       return acc + (price * item.quantity);
//     }, 0);
//   };

//   const total = calculateTotal();
//   const gst = total * 0.18;
//   const discount = total * 0.10;
//   const finalTotal = total + gst - discount;

//   return (
//     <div className='cart-page'>
//       <div className='cart-items'>
//         {isLoading ? (
//           <div className='cart-skeleton'>
//             <Skeleton height={50} width={200} />
//             <Skeleton height={50} width={200} />
//             <Skeleton height={20} width={150} count={3} style={{ marginTop: 10 }} />
//           </div>
//         ) : (
//           <div>
//             <h1>Your Cart</h1>
//             {cart.length === 0 ? (
//               <div className='empty-cart'>
//                 <h2>It looks like your cart is empty</h2>
//                 <h5>Not sure where your items went?</h5>
//                 <div className='cart-actions'>
//                   <Link to='/menu'><button className='cart-button'>Continue Shopping</button></Link>
//                 </div>
//               </div>
//             ) : (
//               cart.map((item, index) => (
//                 <div key={index} className='cart-item'>
//                   <img src={imageMap[item.img]} alt={item.name} />
//                   <div className='item-details'>
//                     <h3>{item.name}</h3>
//                     <p>${parseFloat(item.price).toFixed(2)}</p>
//                     <div className="quantity-control">
//                       <button className='minus' onClick={() => dispatch(decrementQuantity(item.id))}>-</button>
//                       <span>{item.quantity}</span>
//                       <button className='plus' onClick={() => dispatch(incrementQuantity(item.id))}>+</button>
//                     </div>
//                   </div>
//                   <button className='remove-button' onClick={() => dispatch(removeFromCart(item))}>Remove</button>
//                 </div>
//               ))
//             )}
//           </div>
//         )}
//       </div>
//       {isLoading ? (
//         <div className='summary-skeleton'>
//           <Skeleton height={30} width={200} />
//           <Skeleton height={20} width={150} count={4} style={{ marginTop: 10 }} />
//         </div>
//       ) : (
//         <div className='cart-summary'>
//           <h2>Order Summary</h2>
//           <div className='summary-details'>
//             <p>Total: ${total.toFixed(2)}</p>
//             <p>GST (18%): ${gst.toFixed(2)}</p>
//             <p>Discount (10%): -${discount.toFixed(2)}</p>
//             <h3>Final Total: ${finalTotal.toFixed(2)}</h3>
//           </div>
//           {!isLoading && <button className='checkout-button'><a href='/paymentForm'>Payment</a></button>}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Cart;
// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
// import { loadStripe } from '@stripe/stripe-js';
// import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
// import axios from 'axios';
// import { decrementQuantity, incrementQuantity, removeFromCart } from '../../saga/action/action';
// import './cart.css';

// const stripePromise = loadStripe('pk_test_51QVtvYBlMzhjf0i5jpZ9qZGFX37xUN4b6pcS6evsmysWhtRgS4m1iTH2uAxcUAWsGY0qzGXIjSQOUw4Re6q2RSF200jklxIYzE'); // Replace with your Stripe public key

// const imageMap = {
//   'image1': 'path/to/image1.jpg',
//   'image2': 'path/to/image2.jpg',
//   // Add other images here
// };

// const PaymentForm = () => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const cart = useSelector((state) => state.cart.cart);
//   const [clientSecret, setClientSecret] = useState('');

//   const calculateTotal = () => {
//     let total = cart.reduce((acc, item) => {
//       let price = 0;
//       if (item.price) {
//         if (typeof item.price === 'string') {
//           price = parseFloat(item.price.replace('$', ''));
//         } else if (typeof item.price === 'number') {
//           price = item.price;
//         }
//       }
//       return acc + (price * item.quantity);
//     }, 0);
//     return total * 100; // Convert to cents
//   };

//   useEffect(() => {
//     if (cart.length > 0) {
//       axios.post('http://localhost:5000/create-payment-intent', {
//         amount: calculateTotal(),
//       })
//         .then((response) => {
//           console.log('Payment Intent Response:', response.data); // Check response data
//           setClientSecret(response.data.clientSecret);
//         })
//         .catch((error) => {
//           console.error('Error creating payment intent:', error);
//         });
//     }
//   }, [cart]);

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (!stripe || !elements) {
//       return;
//     }

//     if (!clientSecret) {
//       console.error('Client secret is not set.');
//       return;
//     }

//     const cardElement = elements.getElement(CardElement);

//     const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
//       payment_method: {
//         card: cardElement,
//       },
//     });

//     if (error) {
//       console.error(error.message);
//     } else if (paymentIntent.status === 'succeeded') {
//       console.log('Payment successful!');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <CardElement />
//       <button type="submit" disabled={!stripe}>
//         Pay
//       </button>
//     </form>
//   );
// };

// const Cart = () => {
//   const dispatch = useDispatch();
//   const cart = useSelector((state) => state.cart.cart);

//   const calculateTotal = () => {
//     let total = cart.reduce((acc, item) => {
//       let price = 0;
//       if (item.price) {
//         if (typeof item.price === 'string') {
//           price = parseFloat(item.price.replace('$', ''));
//         } else if (typeof item.price === 'number') {
//           price = item.price;
//         }
//       }
//       return acc + (price * item.quantity);
//     }, 0);
//     return total;
//   };

//   const total = calculateTotal();
//   const gst = total * 0.18;
//   const discount = total * 0.10;
//   const finalTotal = total + gst - discount;

//   return (
//     <div className='cart-page'>
//       <div className='cart-items'>
//         <h1>Your Cart</h1>
//         {cart.length === 0 ? (
//           <div className='empty-cart'>
//             <h2>It looks like your cart is empty</h2>
//             <h5>Not sure where your items went?</h5>
//             <div className='cart-actions'>
//               <Link to='/menu'><button className='cart-button'>Continue Shopping</button></Link>
//             </div>
//           </div>
//         ) : (
//           cart.map((item, index) => (
//             <div key={index} className='cart-item'>
//               <img src={imageMap[item.img]} alt={item.name} />
//               <div className='item-details'>
//                 <h3>{item.name}</h3>
//                 <p>${parseFloat(item.price).toFixed(2)}</p>
//                 <div className="quantity-control">
//                   <button className='minus' onClick={() => dispatch(decrementQuantity(item.id))}>-</button>
//                   <span>{item.quantity}</span>
//                   <button className='plus' onClick={() => dispatch(incrementQuantity(item.id))}>+</button>
//                 </div>
//               </div>
//               <button className='remove-button' onClick={() => dispatch(removeFromCart(item))}>Remove</button>
//             </div>
//           ))
//         )}
//       </div>
//       <div className='cart-summary'>
//         <h2>Order Summary</h2>
//         <div className='summary-details'>
//           <p>Total: ${total.toFixed(2)}</p>
//           <p>GST (18%): ${gst.toFixed(2)}</p>
//           <p>Discount (10%): -${discount.toFixed(2)}</p>
//           <h3>Final Total: ${finalTotal.toFixed(2)}</h3>
//         </div>
//         <Elements stripe={stripePromise}>
//           <PaymentForm />
//         </Elements>
//       </div>
//     </div>
//   );
// };

// export default Cart;
