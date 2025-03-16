import React from 'react';
import { Container } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-light py-3 border-top mt-auto">
      <Container>
        <div className="d-flex justify-content-between align-items-center">
          <p className="mb-0 text-muted">&copy; {new Date().getFullYear()} BTech Bus Management System</p>
          <p className="mb-0 text-muted">South India College of Engineering</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;