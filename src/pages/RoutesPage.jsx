import React, { useState } from 'react';
import AppNavbar from '../components/Layout/Navbar';
import RouteList from '../components/BusRoutes/RouteList';
import RouteDetails from '../components/BusRoutes/RouteDetails';
import Footer from '../components/Layout/Footer';
import { Container } from 'react-bootstrap';

const RoutesPage = ({ onLogout }) => {
  const [showRouteDetails, setShowRouteDetails] = useState(false);
  const [selectedRouteId, setSelectedRouteId] = useState(null);

  const handleShowRouteDetails = (routeId) => {
    setSelectedRouteId(routeId);
    setShowRouteDetails(true);
  };

  const handleCloseRouteDetails = () => {
    setShowRouteDetails(false);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <AppNavbar onLogout={onLogout} />
      <Container fluid className="py-4 flex-grow-1">
        <h4 className="mb-4">Bus Routes Management</h4>
        <RouteList onViewRoute={handleShowRouteDetails} />
        {showRouteDetails && (
          <RouteDetails 
            routeId={selectedRouteId} 
            show={showRouteDetails} 
            handleClose={handleCloseRouteDetails} 
          />
        )}
      </Container>
      <Footer />
    </div>
  );
};

export default RoutesPage;