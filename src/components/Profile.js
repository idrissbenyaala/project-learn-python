import React, { useState, useEffect } from 'react';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Simulated API call (replace with real API fetch if applicable)
  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        // Simulating user data fetch
        const mockUserData = {
          name: 'John Doe',
          email: 'john.doe@example.com',
          avatar: 'https://via.placeholder.com/150',
          enrolledCourses: [
            { id: 1, title: 'Python Basics', progress: 80 },
            { id: 2, title: 'Advanced JavaScript', progress: 50 },
          ],
        };
        setUserData(mockUserData);
      } catch (error) {
        console.error('Failed to fetch user data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userData) {
    return <div>Error loading user data.</div>;
  }

  return (
    <div className="container my-5">
      <h2>Welcome, {userData.name}!</h2>
      <div className="profile-header d-flex align-items-center my-4">
        <img
          src={userData.avatar}
          alt="User Avatar"
          className="rounded-circle me-3"
          style={{ width: '100px', height: '100px' }}
        />
        <div>
          <h4>{userData.name}</h4>
          <p>{userData.email}</p>
        </div>
      </div>

      <h3>Enrolled Courses</h3>
      <ul className="list-group">
        {userData.enrolledCourses.map((course) => (
          <li className="list-group-item d-flex justify-content-between align-items-center" key={course.id}>
            {course.title}
            <span className="badge bg-primary rounded-pill">
              {course.progress}% Complete
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;
