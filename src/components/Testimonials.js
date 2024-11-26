import React from 'react';

const Testimonials = () => {
  const testimonials = [
    { name: 'Client Name', role: 'Profession', text: 'Amazing learning experience.', image: 'img/testimonial-1.jpg' },
    { name: 'Client Name', role: 'Profession', text: 'I learned so much here!', image: 'img/testimonial-2.jpg' },
    { name: 'Client Name', role: 'Profession', text: 'Highly recommend this platform.', image: 'img/testimonial-3.jpg' },
    { name: 'Client Name', role: 'Profession', text: 'Great instructors!', image: 'img/testimonial-4.jpg' },
  ];

  return (
    <div className="container-xxl py-5 wow fadeInUp" data-wow-delay="0.1s">
      <div className="container">
        <div className="text-center">
          <h6 className="section-title bg-white text-center text-primary px-3">Testimonial</h6>
          <h1 className="mb-5">Our Students Say!</h1>
        </div>
        <div className="owl-carousel testimonial-carousel position-relative">
          {testimonials.map((testimonial, index) => (
            <div className="testimonial-item text-center" key={index}>
              <img
                className="border rounded-circle p-2 mx-auto mb-3"
                src={testimonial.image}
                alt={testimonial.name}
                style={{ width: '80px', height: '80px' }}
              />
              <h5 className="mb-0">{testimonial.name}</h5>
              <p>{testimonial.role}</p>
              <div className="testimonial-text bg-light text-center p-4">
                <p className="mb-0">{testimonial.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
