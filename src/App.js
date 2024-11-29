import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Carousel from './components/Carousel';
import Login from './components/Login';
import About from './components/About';
import Team from './components/Team';
import Contact from './components/Contact';
import Spinner from './components/Spinner';
import Services from './components/Services';
import Quiz from './components/Quiz';
import Courses from './components/Courses';
import Register from './components/Register';
import Profile from './components/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import CourseDetails from './components/CourseDetails';
import QuizDetails from './components/QuizDetails';
import ScrollToTop from './components/ScrollToTop';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';

function App() {
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState('dashboard'); // State to manage admin main content

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Stop loading after 2 seconds
    }, 2000);

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  if (loading) {
    return <Spinner />; // Show loading spinner while the page is loading
  }

  return (
    <Router>
      <ScrollToTop /> {/* Ensures the page scrolls to the top on route change */}

      <Routes>
        {/* Redirect root (/) to /login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* Login Route */}
        <Route path="/login" element={<Login />} />

        {/* Main Client Interface Route */}
        <Route
          path="/home"
          element={
            <ProtectedRoute requiredRole="CLIENT">
              <>
                <Navbar />
                <div id="carousel"><Carousel /></div>
                <div id="about"><About /></div>
                <div id="services"><Services /></div>
                <div id="courses"><Courses /></div>
                <div id="quiz"><Quiz /></div>
                <div id="team"><Team /></div>
                <div id="contact"><Contact /></div>
                <Footer />
              </>
            </ProtectedRoute>
          }
        />


        {/* Admin Interface Route */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRole="ADMIN CLIENT">
              <div className="d-flex">
                <Header />
                <Sidebar setContent={setContent} /> {/* Sidebar updates main content */}
                <MainContent content={content} /> {/* MainContent dynamically renders content */}
              </div>
            </ProtectedRoute>
          }
        />
        
        <Route id="about" path="/about" element={<About />} />
        <Route id="courses" path="/courses" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseDetails />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/quiz/:id" element={<QuizDetails />} />
        <Route id="register" path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
