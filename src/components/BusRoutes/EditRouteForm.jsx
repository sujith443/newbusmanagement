import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert, Row, Col, ListGroup } from 'react-bootstrap';
import { FaEdit, FaTimes, FaBus, FaRoute, FaMapMarkerAlt, FaTrash, FaPlus } from 'react-icons/fa';
import { getBusRouteByNumber, addNewBusRoute, deleteBusRoute } from '../../utils/Api';

const EditRouteForm = ({ busNumber, show, handleClose, onRouteUpdated }) => {
  const [formBusNumber, setFormBusNumber] = useState('');
  const [currentStop, setCurrentStop] = useState('');
  const [stops, setStops] = useState([]);
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  
  // Load route data when modal opens
  useEffect(() => {
    if (show && busNumber) {
      setInitialLoading(true);
      getBusRouteByNumber(busNumber)
        .then(route => {
          if (route) {
            setFormBusNumber(route.busNumber);
            setStops(route.route || []);
          } else {
            setError('Route not found');
          }
          setInitialLoading(false);
        })
        .catch(err => {
          setError('Failed to load route data');
          setInitialLoading(false);
        });
    }
  }, [show, busNumber]);

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
    setFormBusNumber('');
    setCurrentStop('');
    setStops([]);
    setValidated(false);
    setError('');
    setSuccess(false);
    setLoading(false);
  };

  const handleSubmit = (event) => {
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
    
    // Create updated route object
    const updatedRoute = {
      busNumber: formBusNumber.toUpperCase(),
      route: stops
    };
    
    try {
      // Update the route in the API
      addNewBusRoute(updatedRoute); // We're reusing this function as it handles updates too
      setSuccess(true);
      
      // Wait a bit to show success message
      setTimeout(() => {
        if (onRouteUpdated) {
          onRouteUpdated();
        }
      }, 1500);
    } catch (err) {
      setError('Failed to update route. Please try again.');
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
          <FaEdit className="text-primary me-2" />
          Edit Bus Route
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {initialLoading ? (
          <div className="text-center py-4">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading route data...</p>
          </div>
        ) : success ? (
          <Alert variant="success">
            <Alert.Heading>Success!</Alert.Heading>
            <p>
              The bus route has been updated successfully. The route list will be updated to show the changes.
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
                    value={formBusNumber}
                    onChange={(e) => setFormBusNumber(e.target.value)}
                    required
                    readOnly // Bus number shouldn't be editable when updating
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
                <div className="border rounded shadow-sm">
                  <div className="bg-light p-2 border-bottom">
                    <h6 className="mb-0">Route Stops ({stops.length})</h6>
                  </div>
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
                </div>
              </div>
            )}
            
            <div className="d-flex justify-content-end mt-4">
              <Button 
                variant="danger" 
                className="me-auto"
                onClick={() => {
                  if (window.confirm(`Are you sure you want to delete the bus route ${formBusNumber}?`)) {
                    setLoading(true);
                    deleteBusRoute(formBusNumber)
                      .then(() => {
                        setSuccess(true);
                        setTimeout(() => {
                          if (onRouteUpdated) {
                            onRouteUpdated();
                          }
                        }, 1500);
                      })
                      .catch(err => {
                        setError('Failed to delete route. Please try again.');
                        setLoading(false);
                      });
                  }
                }}
              >
                <FaTrash className="me-2" />
                Delete Route
              </Button>
              <Button 
                variant="secondary" 
                className="me-2"
                onClick={() => {
                  resetForm();
                  handleClose();
                }}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                variant="primary"
                disabled={loading || stops.length < 2}
              >
                {loading ? 'Updating...' : 'Update Route'}
              </Button>
            </div>
          </Form>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default EditRouteForm;