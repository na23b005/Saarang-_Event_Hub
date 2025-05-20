import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import {FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const onLogout = () => {
    logout();
    navigate('/');
  };

  const authLinks = (
    <ul className="nav-links">
      <li>
        <Link to="/">Events</Link>
      </li>
      <li>
        <Link to="/my-registrations">My Registrations</Link>
      </li>
      <li className="user-info">
        <FaUserCircle className="user-icon" />
        <span className="hide-sm">{user && user.name}</span>
        <button onClick={onLogout} className="logout-btn">
          <FaSignOutAlt /> <span className="hide-sm">Logout</span>
        </button>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul className="nav-links">
      <li>
        <Link to="/">Events</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
      <li>
        <Link to="/register" className="btn-primary">Sign Up</Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="logo">
        <img src="https://pbs.twimg.com/profile_images/1870450756891136000/pCN1m4Io_400x400.jpg" alt="Saarang Logo" className="saarang-logo" style={{ height: '40px', marginRight: '10px' }} />
          <h1>Saarang Event Hub</h1>
        </Link>
        {isAuthenticated ? authLinks : guestLinks}
      </div>
    </nav>
  );
};

export default Navbar;