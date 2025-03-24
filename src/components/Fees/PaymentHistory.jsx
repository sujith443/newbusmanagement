import React, { useState, useEffect } from 'react';
import { Card, Table, Badge, Spinner, Button } from 'react-bootstrap';
import { FaMoneyBill, FaFileDownload, FaPrint, FaDownload } from 'react-icons/fa';
import { getStudentPayments } from '../../utils/Api';

const PaymentHistory = ({ studentId }) => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load payment history when studentId changes
  useEffect(() => {
    const fetchPaymentHistory = async () => {
      // Check if studentId is valid
      if (studentId === null || studentId === undefined) {
        console.log("No valid studentId provided:", studentId);
        setPayments([]);
        setLoading(false);
        return;
      }
      
      console.log("Fetching payment history for student ID:", studentId);
      setLoading(true);
      setError(null);
      
      try {
        // Get payments from API
        const paymentData = await getStudentPayments(studentId);
        console.log(`Received ${paymentData.length} payment records from API for student ${studentId}`);
        
        if (paymentData.length === 0) {
          console.log("No payment records found, checking if this student should have pending fees");
          
          // Check if this student should have pending fees (ID divisible by 3)
          if (parseInt(studentId) % 3 === 0) {
            // Generate a pending payment record
            const currentYear = new Date().getFullYear();
            const pendingPayment = [
              {
                id: `pending-${studentId}`,
                studentId: parseInt(studentId),
                transactionId: '-',
                amount: 10000,
                date: '-',
                academicYear: `${currentYear}-${currentYear+1}`,
                semester: 'Even',
                paymentMode: '-',
                status: 'Pending'
              }
            ];
            
            setPayments(pendingPayment);
            console.log("Generated pending payment for student with ID divisible by 3");
          }
        } else {
          // Sort payments by date (pending first, then most recent)
          const sortedPayments = [...paymentData].sort((a, b) => {
            // Pending payments always first
            if (a.status === 'Pending') return -1;
            if (b.status === 'Pending') return 1;
            
            // For dates that are not '-'
            if (a.date !== '-' && b.date !== '-') {
              return new Date(b.date) - new Date(a.date);
            }
            
            return 0;
          });
          
          setPayments(sortedPayments);
          console.log("Payment data sorted and set");
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching payment history:', err);
        setError('Failed to load payment history');
        setLoading(false);
      }
    };
    
    fetchPaymentHistory();
  }, [studentId]); // Depend on studentId changes

  const getStatusBadge = (status) => {
    if (status === 'Success') {
      return <Badge bg="success">Success</Badge>;
    } else if (status === 'Pending') {
      return <Badge bg="warning" text="dark">Pending</Badge>;
    } else {
      return <Badge bg="danger">Failed</Badge>;
    }
  };
  
  const getPaymentModeBadge = (mode) => {
    let bgColor = "secondary";
    
    switch(mode) {
      case 'Online':
        bgColor = "info";
        break;
      case 'Cash':
        bgColor = "success";
        break;
      case 'Cheque':
        bgColor = "warning";
        break;
      case 'UPI':
        bgColor = "primary";
        break;
      default:
        bgColor = "secondary";
    }
    
    return <Badge bg={bgColor}>{mode}</Badge>;
  };

  // Calculate totals safely
  const totalPaid = payments
    .filter(p => p.status === 'Success')
    .reduce((sum, p) => sum + (typeof p.amount === 'number' ? p.amount : 0), 0);
    
  const totalPending = payments
    .filter(p => p.status === 'Pending')
    .reduce((sum, p) => sum + (typeof p.amount === 'number' ? p.amount : 0), 0);

  return (
    <Card className="border-0 shadow-sm">
      <Card.Header className="bg-white d-flex justify-content-between align-items-center">
        <h5 className="mb-0">
          <FaMoneyBill className="text-success me-2" />
          Payment History
        </h5>
        <div>
          <Button variant="outline-primary" size="sm" className="me-2">
            <FaPrint className="me-1" />
            Print
          </Button>
          <Button variant="outline-success" size="sm">
            <FaDownload className="me-1" />
            Export
          </Button>
        </div>
      </Card.Header>
      <Card.Body>
        {loading ? (
          <div className="text-center py-4">
            <Spinner animation="border" variant="primary" />
            <p className="mt-3">Loading payment history...</p>
          </div>
        ) : error ? (
          <div className="text-center py-4 text-danger">
            <p>{error}</p>
          </div>
        ) : payments.length === 0 ? (
          <div className="text-center py-4 text-muted">
            <p>No payment records found for this student.</p>
          </div>
        ) : (
          <div className="table-responsive">
            <Table hover>
              <thead className="table-light">
                <tr>
                  <th>Transaction ID</th>
                  <th>Date</th>
                  <th>Academic Year</th>
                  <th>Semester</th>
                  <th>Amount (₹)</th>
                  <th>Payment Mode</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {payments.map(payment => (
                  <tr key={payment.id}>
                    <td>{payment.transactionId}</td>
                    <td>{payment.date}</td>
                    <td>{payment.academicYear}</td>
                    <td>{payment.semester}</td>
                    <td>₹ {payment.amount.toLocaleString()}</td>
                    <td>{getPaymentModeBadge(payment.paymentMode)}</td>
                    <td>{getStatusBadge(payment.status)}</td>
                    <td>
                      {payment.status === 'Success' && (
                        <Button 
                          variant="outline-info" 
                          size="sm" 
                          onClick={() => alert(`Downloading receipt for transaction ${payment.transactionId}`)}
                        >
                          <FaFileDownload className="me-1" />
                          Receipt
                        </Button>
                      )}
                      {payment.status === 'Pending' && (
                        <Button 
                          variant="outline-success" 
                          size="sm" 
                          onClick={() => alert('Payment reminder sent')}
                        >
                          Send Reminder
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </Card.Body>
      <Card.Footer className="bg-white">
        <small className="text-muted">
          Total Records: {payments.length} | 
          Amount Paid: ₹ {totalPaid.toLocaleString()} | 
          Pending: ₹ {totalPending.toLocaleString()}
        </small>
      </Card.Footer>
    </Card>
  );
};

export default PaymentHistory;