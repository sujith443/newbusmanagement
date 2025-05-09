import React, { useState } from 'react';
import { Modal, Button, Form, Alert, Row, Col, ListGroup, Card } from 'react-bootstrap';
import { FaPlus, FaTimes, FaBus, FaRoute, FaMapMarkerAlt } from 'react-icons/fa';
import { addOrUpdateBusRoute } from '../../utils/Api';

const AddRouteForm = ({ show, handleClose, onRouteAdded }) => {
  const [busNumber, setBusNumber] = useState('');
  const [currentStop, setCurrentStop] = useState('');
  const [stops, setStops] = useState([]);
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleAddStop = () => {
    if (currentStop.trim()) {
      setStops([...stops, currentStop.trim()]);
      setCurrentStop('');
    }
  };

  const handleRemoveStop = (index) => {
    const newStops = [...stops];
    newStops.splice(index, 1);
    setStops(newStops);
  };

  const handleMoveStopUp = (index) => {
    if (index > 0) {
      const newStops = [...stops];
      const temp = newStops[index];
      newStops[index] = newStops[index - 1];
      newStops[index - 1] = temp;
      setStops(newStops);
    }
  };

  const handleMoveStopDown = (index) => {
    if (index < stops.length - 1) {
      const newStops = [...stops];
      const temp = newStops[index];
      newStops[index] = newStops[index + 1];
      newStops[index + 1] = temp;
      setStops(newStops);
    }
  };

  const resetForm = () => {
    setBusNumber('');
    setCurrentStop('');
    setStops([]);
    setValidated(false);
    setError('');
    setSuccess(false);
    setLoading(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    
    if (form.checkValidity() === false || stops.length < 2) {
      event.stopPropagation();
      if (stops.length < 2) {
        setError('You must add at least 2 stops to create a route.');
      }
      setValidated(true);
      return;
    }
    
    setLoading(true);
    setError('');
    
    // Create new route object
    const newRoute = {
      busNumber: busNumber.toUpperCase(),
      route: stops
    };
    
    try {
      // Add the new route to the API using the Promise-based approach
      await addOrUpdateBusRoute(newRoute);
      setSuccess(true);
      
      // Wait a bit to show success message
      setTimeout(() => {
        if (onRouteAdded) {
          onRouteAdded();
        }
      }, 1500);
    } catch (err) {
      console.error('Error adding route:', err);
      setError('Failed to add new route. Please try again.');
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
          <FaBus className="text-primary me-2" />
          Add New Bus Route
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {success ? (
          <Alert variant="success">
            <Alert.Heading>Success!</Alert.Heading>
            <p>
              The new bus route has been added successfully. The route list will be updated to show the new route.
            </p>
          </Alert>
        ) : (
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            {error && <Alert variant="danger">{error}</Alert>}
            
            <Row className="mb-3">
              <Col>
                <Form.Group controlId="busNumber">
                  <Form.Label>Bus Number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="e.g., BUS NO-10"
                    value={busNumber}
                    onChange={(e) => setBusNumber(e.target.value)}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a bus number.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            
            <h5 className="mb-3 mt-4">
              <FaRoute className="me-2" />
              Route Stops
            </h5>
            
            <Row className="mb-3">
              <Col>
                <Form.Group controlId="addStop">
                  <Form.Label>Add Stop</Form.Label>
                  <div className="d-flex">
                    <Form.Control
                      type="text"
                      placeholder="Enter stop name"
                      value={currentStop}
                      onChange={(e) => setCurrentStop(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddStop();
                        }
                      }}
                    />
                    <Button 
                      variant="success" 
                      className="ms-2" 
                      onClick={handleAddStop}
                      disabled={!currentStop.trim()}
                    >
                      <FaPlus />
                    </Button>
                  </div>
                  <Form.Text className="text-muted">
                    Add stops in the order of the route (first stop to last stop).
                  </Form.Text>
                </Form.Group>
              </Col>
            </Row>
            
            {stops.length > 0 && (
              <div className="mb-3">
                <Card className="border-0 shadow-sm">
                  <Card.Header className="bg-white">
                    <h6 className="mb-0">Route Stops ({stops.length})</h6>
                  </Card.Header>
                  <ListGroup variant="flush">
                    {stops.map((stop, index) => (
                      <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                          <span className="badge bg-secondary me-2">{index + 1}</span>
                          <div>
                            {index === 0 ? (
                              <FaMapMarkerAlt className="text-success me-2" />
                            ) : index === stops.length - 1 ? (
                              <FaMapMarkerAlt className="text-danger me-2" />
                            ) : (
                              <FaMapMarkerAlt className="text-primary me-2" />
                            )}
                            {stop}
                          </div>
                        </div>
                        <div>
                          <Button 
                            variant="outline-secondary" 
                            size="sm" 
                            className="me-1"
                            onClick={() => handleMoveStopUp(index)}
                            disabled={index === 0}
                          >
                            ↑
                          </Button>
                          <Button 
                            variant="outline-secondary" 
                            size="sm" 
                            className="me-1"
                            onClick={() => handleMoveStopDown(index)}
                            disabled={index === stops.length - 1}
                          >
                            ↓
                          </Button>
                          <Button 
                            variant="outline-danger" 
                            size="sm"
                            onClick={() => handleRemoveStop(index)}
                          >
                            <FaTimes />
                          </Button>
                        </div>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Card>
              </div>
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
                variant="primary"
                disabled={loading || stops.length < 2}
              >
                {loading ? 'Adding...' : 'Add Route'}
              </Button>
            </div>
          </Form>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default AddRouteForm;