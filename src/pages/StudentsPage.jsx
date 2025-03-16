import React, { useState } from 'react';
import AppNavbar from '../components/Layout/Navbar';
import StudentList from '../components/Students/StudentList';
import StudentDetails from '../components/Students/StudentDetails';
import Footer from '../components/Layout/Footer';
import { Container } from 'react-bootstrap';

const StudentsPage = ({ onLogout }) => {
  const [showStudentDetails, setShowStudentDetails] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(null);

  const handleShowStudentDetails = (studentId) => {
    setSelectedStudentId(studentId);
    setShowStudentDetails(true);
  };

  const handleCloseStudentDetails = () => {
    setShowStudentDetails(false);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <AppNavbar onLogout={onLogout} />
      <Container fluid className="py-4 flex-grow-1">
        <h4 className="mb-4">Student Management</h4>
        <StudentList onViewStudent={handleShowStudentDetails} />
        {showStudentDetails && (
          <StudentDetails 
            studentId={selectedStudentId} 
            show={showStudentDetails} 
            handleClose={handleCloseStudentDetails} 
          />
        )}
      </Container>
      <Footer />
    </div>
  );
};

export default StudentsPage;