import React from 'react';

const Team = () => {
  const teamMembers = [
    { name: 'Instructor 1', role: 'Designation', image: 'img/team-1.jpg' },
    { name: 'Instructor 2', role: 'Designation', image: 'img/team-2.jpg' },
    { name: 'Instructor 3', role: 'Designation', image: 'img/team-3.jpg' },
    { name: 'Instructor 4', role: 'Designation', image: 'img/team-4.jpg' },
  ];

  return (
    <div className="container-xxl py-5">
      <div className="container">
        <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
          <h6 className="section-title bg-white text-center text-primary px-3">Instructors</h6>
          <h1 className="mb-5">Expert Instructors</h1>
        </div>
        <div className="row g-4">
          {teamMembers.map((member, index) => (
            <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay={`${index * 0.2}s`} key={index}>
              <div className="team-item bg-light">
                <div className="overflow-hidden">
                  <img className="img-fluid" src={member.image} alt={member.name} />
                </div>
                <div
                  className="position-relative d-flex justify-content-center"
                  style={{ marginTop: '-23px' }}
                >
                  <div className="bg-light d-flex justify-content-center pt-2 px-1">
                    <a className="btn btn-sm-square btn-primary mx-1" href="">
                      <i className="fab fa-facebook-f"></i>
                    </a>
                    <a className="btn btn-sm-square btn-primary mx-1" href="">
                      <i className="fab fa-twitter"></i>
                    </a>
                    <a className="btn btn-sm-square btn-primary mx-1" href="">
                      <i className="fab fa-instagram"></i>
                    </a>
                  </div>
                </div>
                <div className="text-center p-4">
                  <h5 className="mb-0">{member.name}</h5>
                  <small>{member.role}</small>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;
