
import React, { useState, useEffect } from 'react';
import './popup.css';
import axios from 'axios';
import { RiCloseLargeFill } from "react-icons/ri";
import { useDispatch } from 'react-redux';
import { addToCart } from '../../saga/action/action';

export default function Popup({ food, foodItems, onClose, onAddToCart }) {
  const dispatch = useDispatch();
  const [selectedItems, setSelectedItems] = useState([]);
  const [crusts, setCrusts] = useState([]);
  // const similarItems = foodItems.filter(item => item.name === food.name && item.id !== food.id);
  useEffect(() => {
    const fetchCrusts = async () => {
    try {
    const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/crusts`); // Update with your API endpoint
    //  const data = await response.json();
     setCrusts(response.data);
     } catch (error) {
     console.error('Error fetching crusts:', error);
     }
    };
     fetchCrusts();
    }, []);
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
        {crusts.map((item) => (
          <div key={item.id} className={`foods ${selectedItems.includes(item) ? 'selected' : ''}`}>
           
              <h3>{item.name}</h3>
              <p>{item.price}</p>
            
            <input 
              type="checkbox" 
              id={`crust-${item.id}`} 
              name="crust" 
              value={item.id}
              checked={selectedItems.includes(item)}
              onChange={() => handleSelectItem(item)} 
            />
            <label htmlFor={`crust-${item.id}`}></label>
            
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

