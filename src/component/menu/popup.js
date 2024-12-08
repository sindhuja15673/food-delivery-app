
import React, { useState } from 'react';
import './popup.css';
import { RiCloseLargeFill } from "react-icons/ri";
import { useDispatch } from 'react-redux';
import { addToCart } from '../../saga/action/action';

export default function Popup({ food, foodItems, onClose, onAddToCart }) {
  const dispatch = useDispatch();
  const [selectedItems, setSelectedItems] = useState([]);

  const similarItems = foodItems.filter(item => item.name === food.name && item.id !== food.id);

  const handleSelectItem = (item) => {
    setSelectedItems(prevItems => {
      if (prevItems.includes(item)) {
        return prevItems.filter(i => i.id !== item.id);
      } else {
        return [...prevItems, item];
      }
    });
  };

  const handleContinue = () => {
        const itemsToAdd = [...selectedItems, food];
        itemsToAdd.forEach(item => {
          dispatch(addToCart(item));
        });
        onAddToCart(itemsToAdd);
      };

  
  return (
    <div className="popup">
      <button className='close' onClick={onClose}><RiCloseLargeFill /></button>
      <h3>{food.name} - {food.price}</h3>
      <h2>Customise as per your taste</h2>
      <hr></hr>
      <h4>Crusts</h4>
      <div className="container">
        {similarItems.map((item) => (
          <div key={item.id} className={`foods ${selectedItems.includes(item) ? 'selected' : ''}`}>
           
              <h3>{item.name}</h3>
              <p>{item.price}</p>
            
            <input 
              type="checkbox" 
              id={`food-${item.id}`} 
              name="food" 
              value={item.id}
              checked={selectedItems.includes(item)}
              onChange={() => handleSelectItem(item)} 
            />
            <label htmlFor={`food-${item.id}`}></label>
            
          </div>
        ))}
      </div>
      <div className='buttons'>
        <button className='add' onClick={handleContinue}>Skip</button>
        <button className='btn' onClick={handleContinue}>Continue</button>
      </div>
    </div>
  );
}




