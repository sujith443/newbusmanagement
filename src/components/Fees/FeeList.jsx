import React, { useState } from 'react';
import { Card, Table, Form, InputGroup, Button, Badge } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';

const FeeList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock data for student fees
  const feesData = [
    { id: 1, regNo: 'BT20001', name: 'Amit Kumar', amount: 10000, dueDate: '15 Mar 2025', status: 'Paid', paidDate: '10 Mar 2025', route: 'R001' },
    { id: 2, regNo: 'BT20015', name: 'Priya Sharma', amount: 10000, dueDate: '15 Mar 2025', status: 'Paid', paidDate: '09 Mar 2025', route: 'R002' },
    { id: 3, regNo: 'BT20032', name: 'Rahul Singh', amount: 10000, dueDate: '15 Mar 2025', status: 'Pending', paidDate: '-', route: 'R003' },
    { id: 4, regNo: 'BT20048', name: 'Anjali Patel', amount: 10000, dueDate: '15 Mar 2025', status: 'Paid', paidDate: '08 Mar 2025', route: 'R001' },
    { id: 5, regNo: 'BT20055', name: 'Karthik Rajan', amount: 10000, dueDate: '15 Mar 2025', status: 'Pending', paidDate: '-', route: 'R004' },
  ];
  
  // Filter fees data based on search term
  const filteredFees = feesData.filter(fee => 
    fee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    fee.regNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    fee.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status) => {
    if (status === 'Paid') {
      return <Badge bg="success">Paid</Badge>;
    } else {
      return <Badge bg="warning" text="dark">Pending</Badge>;
    }
  };

  return (
    <Card className="border-0 shadow-sm">
      <Card.Header className="bg-white">
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Fee Management</h5>
          <InputGroup className="w-50">
            <Form.Control
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button variant="primary">
              <FaSearch />
            </Button>
          </InputGroup>
        </div>
      </Card.Header>
      <Card.Body>
        <div className="table-responsive">
          <Table hover>
            <thead className="table-light">
              <tr>
                <th>Reg No.</th>
                <th>Name</th>
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
                  <td>{fee.name}</td>
                  <td>
                    <Badge bg="info">{fee.route}</Badge>
                  </td>
                  <td>₹ {fee.amount.toLocaleString()}</td>
                  <td>{fee.dueDate}</td>
                  <td>{getStatusBadge(fee.status)}</td>
                  <td>{fee.paidDate}</td>
                  <td>
                    {fee.status === 'Pending' ? (
                      <Button variant="outline-success" size="sm">Record Payment</Button>
                    ) : (
                      <Button variant="outline-info" size="sm">Receipt</Button>
                    )}
                  </td>
                </tr>
              ))}
              {filteredFees.length === 0 && (
                <tr>
                  <td colSpan="8" className="text-center py-3">No records found</td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </Card.Body>
    </Card>
  );
};

export default FeeList;