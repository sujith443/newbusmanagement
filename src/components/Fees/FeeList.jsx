import React, { useState, useEffect } from 'react';
import { Card, Table, Form, InputGroup, Button, Badge, Spinner } from 'react-bootstrap';
import { FaSearch, FaRupeeSign, FaFileInvoice, FaCheckCircle, FaPlusCircle, FaFilter } from 'react-icons/fa';
import { getStudents, busRoutes, getAllPayments, addPayment, dummyPaymentsData } from '../../utils/Api';
import AddPaymentForm from './AddPaymentForm';

const FeeList = ({ onViewStudent }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [students, setStudents] = useState([]);
  const [feesData, setFeesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');
  
  // State for payment modal
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  
  // Fetch students data on component mount
  useEffect(() => {
    fetchData();
  }, []);
  
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Get all students
      const studentsData = await getStudents();
      setStudents(studentsData);
      
      // Get all payments from the dummy data
      // In a real app, this would use getAllPayments(), but we're using the dummy data directly
      const payments = dummyPaymentsData;
      
      // Transform students data into fees data
      const generatedFeesData = studentsData.map(student => {
        // Find student payments in the dummy data
        const studentPayments = payments.filter(p => p.studentId === student.id);
        
        // Determine if student has paid based on payment records
        const hasPendingPayment = studentPayments.some(p => p.status === 'Pending');
        const hasSuccessfulPayment = studentPayments.some(p => p.status === 'Success');
        
        // Status based on payment records
        const isPaid = hasSuccessfulPayment && !hasPendingPayment;
        
        // Find latest payment date from payments or generate one
        let paidDate = '-';
        if (isPaid && studentPayments.length > 0) {
          // Get the most recent payment date
          const latestPayment = studentPayments
            .filter(p => p.status === 'Success')
            .sort((a, b) => new Date(b.date) - new Date(a.date))[0];
          
          paidDate = latestPayment ? latestPayment.date : '-';
        }
        
        // Find bus route name
        const busRoute = busRoutes.find(route => route.busNumber === student.route);
        const routeName = busRoute ? busRoute.busNumber : student.route;
        
        return {
          id: student.id,
          regNo: student.regNo,
          name: student.name,
          amount: 10000, // Standard transport fee
          dueDate: '15 Mar 2025',
          status: isPaid ? 'Paid' : 'Pending',
          paidDate: paidDate,
          route: routeName,
          department: student.department,
          year: student.year
        };
      });
      
      setFeesData(generatedFeesData);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to load fee data. Please try again later.');
      setLoading(false);
    }
  };
  
  // Apply all filters to fees data
  const getFilteredFees = () => {
    // First apply search filter
    let filtered = feesData.filter(fee => 
      fee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fee.regNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fee.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fee.route.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    // Then apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(fee => 
        statusFilter === 'paid' ? fee.status === 'Paid' : fee.status === 'Pending'
      );
    }
    
    return filtered;
  };
  
  const filteredFees = getFilteredFees();

  // Get badge for fee status
  const getStatusBadge = (status) => {
    if (status === 'Paid') {
      return <Badge bg="success">Paid</Badge>;
    } else {
      return <Badge bg="warning" text="dark">Pending</Badge>;
    }
  };
  
  // Get badge for department
  const getDepartmentBadge = (department, year) => {
    let bgColor = "secondary";
    
    // Different colors for different departments
    switch(department) {
      case 'CSE':
        bgColor = "info";
        break;
      case 'ECE':
        bgColor = "primary";
        break;
      case 'MECH':
        bgColor = "danger";
        break;
      case 'CIVIL':
        bgColor = "success";
        break;
      case 'IT':
        bgColor = "dark";
        break;
      case 'EEE':
        bgColor = "warning";
        break;
      default:
        bgColor = "secondary";
    }
    
    return (
      <div>
        <Badge bg={bgColor} className="me-1">{department}</Badge>
        <Badge bg="secondary">Year {year}</Badge>
      </div>
    );
  };

  // Handle view student details
  const handleViewStudent = (studentId) => {
    if (onViewStudent) {
      onViewStudent(studentId);
    }
  };

  // Handle record payment
  const handleRecordPayment = (id) => {
    setSelectedStudentId(id);
    setShowPaymentModal(true);
  };
  
  // Handle payment added
  const handlePaymentAdded = (payment) => {
    // Update fee status in the list
    const updatedFeesData = feesData.map(fee => {
      if (fee.id === payment.studentId) {
        return {
          ...fee,
          status: 'Paid',
          paidDate: payment.date
        };
      }
      return fee;
    });
    
    setFeesData(updatedFeesData);
    setShowPaymentModal(false);
    setSelectedStudentId(null);
  };

  return (
    <>
      <Card className="border-0 shadow-sm">
        <Card.Header className="bg-white">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="mb-0">
              <FaRupeeSign className="text-primary me-2" />
              Transport Fee Management
            </h5>
            <Button 
              variant="success" 
              onClick={() => {
                setSelectedStudentId(null);
                setShowPaymentModal(true);
              }}
            >
              <FaPlusCircle className="me-2" />
              Add New Payment
            </Button>
          </div>
          
          <div className="d-flex">
            <InputGroup className="me-3" style={{ maxWidth: '500px' }}>
              <Form.Control
                placeholder="Search by name, reg no, route..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button variant="primary">
                <FaSearch />
              </Button>
            </InputGroup>
            
            <Form.Select
              className="ms-auto" 
              style={{ maxWidth: '200px' }}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="paid">Paid Only</option>
              <option value="pending">Pending Only</option>
            </Form.Select>
          </div>
        </Card.Header>
        <Card.Body>
          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" variant="primary" />
              <p className="mt-3">Loading fee data...</p>
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
                    <th>Route</th>
                    <th>Amount (₹)</th>
                    <th>Due Date</th>
                    <th>Status</th>
                    <th>Paid Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredFees.map(fee => (
                    <tr key={fee.id}>
                      <td>{fee.regNo}</td>
                      <td>
                        <a 
                          href="#" 
                          className="text-decoration-none"
                          onClick={(e) => {
                            e.preventDefault();
                            handleViewStudent(fee.id);
                          }}
                        >
                          {fee.name}
                        </a>
                      </td>
                      <td>{getDepartmentBadge(fee.department, fee.year)}</td>
                      <td>
                        <Badge bg="info">{fee.route}</Badge>
                      </td>
                      <td>₹ {fee.amount.toLocaleString()}</td>
                      <td>{fee.dueDate}</td>
                      <td>{getStatusBadge(fee.status)}</td>
                      <td>{fee.paidDate}</td>
                      <td>
                        {fee.status === 'Pending' ? (
                          <Button 
                            variant="outline-success" 
                            size="sm"
                            onClick={() => handleRecordPayment(fee.id)}
                          >
                            <FaCheckCircle className="me-1" />
                            Record Payment
                          </Button>
                        ) : (
                          <Button 
                            variant="outline-info" 
                            size="sm"
                            onClick={() => alert(`Generating receipt for ${fee.name}`)}
                          >
                            <FaFileInvoice className="me-1" />
                            Receipt
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                  {filteredFees.length === 0 && (
                    <tr>
                      <td colSpan="9" className="text-center py-3">No records found</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          )}
          
          {!loading && !error && (
            <div className="d-flex justify-content-between mt-3">
              <div>
                <small className="text-muted">
                  Showing {filteredFees.length} of {feesData.length} records
                </small>
              </div>
              <div>
                <Button variant="outline-primary" size="sm" className="me-2">
                  <FaFilter className="me-1" />
                  Generate Report
                </Button>
                <Button variant="outline-success" size="sm">
                  Export to Excel
                </Button>
              </div>
            </div>
          )}
        </Card.Body>
      </Card>
      
      {/* Add Payment Modal */}
      <AddPaymentForm
        show={showPaymentModal}
        handleClose={() => {
          setShowPaymentModal(false);
          setSelectedStudentId(null);
        }}
        onPaymentAdded={handlePaymentAdded}
        preSelectedStudentId={selectedStudentId}
      />
    </>
  );
};

export default FeeList;