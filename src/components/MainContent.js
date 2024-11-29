import React, { useState, useEffect } from 'react';
import axios from 'axios'; // For API calls
import { Modal, Button, Form } from 'react-bootstrap'; 
const MainContent = ({ content }) => {
  const [quizzes, setQuizzes] = useState([]); // Store quizzes
  const [courses, setCourses] = useState([]); // Store courses
  const [students, setStudents] = useState([]); // Store students (initially empty)


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
        case 'students-list': // Add new case
        return <StudentList students={students} />;
      default:
        return <h1>404 - Content Not Found</h1>;
    }
  };

  return <main id="main" className="main">{renderContent()}</main>;
};



const AddCourseForm = ({ courses, setCourses }) => {
  const [courseName, setCourseName] = useState('');
  const [courseContent, setCourseContent] = useState('');
  const [coursePicture, setCoursePicture] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('accessToken');

      // Créer l'objet JSON pour le cours
      const courRequestDto = JSON.stringify({
        title: courseName,
        contenu: courseContent,
      });

      // Utiliser FormData pour inclure l'objet JSON et le fichier
      const formData = new FormData();
      formData.append('CourRequestDto', courRequestDto);
      if (coursePicture) {
        formData.append('file', coursePicture);
      }

      // Faire la requête POST
      const response = await fetch('http://localhost:8081/cour/AddCour', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      // Si la réponse est réussie (statut 200 ou 201)
      if (response.ok) {
        const responseData = await response.json(); // On s'attend à une réponse JSON
        setCourses([...courses, responseData.data]); // On ajoute le cours ajouté à la liste

        setSuccessMessage(responseData.message); // Message de succès
        setErrorMessage(''); // Réinitialisation du message d'erreur

        setTimeout(() => {
          setSuccessMessage('');
        }, 3000);
      } else {
        // Si la réponse est une erreur, afficher le message d'erreur
        const errorData = await response.json(); // Si la réponse est en JSON, l'analyser
        setErrorMessage(errorData.message || 'An unexpected error occurred.');
        setSuccessMessage('');
      }
    } catch (error) {
      // Gestion des erreurs inattendues
      console.error('Unexpected error:', error);
      setErrorMessage('An unexpected error occurred. Please try again.');
      setSuccessMessage('');
    }
  };

  return (
    <div>
      <h1>Add Course</h1>

      {/* Affichage des messages de succès et d'erreur */}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

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
        <button type="submit" className="btn btn-primary">
          Add Course
        </button>
      </form>
    </div>
  );
};








