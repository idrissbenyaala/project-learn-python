import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Assurez-vous d'avoir importé Bootstrap CSS
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
const MainContent = ({ content }) => {
  const [quizzes, setQuizzes] = useState([]); // Store quizzes
  const [courses, setCourses] = useState([]); // Store courses

  const renderContent = () => {
    switch (content) {
      case 'dashboard':
        return <h1>Welcome to the Dashboard</h1>;
      case 'add-course':
        return <AddCourseForm courses={courses} setCourses={setCourses} />;
      case 'courses-list':
        return <CoursesList courses={courses} />;
      case 'add-quiz':
        return <AddQuizForm quizzes={quizzes} setQuizzes={setQuizzes} />;
      case 'quizzes-list':  
        return <QuizzesList quizzes={quizzes} />;
      default:
        return <h1>404 - Content Not Found</h1>;
    }
  };

  return <main id="main" className="main">{renderContent()}</main>;
};


const AddCourseForm = () => {
  const [courseName, setCourseName] = useState("");
  const [courseContent, setCourseContent] = useState("");
  const [coursePicture, setCoursePicture] = useState(null);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("accessToken");

      // Créez un objet JSON pour CourRequestDto
      const courRequestDto = JSON.stringify({
        title: courseName,
        contenu: courseContent,
      });

      // Utilisez FormData pour inclure le fichier et CourRequestDto
      const formData = new FormData();
      formData.append("CourRequestDto", courRequestDto);
      if (coursePicture) {
        formData.append("file", coursePicture);
      }

      // Effectuez la requête POST
      const response = await fetch("http://localhost:8081/cour/AddCour", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // Ajout du token
        },
        body: formData,
      });

      // Gérer la réponse
      if (response.ok) {
        const responseData = await response.text();
        alert("Course added successfully! Response: " + responseData);
      } else {
        const errorData = await response.text();
        alert("Error: " + errorData);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while adding the course.");
    }
  };

  return (
    <div>
      <h1>Add Course</h1>
      <form onSubmit={handleFormSubmit}>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Field</th>
              <th>Input</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Course Name</td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                  placeholder="Enter course name"
                  required
                />
              </td>
            </tr>
            <tr>
              <td>Course Content</td>
              <td>
                <textarea
                  className="form-control"
                  value={courseContent}
                  onChange={(e) => setCourseContent(e.target.value)}
                  placeholder="Enter course content"
                  rows="3"
                  required
                ></textarea>
              </td>
            </tr>
            <tr>
              <td>Course Picture</td>
              <td>
                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  onChange={(e) => setCoursePicture(e.target.files[0])}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button type="submit" className="btn btn-primary">Add Course</button>
      </form>
    </div>
  );
};




