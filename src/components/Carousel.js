import React from 'react';
import { Link as ScrollLink } from 'react-scroll'; // For smooth scrolling
import { Link as RouterLink } from 'react-router-dom'; // For routing

const Carousel = () => {
  return (
    <div className="container-fluid p-0 mb-5">
      <div className="owl-carousel header-carousel position-relative">
        <div className="owl-carousel-item position-relative">
          <img className="img-fluid" src="img/carousel-1.jpg" alt="" />
          <div
            className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center"
            style={{ background: 'rgba(24, 29, 56, .7)' }}
          >
            <div className="container">
              <div className="row justify-content-start">
                <div className="col-sm-10 col-lg-8">
                  <h5 className="text-primary text-uppercase mb-3 animated slideInDown">
                    Best Online Courses
                  </h5>
                  <h1 className="display-3 text-white animated slideInDown">
                    The Best Online Learning Python Platform
                  </h1>
                  <br />
                  {/* Read More button for scrolling to About section */}
                  <ScrollLink
                    to="about"
                    smooth={true}
                    duration={500}
                    className="btn btn-primary py-md-3 px-md-5 me-3 animated slideInLeft"
                  >
                    Read More
                  </ScrollLink>
                  {/* Join Now button for navigating to /login */}
                  <RouterLink
                    to="/login"
                    className="btn btn-light py-md-3 px-md-5 animated slideInRight"
                  >
                   Log In
                  </RouterLink>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Repeat similar for other carousel items if needed */}
      </div>
    </div>
  );
};

export default Carousel;