const CoursesList = () => {
  const [courses, setCourses] = useState([]);
  const [images, setImages] = useState([]); // Store images
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false); // Control modal visibility
  const [selectedCourse, setSelectedCourse] = useState(null); // Course selected for editing

  // Fetch courses and images from the backend
  useEffect(() => {
    const fetchCoursesAndImages = async () => {
      try {
        const coursesResponse = await axios.get('http://localhost:8081/cour/GetCours');
        setCourses(coursesResponse.data);

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

  // Open modal for course update
  const handleUpdate = (course) => {
    setSelectedCourse(course);
    setShowModal(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCourse(null); // Reset selected course
  };

  // Save course updates
  const handleSaveUpdate = async () => {
    if (!selectedCourse.title || !selectedCourse.contenu) {
      setError('Title and Content are required');
      return;
    }

    try {
      await axios.put(`http://localhost:8081/cour/UpdateCour/${selectedCourse.id}`, selectedCourse);
      setCourses((prevCourses) =>
        prevCourses.map((course) =>
          course.id === selectedCourse.id ? selectedCourse : course
        )
      );
      handleCloseModal(); // Close modal after update
    } catch (err) {
      setError('Failed to update course');
    }
  };

  // Delete a course
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await axios.delete(`http://localhost:8081/cour/DeleteCour?id=${id}`);
        setCourses((prevCourses) => prevCourses.filter((course) => course.id !== id));
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
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
  {courses.map((course) => {
    // Trouver l'image correspondante pour chaque cours
    const image = images.find((image) => image.cour.id === course.id);
    console.log(image)

    return (
      <tr key={course.id}>
        <td>{course.title}</td>
        <td>{course.contenu}</td>
        <td>
          {image ? (
            <img
              src={`data:${image.type};base64,${image.picbyte}`}
              alt={course.title}
              className="img-fluid"
              style={{ width: '50px', height: '50px' }}
            />
          ) : (
            <img
              src="https://via.placeholder.com/150"
              alt="Placeholder"
              className="img-fluid"
              style={{ width: '50px', height: '50px' }}
            />
          )}
        </td>
        <td>
          <button onClick={() => handleUpdate(course)} className="btn btn-warning me-2">
            Update
          </button>
          <button onClick={() => handleDelete(course.id)} className="btn btn-danger">
            Delete
          </button>
        </td>
      </tr>
    );
  })}
</tbody>

      </table>

      {/* Modal for course update */}
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
                  onChange={(e) =>
                    setSelectedCourse({ ...selectedCourse, title: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group controlId="formCourseContent">
                <Form.Label>Content</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedCourse.contenu}
                  onChange={(e) =>
                    setSelectedCourse({ ...selectedCourse, contenu: e.target.value })
                  }
                />
              </Form.Group>
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
  const [quizImage, setQuizImage] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { id: Date.now(), text: '', options: ['', '', '', ''], correctAnswerId: '' },
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

  const removeQuestion = (index) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const quizData = {
      title: quizTitle,
      questions: questions.map((question) => {
        const answers = question.options.map((option, index) => ({
          text: option,
          correct: index === question.correctAnswerId,
        }));

        const correctAnswer = answers.find(answer => answer.correct);

        return {
          text: question.text,
          answers: answers,
          correctAnswer: correctAnswer,
        };
      }),
    };

    const token = localStorage.getItem('accessToken'); // Get the token

    const formData = new FormData();
    formData.append('quiz', JSON.stringify(quizData)); // Append quiz data as JSON
    if (quizImage) {
      formData.append('file', quizImage); // Append the image file
    }

    try {
      const response = await fetch('http://localhost:8081/Quiz/AddQuiz', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData, // Send the FormData object
      });

      if (response.ok) {
        const newQuiz = await response.json();
        setQuizzes([...quizzes, newQuiz]);
        setSuccessMessage('Quiz added successfully!');
        setErrorMessage('');
        
        // Reset form fields
        setQuizTitle('');
        setQuestions([]);
        setQuizImage(null);

        // Hide success message after 3 seconds
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Failed to add quiz');
        setSuccessMessage('');
      }
    } catch (error) {
      console.error('Error adding quiz:', error);
      setErrorMessage('Error adding quiz: ' + error.message);
      setSuccessMessage('');
    }
  };

  return (
    <div>
      <h1>Add Quiz</h1>

      {/* Affichage des messages de succès et d'erreur */}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

      <form onSubmit={handleFormSubmit}>
        <div className="mb-3">
          <label>Quiz Title</label>
          <input
            type="text"
            className="form-control"
            value={quizTitle}
            onChange={(e) => setQuizTitle(e.target.value)}
            placeholder="Enter quiz title"
            required
          />
        </div>
        <div className="mb-3">
          <label>Quiz Image</label>
          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={(e) => setQuizImage(e.target.files[0])}
          />
        </div>

        <h4>Questions</h4>
        {questions.map((question, qIndex) => (
          <div key={question.id} className="mb-3 border p-3">
            <label>Question Text</label>
            <input
              type="text"
              className="form-control mb-2"
              value={question.text}
              onChange={(e) => updateQuestion(qIndex, 'text', e.target.value)}
              placeholder="Enter question text"
              required
            />

            <label>Options</label>
            {question.options.map((option, optIndex) => (
              <input
                key={optIndex}
                type="text"
                className="form-control mb-2"
                value={option}
                onChange={(e) => updateOption(qIndex, optIndex, e.target.value)}
                placeholder={`Option ${String.fromCharCode(65 + optIndex)}`}
                required
              />
            ))}

            <label>Correct Answer</label>
            <select
              className="form-control mb-2"
              value={question.correctAnswerId}
              onChange={(e) => updateQuestion(qIndex, 'correctAnswerId', parseInt(e.target.value))}
              required
            >
              <option value="">Select correct answer</option>
              {question.options.map((_, optIndex) => (
                <option key={optIndex} value={optIndex}>
                  Option {String.fromCharCode(65 + optIndex)}
                </option>
              ))}
            </select>

            <button
              type="button"
              className="btn btn-danger"
              onClick={() => removeQuestion(qIndex)}
            >
              Remove Question
            </button>
          </div>
        ))}

        <button type="button" className="btn btn-secondary mb-3" onClick={addQuestion}>
          Add Question
        </button>
        <button type="submit" className="btn btn-primary">Add Quiz</button>
      </form>
    </div>
  );
};





const QuizzesList = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editedQuiz, setEditedQuiz] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setError("No access token found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        // Fetch quizzes
        const quizzesResponse = await axios.get("http://localhost:8081/Quiz/GetAllQuizzes", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setQuizzes(quizzesResponse.data);

        // Fetch images
        const imagesResponse = await axios.get("http://localhost:8081/Quiz/GetImages", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setImages(imagesResponse.data);
      } catch (err) {
        setError(err.message || "An error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (quizId) => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      alert("No access token found. Please log in.");
      return;
    }

    try {
      await axios.delete("http://localhost:8081/Quiz/DeleteQuiz", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          id: quizId,
        },
      });
      setQuizzes((prevQuizzes) => prevQuizzes.filter((quiz) => quiz.id !== quizId));
    } catch (err) {
      alert("An error occurred while deleting the quiz.");
    }
  };

  const handleEdit = (quiz) => {
    setSelectedQuiz(quiz);
    setEditedQuiz({ ...quiz }); // Initialize the edited quiz state
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditedQuiz(null);
  };

  const handleQuizTitleChange = (e) => {
    setEditedQuiz({
      ...editedQuiz,
      title: e.target.value,
    });
  };

  const handleQuestionChange = (questionIndex, e) => {
    const updatedQuestions = [...editedQuiz.questions];
    updatedQuestions[questionIndex].text = e.target.value;
    setEditedQuiz({
      ...editedQuiz,
      questions: updatedQuestions,
    });
  };

  const handleAnswerChange = (questionIndex, answerIndex, e) => {
    const updatedQuestions = [...editedQuiz.questions];
    updatedQuestions[questionIndex].answers[answerIndex].text = e.target.value;
    setEditedQuiz({
      ...editedQuiz,
      questions: updatedQuestions,
    });
  };

  const handleAnswerCorrectChange = (questionIndex, answerIndex) => {
    const updatedQuestions = [...editedQuiz.questions];
    const updatedAnswers = [...updatedQuestions[questionIndex].answers];

    // Reset all answers to incorrect
    updatedAnswers.forEach((answer) => (answer.correct = false));

    // Set the selected answer as correct
    updatedAnswers[answerIndex].correct = true;

    updatedQuestions[questionIndex].answers = updatedAnswers;
    setEditedQuiz({
      ...editedQuiz,
      questions: updatedQuestions,
    });
  };

  const handleSubmitEdit = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      alert("No access token found. Please log in.");
      return;
    }

    try {
      await axios.put(`http://localhost:8081/Quiz/UpdateQuiz/${editedQuiz.id}`, {
        title: editedQuiz.title,
        questions: editedQuiz.questions,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Update the quizzes state with the modified quiz
      setQuizzes((prevQuizzes) =>
        prevQuizzes.map((quiz) => (quiz.id === editedQuiz.id ? editedQuiz : quiz))
      );

      handleCloseModal();
    } catch (err) {
      alert("An error occurred while updating the quiz.");
    }
  };

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    );

  return (
    <div>
      <h1>Quizzes List</h1>
      <table className="table table-striped table-responsive">
        <thead>
          <tr>
            <th>Quiz Title</th>
            <th>Number of Questions</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {quizzes.map((quiz, index) => {
            const questions = Array.isArray(quiz.questions) ? quiz.questions : [];
            const image = images[index] || {};  // Default to an empty object if image is not found

            return (
              <tr key={quiz.id}>
                <td>{quiz.title}</td>
                <td>{questions.length}</td>
                <td>
                  {image.picbyte ? (
                    <img
                      src={`data:${image.type};base64,${image.picbyte}`}
                      alt={quiz.title}
                      className="img-fluid"
                      style={{ width: "50px", height: "50px", objectFit: "cover" }}
                    />
                  ) : (
                    <img
                      src="https://via.placeholder.com/150"
                      alt="Placeholder"
                      className="img-fluid"
                      style={{ width: "50px", height: "50px", objectFit: "cover" }}
                    />
                  )}
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm me-2"
                    onClick={() => handleDelete(quiz.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => handleEdit(quiz)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Modal for editing */}
      {editedQuiz && (
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Quiz</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Quiz Title</Form.Label>
                <Form.Control
                  type="text"
                  value={editedQuiz.title}
                  onChange={handleQuizTitleChange}
                />
              </Form.Group>

              <h5>Questions</h5>
              {Array.isArray(editedQuiz.questions) && editedQuiz.questions.length > 0 ? (
                editedQuiz.questions.map((question, questionIndex) => (
                  <div key={questionIndex} className="mb-3">
                    <strong>Q{questionIndex + 1}: </strong>
                    <Form.Control
                      type="text"
                      value={question.text}
                      onChange={(e) => handleQuestionChange(questionIndex, e)}
                    />
                    <ul>
                      {question.answers.map((answer, answerIndex) => (
                        <li key={answerIndex}>
                          <Form.Control
                            type="text"
                            value={answer.text}
                            onChange={(e) => handleAnswerChange(questionIndex, answerIndex, e)}
                          />
                          <label>
                            <input
                              type="radio"
                              name={`question-${questionIndex}`}
                              checked={answer.correct}
                              onChange={() => handleAnswerCorrectChange(questionIndex, answerIndex)}
                            />
                            Correct
                          </label>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))
              ) : (
                <p>No questions available.</p>
              )}
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSubmitEdit}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};


const StudentList = () => {
  const [students, setStudents] = useState([]); // State to store student data
  const [loading, setLoading] = useState(true); // State to track loading
  const [error, setError] = useState(null); // State to store errors

  // Fetch students on component mount
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('http://localhost:8081/User/GetAllUsers');
        if (!response.ok) {
          throw new Error('Failed to fetch students');
        }
        const data = await response.json();
        setStudents(data); // Update the state with fetched students
      } catch (err) {
        setError(err.message); // Update error state if fetching fails
      } finally {
        setLoading(false); // Set loading to false after fetch attempt
      }
    };

    fetchStudents();
  }, []);

  // Function to handle delete
  const handleDelete = async (id) => {
    const token = localStorage.getItem('accessToken'); 
    try {
      const response = await fetch(`http://localhost:8081/User/DeleteUser?id=${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete student');
      }
      setStudents(students.filter((student) => student.id !== id));
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  if (loading) {
    return <p>Loading students...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>Student List</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.length > 0 ? (
            students.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm ms-2"
                    onClick={() => handleDelete(student.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                No students available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
export default MainContent;
