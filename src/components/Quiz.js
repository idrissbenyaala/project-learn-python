import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
<<<<<<< HEAD
import axios from 'axios';

const Quiz = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
=======

const Quiz = () => {
  const [completedQuizzes, setCompletedQuizzes] = useState([]);

  useEffect(() => {
    const completed = JSON.parse(localStorage.getItem('completedQuizzes')) || [];
    setCompletedQuizzes(completed);
  }, []);

  const isQuizCompleted = (quizId) => completedQuizzes.includes(quizId);
>>>>>>> 8513ab16611c2c3192a8397a9cb38dc70f9ecbd5

  return (
    <div className="container-xxl py-5 category">
      <div className="container">
        <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
          <h6 className="section-title bg-white text-center text-primary px-3">Quiz</h6>
          <h1 className="mb-5">Test Your Knowledge</h1>
        </div>
        <div className="row g-3">
<<<<<<< HEAD
          {quizzes.map((quiz, index) => {
            const questions = Array.isArray(quiz.questions) ? quiz.questions : [];
            const image = images[index] || {};  // Default to an empty object if image is not found

            return (
              <div
                className={`col-lg-6 col-md-12 wow zoomIn`}
                data-wow-delay={`${(index + 1) * 0.2}s`}
                key={quiz.id}
              >
                <div className="position-relative d-block overflow-hidden">
                  <img
                    className="img-fluid"
                    src={image.picbyte ? `data:${image.type};base64,${image.picbyte}` : 'https://via.placeholder.com/150'}
                    alt={quiz.title}
                  />
                  <div
                    className="bg-white text-center position-absolute bottom-0 end-0 py-2 px-3"
                    style={{ margin: '1px' }}
                  >
                    <h5 className="m-0">{quiz.title}</h5>
                    <small className="text-primary">{questions.length} Questions</small>
                    <br />
                    <Link
                      to={`/quiz/${quiz.id}`}
                      className="btn btn-primary mt-2"
                    >
                      Start Quiz
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
=======
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
>>>>>>> 8513ab16611c2c3192a8397a9cb38dc70f9ecbd5
        </div>
      </div>
    </div>
  );
};

export default Quiz;
