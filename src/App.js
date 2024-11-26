import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Carousel from './components/Carousel';
import Login from './components/Login';
import About from './components/About';
import Team from './components/Team';
import Testimonials from './components/Testimonials';
import Spinner from './components/Spinner';
import Services from './components/Services';
import Quiz from './components/Quiz';
import Courses from './components/Courses';
import Register from './components/Register';
import Profile from './components/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import CourseDetails from './components/CourseDetails';
import QuizDetails from './components/QuizDetails';
import ScrollToTop from './components/ScrollToTop.js';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Stop loading after 2 seconds
    }, 2000);

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <Router>
      <Navbar />
      <ScrollToTop /> {/* Ensures the page scrolls to the top on route change */}

      <Routes>
        <Route path="/" element={
          <>
           <div id="carousel"><Carousel /></div> 
            <div id="about"> <About /></div>
        
      
              <div id="services"><Services /></div>
            <div id="courses"><Courses /></div>
            <div id="quiz"><Quiz /></div>

            <div id="team"><Team /></div>
            <div id="contact"><Testimonials /></div>
            
            
          </>
        } />
        <Route path="/profile" element={<ProtectedRoute> 
          <Profile />
    </ProtectedRoute>
  }
/>
        <Route path="/" element={<Carousel />} />
        <Route id="about" path="/about" element={<About />} />
        <Route id="courses" path="/courses" element={<Courses />} />

        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseDetails />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/quiz/:id" element={<QuizDetails />} />
        <Route path="/courses/:courseId" element={<CourseDetails />} />
        <Route id="login" path="/login" element={<Login />} />
        <Route id="register" path="/register" element={<Register />} />

      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
