import React from 'react';
import AppNavbar from '../components/Layout/Navbar';
import Dashboard from '../components/Dashboard/Dashboard';
import Footer from '../components/Layout/Footer';
import { Container } from 'react-bootstrap';

const DashboardPage = ({ onLogout }) => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <AppNavbar onLogout={onLogout} />
      <Container fluid className="py-4 flex-grow-1">
        <Dashboard />
      </Container>
      <Footer />
    </div>
  );
};

export default DashboardPage;