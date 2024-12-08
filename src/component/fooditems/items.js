
import React, { useState, useEffect, useRef } from 'react';
import img from '../../assets/logo.png'; // default image
import './items.css';


const imageMap = {
  'logo.png': img,
};
export default function Items() {
  const [foodItems, setFoodItems] = useState([]);
  const scrollContainerRef = useRef();

  useEffect(() => {
    fetch('/fooditems.json')  
      .then((response) => response.json())
      .then((data) => {
        const updatedFoodItems = data.map(item => {
          const price = parseFloat(item.price.replace('$', '').trim()); 
          return {
            ...item,
            img: item.img || img,
            price: isNaN(price) ? 0.00 : price, 
          };
        });
        setFoodItems(updatedFoodItems);
      })
      .catch((error) => console.error('Error fetching food items:', error));
  }, []);

  const scrollLeft = () => {
    scrollContainerRef.current.scrollBy({
      left: -200,
      behavior: 'smooth',
    });
  };

  const scrollRight = () => {
    scrollContainerRef.current.scrollBy({
      left: 200,
      behavior: 'smooth',
    });
  };

  return (
    <div>
      <h1>Food Items</h1>
      <div className="scroll-container">
        <button className="scroll-button left" onClick={scrollLeft}>←</button>
        <div ref={scrollContainerRef} className="food-container">
          {foodItems.map((item) => (
            <div key={item.id} className="food-item">
              <img src={imageMap[item.img]} alt={item.name} className="food-item-img" />
              <h2>{item.name}</h2>
              <p>Ratings</p>
              <p>${item.price.toFixed(2)}</p>
              <button>Add</button>
            </div>
          ))}
        </div>
        <button className="scroll-button right" onClick={scrollRight}>→</button>
      </div>
    </div>
  );
}
