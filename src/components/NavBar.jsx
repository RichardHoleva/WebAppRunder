import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import '../styles/navbar.css';
import Explore from '../assets/ExploreButton.png';
import Home from '../assets/HomeButton.png';
import Inbox from '../assets/InboxButton.png';
import Profile from '../assets/MyProfile.png';

const NavBar = () => {
  const location = useLocation();
  
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <ul className="navbar-menu">
          <li className="navbar-item">
            <Link to="/dashboard" className={`navbar-link ${location.pathname === '/dashboard' ? 'active' : ''}`}>
              <img src={Home} alt="Home" className="navbar-icon" />
              <span>Home</span>
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/explore" className={`navbar-link ${location.pathname === '/explore' ? 'active' : ''}`}>
              <img src={Explore} alt="Explore" className="navbar-icon" />
              <span>Explore</span>
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/create-general" className={`navbar-link ${location.pathname === '/create-general' ? 'active' : ''}`}>
              <div className="create-button">
                <span className="plus-icon">+</span>
              </div>
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/inbox" className={`navbar-link ${location.pathname === '/inbox' ? 'active' : ''}`}>
              <img src={Inbox} alt="Inbox" className="navbar-icon" />
              <span>Inbox</span>
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/profile" className={`navbar-link ${location.pathname === '/profile' ? 'active' : ''}`}>
              <img src={Profile} alt="Profile" className="navbar-icon" />
              <span>Profile</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;