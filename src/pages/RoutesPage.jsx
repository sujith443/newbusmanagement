import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import AppNavbar from "../components/Layout/Navbar";
import Footer from "../components/Layout/Footer";
import RouteList from "../components/BusRoutes/RouteList";
import RouteDetails from "../components/BusRoutes/RouteDetails";
import RouteMap from "../components/BusRoutes/RouteMap";
import AddRouteForm from "../components/BusRoutes/RouteForm";
import EditRouteForm from "../components/BusRoutes/EditRouteForm";
import StudentDetails from "../components/Students/StudentDetails"; // Import StudentDetails
import { FaPlus } from "react-icons/fa";

const RoutesPage = ({ onLogout }) => {
  const [selectedRouteId, setSelectedRouteId] = useState(null);
  const [showRouteDetails, setShowRouteDetails] = useState(false);
  const [showRouteMap, setShowRouteMap] = useState(false);
  const [showAddRouteForm, setShowAddRouteForm] = useState(false);
  const [showEditRouteForm, setShowEditRouteForm] = useState(false);
  const [refreshRoutes, setRefreshRoutes] = useState(false);
  const [selectedBusNumber, setSelectedBusNumber] = useState("");
  
  // Add state for student details
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [showStudentDetails, setShowStudentDetails] = useState(false);

  const handleViewRoute = (routeId) => {
    setSelectedRouteId(routeId);
    setShowRouteDetails(true);
  };

  const handleViewRouteMap = (routeId) => {
    setSelectedRouteId(routeId);
    setShowRouteMap(true);
  };

  const handleAddNewRoute = () => {
    setShowAddRouteForm(true);
  };

  const handleCloseDetails = () => {
    setShowRouteDetails(false);
  };

  const handleCloseMap = () => {
    setShowRouteMap(false);
  };

  const handleEditRoute = (busNumber) => {
    setSelectedBusNumber(busNumber);
    setShowRouteDetails(false);
    setShowEditRouteForm(true);
  };

  const handleCloseAddRouteForm = () => {
    setShowAddRouteForm(false);
  };

  const handleRouteAdded = () => {
    setShowAddRouteForm(false);
    setRefreshRoutes((prev) => !prev); // Toggle to trigger re-fetch
  };

  const handleRouteUpdated = () => {
    setShowEditRouteForm(false);
    setRefreshRoutes((prev) => !prev); // Toggle to trigger re-fetch
  };

  const handleCloseEditRouteForm = () => {
    setShowEditRouteForm(false);
  };
  
  // Add handler for viewing student details
  const handleViewStudent = (studentId) => {
    setSelectedStudentId(studentId);
    setShowStudentDetails(true);
  };
  
  // Add handler for closing student details
  const handleCloseStudentDetails = () => {
    setShowStudentDetails(false);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <AppNavbar onLogout={onLogout} />

      <Container fluid className="flex-grow-1 py-4">
        <Row className="mb-4">
          <Col>
            <div className="d-flex justify-content-between align-items-center">
              <h3 className="mb-0">Bus Routes Management</h3>
              <Button variant="primary" onClick={handleAddNewRoute}>
                <FaPlus className="me-2" />
                Add New Route
              </Button>
            </div>
          </Col>
        </Row>

        <Row>
          <Col>
            <RouteList
              onViewRoute={handleViewRoute}
              onViewRouteMap={handleViewRouteMap}
              onAddNewRoute={handleAddNewRoute}
              onEditRoute={handleEditRoute}
              refreshTrigger={refreshRoutes}
              onViewStudent={handleViewStudent} // Pass the handler
            />
          </Col>
        </Row>
      </Container>

      {/* Route Details Modal */}
      <RouteDetails
        routeId={selectedRouteId}
        show={showRouteDetails}
        handleClose={handleCloseDetails}
        onEditRoute={handleEditRoute}
      />

      {/* Route Map Modal (if implemented) */}
      {showRouteMap && (
        <RouteMap
          routeId={selectedRouteId}
          show={showRouteMap}
          handleClose={handleCloseMap}
        />
      )}

      {/* Add New Route Modal */}
      <AddRouteForm
        show={showAddRouteForm}
        handleClose={handleCloseAddRouteForm}
        onRouteAdded={handleRouteAdded}
      />

      {/* Edit Route Modal */}
      <EditRouteForm
        busNumber={selectedBusNumber}
        show={showEditRouteForm}
        handleClose={handleCloseEditRouteForm}
        onRouteUpdated={handleRouteUpdated}
      />
      
      {/* Student Details Modal */}
      <StudentDetails
        studentId={selectedStudentId}
        show={showStudentDetails}
        handleClose={handleCloseStudentDetails}
      />

      <Footer />
    </div>
  );
};

export default RoutesPage;