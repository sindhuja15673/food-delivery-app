import React from 'react'
import banner from '../../assets/banner-img.png';
import './baner.css'
export default function baner() {
  return (
    <div className='baners'>
        
      <div className='baner'>
        <h1>Escape to South India From USA</h1>
        <hr></hr>
        <p>Whether it's indulging in comfort food, exploring Indian flavors, or catering to dietary preferences, Indulge in the vibrant flavors of South India right here in the heart of the USA.
        </p>
        <img src={banner}></img>
      </div>
    </div>
  )
}
