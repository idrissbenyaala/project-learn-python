import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Carousel from './components/Carousel';
import Login from './components/Login';
import About from './components/About';
<<<<<<< HEAD
=======
// import Team from './components/Team';
>>>>>>> 8513ab16611c2c3192a8397a9cb38dc70f9ecbd5
import Contact from './components/Contact.js';
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
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import Home from './components/Home';

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
    return <Spinner />;
  }

  return (
    <Router>
      <ScrollToTop /> {/* Ensures the page scrolls to the top on route change */}

      <Routes>
        {/* Redirect root (/) to /login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
<<<<<<< HEAD

=======
        
>>>>>>> 8513ab16611c2c3192a8397a9cb38dc70f9ecbd5
        {/* Login Route */}
        <Route path="/login" element={<Login />} />

        {/* Main Client Interface Route */}
<<<<<<< HEAD
        <Route
          path="/home"
          element={
            <ProtectedRoute requiredRole="CLIENT">
              <Home />
            </ProtectedRoute>
          }
        />
=======
        
        <Route
  path="/home"
  element={
    <Home />
  }
/>
>>>>>>> 8513ab16611c2c3192a8397a9cb38dc70f9ecbd5

        {/* Admin Interface Route */}
        <Route
          path="/admin"
          element={
<<<<<<< HEAD
            <ProtectedRoute requiredRole="ADMIN CLIENT">
              <div className="d-flex">
                <Header />
                <Sidebar setContent={setContent} /> {/* Sidebar updates main content */}
                <MainContent content={content} /> {/* MainContent dynamically renders content */}
              </div>
            </ProtectedRoute>
          }
        />

        {/* Protected Routes for Client */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute requiredRole="CLIENT">
              <Profile />
            </ProtectedRoute>
          }
        />
=======
            <div className="d-flex">
              <Header />
              <Sidebar setContent={setContent} /> {/* Sidebar updates main content */}
              <MainContent content={content} /> {/* MainContent dynamically renders content */}
            </div>
          }
        />

        {/* Protected Routes */}
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
>>>>>>> 8513ab16611c2c3192a8397a9cb38dc70f9ecbd5
        <Route id="about" path="/about" element={<About />} />
        <Route id="courses" path="/courses" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseDetails />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/quiz/:id" element={<QuizDetails />} />
<<<<<<< HEAD
        <Route
          id="register"
          path="/register"
          element={
            
              <Register />
           
          }
        />
=======
        <Route id="register" path="/register" element={<Register />} />
>>>>>>> 8513ab16611c2c3192a8397a9cb38dc70f9ecbd5
      </Routes>
    </Router>
  );
}

<<<<<<< HEAD
export default App;
=======
export default App;
>>>>>>> 8513ab16611c2c3192a8397a9cb38dc70f9ecbd5
