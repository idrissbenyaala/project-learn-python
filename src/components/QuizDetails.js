import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const QuizDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const currentQuizId = parseInt(id);

  // Hardcoded quiz data
  const quizzes = {
    1: [
      {
        id: 1,
        question: 'What is the correct file extension for Python files?',
        options: ['.pyth', '.py', '.pt', '.pyt'],
        answer: '.py',
      },
      {
        id: 2,
        question: 'Which keyword is used to create a function in Python?',
        options: ['func', 'define', 'def', 'function'],
        answer: 'def',
      },
      {
        id: 3,
        question: 'How do you insert comments in Python code?',
        options: [
          '/* This is a comment */',
          '// This is a comment',
          '# This is a comment',
          '-- This is a comment',
        ],
        answer: '# This is a comment',
      },
    ],
    2: [
      {
        id: 1,
        question: 'What does the "len()" function do in Python?',
        options: [
          'Returns the length of an object',
          'Returns the type of an object',
          'Returns a list',
          'None of the above',
        ],
        answer: 'Returns the length of an object',
      },
      {
        id: 2,
        question: 'Which Python keyword is used to handle exceptions?',
        options: ['catch', 'try', 'handle', 'except'],
        answer: 'except',
      },
      {
        id: 3,
        question: 'What is the output of print(2 ** 3)?',
        options: ['5', '6', '8', '9'],
        answer: '8',
      },
    ],
  };

  const questions = quizzes[currentQuizId];
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const handleOptionChange = (questionId, selectedOption) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: selectedOption,
    }));
  };

  const handleSubmit = () => {
    let calculatedScore = 0;
    questions.forEach((question) => {
      if (answers[question.id] === question.answer) {
        calculatedScore++;
      }
    });
    setScore(calculatedScore);
    setShowResult(true);

    // Mark quiz as completed if score is perfect
    if (calculatedScore === questions.length) {
      const completedQuizzes = JSON.parse(localStorage.getItem('completedQuizzes')) || [];
      if (!completedQuizzes.includes(currentQuizId)) {
        completedQuizzes.push(currentQuizId);
        localStorage.setItem('completedQuizzes', JSON.stringify(completedQuizzes));
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="container my-5">
        <h2 className="text-center">Python Quiz {currentQuizId}</h2>
        {!showResult ? (
          <div className="quiz-container">
            {questions.map((question) => (
              <div key={question.id} className="mb-4">
                <h4>{`Q${question.id}: ${question.question}`}</h4>
                {question.options.map((option, index) => (
                  <div className="form-check" key={index}>
                    <input
                      className="form-check-input"
                      type="radio"
                      name={`question-${question.id}`}
                      id={`option-${question.id}-${index}`}
                      value={option}
                      checked={answers[question.id] === option}
                      onChange={() => handleOptionChange(question.id, option)}
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`option-${question.id}-${index}`}
                    >
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            ))}
            <button className="btn btn-primary mt-3" onClick={handleSubmit}>
              Submit Quiz
            </button>
          </div>
        ) : (
          <div className="quiz-result text-center">
            <h3>Your Score: {score}/{questions.length}</h3>
            {score === questions.length ? (
              <p>Congratulations! You have completed this quiz.</p>
            ) : (
              <p>Good effort! Try again to improve your score.</p>
            )}
            <button className="btn btn-secondary mt-3" onClick={() => navigate('/quiz')}>
              Back to Quizzes
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default QuizDetails;
