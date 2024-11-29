import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Quiz = () => {
  const [completedQuizzes, setCompletedQuizzes] = useState([]);

  useEffect(() => {
    const completed = JSON.parse(localStorage.getItem('completedQuizzes')) || [];
    setCompletedQuizzes(completed);
  }, []);

  const isQuizCompleted = (quizId) => completedQuizzes.includes(quizId);

  return (
    <div className="container-xxl py-5 category">
      <div className="container">
        <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
          <h6 className="section-title bg-white text-center text-primary px-3">Quiz</h6>
          <h1 className="mb-5">Test Your Knowledge</h1>
        </div>
        <div className="row g-3">
          {[1, 2].map((index) => (
            <div
              className={`col-lg-6 col-md-12 wow zoomIn`}
              data-wow-delay={`${index * 0.2}s`}
              key={index}
            >
              <div className="position-relative d-block overflow-hidden">
                <img
                  className="img-fluid"
                  src={`img/cat-${index}.jpg`}
                  alt={`Quiz ${index}`}
                />
                <div
                  className="bg-white text-center position-absolute bottom-0 end-0 py-2 px-3"
                  style={{ margin: '1px' }}
                >
                  <h5 className="m-0">Quiz {index}</h5>
                  <small className="text-primary">10 Questions</small>
                  <br />
                  <Link
                    to={isQuizCompleted(index) ? '#' : `/quiz/${index}`}
                    className={`btn btn-${isQuizCompleted(index) ? 'secondary' : 'primary'} mt-2`}
                    style={{ pointerEvents: isQuizCompleted(index) ? 'none' : 'auto' }}
                  >
                    {isQuizCompleted(index) ? 'Completed' : 'Start Quiz'}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
