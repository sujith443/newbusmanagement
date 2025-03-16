import React from 'react';
import { Card, Row, Col, Badge, ListGroup, Modal, Button } from 'react-bootstrap';
import { FaUserGraduate, FaBus, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

const StudentDetails = ({ studentId, show, handleClose }) => {
  // Mock data for a specific student
  const studentData = {
    id: 1,
    regNo: 'BT20001',
    name: 'Amit Kumar',
    department: 'Computer Science Engineering',
    year: 3,
    section: 'A',
    dob: '15 Jun 2002',
    gender: 'Male',
    bloodGroup: 'B+',
    address: '123, Anna Nagar, Tirupati, Andhra Pradesh - 517501',
    contactNo: '9876543210',
    email: 'amit.kumar@example.com',
    fatherName: 'Rajesh Kumar',
    fatherContactNo: '9876543220',
    motherName: 'Sunita Kumar',
    motherContactNo: '9876543230',
    route: {
      routeNumber: 'R001',
      name: 'College to Tirupati'
    },
    pickupPoint: 'Tirupati Main Road',
    feeStatus: {
      isPaid: true,
      paidAmount: 10000,
      paidDate: '05 Mar 2025',
      dueAmount: 0
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Student Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="mb-4">
          <Col md={8}>
            <h4>{studentData.name}</h4>
            <p className="text-muted mb-0">Registration No: {studentData.regNo}</p>
            <p className="text-muted mb-0">{studentData.department} - Year {studentData.year}, Section {studentData.section}</p>
          </Col>
          <Col md={4} className="text-md-end">
            <Badge bg="info" className="me-2">CSE</Badge>
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
                  <span>₹ {studentData.feeStatus.paidAmount}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Paid Date</span>
                  <span>{studentData.feeStatus.paidDate}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Due Amount</span>
                  <span>₹ {studentData.feeStatus.dueAmount}</span>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Close</Button>
        <Button variant="primary">Edit Details</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default StudentDetails;