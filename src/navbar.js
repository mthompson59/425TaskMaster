import React from 'react';
import './navbar.css';
import logo from './logo.png'; // Update the path accordingly

const Navbar = ({ onAddClick }) => {
  return (
    <div className="navbar">
      <img src={logo} alt="Logo" className="navbar-logo" />
      <h1>QuickTask</h1>
      <div className="navbar-buttons">
        <button className="add-button" onClick={onAddClick}>
          Add
        </button>
      </div>
    </div>
  );
};

export default Navbar;
