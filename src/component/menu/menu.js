import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ScrollableSection from './scrollbar';
import Popup from './popup';
import SkeletonLoading from '../skeletonLoader';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function Menu() {
  const [foodItems, setFoodItems] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);
  const [category, setCategory] = useState([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/products`);
        setFoodItems(res.data);
        setLoading(false); 
        const uniqueCategories = [...new Set(res.data.map(item => item.category))];
        setCategory(uniqueCategories)
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false); 
      }
    };


    const timer = setTimeout(() => {
      fetchProducts();
    }, 1000);

    // Cleanup timer
    return () => clearTimeout(timer);
  }, []);

  // const vegetarianFoods = foodItems.filter(food => food.category === 'veg');
  // const nonVegetarianFoods = foodItems.filter(food => food.category === 'nonveg');
  // const snacks = foodItems.filter(food => food.category === 'snack');

  const handleAddClick = (food) => {
    setSelectedFood(food);
    setShowPopup(true);
  };

  const handleAddToCart = () => {
    setShowPopup(false);
    toast.success('Items added to cart!');
  };

  return (
    <div>
      {showPopup && (
        <Popup
          food={selectedFood}
          foodItems={foodItems}
          onClose={() => setShowPopup(false)}
          onAddToCart={handleAddToCart}
        />
      )}
      <ToastContainer />
      {loading ? (
        <>
        <Skeleton height={50} width={250} style={{ marginLeft: 10, marginTop: 10 }} />
        <div className="food-item-skeleton-container">
          <SkeletonLoading />
          <SkeletonLoading />
          <SkeletonLoading />
          <SkeletonLoading />
          <SkeletonLoading />
        </div>
        <Skeleton height={50} width={250} style={{ marginLeft: 10, marginTop: 10 }} />
         <div className="food-item-skeleton-container">
         <SkeletonLoading />
         <SkeletonLoading />
         <SkeletonLoading />
         <SkeletonLoading />
         <SkeletonLoading />
        
       </div>
       <Skeleton height={50} width={250} style={{ marginLeft: 10, marginTop: 10 }} />
        <div className="food-item-skeleton-container">
        <SkeletonLoading />
        <SkeletonLoading />
        <SkeletonLoading />
        <SkeletonLoading />
        <SkeletonLoading />
       
      </div>
      </>
      ) : (
      category.map((category)=>{
        const foodCategory = foodItems.filter(food => food.category === category);
        return(
          <ScrollableSection key={category} title={`${category.charAt(0).toUpperCase() + category.slice(1)} Foods`} foods={foodCategory} onAddClick={handleAddClick} />
        )
      })
    )}
    
      {/* <ScrollableSection title="Vegetarian Foods" foods={vegetarianFoods} onAddClick={handleAddClick} />
      <ScrollableSection title="Non-Vegetarian Foods" foods={nonVegetarianFoods} onAddClick={handleAddClick} />
      <ScrollableSection title="Snacks" foods={snacks} onAddClick={handleAddClick} /> */}
    </div>
  );
}







// import React, { useState, useEffect, useRef } from 'react';
// import logo from '../../assets/logo.png';
// import '../fooditems/items.css';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Popup from './popup'; 
// import { useDispatch } from 'react-redux';
// import { incrementQuantity, decrementQuantity } from '../../saga/action/action';

// const imageMap = {
//   'logo.png': logo,
// };

// export default function Menu() {
//   const [foodItems, setFoodItems] = useState([]);
//   const [showPopup, setShowPopup] = useState(false);
//   const [selectedFood, setSelectedFood] = useState(null);
//   const [cartItems, setCartItems] = useState({});

//   const dispatch = useDispatch();

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await axios.get('http://localhost:5000/api/products');
//         setFoodItems(res.data);
//       } catch (error) {
//         console.error('Error fetching products:', error);
//       }
//     };

//     fetchProducts();
//   }, []);

//   const vegetarianFoods = foodItems.filter(food => food.category === 'veg');
//   const nonVegetarianFoods = foodItems.filter(food => food.category === 'nonveg');
//   const snacks = foodItems.filter(food => food.category === 'snack');

//   const vegetarianScrollRef = useRef();
//   const nonVegetarianScrollRef = useRef();
//   const snacksScrollRef = useRef();

//   const scrollLeft = (scrollRef) => {
//     if (scrollRef.current) {
//       scrollRef.current.scrollBy({
//         left: -200, 
//         behavior: 'smooth',
//       });
//     }
//   };

//   const scrollRight = (scrollRef) => {
//     if (scrollRef.current) {
//       scrollRef.current.scrollBy({
//         left: 200, 
//         behavior: 'smooth',
//       });
//     }
//   };

//   const handleAddClick = (food) => {
//     setSelectedFood(food);
//     setShowPopup(true);
//   };

//   const handleAddToCart = (items) => {
//     const updatedCartItems = { ...cartItems };
//     items.forEach(item => {
//       if (updatedCartItems[item.id]) {
//         updatedCartItems[item.id].quantity += 1;
//       } else {
//         updatedCartItems[item.id] = { ...item, quantity: 1 };
//       }
//     });
//     setCartItems(updatedCartItems);
//     setShowPopup(false);
//     toast.success('Items added to cart!');
//   };

//   const handleIncrement = (itemId) => {
//     dispatch(incrementQuantity(itemId));
//     setCartItems(prevCartItems => ({
//       ...prevCartItems,
//       [itemId]: {
//         ...prevCartItems[itemId],
//         quantity: prevCartItems[itemId].quantity + 1
//       }
//     }));
//   };

//   const handleDecrement = (itemId) => {
//     dispatch(decrementQuantity(itemId));
//     setCartItems(prevCartItems => {
//       const updatedCartItems = { ...prevCartItems };
//       if (updatedCartItems[itemId].quantity > 1) {
//         updatedCartItems[itemId].quantity -= 1;
//       } else {
//         delete updatedCartItems[itemId];
//       }
//       return updatedCartItems;
//     });
//   };

//   return (
//     <div>
//       {showPopup && (
//         <Popup 
//           food={selectedFood}
//           foodItems={foodItems}
//           onClose={() => setShowPopup(false)}
//           onAddToCart={handleAddToCart}
//         />
//       )}
//       <ToastContainer />
//       <div>
//         <h1>Vegetarian foods</h1>
//         <div className="scroll-container">
//           <button className="scroll-button left" onClick={() => scrollLeft(vegetarianScrollRef)}>←</button>
//           <div ref={vegetarianScrollRef} className="food-container">
//             {vegetarianFoods.map((food) => (
//               <div className="food-item" key={food.id}>
//                 <img src={imageMap[food.img]} alt={food.name}></img>
//                 <h2>{food.name}</h2>
//                 <p>{food.ratings}</p>
//                 <p>${food.price ? parseFloat(String(food.price).replace('$', '')).toFixed(2) : '0.00'}</p>
//                 {cartItems[food.id] ? (
//                   <div className="quantity-controls">
//                     <button onClick={() => handleDecrement(food.id)}>-</button>
//                     <span>{cartItems[food.id].quantity}</span>
//                     <button onClick={() => handleIncrement(food.id)}>+</button>
//                   </div>
//                 ) : (
//                   <button onClick={() => handleAddClick(food)}>Add</button>
//                 )}
//               </div>
//             ))}
//           </div>
//           <button className="scroll-button right" onClick={() => scrollRight(vegetarianScrollRef)}>→</button>
//         </div>
//       </div>
//       <div>
//         <h1>Non-Vegetarian foods</h1>
//         <div className="scroll-container">
//           <button className="scroll-button left" onClick={() => scrollLeft(nonVegetarianScrollRef)}>←</button>
//           <div ref={nonVegetarianScrollRef} className="food-container">
//             {nonVegetarianFoods.map((food) => (
//               <div className="food-item" key={food.id}>
//                 <img src={imageMap[food.img]} alt={food.name}></img>
//                 <h2>{food.name}</h2>
//                 <p>{food.ratings}</p>
//                 <p>${food.price ? parseFloat(String(food.price).replace('$', '')).toFixed(2) : '0.00'}</p>
//                 {cartItems[food.id] ? (
//                   <div className="quantity-controls">
//                     <button onClick={() => handleDecrement(food.id)}>-</button>
//                     <span>{cartItems[food.id].quantity}</span>
//                     <button onClick={() => handleIncrement(food.id)}>+</button>
//                   </div>
//                 ) : (
//                   <button onClick={() => handleAddClick(food)}>Add</button>
//                 )}
//               </div>
//             ))}
//           </div>
//           <button className="scroll-button right" onClick={() => scrollRight(nonVegetarianScrollRef)}>→</button>
//         </div>
//       </div>
//       <div>
//         <h1>Snacks foods</h1>
//         <div className="scroll-container">
//           <button className="scroll-button left" onClick={() => scrollLeft(snacksScrollRef)}>←</button>
//           <div ref={snacksScrollRef} className="food-container">
//             {snacks.map((food) => (
//               <div className="food-item" key={food.id}>
//                 <img src={imageMap[food.img]} alt={food.name}></img>
//                 <h2>{food.name}</h2>
//                 <p>{food.ratings}</p>
//                 <p>${food.price ? parseFloat(String(food.price).replace('$', '')).toFixed(2) : '0.00'}</p>
//                 {cartItems[food.id] ? (
//                   <div className="quantity-controls">
//                     <button onClick={() => handleDecrement(food.id)}>-</button>
//                     <span>{cartItems[food.id].quantity}</span>
//                     <button onClick={() => handleIncrement(food.id)}>+</button>
//                   </div>
//                 ) : (
//                   <button onClick={() => handleAddClick(food)}>Add</button>
//                 )}
//               </div>
//             ))}
//           </div>
//           <button className="scroll-button right" onClick={() => scrollRight(snacksScrollRef)}>→</button>
//         </div>
//       </div>
//     </div>
//   );
// }


// import React, { useState, useEffect, useRef } from 'react';
// import logo from '../../assets/logo.png';
// import '../fooditems/items.css';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Popup from './popup';
// import { useDispatch, useSelector } from 'react-redux';
// import { addToCart, incrementQuantity, decrementQuantity } from '../../saga/action/action';

// const imageMap = {
//   'logo.png': logo,
// };

// export default function Menu() {
//   const [foodItems, setFoodItems] = useState([]);
//   const [showPopup, setShowPopup] = useState(false);
//   const [selectedFood, setSelectedFood] = useState(null);

//   const cartItems = useSelector((state) => state.cart.cart);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await axios.get('http://localhost:5000/api/products');
//         setFoodItems(res.data);
//       } catch (error) {
//         console.error('Error fetching products:', error);
//       }
//     };

//     fetchProducts();
//   }, []);

//   const vegetarianFoods = foodItems.filter(food => food.category === 'veg');
//   const nonVegetarianFoods = foodItems.filter(food => food.category === 'nonveg');
//   const snacks = foodItems.filter(food => food.category === 'snack');

//   const vegetarianScrollRef = useRef();
//   const nonVegetarianScrollRef = useRef();
//   const snacksScrollRef = useRef();

//   const scrollLeft = (scrollRef) => {
//     if (scrollRef.current) {
//       scrollRef.current.scrollBy({
//         left: -200, 
//         behavior: 'smooth',
//       });
//     }
//   };

//   const scrollRight = (scrollRef) => {
//     if (scrollRef.current) {
//       scrollRef.current.scrollBy({
//         left: 200, 
//         behavior: 'smooth',
//       });
//     }
//   };

//   const handleAddClick = (food) => {
//     setSelectedFood(food);
//     setShowPopup(true);
    
//   };

//   const handleAddToCart = () => {
//     setShowPopup(false);
//     toast.success('Items added to cart!');
//   };

//   const handleIncrement = (itemId) => {
//     dispatch(incrementQuantity(itemId));
//   };

//   const handleDecrement = (itemId) => {
//     dispatch(decrementQuantity(itemId));
//   };

//   return (
//     <div>
//       {showPopup && (
//         <Popup 
//           food={selectedFood}
//           foodItems={foodItems}
//           onClose={() => setShowPopup(false)}
//           onAddToCart={handleAddToCart}
//         />
//       )}
//       <ToastContainer />
//       <div>
//         <h1>Vegetarian foods</h1>
//         <div className="scroll-container">
//           <button className="scroll-button left" onClick={() => scrollLeft(vegetarianScrollRef)}>←</button>
//           <div ref={vegetarianScrollRef} className="food-container">
//             {vegetarianFoods.map((food) => (
//               <div className="food-item" key={food.id}>
//                 <img src={imageMap[food.img]} alt={food.name}></img>
//                 <h2>{food.name}</h2>
//                 <p>{food.ratings}</p>
//                 <p>${food.price ? parseFloat(String(food.price).replace('$', '')).toFixed(2) : '0.00'}</p>
//                 {cartItems.some(cartItem => cartItem.id === food.id) ? (
//                   <div className="quantity-controls">
//                     <button onClick={() => handleDecrement(food.id)}>-</button>
//                     <span>{cartItems.find(cartItem => cartItem.id === food.id).quantity}</span>
//                     <button onClick={() => handleIncrement(food.id)}>+</button>
//                   </div>
//                 ) : (
//                   <button onClick={() => handleAddClick(food)}>Add</button>
//                 )}
//               </div>
//             ))}
//           </div>
//           <button className="scroll-button right" onClick={() => scrollRight(vegetarianScrollRef)}>→</button>
//         </div>
//       </div>
//       <div>
//         <h1>Non-Vegetarian foods</h1>
//         <div className="scroll-container">
//           <button className="scroll-button left" onClick={() => scrollLeft(nonVegetarianScrollRef)}>←</button>
//           <div ref={nonVegetarianScrollRef} className="food-container">
//             {nonVegetarianFoods.map((food) => (
//               <div className="food-item" key={food.id}>
//                 <img src={imageMap[food.img]} alt={food.name}></img>
//                 <h2>{food.name}</h2>
//                 <p>{food.ratings}</p>
//                 <p>${food.price ? parseFloat(String(food.price).replace('$', '')).toFixed(2) : '0.00'}</p>
//                 {cartItems.some(cartItem => cartItem.id === food.id) ? (
//                   <div className="quantity-controls">
//                     <button onClick={() => handleDecrement(food.id)}>-</button>
//                     <span>{cartItems.find(cartItem => cartItem.id === food.id).quantity}</span>
//                     <button onClick={() => handleIncrement(food.id)}>+</button>
//                   </div>
//                 ) : (
//                   <button onClick={() => handleAddClick(food)}>Add</button>
//                 )}
//               </div>
//             ))}
//           </div>
//           <button className="scroll-button right" onClick={() => scrollRight(nonVegetarianScrollRef)}>→</button>
//         </div>
//       </div>
//       <div>
//         <h1>Snacks foods</h1>
//         <div className="scroll-container">
//           <button className="scroll-button left" onClick={() => scrollLeft(snacksScrollRef)}>←</button>
//           <div ref={snacksScrollRef} className="food-container">
//             {snacks.map((food) => (
//               <div className="food-item" key={food.id}>
//                 <img src={imageMap[food.img]} alt={food.name}></img>
//                 <h2>{food.name}</h2>
//                 <p>{food.ratings}</p>
//                 <p>${food.price ? parseFloat(String(food.price).replace('$', '')).toFixed(2) : '0.00'}</p>
//                 {cartItems.some(cartItem => cartItem.id === food.id) ? (
//                   <div className="quantity-controls">
//                     <button onClick={() => handleDecrement(food.id)}>-</button>
//                     <span>{cartItems.find(cartItem => cartItem.id === food.id).quantity}</span>
//                     <button onClick={() => handleIncrement(food.id)}>+</button>
//                   </div>
//                 ) : (
//                   <button onClick={() => handleAddClick(food)}>Add</button>
//                 )}
//               </div>
//             ))}
//           </div>
//           <button className="scroll-button right" onClick={() => scrollRight(snacksScrollRef)}>→</button>
//         </div>
//       </div>
//     </div>
//   );
// }
// src/components/Menu.js
