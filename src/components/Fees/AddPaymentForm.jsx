import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col, Alert, Spinner } from 'react-bootstrap';
import { FaRupeeSign, FaMoneyCheckAlt, FaReceipt, FaCalendarAlt } from 'react-icons/fa';
import { getStudents, addPayment, getStudentById } from '../../utils/Api';

const AddPaymentForm = ({ show, handleClose, onPaymentAdded, preSelectedStudentId = null }) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [validated, setValidated] = useState(false);
  
  // Form data state
  const [formData, setFormData] = useState({
    studentId: '',
    studentName: '',
    regNo: '',
    amount: 10000,
    paymentDate: new Date().toISOString().split('T')[0],
    academicYear: '2024-2025',
    semester: 'Even',
    paymentMode: 'Online',
    transactionId: generateTransactionId(),
    remarks: ''
  });

  // Load students data when modal opens
  useEffect(() => {
    if (show) {
      setInitialLoading(true);
      setError(null);
      
      getStudents()
        .then(data => {
          setStudents(data);
          
          // If a student is pre-selected, set their details
          if (preSelectedStudentId) {
            handleStudentSelect(preSelectedStudentId);
          }
          
          setInitialLoading(false);
        })
        .catch(err => {
          console.error('Error loading students:', err);
          setError('Failed to load student data');
          setInitialLoading(false);
        });
    }
  }, [show, preSelectedStudentId]);

  // Generate a transaction ID
  function generateTransactionId() {
    const prefix = 'TXN';
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `${prefix}${timestamp}${random}`;
  }

  // Reset form data
  const resetForm = () => {
    setFormData({
      studentId: '',
      studentName: '',
      regNo: '',
      amount: 10000,
      paymentDate: new Date().toISOString().split('T')[0],
      academicYear: '2024-2025',
      semester: 'Even',
      paymentMode: 'Online',
      transactionId: generateTransactionId(),
      remarks: ''
    });
    setValidated(false);
    setError(null);
    setSuccess(false);
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Auto-generate email when name changes
    if (name === 'name' && value) {
      const generatedEmail = `${value.toLowerCase().replace(/\s+/g, '.')}@example.com`;
      setFormData(prev => ({ ...prev, email: generatedEmail }));
    }
  };

  // Handle student selection
  const handleStudentSelect = (studentId) => {
    const parsedId = parseInt(studentId);
    if (isNaN(parsedId)) return;
    
    getStudentById(parsedId)
      .then(studentDetails => {
        if (studentDetails) {
          setFormData(prev => ({
            ...prev,
            studentId: studentDetails.id,
            studentName: studentDetails.name,
            regNo: studentDetails.regNo
          }));
        }
      })
      .catch(err => {
        console.error('Error loading student details:', err);
      });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    
    // Form validation
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      // Create payment object
      const newPayment = {
        studentId: parseInt(formData.studentId),
        transactionId: formData.transactionId,
        amount: parseFloat(formData.amount),
        date: new Date(formData.paymentDate).toLocaleDateString('en-US', { 
          day: '2-digit', 
          month: 'short', 
          year: 'numeric' 
        }),
        academicYear: formData.academicYear,
        semester: formData.semester,
        paymentMode: formData.paymentMode,
        status: 'Success',
        remarks: formData.remarks
      };
      
      // Add the payment to our API
      const savedPayment = await addPayment(newPayment);
      
      console.log('New payment created:', savedPayment);
      
      setSuccess(true);
      setLoading(false);
      
      // Notify parent component after delay
      setTimeout(() => {
        if (onPaymentAdded) {
          onPaymentAdded(savedPayment);
        }
      }, 1500);
      
    } catch (err) {
      console.error('Error recording payment:', err);
      setError('Failed to record payment. Please try again.');
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
          <FaMoneyCheckAlt className="text-success me-2" />
          Record Student Payment
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {initialLoading ? (
          <div className="text-center py-4">
            <Spinner animation="border" variant="primary" />
            <p className="mt-3">Loading student data...</p>
          </div>
        ) : success ? (
          <Alert variant="success">
            <Alert.Heading>Payment Recorded Successfully!</Alert.Heading>
            <p>
              The payment of ₹{parseFloat(formData.amount).toLocaleString()} for {formData.studentName} 
              has been recorded successfully.
            </p>
            <p className="mb-0">
              Transaction ID: <strong>{formData.transactionId}</strong>
            </p>
          </Alert>
        ) : (
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            {error && <Alert variant="danger">{error}</Alert>}
            
            <Row className="mb-3">
              <Col md={12}>
                <Form.Group controlId="studentId">
                  <Form.Label>Select Student</Form.Label>
                  <Form.Select 
                    name="studentId" 
                    value={formData.studentId}
                    onChange={(e) => handleStudentSelect(e.target.value)}
                    required
                    disabled={preSelectedStudentId !== null}
                  >
                    <option value="">Select a student</option>
                    {students.map(student => (
                      <option key={student.id} value={student.id}>
                        {student.regNo} - {student.name} ({student.department}, Year {student.year})
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    Please select a student.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            
            {formData.studentId && (
              <>
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group controlId="regNo">
                      <Form.Label>Registration No</Form.Label>
                      <Form.Control
                        type="text"
                        value={formData.regNo}
                        readOnly
                        plaintext
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="studentName">
                      <Form.Label>Student Name</Form.Label>
                      <Form.Control
                        type="text"
                        value={formData.studentName}
                        readOnly
                        plaintext
                      />
                    </Form.Group>
                  </Col>
                </Row>
                
                <hr />
                
                <h5 className="mb-3">
                  <FaRupeeSign className="text-success me-2" />
                  Payment Details
                </h5>
                
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group controlId="amount">
                      <Form.Label>Amount (₹)</Form.Label>
                      <Form.Control
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        required
                        min="1"
                      />
                      <Form.Control.Feedback type="invalid">
                        Please enter a valid amount.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="paymentDate">
                      <Form.Label>
                        <FaCalendarAlt className="me-1" />
                        Payment Date
                      </Form.Label>
                      <Form.Control
                        type="date"
                        name="paymentDate"
                        value={formData.paymentDate}
                        onChange={handleChange}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Please select a payment date.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group controlId="academicYear">
                      <Form.Label>Academic Year</Form.Label>
                      <Form.Select
                        name="academicYear"
                        value={formData.academicYear}
                        onChange={handleChange}
                        required
                      >
                        <option value="2025-2026">2025-2026</option>
                        <option value="2024-2025">2024-2025</option>
                        <option value="2023-2024">2023-2024</option>
                        <option value="2022-2023">2022-2023</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="semester">
                      <Form.Label>Semester</Form.Label>
                      <Form.Select
                        name="semester"
                        value={formData.semester}
                        onChange={handleChange}
                        required
                      >
                        <option value="Odd">Odd Semester</option>
                        <option value="Even">Even Semester</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
                
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group controlId="paymentMode">
                      <Form.Label>Payment Mode</Form.Label>
                      <Form.Select
                        name="paymentMode"
                        value={formData.paymentMode}
                        onChange={handleChange}
                        required
                      >
                        <option value="Online">Online Payment</option>
                        <option value="Cash">Cash</option>
                        <option value="Cheque">Cheque</option>
                        <option value="DD">Demand Draft</option>
                        <option value="UPI">UPI</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="transactionId">
                      <Form.Label>Transaction ID</Form.Label>
                      <Form.Control
                        type="text"
                        name="transactionId"
                        value={formData.transactionId}
                        onChange={handleChange}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Please enter a transaction ID.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                
                <Row className="mb-3">
                  <Col md={12}>
                    <Form.Group controlId="remarks">
                      <Form.Label>Remarks (Optional)</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={2}
                        name="remarks"
                        value={formData.remarks}
                        onChange={handleChange}
                        placeholder="Any additional information"
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </>
            )}
            
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
                variant="success"
                disabled={loading || !formData.studentId}
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
                    Processing...
                  </>
                ) : (
                  <>
                    <FaReceipt className="me-2" />
                    Record Payment
                  </>
                )}
              </Button>
            </div>
          </Form>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default AddPaymentForm;