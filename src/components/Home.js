import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { scroller } from 'react-scroll';
import Navbar from './Navbar';
import Footer from './Footer';
import Carousel from './Carousel';
import About from './About';
import Services from './Services';
import Courses from './Courses';
import Quiz from './Quiz';
import Contact from './Contact';

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo) {
      // Scroll to the target section
      scroller.scrollTo(location.state.scrollTo, {
        smooth: true,
        duration: 500,
        offset: -70, // Adjust offset for navbar height if needed
      });
    }
  }, [location]);

  return (
    <>
      <Navbar />
      <div id="carousel"><Carousel /></div>
      <div id="about"><About /></div>
      <div id="services"><Services /></div>
      <div id="courses"><Courses /></div>
      <div id="quiz"><Quiz /></div>
      <div id="contact"><Contact /></div>
      <Footer />
    </>
  );
};

export default Home;
