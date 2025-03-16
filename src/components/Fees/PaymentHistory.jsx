import React from 'react';
import { Card, Table, Badge } from 'react-bootstrap';

const PaymentHistory = ({ studentId }) => {
  // Mock data for payment history
  const paymentData = [
    { id: 1, transactionId: 'TXN123456', amount: 10000, date: '10 Mar 2025', academicYear: '2024-2025', semester: 'Even', paymentMode: 'Online', status: 'Success' },
    { id: 2, transactionId: 'TXN123102', amount: 10000, date: '05 Sep 2024', academicYear: '2024-2025', semester: 'Odd', paymentMode: 'Online', status: 'Success' },
    { id: 3, transactionId: 'TXN122789', amount: 10000, date: '12 Mar 2024', academicYear: '2023-2024', semester: 'Even', paymentMode: 'Cheque', status: 'Success' },
    { id: 4, transactionId: 'TXN122456', amount: 10000, date: '08 Sep 2023', academicYear: '2023-2024', semester: 'Odd', paymentMode: 'Cash', status: 'Success' },
  ];

  const getStatusBadge = (status) => {
    if (status === 'Success') {
      return <Badge bg="success">Success</Badge>;
    } else if (status === 'Pending') {
      return <Badge bg="warning" text="dark">Pending</Badge>;
    } else {
      return <Badge bg="danger">Failed</Badge>;
    }
  };

  return (
    <Card className="border-0 shadow-sm">
      <Card.Header className="bg-white">
        <h5 className="mb-0">Payment History</h5>
      </Card.Header>
      <Card.Body>
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
              </tr>
            </thead>
            <tbody>
              {paymentData.map(payment => (
                <tr key={payment.id}>
                  <td>{payment.transactionId}</td>
                  <td>{payment.date}</td>
                  <td>{payment.academicYear}</td>
                  <td>{payment.semester}</td>
                  <td>₹ {payment.amount.toLocaleString()}</td>
                  <td>{payment.paymentMode}</td>
                  <td>{getStatusBadge(payment.status)}</td>
                </tr>
              ))}
              {paymentData.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center py-3">No payment history found</td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </Card.Body>
    </Card>
  );
};

export default PaymentHistory;