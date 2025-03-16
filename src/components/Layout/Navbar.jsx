import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

const AppNavbar = ({ onLogout }) => {
  const location = useLocation();
  
  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand as={Link} to="/dashboard">
          SVIT Bus Management
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link 
              as={Link} 
              to="/dashboard" 
              active={location.pathname === '/dashboard'}
            >
              Dashboard
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/routes" 
              active={location.pathname === '/routes'}
            >
              Bus Routes
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/students" 
              active={location.pathname === '/students'}
            >
              Students
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/fees" 
              active={location.pathname === '/fees'}
            >
              Fee Management
            </Nav.Link>
          </Nav>
          <Nav>
            <Button 
              variant="outline-light" 
              onClick={onLogout}
              className="ms-2"
            >
              Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;