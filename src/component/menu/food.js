// src/components/FoodItem.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import pizza from '../../assets/pizza.jpg';
import burger from '../../assets/burger.jpg';
import chickenpizza from '../../assets/chicken pizza.jpg';
import wings from '../../assets/chicken wings.jpg';
import springRolls from '../../assets/spring-rolls.jpg';
import fries from '../../assets/fries.jpeg';
import { incrementQuantity, decrementQuantity } from '../../saga/action/action';
import logo from '../../assets/logo.png';

import { FaStar } from "react-icons/fa6";
import './food.css'; 


const imageMap = {
  'logo.png': logo,
  'pizza.jpg':pizza,
  'burger.jpg':burger,
  'chicken pizza.jpg':chickenpizza,
  'chicken wings.jpg':wings,
  'spring-rolls.jpg':springRolls,
  'fries.jpeg':fries
};
const FoodItem = ({ food, onAddClick }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cart);

  const handleIncrement = (itemId) => {
    dispatch(incrementQuantity(itemId));
  };

  const handleDecrement = (itemId) => {
    dispatch(decrementQuantity(itemId));
  };

const categoryClass = food.category.toLowerCase();

  return (
    <div className="food-item" key={food.id}>
      <img src={imageMap[food.img]} alt={food.name}></img>
      <h2>{food.name} </h2>
      <p><p className={`food-items ${categoryClass}`}><FaStar /></p>{food.ratings}</p>
      <p>${food.price ? parseFloat(String(food.price).replace('$', '')).toFixed(2) : '0.00'}</p>
      {cartItems.some(cartItem => cartItem.id === food.id) ? (
        <div className="quantity-controls">
          <button className='minus' onClick={() => handleDecrement(food.id)}>-</button>
          <span>{cartItems.find(cartItem => cartItem.id === food.id).quantity}</span>
          <button className='plus' onClick={() => handleIncrement(food.id)}>+</button>
        </div>
      ) : (
        <button className='add' onClick={() => onAddClick(food)}>Add</button>
      )}
    </div>
  );
};

export default FoodItem;


