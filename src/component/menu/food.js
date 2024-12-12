// src/components/FoodItem.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { incrementQuantity, decrementQuantity } from '../../saga/action/action';
import logo from '../../assets/logo.png';


const imageMap = {
  'logo.png': logo,
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

  return (
    <div className="food-item" key={food.id}>
      <img src={imageMap[food.img]} alt={food.name}></img>
      <h2>{food.name} </h2>
      <p>{food.ratings}</p>
      <p>${food.price ? parseFloat(String(food.price).replace('$', '')).toFixed(2) : '0.00'}</p>
      {cartItems.some(cartItem => cartItem.id === food.id) ? (
        <div className="quantity-controls">
          <button onClick={() => handleDecrement(food.id)}>-</button>
          <span>{cartItems.find(cartItem => cartItem.id === food.id).quantity}</span>
          <button onClick={() => handleIncrement(food.id)}>+</button>
        </div>
      ) : (
        <button onClick={() => onAddClick(food)}>Add</button>
      )}
    </div>
  );
};

export default FoodItem;
