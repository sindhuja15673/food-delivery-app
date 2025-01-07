// src/components/ScrollableSection.js
import React, { useRef } from 'react';
import FoodItem from './food';


const ScrollableSection = ({ title, foods, onAddClick }) => {
  const scrollRef = useRef();

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -200,
        behavior: 'smooth',
      });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: 200,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div>
      <h1>{title}</h1>
      <div className="scroll-container">
        <button className="scroll-button left" onClick={scrollLeft}>←</button>
        <div ref={scrollRef} className="food-container">
          {foods.map((food) => (
            <FoodItem key={food.id} food={food} onAddClick={onAddClick} />
          ))}
        </div>
        <button className="scroll-button right" onClick={scrollRight}>→</button>
      </div>
    </div>
  );
};

export default ScrollableSection;



