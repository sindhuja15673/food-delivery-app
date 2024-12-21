import React, { useState, useEffect } from 'react';
import banner from '../../assets/banner-img.png';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './baner.css';
import food from '../../assets/dosa1.jpg';
import pasta from '../../assets/pasta.jpg';
export default function Baner() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    const slideInterval = setInterval(nextSlide, 3000);

    return () =>{
      clearTimeout(timer);
      clearInterval(slideInterval);
    } 
  }, []);
  

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % 3); // Loop back to first slide
  };

  return (
    <>

      {isLoading ? (
        <div className='baner-skeleton'>
          <Skeleton height={150} width={250} style={{ marginLeft: 60, marginTop: 200 }} />
          <Skeleton height={200} width={2} style={{ marginTop: 170, marginLeft: 20 }} />
          <Skeleton height={100} width={330} style={{ marginLeft: 30, marginTop: 220 }} />
          <Skeleton height={500} width={550} style={{ marginTop: 80, marginLeft: 50 }} />
        </div>
      ) : (
        <>
          <div className='slide'>
            <div className={`baners ${currentSlide === 0 ? 'active' : ''}`}>
              <div className='baner'>
                <h1>Escape to South India From USA</h1>
                <hr />
                <p>
                  Whether it's indulging in comfort food, exploring Indian flavors, or catering to dietary preferences,
                  Indulge in the vibrant flavors of South India right here in the heart of the USA.
                </p>
                <img className='baneri' src={banner} alt="banner" />
              </div>
            </div>
            <div className={`sliders ${currentSlide === 1 ? 'active' : ''}`}>
            
              <img src={pasta}></img>
            </div>
            <div  className={`sliders ${currentSlide === 2 ? 'active' : ''}`}>
            
              <img src={food}></img>
            </div>
          </div>
        </>
      )}
    </>
  );
}










