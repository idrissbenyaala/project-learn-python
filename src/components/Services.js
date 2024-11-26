import React from 'react';

const Services = () => {
  return (
    <div className="container-xxl py-5">
      <div className="container">
        <div className="row g-4">
          {[
            { icon: 'fa-graduation-cap', title: 'Skilled Instructors', delay: '0.1s' },
            { icon: 'fa-globe', title: 'Online Classes', delay: '0.3s' },
            { icon: 'fa-home', title: 'Home Projects', delay: '0.5s' },
            { icon: 'fa-book-open', title: 'Book Library', delay: '0.7s' },
          ].map((service, index) => (
            <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay={service.delay} key={index}>
              <div className="service-item text-center pt-3">
                <div className="p-4">
                  <i className={`fa fa-3x ${service.icon} text-primary mb-4`}></i>
                  <h5 className="mb-3">{service.title}</h5>
                  <p>Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita amet diam</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
