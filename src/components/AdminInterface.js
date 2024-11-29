import React, { useState } from 'react';

const AdminInterface = () => {
  const [courses, setCourses] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [newCourse, setNewCourse] = useState('');
  const [newQuiz, setNewQuiz] = useState('');

  const handleAddCourse = () => {
    if (newCourse) {
      setCourses([...courses, newCourse]);
      setNewCourse('');
    }
  };

  const handleAddQuiz = () => {
    if (newQuiz) {
      setQuizzes([...quizzes, newQuiz]);
      setNewQuiz('');
    }
  };

  return (
    <div className="admin-interface">
      <h2>Admin Dashboard</h2>
      <div>
        <h3>Add Course</h3>
        <input
          type="text"
          value={newCourse}
          onChange={(e) => setNewCourse(e.target.value)}
          placeholder="Course Name"
        />
        <button onClick={handleAddCourse}>Add Course</button>
      </div>
      <div>
        <h3>Add Quiz</h3>
        <input
          type="text"
          value={newQuiz}
          onChange={(e) => setNewQuiz(e.target.value)}
          placeholder="Quiz Name"
        />
        <button onClick={handleAddQuiz}>Add Quiz</button>
      </div>
      <div>
        <h3>Courses</h3>
        <ul>
          {courses.map((course, index) => (
            <li key={index}>{course}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Quizzes</h3>
        <ul>
          {quizzes.map((quiz, index) => (
            <li key={index}>{quiz}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminInterface;
