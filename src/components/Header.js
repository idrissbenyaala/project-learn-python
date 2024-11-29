import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate from react-router-dom

const Header = () => {
  const navigate = useNavigate(); // Use navigate for redirection

  // Function to handle logout
  const handleLogout = () => {
    // Clear all data from localStorage
    localStorage.clear();

    // Redirect to login page
    navigate('/login');
  };

  return (
    <header id="header" className="header fixed-top d-flex align-items-center">
      <div className="d-flex align-items-center justify-content-between">
        <a href="index.html" className="logo d-flex align-items-center">
          <img src="/assets/img/logo.png" alt="" />
          <span className="d-none d-lg-block">Admin</span>
        </a>
        <i className="bi bi-list toggle-sidebar-btn"></i>
      </div>

      <div className="search-bar">
        <form className="search-form d-flex align-items-center" method="POST" action="#">
          <input
            type="text"
            name="query"
            placeholder="Search"
            title="Enter search keyword"
          />
          <button type="submit" title="Search">
            <i className="bi bi-search"></i>
          </button>
        </form>
      </div>

      <nav className="header-nav ms-auto">
        <ul className="d-flex align-items-center">
          <li className="nav-item dropdown pe-3">
            <a
              className="nav-link nav-profile d-flex align-items-center pe-0"
              href="#"
              data-bs-toggle="dropdown"
            >
              <span className="d-none d-md-block dropdown-toggle ps-2">
                Admin
              </span>
            </a>
            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
              <li>
                <button
                  className="dropdown-item d-flex align-items-center"
                  onClick={handleLogout} // Call the handleLogout function on click
                >
                  <i className="bi bi-box-arrow-right"></i>
                  <span>Sign Out</span>
                </button>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;