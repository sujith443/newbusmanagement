import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Badge, Table, Button, Modal, ListGroup } from 'react-bootstrap';
import { FaBus, FaMapMarkerAlt, FaUserTie, FaPhone, FaClock, FaRoute, FaEdit } from 'react-icons/fa';
import { busRoutes } from '../../utils/Api';

const RouteDetails = ({ routeId, show, handleClose, onEditRoute }) => {
  const [routeData, setRouteData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (routeId && show) {
      setLoading(true);
      
      // Find the route data based on the routeId
      // Note: routeId is 1-based, but array indices are 0-based
      const index = routeId - 1;
      
      if (index >= 0 && index < busRoutes.length) {
        const rawRouteData = busRoutes[index];
        
        // Format the data for display
        const formattedRoute = {
          id: routeId,
          routeNumber: rawRouteData.busNumber,
          name: `${rawRouteData.route[0]} to ${rawRouteData.route[rawRouteData.route.length - 1]}`,
          description: `Morning pickup from ${rawRouteData.route[0]} to ${rawRouteData.route[rawRouteData.route.length - 1]} and evening drop`,
          startPoint: rawRouteData.route[0],
          endPoint: rawRouteData.route[rawRouteData.route.length - 1],
          distance: `${Math.floor(30 + Math.random() * 20)} km`, // Mock distance data
          duration: `${Math.floor(0.5 + Math.random() * 1.5)} hours`, // Mock duration data
          startTime: '07:30 AM',
          endTime: '09:00 AM',
          returnStartTime: '05:00 PM',
          returnEndTime: '06:30 PM',
          // Mock driver data
          driver: {
            name: 'Ramesh Kumar',
            licenseNumber: 'TN142015000' + (8000 + routeId),
            contact: '987654' + (3210 + routeId)
          },
          // Mock bus data
          bus: {
            number: 'TN-01-BH-' + (1234 + routeId),
            capacity: 45,
            model: 'Ashok Leyland'
          },
          // Generate stops with times
          stops: rawRouteData.route.map((stop, idx) => {
            // Calculate mock times - starts at 7:30 AM, each stop adds 10-15 minutes
            const startMinute = 30;
            const startHour = 7;
            
            const totalMinutes = startMinute + idx * (10 + Math.floor(Math.random() * 5));
            const hour = startHour + Math.floor(totalMinutes / 60);
            const minute = totalMinutes % 60;
            
            const timeStr = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')} AM`;
            
            return {
              id: idx + 1,
              name: stop,
              time: timeStr
            };
          })
        };
        
        setRouteData(formattedRoute);
      }
      
      setLoading(false);
    }
  }, [routeId, show]);

  if (!routeData && !loading) {
    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Route Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-center">Route not found</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton className="border-bottom-0">
        <Modal.Title>
          <FaBus className="text-primary me-2" />
          Route Details - {routeData?.routeNumber}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading route details...</p>
          </div>
        ) : (
          <>
            <Row className="mb-4">
              <Col md={7}>
                <h5>{routeData.name}</h5>
                <p className="text-muted">{routeData.description}</p>
              </Col>
              <Col md={5} className="text-md-end">
                <Badge bg="info" className="me-2 p-2">
                  <FaRoute className="me-1" /> 
                  Distance: {routeData.distance}
                </Badge>
                <Badge bg="primary" className="p-2">
                  <FaClock className="me-1" />
                  Duration: {routeData.duration}
                </Badge>
              </Col>
            </Row>

            <Row className="mb-4">
              <Col md={6}>
                <Card className="border-0 shadow-sm h-100">
                  <Card.Header className="bg-white">
                    <h6 className="mb-0 d-flex align-items-center">
                      <FaBus className="text-primary me-2" />
                      Bus Information
                    </h6>
                  </Card.Header>
                  <Card.Body>
                    <ListGroup variant="flush">
                      <ListGroup.Item className="px-0">
                        <strong>Bus Number:</strong> {routeData.bus.number}
                      </ListGroup.Item>
                      <ListGroup.Item className="px-0">
                        <strong>Capacity:</strong> {routeData.bus.capacity} students
                      </ListGroup.Item>
                      <ListGroup.Item className="px-0">
                        <strong>Model:</strong> {routeData.bus.model}
                      </ListGroup.Item>
                    </ListGroup>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={6}>
                <Card className="border-0 shadow-sm h-100">
                  <Card.Header className="bg-white">
                    <h6 className="mb-0 d-flex align-items-center">
                      <FaUserTie className="text-primary me-2" />
                      Driver Information
                    </h6>
                  </Card.Header>
                  <Card.Body>
                    <ListGroup variant="flush">
                      <ListGroup.Item className="px-0">
                        <strong>Name:</strong> {routeData.driver.name}
                      </ListGroup.Item>
                      <ListGroup.Item className="px-0">
                        <strong>License:</strong> {routeData.driver.licenseNumber}
                      </ListGroup.Item>
                      <ListGroup.Item className="px-0 d-flex align-items-center">
                        <FaPhone className="text-primary me-2" />
                        <strong className="me-2">Contact:</strong> {routeData.driver.contact}
                      </ListGroup.Item>
                    </ListGroup>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            <Card className="border-0 shadow-sm mb-4">
              <Card.Header className="bg-white">
                <h6 className="mb-0 d-flex align-items-center">
                  <FaClock className="text-primary me-2" />
                  Schedule Information
                </h6>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={6}>
                    <Card className="border-0 bg-light">
                      <Card.Body>
                        <h6 className="text-primary">Morning Route</h6>
                        <p className="mb-0">{routeData.startTime} - {routeData.endTime}</p>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col md={6}>
                    <Card className="border-0 bg-light">
                      <Card.Body>
                        <h6 className="text-primary">Evening Route</h6>
                        <p className="mb-0">{routeData.returnStartTime} - {routeData.returnEndTime}</p>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            <Card className="border-0 shadow-sm">
              <Card.Header className="bg-white">
                <h6 className="mb-0 d-flex align-items-center">
                  <FaMapMarkerAlt className="text-primary me-2" />
                  Bus Stops ({routeData.stops.length})
                </h6>
              </Card.Header>
              <Card.Body>
                <div className="table-responsive">
                  <Table hover size="sm">
                    <thead className="table-light">
                      <tr>
                        <th>#</th>
                        <th>Stop Name</th>
                        <th>Arrival Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {routeData.stops.map((stop, index) => (
                        <tr key={stop.id}>
                          <td>{index + 1}</td>
                          <td>
                            <div className="d-flex align-items-center">
                              {index === 0 ? (
                                <FaMapMarkerAlt className="text-danger me-2" />
                              ) : index === routeData.stops.length - 1 ? (
                                <FaMapMarkerAlt className="text-success me-2" />
                              ) : (
                                <FaMapMarkerAlt className="text-primary me-2" />
                              )}
                              {stop.name}
                            </div>
                          </td>
                          <td>{stop.time}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </Card.Body>
            </Card>
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Close</Button>
        <Button variant="primary" onClick={() => onEditRoute && onEditRoute(routeData?.routeNumber)}>
          <FaEdit className="me-1" />
          Edit Route
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RouteDetails;