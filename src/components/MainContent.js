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

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('accessToken'); // Retrieve token from localStorage

      // Create a JSON object for the course details
      const courRequestDto = JSON.stringify({
        title: courseName,
        contenu: courseContent,
      });

      // Use FormData to include the JSON object and file
      const formData = new FormData();
      formData.append('CourRequestDto', courRequestDto);
      if (coursePicture) {
        formData.append('file', coursePicture); // Include the optional file
      }

      // Make the POST request
      const response = await fetch('http://localhost:8081/cour/AddCour', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
        body: formData,
      });

      // Handle the response
      if (response.ok) {
        const responseData = await response.text();
        const newCourse = JSON.parse(responseData); // Parse the JSON response

        setCourses([...courses, newCourse]); // Update the courses list

        alert('Course added successfully!');

        // Reset form fields
        setCourseName('');
        setCourseContent('');
        setCoursePicture(null);
      } else {
        const errorData = await response.text();
        alert('Error: ' + errorData);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while adding the course.');
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
          {courses.map((course) => (
            <tr key={course.id}>
              <td>{course.title}</td>
              <td>{course.contenu}</td>
              <td>
                {images.length > 0 && images.find((image) => image.cour.id === course.id) ? (
                  <img
                    src={`data:${
                      images.find((image) => image.cour.id === course.id).type
                    };base64,${
                      images.find((image) => image.cour.id === course.id).picbyte
                    }`}
                    alt={course.title}
                    className="img-fluid"
                    style={{ width: '50px', height: '50px' }}
                  />
                ) : (
                  <img
                    src="https://via.placeholder.com/150" // Placeholder if no image
                    alt="Placeholder"
                    className="img-fluid"
                    style={{ width: '50px', height: '50px' }}
                  />
                )}
              </td>
              <td>
                <button
                  onClick={() => handleUpdate(course)}
                  className="btn btn-warning me-2"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(course.id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
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

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { id: Date.now(), text: '', options: ['', '', '', ''], correctAnswer: '' },
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

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newQuiz = {
      title: quizTitle,
      image: quizImage,
      questions,
    };
    setQuizzes([...quizzes, newQuiz]);
    alert('Quiz added successfully!');
    setQuizTitle('');
    setQuizImage(null);
    setQuestions([]);
  };

  return (
    <div>
      <h1>Add Quiz</h1>
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
              value={question.correctAnswer}
              onChange={(e) => updateQuestion(qIndex, 'correctAnswer', e.target.value)}
              required
            >
              <option value="">Select correct answer</option>
              {question.options.map((_, optIndex) => (
                <option key={optIndex} value={String.fromCharCode(65 + optIndex)}>
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
    try {
      const response = await fetch(`http://localhost:8081/User/DeleteUser/${id}`, {
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
