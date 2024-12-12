import React, { useState, useEffect } from 'react';
import banner from '../../assets/banner-img.png';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './baner.css';

export default function Baner() {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); 

    return () => clearTimeout(timer);
  }, []);

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
    <div className='baners'>
      <div className='baner'>
            <h1>Escape to South India From USA</h1>
            <hr></hr>
            <p>
              Whether it's indulging in comfort food, exploring Indian flavors, or catering to dietary preferences,
              Indulge in the vibrant flavors of South India right here in the heart of the USA.
            </p>
            <img src={banner} alt="banner" />
      </div>
    </div>
          </>
        )}
      </>
  );
}
