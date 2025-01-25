import React from 'react';

const Navbar = () => {
  return (
    <nav className='navbar'>
      <div className='navbar-left'>
        <img src="/path" alt="company logo" className='logo' />
        <span className='company-name'>Tech-Avengers</span>
      </div>
      <div className='navbar-right'>
        <a href="#home" className='nav-link'>Home</a>
        <a href="#about" className='nav-link'>About</a>
        <a href="#contact" className='nav-link'>Contact Us</a>
      </div>
    </nav>
  )
}

export default Navbar
