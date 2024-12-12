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
        const res = await axios.get('http://localhost:5000/api/products');
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
    </div>
  );
}







