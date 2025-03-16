import React, { useState } from 'react';
import { Card, Table, Form, InputGroup, Button } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';

const RouteList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock data for routes
  const routesData = [
    { id: 1, routeNumber: 'R001', name: 'College to Tirupati', stops: 8, startTime: '07:30 AM', endTime: '09:00 AM', driver: 'Ramesh K' },
    { id: 2, routeNumber: 'R002', name: 'College to Chennai Central', stops: 12, startTime: '07:15 AM', endTime: '09:15 AM', driver: 'Suresh M' },
    { id: 3, routeNumber: 'R003', name: 'College to Velachery', stops: 6, startTime: '07:45 AM', endTime: '08:45 AM', driver: 'Venkat R' },
    { id: 4, routeNumber: 'R004', name: 'College to Tambaram', stops: 5, startTime: '07:30 AM', endTime: '08:30 AM', driver: 'Krishna L' },
    { id: 5, routeNumber: 'R005', name: 'College to Guduvanchery', stops: 4, startTime: '07:00 AM', endTime: '08:00 AM', driver: 'Prakash S' },
  ];
  
  // Filter routes based on search term
  const filteredRoutes = routesData.filter(route => 
    route.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    route.routeNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card className="border-0 shadow-sm">
      <Card.Header className="bg-white">
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Bus Routes</h5>
          <InputGroup className="w-50">
            <Form.Control
              placeholder="Search routes..."
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
                <th>Route No.</th>
                <th>Route Name</th>
                <th>Stops</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Driver</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRoutes.map(route => (
                <tr key={route.id}>
                  <td>{route.routeNumber}</td>
                  <td>{route.name}</td>
                  <td>{route.stops}</td>
                  <td>{route.startTime}</td>
                  <td>{route.endTime}</td>
                  <td>{route.driver}</td>
                  <td>
                    <Button variant="outline-info" size="sm" className="me-1">View</Button>
                    <Button variant="outline-primary" size="sm">Students</Button>
                  </td>
                </tr>
              ))}
              {filteredRoutes.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center py-3">No routes found</td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </Card.Body>
    </Card>
  );
};

export default RouteList;