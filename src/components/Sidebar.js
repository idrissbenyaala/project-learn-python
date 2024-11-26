import React from 'react';

const Sidebar = ({ setContent }) => {
  return (
    <aside id="sidebar" className="sidebar">
      <ul className="sidebar-nav" id="sidebar-nav">

        {/* Dashboard */}
        <li className="nav-item">
          <a className="nav-link " href="#" onClick={() => setContent('dashboard')}>
            <i className="bi bi-grid"></i>
            <span>Dashboard</span>
          </a>
        </li>

        {/* Courses */}
        <li className="nav-item">
          <a
            className="nav-link collapsed"
            data-bs-target="#courses-nav"
            data-bs-toggle="collapse"
            href="#"
          >
            <i className="bi bi-menu-button-wide"></i>
            <span>Courses</span>
            <i className="bi bi-chevron-down ms-auto"></i>
          </a>
          <ul
            id="courses-nav"
            className="nav-content collapse"
            data-bs-parent="#sidebar-nav"
          >
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={() => setContent('add-course')}>
                <i className="bi bi-plus-circle"></i>
                <span>Add Course</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={() => setContent('courses-list')}>
                <i className="bi bi-circle"></i>
                <span>Courses List</span>
              </a>
            </li>
          </ul>
        </li>

        {/* Quizzes */}
        <li className="nav-item">
          <a
            className="nav-link collapsed"
            data-bs-target="#quizzes-nav"
            data-bs-toggle="collapse"
            href="#"
          >
            <i className="bi bi-journal-text"></i>
            <span>Quizzes</span>
            <i className="bi bi-chevron-down ms-auto"></i>
          </a>
          <ul
            id="quizzes-nav"
            className="nav-content collapse"
            data-bs-parent="#sidebar-nav"
          >
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={() => setContent('add-quiz')}>
                <i className="bi bi-plus-circle"></i>
                <span>Add Quiz</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={() => setContent('quizzes-list')}>
                <i className="bi bi-list-task"></i>
                <span>Quizzes List</span>
              </a>
            </li>
          </ul>
        </li>

        {/* Students */}
        <li className="nav-item">
          <a
            className="nav-link collapsed"
            data-bs-target="#students-nav"
            data-bs-toggle="collapse"
            href="#"
          >
            <i className="bi bi-people"></i>
            <span>Students</span>
            <i className="bi bi-chevron-down ms-auto"></i>
          </a>
          <ul
            id="students-nav"
            className="nav-content collapse"
            data-bs-parent="#sidebar-nav"
          >
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={() => setContent('add-student')}>
                <i className="bi bi-plus-circle"></i>
                <span>Add Student</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={() => setContent('students-list')}>
                <i className="bi bi-list-task"></i>
                <span>Student List</span>
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
