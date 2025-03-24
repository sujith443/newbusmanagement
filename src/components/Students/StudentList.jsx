import React, { useState, useEffect } from 'react';
import { Card, Table, Form, InputGroup, Button, Badge, Row, Col } from 'react-bootstrap';
import { FaSearch, FaFilter, FaUserPlus, FaUserGraduate } from 'react-icons/fa';
import AddStudentForm from './AddStudentForm';

// Import the updated student data from API
import { getStudents } from '../../utils/Api';

const StudentList = ({ onViewStudent }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [yearFilter, setYearFilter] = useState('');
  const [error, setError] = useState(null);
  
  // State for managing the add student form
  const [showAddForm, setShowAddForm] = useState(false);
  
  // Fetch student data on component mount
  useEffect(() => {
    fetchStudents();
  }, []);
  
  const fetchStudents = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getStudents();
      setStudents(data);
    } catch (error) {
      console.error('Error fetching students:', error);
      setError('Failed to load students. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  
  // Get unique departments for filter dropdown
  const departments = [...new Set(students.map(student => student.department))];
  
  // Filter students based on search term and filters
  const filteredStudents = students.filter(student => {
    const matchesSearch = 
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.regNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (student.department && student.department.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesDepartment = departmentFilter === '' || student.department === departmentFilter;
    const matchesYear = yearFilter === '' || student.year.toString() === yearFilter;
    
    return matchesSearch && matchesDepartment && matchesYear;
  });

  // Get year badge color based on year
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
      onViewStudent(studentId);
    }
  };
  
  // Handler for adding a new student
  const handleStudentAdded = (newStudent) => {
    setShowAddForm(false);
    // In a real application, you would re-fetch the students
    // For now, we'll just add the new student to our local state
    setStudents(prev => [...prev, newStudent]);
  };

  return (
    <>
      <Card className="border-0 shadow-sm">
        <Card.Header className="bg-white">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="mb-0">
              <FaUserGraduate className="me-2 text-primary" />
              Student List
            </h5>
            <div className="d-flex">
              <InputGroup className="me-2" style={{ width: '300px' }}>
                <Form.Control
                  placeholder="Search students..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button variant="primary">
                  <FaSearch />
                </Button>
              </InputGroup>
              <Button 
                variant="success" 
                onClick={() => setShowAddForm(true)}
              >
                <FaUserPlus className="me-1" />
                Add Student
              </Button>
            </div>
          </div>
          
          <Row>
            <Col md={6} lg={3} className="mb-2 mb-lg-0">
              <Form.Group>
                <Form.Label>Department</Form.Label>
                <Form.Select 
                  value={departmentFilter}
                  onChange={(e) => setDepartmentFilter(e.target.value)}
                >
                  <option value="">All Departments</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6} lg={3}>
              <Form.Group>
                <Form.Label>Year</Form.Label>
                <Form.Select 
                  value={yearFilter}
                  onChange={(e) => setYearFilter(e.target.value)}
                >
                  <option value="">All Years</option>
                  <option value="1">1st Year</option>
                  <option value="2">2nd Year</option>
                  <option value="3">3rd Year</option>
                  <option value="4">4th Year</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3">Loading students...</p>
            </div>
          ) : error ? (
            <div className="text-center py-5 text-danger">
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
                    <th>Route</th>
                    <th>Pickup Point</th>
                    <th>Contact</th>
                    <th>Actions</th>
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
                        <Badge bg={getYearBadgeColor(student.year)}>Year {student.year}</Badge>
                      </td>
                      <td>
                        <Badge bg="info">{student.route}</Badge>
                      </td>
                      <td>{student.pickupPoint}</td>
                      <td>{student.contactNo}</td>
                      <td>
                        <Button 
                          variant="outline-info" 
                          size="sm" 
                          className="me-1"
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
                      <td colSpan="8" className="text-center py-3">No students found</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          )}
          
          <div className="d-flex justify-content-between align-items-center mt-3">
            <div>
              <small className="text-muted">Showing {filteredStudents.length} of {students.length} students</small>
            </div>
            <div>
              <Button variant="outline-secondary" size="sm" className="me-2">
                <FaFilter className="me-1" /> Export
              </Button>
              <Button variant="outline-primary" size="sm">
                Print List
              </Button>
            </div>
          </div>
        </Card.Body>
      </Card>
      
      {/* Add Student Form Modal */}
      <AddStudentForm 
        show={showAddForm}
        handleClose={() => setShowAddForm(false)}
        onStudentAdded={handleStudentAdded}
      />
    </>
  );
};

export default StudentList;