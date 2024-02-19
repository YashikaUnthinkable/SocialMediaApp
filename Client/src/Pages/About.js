import React from 'react';

const AboutPage = () => {
  return (
    <div className="container py-5" style={{marginTop: "70px"}}>
      <div className="row mb-5">
        <div className="col text-center">
          <h1 className="display-4">About Us</h1>
          <p className="lead">Welcome to our website! We are a team of passionate individuals dedicated to providing quality products/services. Our mission is to [insert mission statement here].</p>
        </div>
      </div>
      <div className="row mb-5">
        <div className="col">
          <h2>Our Team</h2>
          <ul className="list-group">
            <li className="list-group-item">John Doe - CEO</li>
            <li className="list-group-item">Jane Smith - CTO</li>
            <li className="list-group-item">Alice Johnson - Lead Developer</li>
          </ul>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <h2>Contact Us</h2>
          <ul className="list-unstyled">
            <li>Email: info@example.com</li>
            <li>Phone: 123-456-7890</li>
            <li>Address: 123 Main St, City, Country</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
