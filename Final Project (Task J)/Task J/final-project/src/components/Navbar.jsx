import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '2rem 5%',
        position: 'absolute',
        width: '100%',
        zIndex: 100
    }}>
      <div className="logo">
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>AURA COFFEE</Link>
      </div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/form">Reserve</Link>
        <a href="#menu">Menu</a>
        <a href="#contact">Contact</a>
      </div>
    </nav>
  );
};

export default Navbar;
