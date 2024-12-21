import React, { useState, useEffect } from 'react';
import './header.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import logo from '../../assets/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FaHome } from "react-icons/fa";
import { IoFastFood } from "react-icons/io5";
import { IoMdCart } from "react-icons/io";

export default function Header() {
  const [isLoading, setIsLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart.cart);

  // Calculate the total number of items in the cart
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Simulate loading delay for demonstration
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); 

    return () => clearTimeout(timer);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = ()=>{
    setMenuOpen(false);
  }
  return (
    <div className='header'>
      <div className='head'>
        {isLoading ? (
          <Skeleton height={50} width={150} className='logo-skeleton' />
        ) : (
          <img className='logo' src={logo} alt="Logo" />
        )}
        <div className='menu-icon' onClick={toggleMenu}>
          <FontAwesomeIcon icon={faBars} size="lg" />
        </div>
        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
       
          {isLoading ? (
            <>
              <Skeleton height={20} width={50} />
              <Skeleton height={20} width={50} style={{ marginLeft: 10 }} />
              <Skeleton height={20} width={50} style={{ marginLeft: 10 }} />
            </>
          ) : (
            <>
              <Link onClick={closeMenu} style={{ textDecoration: 'none', color: 'black' }} to='/'><li><FaHome />Home</li></Link>
              <Link onClick={closeMenu} style={{ textDecoration: 'none', color: 'black' }} to='/menu'><li><IoFastFood />Menu</li></Link>
              <Link onClick={closeMenu} style={{ textDecoration: 'none', color: 'black' }} to='/cart'>
                <li>
                <IoMdCart />Cart {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
                </li>
              </Link>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}
