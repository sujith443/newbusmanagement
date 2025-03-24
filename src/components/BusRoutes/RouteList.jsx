import React, { useState, useEffect } from 'react';
import { Card, Table, Form, InputGroup, Button, Badge } from 'react-bootstrap';
import { FaSearch, FaBus, FaMapMarkerAlt, FaUser, FaEdit, FaEye } from 'react-icons/fa';
import { busRoutes } from '../../utils/Api';
import BusStudentsModal from './BusStudentsModel'; // Import the new component

const RouteList = ({ onViewRoute, onViewRouteMap, onEditRoute, refreshTrigger, onViewStudent }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // New state for the students modal
  const [showStudentsModal, setShowStudentsModal] = useState(false);
  const [selectedBusNumber, setSelectedBusNumber] = useState('');

  const loadRoutes = () => {
    // Transform the bus routes data for display
    const formattedRoutes = busRoutes.map((route, index) => ({
      id: index + 1,
      routeNumber: route.busNumber,
      name: `${route.route[0]} to ${route.route[route.route.length - 1]}`,
      stops: route.route.length,
      startPoint: route.route[0],
      endPoint: route.route[route.route.length - 1],
      startTime: route.schedule?.morningDeparture || '07:30 AM',
      endTime: route.schedule?.morningArrival || '09:00 AM',
      driver: route.driver?.name || 'Assigned Driver',
      allStops: route.route
    }));
    
    setRoutes(formattedRoutes);
    setLoading(false);
  };

  useEffect(() => {
    loadRoutes();
  }, [refreshTrigger]);

  // New function to handle showing students for a bus
  const handleShowStudents = (busNumber) => {
    setSelectedBusNumber(busNumber);
    setShowStudentsModal(true);
  };

  // Filter routes based on search term
  const filteredRoutes = routes.filter(route => 
    route.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    route.routeNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    route.startPoint.toLowerCase().includes(searchTerm.toLowerCase()) ||
    route.endPoint.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Card className="border-0 shadow-sm">
        <Card.Header className="bg-white">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="mb-0">
              <FaBus className="text-primary me-2" />
              Bus Routes
            </h5>
            <InputGroup className="w-50">
              <Form.Control
                placeholder="Search routes by name, number or location..."
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
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3">Loading routes...</p>
            </div>
          ) : (
            <div className="table-responsive">
              <Table hover>
                <thead className="table-light">
                  <tr>
                    <th>Route No.</th>
                    <th>Route</th>
                    <th>Stops</th>
                    <th>Start Point</th>
                    <th>End Point</th>
                    <th>Schedule</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRoutes.map(route => (
                    <tr key={route.id}>
                      <td>
                        <Badge bg="info">{route.routeNumber}</Badge>
                      </td>
                      <td>{route.name}</td>
                      <td>{route.stops}</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <FaMapMarkerAlt className="text-danger me-1" />
                          {route.startPoint}
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <FaMapMarkerAlt className="text-success me-1" />
                          {route.endPoint}
                        </div>
                      </td>
                      <td>{route.startTime} - {route.endTime}</td>
                      <td>
                       
                        <Button 
                          variant="outline-primary" 
                          size="sm"
                          className="me-1"
                          onClick={() => onEditRoute(route.routeNumber)}
                        >
                          <FaEdit className="me-1" />
                          Edit
                        </Button>
                        <Button 
                          variant="outline-success" 
                          size="sm"
                          onClick={() => handleShowStudents(route.routeNumber)}
                        >
                          <FaUser className="me-1" />
                          Students
                        </Button>
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
          )}
        </Card.Body>
      </Card>
      
      {/* Bus Students Modal */}
      <BusStudentsModal 
        show={showStudentsModal}
        handleClose={() => setShowStudentsModal(false)}
        busNumber={selectedBusNumber}
        onViewStudent={onViewStudent}
      />
    </>
  );
};

export default RouteList;