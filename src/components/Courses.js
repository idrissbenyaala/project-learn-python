import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Courses = () => {
  const [courses, setCourses] = useState([]); // État pour les cours
  const [images, setImages] = useState([]); // État pour les images
  const [loading, setLoading] = useState(true); // État pour le chargement
  const [error, setError] = useState(null); // État pour les erreurs

  useEffect(() => {
    const fetchCoursesAndImages = async () => {
      try {
        // Appel pour récupérer les cours
        const coursesResponse = await fetch('http://localhost:8081/cour/GetCours');
        if (!coursesResponse.ok) {
          throw new Error('Erreur lors du chargement des cours');
        }
        const coursesData = await coursesResponse.json();

        // Appel pour récupérer les images
        const imagesResponse = await fetch('http://localhost:8081/cour/GetImages');
        if (!imagesResponse.ok) {
          throw new Error('Erreur lors du chargement des images');
        }
        const imagesData = await imagesResponse.json();

        // Associer les images aux cours en fusionnant les données
        const mergedData = coursesData.map((course) => ({
          ...course,
          images: imagesData.filter((image) => image.cour && image.cour.id === course.id),
        }));

        setCourses(mergedData); // Met à jour les cours avec les images associées
      } catch (err) {
        setError(err.message); // Gestion des erreurs
      } finally {
        setLoading(false); // Arrêter l'état de chargement
      }
    };

    fetchCoursesAndImages(); // Appel de la fonction
  }, []);

  // Gestion de l'état de chargement ou des erreurs
  if (loading) return <p>Chargement des cours...</p>;
  if (error) return <p>Erreur : {error}</p>;

  return (
    <div className="container-xxl py-5">
      <div className="container">
        <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
          <h6 className="section-title bg-white text-center text-primary px-3">Courses</h6>
          <h1 className="mb-5">Popular Courses</h1>
        </div>
        <div className="row g-4">
          {courses.map((course) => (
            <div className="col-lg-4 col-md-6" key={course.id}>
              <div className="course-item bg-light">
                <div className="position-relative overflow-hidden">
                  {course.images && course.images.length > 0 ? (
                    <img
                      src={`data:${course.images[0].type};base64,${course.images[0].picbyte}`}
                      alt={course.title}
                      className="img-fluid"
                    />
                  ) : (
                    <img
                      src="https://via.placeholder.com/150" // Image par défaut si aucune image n'est disponible
                      alt="Placeholder"
                      className="img-fluid"
                    />
                  )}
                  <div className="w-100 d-flex justify-content-center position-absolute bottom-0 start-0 mb-4">
                    <Link to={`/courses/${course.id}`} className="btn btn-primary">
                      Read More
                    </Link>
                  </div>
                </div>
                <div className="text-center p-4">
                  <h5>{course.title}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;