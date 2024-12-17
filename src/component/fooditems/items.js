import React, { useState, useEffect } from 'react';
import './items.css';
import axios from 'axios';
import Scrollbar from '../menu/scrollbar';
import SkeletonLoading from '../skeletonLoader';  
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Popup from '../menu/popup';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function Items() {
  const [foodItems, setFoodItems] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedFood, setSelectedFood] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/products`);
        setFoodItems(res.data);
        setLoading(false);  
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);  
      }
    };

    
    const timer = setTimeout(() => {
      fetchProducts();
    }, 1000);


    return () => clearTimeout(timer);
  }, []);

  const handleAddClick = (foodItem) => {
    setSelectedFood(foodItem);
    setShowPopup(true);
  };

  const handleAddToCart = () => {
    setShowPopup(false);
    toast.success('Items added to cart!');
  };

  return (
    <div>
       {loading ? (
        <Skeleton height={50} width={250} style={{ marginLeft: 10, marginTop: 10 }} />
      ) : (
      <h1>Food Items</h1>
    )}
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
        </>
      ) : (
        <Scrollbar title="Delicious Food" foods={foodItems} onAddClick={handleAddClick} />
      )}
    </div>
  );
}
