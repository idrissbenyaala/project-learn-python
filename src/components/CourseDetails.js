import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from './Navbar'; // Import the Navbar component

const CourseDetails = () => {
  const { id } = useParams(); // Get the course ID from the URL
  const [course, setCourse] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        // Fetch course details
        const courseResponse = await fetch("http://localhost:8081/cour/GetCours");
        if (!courseResponse.ok) {
          throw new Error(`Error fetching course details: ${courseResponse.statusText}`);
        }
        const coursesData = await courseResponse.json();
        const matchedCourse = coursesData.find((course) => course.id === parseInt(id, 10));
        if (!matchedCourse) {
          throw new Error('Course not found');
        }
        setCourse(matchedCourse);

        // Fetch course images
        const imagesResponse = await fetch(`http://localhost:8081/cour/getImagesCour?courId=${id}`);
        if (!imagesResponse.ok) {
          throw new Error(`Error fetching course images: ${imagesResponse.statusText}`);
        }
        const imagesData = await imagesResponse.json();
        setImages(imagesData.picbyte ? [`data:${imagesData.type};base64,${imagesData.picbyte}`] : []);
      } catch (err) {
        console.error('Fetch error:', err); // Log the error
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [id]);

  if (loading) return <p>Loading course details...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <Navbar /> 
      <div className="container my-5">
        <h2 className="text-center">{course.title}</h2>
        <div className="row">
          <div className="col-md-6">
            {images.length > 0 ? (
              <img src={images[0]} alt={course.title} className="img-fluid" />
            ) : (
              <img
                src="https://via.placeholder.com/150"
                alt="Placeholder"
                className="img-fluid"
              />
            )}
          </div>
          <div className="col-md-6">
            <h4>Course Details</h4>
            <p>{course.contenu}</p>
            <Link to="/quiz" className="btn btn-primary">
              Go to Quiz
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseDetails;
