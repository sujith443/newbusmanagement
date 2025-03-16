import React, { useState } from 'react';
import AppNavbar from '../components/Layout/Navbar';
import FeeList from '../components/Fees/FeeList';
import PaymentHistory from '../components/Fees/PaymentHistory';
import Footer from '../components/Layout/Footer';
import { Container, Row, Col, Nav } from 'react-bootstrap';

const FeesPage = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('fees');
  const [selectedStudentId, setSelectedStudentId] = useState(null);

  const handleTabChange = (tabKey) => {
    setActiveTab(tabKey);
  };

  const handleViewPaymentHistory = (studentId) => {
    setSelectedStudentId(studentId);
    setActiveTab('history');
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <AppNavbar onLogout={onLogout} />
      <Container fluid className="py-4 flex-grow-1">
        <h4 className="mb-4">Fee Management</h4>
        
        <Nav variant="tabs" className="mb-4">
          <Nav.Item>
            <Nav.Link 
              active={activeTab === 'fees'} 
              onClick={() => handleTabChange('fees')}
            >
              Fee Collection
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link 
              active={activeTab === 'history'} 
              onClick={() => handleTabChange('history')}
            >
              Payment History
            </Nav.Link>
          </Nav.Item>
        </Nav>
        
        {activeTab === 'fees' ? (
          <FeeList onViewPaymentHistory={handleViewPaymentHistory} />
        ) : (
          <PaymentHistory studentId={selectedStudentId} />
        )}
      </Container>
      <Footer />
    </div>
  );
};

export default FeesPage;