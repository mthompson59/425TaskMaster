// Navbar.js
import React from 'react';
import './navbar.css';

const Navbar = ({ onAddClick }) => {
  return (
    <div className="navbar">
      <h1>Fortnite TODO List</h1>
      <div className="navbar-buttons">
        {/* Add any other navigation items or links here */}
        <button className="add-button" onClick={onAddClick}>
          Add
        </button>
      </div>
    </div>
  );
};

export default Navbar;