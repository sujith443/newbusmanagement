import React, { useState, useEffect } from 'react';
import { Modal, Button, Table, Card, Badge, Form, InputGroup } from 'react-bootstrap';
import { FaSearch, FaUserGraduate, FaBus, FaSpinner } from 'react-icons/fa';
import { getStudentsByBusNumber } from '../../utils/Api';

const BusStudentsModal = ({ busNumber, show, handleClose, onViewStudent }) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    // Only fetch data when the modal is shown
    if (show && busNumber) {
      setLoading(true);
      setError(null);
      
      getStudentsByBusNumber(busNumber)
        .then(data => {
          setStudents(data);
          setLoading(false);
        })
        .catch(err => {
          console.error('Error fetching students for bus:', err);
          setError('Failed to load students. Please try again later.');
          setLoading(false);
        });
    }
  }, [busNumber, show]);

  // Filter students based on search term
  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.regNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get badge color based on year
  const getYearBadgeColor = (year) => {
    switch (year) {
      case 1: return 'success';
      case 2: return 'info';
      case 3: return 'warning';
      case 4: return 'danger';
      default: return 'secondary';
    }
  };

  // Handler for viewing student details
  const handleViewStudent = (studentId) => {
    if (onViewStudent) {
      handleClose(); // Close this modal first
      onViewStudent(studentId); // Open student details modal
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          <FaBus className="text-primary me-2" />
          Students on {busNumber}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <InputGroup className="mb-3">
          <Form.Control
            placeholder="Search by name, reg no, or department..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button variant="primary">
            <FaSearch />
          </Button>
        </InputGroup>

        <Card className="border-0 shadow-sm">
          {loading ? (
            <div className="text-center py-5">
              <FaSpinner className="fa-spin text-primary mb-3" size={30} />
              <p>Loading students...</p>
            </div>
          ) : error ? (
            <div className="text-center py-4 text-danger">
              <p>{error}</p>
            </div>
          ) : (
            <div className="table-responsive">
              <Table hover>
                <thead className="table-light">
                  <tr>
                    <th>Reg No.</th>
                    <th>Name</th>
                    <th>Department</th>
                    <th>Year</th>
                    <th>Pickup Point</th>
                    <th>Contact</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map(student => (
                    <tr key={student.id}>
                      <td>{student.regNo}</td>
                      <td>{student.name}</td>
                      <td>
                        <Badge bg="secondary">{student.department}</Badge>
                      </td>
                      <td>
                        <Badge bg={getYearBadgeColor(student.year)}>
                          Year {student.year}
                        </Badge>
                      </td>
                      <td>{student.pickupPoint}</td>
                      <td>{student.contactNo}</td>
                      <td>
                        <Button 
                          variant="outline-info" 
                          size="sm"
                          onClick={() => handleViewStudent(student.id)}
                        >
                          <FaUserGraduate className="me-1" /> 
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                  {filteredStudents.length === 0 && (
                    <tr>
                      <td colSpan="7" className="text-center py-3">
                        {students.length === 0 
                          ? 'No students assigned to this route' 
                          : 'No students match your search'}
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          )}
        </Card>
      </Modal.Body>
      <Modal.Footer>
        <div className="d-flex justify-content-between w-100">
          <span className="text-muted">
            {filteredStudents.length} of {students.length} students
          </span>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default BusStudentsModal;