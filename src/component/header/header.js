import React from 'react'
import './header.css';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png'
export default function header() {
  return (
    <div className='header'>
    <div className='head'>
       
       <img className='logo' src={logo}></img>
        <ul>
            <Link style={{textDecoration:'none', color:'black'}} to='/'><li>Home</li></Link>
            <Link style={{textDecoration:'none', color:'black'}} to='/menu'><li>Menu</li></Link>
            <Link style={{textDecoration:'none', color:'black'}} to='/cart'><li>Cart</li></Link>
        </ul>
    </div>
    </div>
  )
}
