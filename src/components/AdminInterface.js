import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddCourse = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [courses, setCourses] = useState([]); // Nouveau state pour stocker les cours récupérés

  // Fonction pour récupérer les cours
  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:8081/cour/GetCours');
      setCourses(response.data); // Stocker les cours dans le state
    } catch (err) {
      console.error("Erreur lors de la récupération des cours : ", err.response?.data || err.message);
      setError("Failed to fetch courses");
    }
  };

  // Utilisation de useEffect pour récupérer les cours au montage du composant (chargement de la page)
  useEffect(() => {
    fetchCourses(); // Récupérer les cours dès que le composant est monté
  }, []); // Le tableau vide [] signifie qu'on l'appelle uniquement une fois lors du montage du composant

  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Récupère le fichier sélectionné
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Créer l'objet FormData
    const formData = new FormData();
    const courRequestDto = JSON.stringify({ title, contenu: content });

    formData.append('CourRequestDto', courRequestDto); // Ajout du JSON
    formData.append('file', file); // Ajout du fichier

    try {
      const response = await axios.post('http://localhost:8081/cour/AddCour', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setSuccess('Course added successfully!');
      fetchCourses(); // Recharger les cours après ajout
    } catch (err) {
      setError(err.response?.data || 'An error occurred');
    }
  };

  return (
    <div className="container my-5">
      <h2>Add Course</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      {/* Affichage des cours récupérés */}
      <div>
        <h3>Existing Courses:</h3>
        {courses.length > 0 ? (
          <ul>
            {courses.map((course, index) => (
              <li key={index}>
                <strong>{course.title}</strong>: {course.contenu}
              </li>
            ))}
          </ul>
        ) : (
          <p>No courses found.</p>
        )}
      </div>

      {/* Formulaire pour ajouter un cours */}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="content" className="form-label">Content</label>
          <textarea
            className="form-control"
            id="content"
            rows="3"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="file" className="form-label">File</label>
          <input
            type="file"
            className="form-control"
            id="file"
            onChange={handleFileChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default AddCourse;
