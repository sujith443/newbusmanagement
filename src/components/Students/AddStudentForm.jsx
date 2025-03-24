import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col, Alert, Spinner } from 'react-bootstrap';
import { FaUserPlus, FaMapMarkerAlt, FaBus } from 'react-icons/fa';
import { busRoutes } from '../../utils/Api';

const AddStudentForm = ({ show, handleClose, onStudentAdded }) => {
  // Form state
  const [formData, setFormData] = useState({
    regNo: '',
    name: '',
    department: 'CSE',
    year: 1,
    section: 'A',
    gender: 'Male',
    bloodGroup: 'O+',
    dob: '',
    address: '',
    contactNo: '',
    email: '',
    fatherName: '',
    fatherContactNo: '',
    motherName: '',
    motherContactNo: '',
    route: '',
    pickupPoint: ''
  });

  // Routes and pickupPoints
  const [routeOptions, setRouteOptions] = useState([]);
  const [pickupPoints, setPickupPoints] = useState([]);
  
  // Form handling
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Load routes on component mount
  useEffect(() => {
    if (show) {
      // Format routes for dropdown
      const formattedRoutes = busRoutes.map(route => ({
        value: route.busNumber,
        label: `${route.busNumber} (${route.route[0]} to ${route.route[route.route.length - 1]})`
      }));
      setRouteOptions(formattedRoutes);
      
      // Reset form when modal opens
      resetForm();
    }
  }, [show]);

  // Update pickup points when route changes
  useEffect(() => {
    if (formData.route) {
      const selectedRoute = busRoutes.find(route => route.busNumber === formData.route);
      if (selectedRoute && selectedRoute.route) {
        setPickupPoints(selectedRoute.route);
        // Set default pickup point to first stop if none selected
        if (!formData.pickupPoint || !selectedRoute.route.includes(formData.pickupPoint)) {
          setFormData(prev => ({ ...prev, pickupPoint: selectedRoute.route[0] }));
        }
      } else {
        setPickupPoints([]);
      }
    } else {
      setPickupPoints([]);
    }
  }, [formData.route]);

  const resetForm = () => {
    setFormData({
      regNo: `BT${new Date().getFullYear().toString().slice(2)}${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      name: '',
      department: 'CSE',
      year: 1,
      section: 'A',
      gender: 'Male',
      bloodGroup: 'O+',
      dob: '',
      address: '',
      contactNo: '',
      email: '',
      fatherName: '',
      fatherContactNo: '',
      motherName: '',
      motherContactNo: '',
      route: '',
      pickupPoint: ''
    });
    setValidated(false);
    setError('');
    setSuccess(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Auto-generate email when name changes
    if (name === 'name' && value) {
      const generatedEmail = `${value.toLowerCase().replace(/\s+/g, '.')}@example.com`;
      setFormData(prev => ({ ...prev, email: generatedEmail }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      // In a real application, this would be an API call
      // Simulating API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate a random ID between 25-100 (assuming IDs 1-24 are used in your mock data)
      const newId = Math.floor(Math.random() * 75) + 25;
      
      // Format student data for API
      const newStudent = {
        id: newId,
        regNo: formData.regNo,
        name: formData.name,
        department: formData.department,
        year: parseInt(formData.year),
        route: formData.route,
        pickupPoint: formData.pickupPoint,
        contactNo: formData.contactNo,
        // Additional data for student details
        section: formData.section,
        dob: formData.dob,
        gender: formData.gender,
        bloodGroup: formData.bloodGroup,
        address: formData.address,
        email: formData.email,
        fatherName: formData.fatherName,
        fatherContactNo: formData.fatherContactNo,
        motherName: formData.motherName,
        motherContactNo: formData.motherContactNo
      };
      
      // For demo purposes, log the student that would be added
      console.log('New student would be added:', newStudent);
      
      setSuccess(true);
      setLoading(false);
      
      // Notify parent component after a delay to show success message
      setTimeout(() => {
        if (onStudentAdded) {
          onStudentAdded(newStudent);
        }
      }, 1500);
      
    } catch (err) {
      console.error('Error adding student:', err);
      setError('Failed to add student. Please try again.');
      setLoading(false);
    }
  };

  return (
    <Modal 
      show={show} 
      onHide={() => {
        resetForm();
        handleClose();
      }} 
      size="lg"
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <FaUserPlus className="text-primary me-2" />
          Add New Student
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {success ? (
          <Alert variant="success">
            <Alert.Heading>Success!</Alert.Heading>
            <p>
              New student has been added successfully. The student list will be updated shortly.
            </p>
          </Alert>
        ) : (
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            {error && <Alert variant="danger">{error}</Alert>}
            
            <h5 className="mb-3">Student Information</h5>
            
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="regNo">
                  <Form.Label>Registration Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="regNo"
                    value={formData.regNo}
                    onChange={handleChange}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a registration number.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="name">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter student full name"
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a name.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            
            <Row className="mb-3">
              <Col md={4}>
                <Form.Group controlId="department">
                  <Form.Label>Department</Form.Label>
                  <Form.Select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    required
                  >
                    <option value="CSE">Computer Science (CSE)</option>
                    <option value="ECE">Electronics & Communication (ECE)</option>
                    <option value="MECH">Mechanical Engineering (MECH)</option>
                    <option value="CIVIL">Civil Engineering (CIVIL)</option>
                    <option value="IT">Information Technology (IT)</option>
                    <option value="EEE">Electrical & Electronics (EEE)</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="year">
                  <Form.Label>Year</Form.Label>
                  <Form.Select
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    required
                  >
                    <option value="1">1st Year</option>
                    <option value="2">2nd Year</option>
                    <option value="3">3rd Year</option>
                    <option value="4">4th Year</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="section">
                  <Form.Label>Section</Form.Label>
                  <Form.Select
                    name="section"
                    value={formData.section}
                    onChange={handleChange}
                  >
                    <option value="A">Section A</option>
                    <option value="B">Section B</option>
                    <option value="C">Section C</option>
                    <option value="D">Section D</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            
            <Row className="mb-3">
              <Col md={4}>
                <Form.Group controlId="dob">
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a date of birth.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="gender">
                  <Form.Label>Gender</Form.Label>
                  <Form.Select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="bloodGroup">
                  <Form.Label>Blood Group</Form.Label>
                  <Form.Select
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleChange}
                  >
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            
            <Row className="mb-4">
              <Col md={12}>
                <Form.Group controlId="address">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    placeholder="Enter complete address"
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide an address.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            
            <h5 className="mb-3">Contact Information</h5>
            
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="contactNo">
                  <Form.Label>Contact Number</Form.Label>
                  <Form.Control
                    type="tel"
                    name="contactNo"
                    value={formData.contactNo}
                    onChange={handleChange}
                    required
                    placeholder="Enter 10-digit mobile number"
                    pattern="[0-9]{10}"
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid 10-digit contact number.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="email">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter email address"
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid email address.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="fatherName">
                  <Form.Label>Father's Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="fatherName"
                    value={formData.fatherName}
                    onChange={handleChange}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide father's name.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="fatherContactNo">
                  <Form.Label>Father's Contact Number</Form.Label>
                  <Form.Control
                    type="tel"
                    name="fatherContactNo"
                    value={formData.fatherContactNo}
                    onChange={handleChange}
                    required
                    pattern="[0-9]{10}"
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid 10-digit contact number.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            
            <Row className="mb-4">
              <Col md={6}>
                <Form.Group controlId="motherName">
                  <Form.Label>Mother's Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="motherName"
                    value={formData.motherName}
                    onChange={handleChange}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide mother's name.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="motherContactNo">
                  <Form.Label>Mother's Contact Number</Form.Label>
                  <Form.Control
                    type="tel"
                    name="motherContactNo"
                    value={formData.motherContactNo}
                    onChange={handleChange}
                    required
                    pattern="[0-9]{10}"
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid 10-digit contact number.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            
            <h5 className="mb-3">
              <FaBus className="me-2 text-primary" />
              Transportation Details
            </h5>
            
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="route">
                  <Form.Label>Bus Route</Form.Label>
                  <Form.Select
                    name="route"
                    value={formData.route}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Bus Route</option>
                    {routeOptions.map(route => (
                      <option key={route.value} value={route.value}>
                        {route.label}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    Please select a bus route.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="pickupPoint">
                  <Form.Label>
                    <FaMapMarkerAlt className="me-1 text-danger" />
                    Pickup Point
                  </Form.Label>
                  <Form.Select
                    name="pickupPoint"
                    value={formData.pickupPoint}
                    onChange={handleChange}
                    required
                    disabled={!formData.route}
                  >
                    <option value="">Select Pickup Point</option>
                    {pickupPoints.map((point, index) => (
                      <option key={index} value={point}>
                        {point}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    Please select a pickup point.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            
            <div className="d-flex justify-content-end mt-4">
              <Button 
                variant="secondary" 
                className="me-2"
                onClick={() => {
                  resetForm();
                  handleClose();
                }}
                type="button"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                variant="primary"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      className="me-2"
                    />
                    Adding...
                  </>
                ) : (
                  'Add Student'
                )}
              </Button>
            </div>
          </Form>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default AddStudentForm;