import React from 'react';
import { Link } from 'react-scroll';
import { Link as RouterLink } from 'react-router-dom'; // For routing
import { Link as ScrollLink } from 'react-scroll'; // For smooth scrolling

const Navbar = () => {
  return (
    
    <nav className="navbar navbar-expand-lg bg-white navbar-light shadow sticky-top p-0">
      <a href="#" className="navbar-brand d-flex align-items-center px-4 px-lg-5">
        <h2 className="m-0 text-primary">
          <i className="fa fa-book me-3"></i>Aalemny Python
        </h2>
      </a>
      <button
        type="button"
        className="navbar-toggler me-4"
        data-bs-toggle="collapse"
        data-bs-target="#navbarCollapse"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarCollapse">
        <div className="navbar-nav ms-auto p-4 p-lg-0">
        <Link to="/profile" className="nav-item nav-link">
        My Profile
      </Link>
          <Link to="home" smooth={true} duration={500} className="nav-item nav-link">
            Home
          </Link>
          <Link to="about" smooth={true} duration={500} className="nav-item nav-link">
            About
          </Link>
          <Link to="courses" smooth={true} duration={500} className="nav-item nav-link">
            Courses
          </Link>
          <Link to="quiz" smooth={true} duration={500} className="nav-item nav-link">
            Quiz
          </Link>
          <Link to="contact" smooth={true} duration={500} className="nav-item nav-link">
            Contact
          </Link>
        </div>
        <RouterLink
          to="/register"
          smooth={true}
          duration={500}
          className="btn btn-primary py-4 px-lg-5 d-none d-lg-block"
        >
          Join Now<i className="fa fa-arrow-right ms-3"></i>
        </RouterLink>
        
      </div>
    </nav>
  );
};

export default Navbar;
