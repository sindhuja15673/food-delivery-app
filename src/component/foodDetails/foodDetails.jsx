import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import FoodItem from '../menu/food';
import HelmetComponent from '../helmet/helmet';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../saga/action/action';

const FoodDetail = () => {
  const { id } = useParams();
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchFoodDetail = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/products/${id}`);
        console.log('Fetching food details for ID:', id);
        console.log('API Response:', response);
        setFood(response.data);
      } catch (error) {
        console.error('Error fetching food detail:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFoodDetail();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!food) {
    return <p>Food item not found</p>;
  }

  const handleAddClick = () => {
      dispatch(addToCart(food));
      toast.success('Items added to cart!');
    };

  const imageSrc = `${process.env.REACT_APP_API_BASE_URL}/assets/${food.img}`;

  return (
    <div style={{ width: '250px', margin: 'auto' }}>
      <HelmetComponent
        title={food.name}
        description={food.price}
        keywords="restaurant, food delivery, online ordering, best food, order food online"
        ogTitle={food.name} 
        ogDescription={food.price}
        ogUrl={`http://192.168.43.46:3000/food/${food.id}`}
        ogImage={food.img}
        // ogImage='https://res.cloudinary.com/dhevjlnnc/image/upload/v1735892233/dosa1_cvbvnr.jpg'
        ogImageAlt="Delicious food banner"
        ogImageWidth="1200"
        ogImageHeight="630"
      />
     
      <ToastContainer />

      <FoodItem food={food} onAddClick={handleAddClick}/>
    </div>
  );
};

export default FoodDetail;
