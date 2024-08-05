import React, { useState } from 'react';
import './navbar.css';
import logo from './Note_Nest_logo.png';
import { Link } from 'react-router-dom';

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='Nav'>
     <Link to="//"> <img src={logo} alt="Logo" /></Link>
      <div className={`inner_nav ${isOpen ? 'open' : ''}`}>
        <Link to="/" className='nav-link'><h3>Home</h3></Link>
        <Link to="/Aboutus" className='nav-link'><h3>About Us</h3></Link>
        <Link to="/Contactus" className='nav-link'><h3>Contact Us</h3></Link>
      </div>
      <Link to="/FileNest" className='button-link'>
        <button className='nav_btn'>Go to File Nest</button>
      </Link>
      <div className='hamburger' onClick={toggleMenu}>
        <div className='line'></div>
        <div className='line'></div>
        <div className='line'></div>
      </div>
    </div>
  );
}

export default NavBar;
