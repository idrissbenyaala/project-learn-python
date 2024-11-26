import React, { useState, useEffect } from 'react';

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


const AddCourseForm = ({ courses, setCourses }) => {
  const [courseName, setCourseName] = useState('');
  const [courseContent, setCourseContent] = useState('');
  const [coursePicture, setCoursePicture] = useState(null);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('title', courseName); // Backend expects "title"
    formData.append('contenu', courseContent); // Backend expects "contenu"
    if (coursePicture) {
      formData.append('image', coursePicture); // Optional image field
    }
  
    try {
      const response = await fetch('http://localhost:8081/cour/AddCour', {
        method: 'POST',
        body: formData,
      });
  
      const text = await response.text(); // Read the response as text
      console.log('Response Text:', text);
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
  
      if (text.trim() === '') {
        throw new Error('Empty response from server');
      }
  
      const newCourse = JSON.parse(text); // Parse JSON from response
      setCourses([...courses, newCourse]);
  
      alert('Course added successfully!');
  
      setCourseName('');
      setCourseContent('');
      setCoursePicture(null);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to add course: ' + error.message);
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://localhost:8081/cour/GetCours'); // Adjusted API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch courses');
        }

        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error('Error fetching courses:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

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
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id}>
              <td>{course.title}</td> {/* Adjusted to use `title` */}
              <td>{course.contenu}</td> {/* Adjusted to use `contenu` */}
              <td>
                <img
                  src={course.imageCours && course.imageCours.length > 0
                    ? `http://localhost:8081/images/${course.imageCours[0].imagePath}` // Adjust based on backend image field
                    : 'img/placeholder.jpg'}
                  alt={course.title}
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

export default MainContent;