const CoursesList = () => {
  const [courses, setCourses] = useState([]);
  const [images, setImages] = useState([]); // Stockage des images
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false); // Contrôle l'affichage du modal
  const [selectedCourse, setSelectedCourse] = useState(null); // Cours sélectionné pour la mise à jour

  // Charger les cours et les images depuis le backend
  useEffect(() => {
    const fetchCoursesAndImages = async () => {
      try {
        // Récupérer les cours
        const coursesResponse = await axios.get('http://localhost:8081/cour/GetCours');
        setCourses(coursesResponse.data);

        // Récupérer les images
        const imagesResponse = await axios.get('http://localhost:8081/cour/GetImages');
        setImages(imagesResponse.data);
      } catch (err) {
        setError('Failed to fetch courses or images');
      } finally {
        setLoading(false);
      }
    };

    fetchCoursesAndImages();
  }, []);

  // Ouvrir le modal de mise à jour avec les données du cours sélectionné
  const handleUpdate = (course) => {
    setSelectedCourse(course);
    setShowModal(true); // Ouvre le modal
  };

  // Fermer le modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCourse(null); // Réinitialise les données du cours sélectionné
  };

  // Enregistrer les modifications du cours
  const handleSaveUpdate = async () => {
    if (!selectedCourse.title || !selectedCourse.contenu) {
      setError('Title and Content are required');
      return;
    }

    try {
      await axios.put(`http://localhost:8081/cour/UpdateCour/${selectedCourse.id}`, selectedCourse);
      setCourses(courses.map(course => (course.id === selectedCourse.id ? selectedCourse : course))); // Mettre à jour le cours dans la liste
      handleCloseModal(); // Fermer le modal après la mise à jour
    } catch (err) {
      setError('Failed to update course');
    }
  };

  // Supprimer un cours
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await axios.delete(`http://localhost:8081/cour/DeleteCour?id=${id}`);
        setCourses(courses.filter(course => course.id !== id)); // Mettre à jour la liste après suppression
      } catch (err) {
        setError('Failed to delete course');
      }
    }
  };

  if (loading) {
    return <p>Loading courses...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>Courses List</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Course Title</th>
            <th>Content</th>
            <th>Image</th>
            <th>Action</th> {/* Nouvelle colonne pour actions */}
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id}>
              <td>{course.title}</td>
              <td>{course.contenu}</td>
              <td>
                {/* Chercher l'image correspondant au cours */}
                {images.length > 0 && images.find(image => image.cour.id === course.id) ? (
                  <img
                    src={`data:${images.find(image => image.cour.id === course.id).type};base64,${images.find(image => image.cour.id === course.id).picbyte}`}
                    alt={course.title}
                    className="img-fluid"
                    style={{ width: '50px', height: '50px' }}
                  />
                ) : (
                  <img
                    src="https://via.placeholder.com/150" // Placeholder si pas d'image
                    alt="Placeholder"
                    className="img-fluid"
                    style={{ width: '50px', height: '50px' }}
                  />
                )}
              </td>
              <td>
                <button
                  onClick={() => handleUpdate(course)} // Ouvre le modal avec les données du cours
                  className="btn btn-warning me-2"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(course.id)} // Supprime le cours
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal pour la mise à jour */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update Course</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedCourse && (
            <Form>
              <Form.Group controlId="formCourseTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedCourse.title}
                  onChange={(e) => setSelectedCourse({ ...selectedCourse, title: e.target.value })}
                />
              </Form.Group>

              <Form.Group controlId="formCourseContent">
                <Form.Label>Content</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedCourse.contenu}
                  onChange={(e) => setSelectedCourse({ ...selectedCourse, contenu: e.target.value })}
                />
              </Form.Group>

              {/* Vous pouvez ajouter d'autres champs pour l'édition des autres propriétés */}
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

  
const AddQuizForm = ({ quizzes, setQuizzes }) => {
  const [quizTitle, setQuizTitle] = useState('');
  const [questions, setQuestions] = useState([]);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { id: Date.now(), text: '', options: ['', '', '', ''], correctAnswerIndex: 0 },
    ]);
  };

  const updateQuestion = (index, field, value) => {
    const updatedQuestions = questions.map((q, i) =>
      i === index ? { ...q, [field]: value } : q
    );
    setQuestions(updatedQuestions);
  };

  const updateOption = (qIndex, optIndex, value) => {
    const updatedQuestions = questions.map((q, i) => {
      if (i === qIndex) {
        const updatedOptions = [...q.options];
        updatedOptions[optIndex] = value;
        return { ...q, options: updatedOptions };
      }
      return q;
    });
    setQuestions(updatedQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const quizPayload = {
      title: quizTitle,
      questions: questions.map((q) => ({
        text: q.text,
        answers: q.options.map((opt, index) => ({ text: opt, correct: index === q.correctAnswerIndex })),
      })),
    };

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8081/Quiz/AddQuiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(quizPayload),
      });

      if (!response.ok) throw new Error('Failed to add quiz');
      const data = await response.json();
      setQuizzes([...quizzes, data]);
      alert('Quiz added successfully!');
      setQuizTitle('');
      setQuestions([]);
    } catch (error) {
      console.error(error);
      alert('Error adding quiz');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Quiz</h3>
      <input
        type="text"
        placeholder="Quiz Title"
        value={quizTitle}
        onChange={(e) => setQuizTitle(e.target.value)}
        required
      />
      {questions.map((q, qIndex) => (
        <div key={q.id}>
          <input
            type="text"
            placeholder="Question text"
            value={q.text}
            onChange={(e) => updateQuestion(qIndex, 'text', e.target.value)}
            required
          />
          {q.options.map((opt, optIndex) => (
            <input
              key={optIndex}
              type="text"
              placeholder={`Option ${optIndex + 1}`}
              value={opt}
              onChange={(e) => updateOption(qIndex, optIndex, e.target.value)}
              required
            />
          ))}
          <select
            value={q.correctAnswerIndex}
            onChange={(e) => updateQuestion(qIndex, 'correctAnswerIndex', parseInt(e.target.value))}
          >
            {q.options.map((_, optIndex) => (
              <option key={optIndex} value={optIndex}>
                Option {optIndex + 1}
              </option>
            ))}
          </select>
        </div>
      ))}
      <button type="button" onClick={addQuestion}>
        Add Question
      </button>
      <button type="submit">Submit</button>
    </form>
  );
};

const QuizzesList = ({ quizzes }) => {
  return (
    <div>
      <h1>Quizzes List</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Quiz Title</th>
            <th>Number of Questions</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {quizzes.map((quiz, index) => (
            <tr key={index}>
              <td>{quiz.title}</td>
              <td>{quiz.questions.length}</td>
              <td>
                <img
                  src={quiz.image ? URL.createObjectURL(quiz.image) : 'img/placeholder.jpg'}
                  alt={quiz.title}
                  style={{ width: '50px', height: '50px' }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MainContent;
