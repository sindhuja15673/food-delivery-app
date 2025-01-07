import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { incrementQuantity, decrementQuantity } from '../../saga/action/action';
import { useNavigate } from 'react-router-dom';
import { FaStar } from "react-icons/fa6";
import './food.css'; 


const FoodItem = ({ food, onAddClick }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cart);
  const navigate = useNavigate();

  const handleIncrement = (itemId) => {
    dispatch(incrementQuantity(itemId));
  };

  const handleDecrement = (itemId) => {
    dispatch(decrementQuantity(itemId));
  };

  const handleClick = () => {
    navigate(`/food/${food.id}`);

  };

const categoryClass = food.category.toLowerCase();

  return (
    <div className="food-item" key={food.id} onClick={handleClick}>
      <img src={food.img} alt={food.name}></img>
      <h2>{food.name} </h2>
      <p><p className={`food-items ${categoryClass}`}><FaStar /></p>{food.ratings}</p>
      <p>${food.price ? parseFloat(String(food.price).replace('$', '')).toFixed(2) : '0.00'}</p>
      {cartItems.some(cartItem => cartItem.id === food.id) ? (
        <div className="quantity-controls">
          <button className='minus' onClick={(e) => { e.stopPropagation(); handleDecrement(food.id)}}>-</button>
          <span>{cartItems.find(cartItem => cartItem.id === food.id).quantity}</span>
          <button className='plus' onClick={(e) => { e.stopPropagation(); handleIncrement(food.id)}}>+</button>
        </div>
      ) : (
        <button className='add' onClick={(e) => { e.stopPropagation(); onAddClick(food); }}>Add</button>
      )}
    </div>
  );
};

export default FoodItem;
