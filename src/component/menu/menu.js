import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ScrollableSection from './scrollbar';
import Popup from './popup';
import SkeletonLoading from '../skeletonLoader';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Helmet } from 'react-helmet';
import HelmetComponent from '../helmet/helmet';

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

  

  const handleAddClick = (food) => {
    setSelectedFood(food);
    setShowPopup(true);
  };

  const handleAddToCart = () => {
    setShowPopup(false);
    toast.success('Items added to cart!');
  };
  const generateJsonLd = () => {
    return {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": foodItems.map(food => food.name).join(', '),
      "image": foodItems.map(food => `${process.env.REACT_APP_API_BASE_URL}/images/${food.img}`).join(', '),
      "description": "Food items available for order on our menu",
      "sku": foodItems.map(food => food.id).join(', '),
      "category": category.join(', '),
      "offers": {
        "@type": "Offer",
        "priceCurrency": "USD",
        "price": foodItems.map(food => food.price).join(', ')
      }
    };
  };
  return (
    <div>
       <HelmetComponent
        title="Our Menu - Best Food Delivered to Your Door"
        description="Explore our delicious food menu, including vegetarian, non-vegetarian, and snacks. Order your favorite meals now!"
        keywords="menu, food, restaurant, order food online, delicious food, vegetarian food, non-vegetarian food, snacks" 
        ogTitle="Our Food Menu"
        ogDescription="Browse our wide selection of food items and order online. Fresh, tasty, and delivered to your door!"
        ogUrl="http://192.168.0.107:3000"
        ogImage="http://192.168.0.107:3000/assets/logo.png"
        ogImageAlt="Delicious food banner"
        ogImageWidth="300"
        ogImageHeight="200"
      />
      
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


