import React from 'react';
import { Card, Row, Col, Badge, Table, Button, Modal } from 'react-bootstrap';

const RouteDetails = ({ routeId, show, handleClose }) => {
  // Mock data for a specific route
  const routeData = {
    id: 1,
    routeNumber: 'R001',
    name: 'College to Tirupati',
    description: 'Morning pickup from Tirupati to College and evening drop',
    startPoint: 'Tirupati Main Road',
    endPoint: 'College Campus',
    distance: '45 km',
    duration: '1.5 hours',
    startTime: '07:30 AM',
    endTime: '09:00 AM',
    returnStartTime: '05:00 PM',
    returnEndTime: '06:30 PM',
    driver: {
      name: 'Ramesh K',
      licenseNumber: 'TN1420150008542',
      contact: '9876543210'
    },
    bus: {
      number: 'TN-01-BH-1234',
      capacity: 45,
      model: 'Ashok Leyland'
    },
    stops: [
      { id: 1, name: 'Tirupati Main Road', time: '07:30 AM' },
      { id: 2, name: 'Tiruchanur', time: '07:45 AM' },
      { id: 3, name: 'Renigunta Junction', time: '08:00 AM' },
      { id: 4, name: 'Srinivasa Complex', time: '08:20 AM' },
      { id: 5, name: 'Puttur', time: '08:35 AM' },
      { id: 6, name: 'Nagari', time: '08:45 AM' },
      { id: 7, name: 'College Campus', time: '09:00 AM' },
    ]
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Route Details - {routeData.routeNumber}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="mb-4">
          <Col md={6}>
            <h5>{routeData.name}</h5>
            <p className="text-muted">{routeData.description}</p>
          </Col>
          <Col md={6} className="text-md-end">
            <Badge bg="info" className="me-2">Distance: {routeData.distance}</Badge>
            <Badge bg="primary">Duration: {routeData.duration}</Badge>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col md={6}>
            <Card className="border-0 shadow-sm">
              <Card.Header className="bg-white">
                <h6 className="mb-0">Bus Information</h6>
              </Card.Header>
              <Card.Body>
                <p className="mb-1"><strong>Bus Number:</strong> {routeData.bus.number}</p>
                <p className="mb-1"><strong>Capacity:</strong> {routeData.bus.capacity} students</p>
                <p className="mb-0"><strong>Model:</strong> {routeData.bus.model}</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="border-0 shadow-sm">
              <Card.Header className="bg-white">
                <h6 className="mb-0">Driver Information</h6>
              </Card.Header>
              <Card.Body>
                <p className="mb-1"><strong>Name:</strong> {routeData.driver.name}</p>
                <p className="mb-1"><strong>License:</strong> {routeData.driver.licenseNumber}</p>
                <p className="mb-0"><strong>Contact:</strong> {routeData.driver.contact}</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Card className="border-0 shadow-sm mb-4">
          <Card.Header className="bg-white">
            <h6 className="mb-0">Schedule Information</h6>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col md={6}>
                <p className="mb-1"><strong>Morning:</strong> {routeData.startTime} - {routeData.endTime}</p>
              </Col>
              <Col md={6}>
                <p className="mb-1"><strong>Evening:</strong> {routeData.returnStartTime} - {routeData.returnEndTime}</p>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        <Card className="border-0 shadow-sm">
          <Card.Header className="bg-white">
            <h6 className="mb-0">Bus Stops</h6>
          </Card.Header>
          <Card.Body>
            <Table hover size="sm">
              <thead className="table-light">
                <tr>
                  <th>Stop Name</th>
                  <th>Arrival Time</th>
                </tr>
              </thead>
              <tbody>
                {routeData.stops.map(stop => (
                  <tr key={stop.id}>
                    <td>{stop.name}</td>
                    <td>{stop.time}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Close</Button>
        <Button variant="primary">Edit Route</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RouteDetails;