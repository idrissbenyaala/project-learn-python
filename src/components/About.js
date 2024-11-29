import React from 'react';

const About = () => {
  return (
    <div className="container-xxl py-5">
      <div className="container">
        <div className="row g-5">
          <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s" style={{ minHeight: '400px' }}>
            <div className="position-relative h-100">
              <img
                className="img-fluid position-absolute w-100 h-100"
                src="img/about.jpg"
                alt=""
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
          <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.3s">
            <h6 className="section-title bg-white text-start text-primary pe-3">About Us</h6>
            <h1 className="mb-4">Welcome to Aalemny Python</h1>
            <p className="mb-4">
            Welcome to <strong>Aalemny Python</strong>, your ultimate destination for learning and mastering Python programming.
            Whether you are a beginner or looking to enhance your skills, we offer courses tailored to your needs.
            </p>
            <p className="mb-4">
            Explore a wide range of Python topics, from the basics to advanced concepts, and embark on a journey to become
            proficient in one of the most versatile programming languages. Join us to elevate your Python skills and unlock endless opportunities.            </p>
            <div className="row gy-2 gx-4 mb-4">
              {[
                'Expert Python Instructors',
                'Comprehensive Online Courses',
                'Industry-Recognized Certifications',
                'Interactive Learning Experience',
                'Flexible Learning Schedule',
                'Career-Oriented Curriculum',
              ].map((feature, index) => (
                <div className="col-sm-6" key={index}>
                  <p className="mb-0">
                    <i className="fa fa-arrow-right text-primary me-2"></i>
                    {feature}
                  </p>
                </div>
              ))}
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
