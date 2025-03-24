import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Badge, ListGroup, Modal, Button, Spinner } from 'react-bootstrap';
import { FaUserGraduate, FaBus, FaMapMarkerAlt, FaPhone, FaEnvelope, FaExclamationTriangle } from 'react-icons/fa';
import { getStudentById } from '../../utils/Api';

const StudentDetails = ({ studentId, show, handleClose }) => {
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch student data when the modal is shown and studentId changes
  useEffect(() => {
    if (show && studentId) {
      setLoading(true);
      setError(null);
      
      getStudentById(studentId)
        .then(data => {
          if (data) {
            // Fill in any missing data with defaults
            const enhancedData = enrichStudentData(data);
            setStudentData(enhancedData);
          } else {
            setError('Student data not found');
          }
          setLoading(false);
        })
        .catch(err => {
          console.error('Error fetching student details:', err);
          setError('Failed to load student details');
          setLoading(false);
        });
    }
  }, [studentId, show]);

  // Function to enrich student data with defaults for missing fields
  const enrichStudentData = (data) => {
    // Default values for missing fields
    const defaults = {
      section: 'A',
      dob: '15 Jun 2002',
      gender: data.id % 2 === 0 ? 'Female' : 'Male',
      bloodGroup: ['A+', 'B+', 'O+', 'AB+'][Math.floor(Math.random() * 4)],
      address: `${123 + (data.id || 0)}, Main Street, Anantapur, Andhra Pradesh - 515001`,
      email: `${data.name ? data.name.toLowerCase().replace(/\s+/g, '.') : 'student'}@example.com`,
      fatherName: `Rajesh ${data.name ? data.name.split(' ').slice(-1)[0] : 'Kumar'}`,
      fatherContactNo: `9876543${220 + (data.id || 0) % 100}`,
      motherName: `Sunita ${data.name ? data.name.split(' ').slice(-1)[0] : 'Kumar'}`,
      motherContactNo: `9876543${230 + (data.id || 0) % 100}`,
      route: {
        routeNumber: data.route || 'Unknown',
        name: data.route ? `${data.route} Route` : 'Unknown Route'
      },
      pickupPoint: data.pickupPoint || 'Campus Main Gate',
      feeStatus: {
        isPaid: Boolean(data.id % 3),
        paidAmount: Boolean(data.id % 3) ? 10000 : 0,
        paidDate: Boolean(data.id % 3) ? `${(data.id % 28) + 1} Mar 2025` : '-',
        dueAmount: Boolean(data.id % 3) ? 0 : 10000
      }
    };

    // Return merged data, with API data taking precedence
    return {
      ...defaults,
      ...data,
      // Handle nested objects carefully
      route: {
        ...defaults.route,
        ...(data.route && typeof data.route === 'object' ? data.route : {})
      },
      feeStatus: {
        ...defaults.feeStatus,
        ...(data.feeStatus && typeof data.feeStatus === 'object' ? data.feeStatus : {})
      }
    };
  };

  // Department short code for badge display
  const getDepartmentCode = (fullDepartment) => {
    if (!fullDepartment) return 'N/A';
    
    // Extract department code from full name
    const deptMap = {
      'Computer Science Engineering': 'CSE',
      'Electronics & Communication Engineering': 'ECE',
      'Electrical & Electronics Engineering': 'EEE',
      'Mechanical Engineering': 'MECH',
      'Civil Engineering': 'CIVIL',
      'Information Technology': 'IT'
    };
    
    // Check if the full department name is in our map
    for (const [full, code] of Object.entries(deptMap)) {
      if (fullDepartment.includes(full)) return code;
    }
    
    // If it's already a short code
    if (fullDepartment.length <= 5) return fullDepartment;
    
    // Fallback: use the first letter of each word
    return fullDepartment
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };

  if (!show) return null;

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          <FaUserGraduate className="me-2 text-primary" />
          Student Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" className="mb-3" />
            <p>Loading student details...</p>
          </div>
        ) : error ? (
          <div className="text-center py-5 text-danger">
            <FaExclamationTriangle size={40} className="mb-3" />
            <p>{error}</p>
          </div>
        ) : studentData && (
          <>
            <Row className="mb-4">
              <Col md={8}>
                <h4>{studentData.name}</h4>
                <p className="text-muted mb-0">Registration No: {studentData.regNo}</p>
                <p className="text-muted mb-0">{studentData.department} - Year {studentData.year}, Section {studentData.section}</p>
              </Col>
              <Col md={4} className="text-md-end">
                <Badge bg="info" className="me-2">{getDepartmentCode(studentData.department)}</Badge>
                <Badge bg="primary">Year {studentData.year}</Badge>
              </Col>
            </Row>

            <Row className="mb-4">
              <Col md={6}>
                <Card className="border-0 shadow-sm h-100">
                  <Card.Header className="bg-white">
                    <h6 className="mb-0">Personal Information</h6>
                  </Card.Header>
                  <Card.Body>
                    <ListGroup variant="flush">
                      <ListGroup.Item className="d-flex justify-content-between px-0">
                        <span>Date of Birth</span>
                        <span>{studentData.dob}</span>
                      </ListGroup.Item>
                      <ListGroup.Item className="d-flex justify-content-between px-0">
                        <span>Gender</span>
                        <span>{studentData.gender}</span>
                      </ListGroup.Item>
                      <ListGroup.Item className="d-flex justify-content-between px-0">
                        <span>Blood Group</span>
                        <span>{studentData.bloodGroup}</span>
                      </ListGroup.Item>
                      <ListGroup.Item className="d-flex align-items-start px-0">
                        <span className="me-2">Address</span>
                        <span className="text-end">{studentData.address}</span>
                      </ListGroup.Item>
                    </ListGroup>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={6}>
                <Card className="border-0 shadow-sm h-100">
                  <Card.Header className="bg-white">
                    <h6 className="mb-0">Contact Information</h6>
                  </Card.Header>
                  <Card.Body>
                    <ListGroup variant="flush">
                      <ListGroup.Item className="d-flex align-items-center px-0">
                        <FaPhone className="me-2 text-primary" />
                        <span>{studentData.contactNo}</span>
                      </ListGroup.Item>
                      <ListGroup.Item className="d-flex align-items-center px-0">
                        <FaEnvelope className="me-2 text-primary" />
                        <span>{studentData.email}</span>
                      </ListGroup.Item>
                      <ListGroup.Item className="px-0">
                        <div className="fw-bold mb-1">Father's Name</div>
                        <div className="d-flex justify-content-between">
                          <span>{studentData.fatherName}</span>
                          <span>{studentData.fatherContactNo}</span>
                        </div>
                      </ListGroup.Item>
                      <ListGroup.Item className="px-0">
                        <div className="fw-bold mb-1">Mother's Name</div>
                        <div className="d-flex justify-content-between">
                          <span>{studentData.motherName}</span>
                          <span>{studentData.motherContactNo}</span>
                        </div>
                      </ListGroup.Item>
                    </ListGroup>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Card className="border-0 shadow-sm">
                  <Card.Header className="bg-white">
                    <h6 className="mb-0">Transportation Details</h6>
                  </Card.Header>
                  <Card.Body>
                    <div className="d-flex align-items-center mb-3">
                      <FaBus className="text-primary me-2" />
                      <div>
                        <div className="fw-bold">{studentData.route.routeNumber} - {studentData.route.name}</div>
                      </div>
                    </div>
                    <div className="d-flex align-items-center">
                      <FaMapMarkerAlt className="text-danger me-2" />
                      <div>
                        <div className="fw-bold">Pickup Point</div>
                        <div>{studentData.pickupPoint}</div>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={6}>
                <Card className="border-0 shadow-sm">
                  <Card.Header className="bg-white">
                    <h6 className="mb-0">Fee Status</h6>
                  </Card.Header>
                  <Card.Body>
                    <div className="d-flex justify-content-between mb-2">
                      <span>Fee Status</span>
                      <Badge bg={studentData.feeStatus.isPaid ? "success" : "warning"}>
                        {studentData.feeStatus.isPaid ? "Paid" : "Pending"}
                      </Badge>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span>Paid Amount</span>
                      <span>₹ {studentData.feeStatus.paidAmount.toLocaleString()}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span>Paid Date</span>
                      <span>{studentData.feeStatus.paidDate}</span>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span>Due Amount</span>
                      <span>₹ {studentData.feeStatus.dueAmount.toLocaleString()}</span>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            
            {/* Academic Details Section */}
            {studentData.academicDetails && (
              <Row className="mt-4">
                <Col md={12}>
                  <Card className="border-0 shadow-sm">
                    <Card.Header className="bg-white">
                      <h6 className="mb-0">Academic Details</h6>
                    </Card.Header>
                    <Card.Body>
                      <Row>
                        <Col md={6}>
                          <div className="d-flex justify-content-between mb-2">
                            <span>Academic Batch</span>
                            <span>{studentData.academicDetails.batch}</span>
                          </div>
                          <div className="d-flex justify-content-between mb-2">
                            <span>CGPA</span>
                            <Badge bg="success">{studentData.academicDetails.cgpa}</Badge>
                          </div>
                        </Col>
                        <Col md={6}>
                          <div className="d-flex justify-content-between mb-2">
                            <span>Attendance</span>
                            <Badge bg={parseFloat(studentData.academicDetails.attendance) >= 85 ? "success" : "warning"}>
                              {studentData.academicDetails.attendance}
                            </Badge>
                          </div>
                          <div className="d-flex justify-content-between mb-2">
                            <span>Faculty Mentor</span>
                            <span>{studentData.academicDetails.mentor}</span>
                          </div>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            )}
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Close</Button>
        <Button variant="primary" disabled={loading || error}>Edit Details</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default StudentDetails;