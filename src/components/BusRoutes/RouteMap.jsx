import React from 'react';
import { Card } from 'react-bootstrap';

const RouteMap = ({ routeId }) => {
  return (
    <Card className="border-0 shadow-sm">
      <Card.Header className="bg-white">
        <h5 className="mb-0">Route Map</h5>
      </Card.Header>
      <Card.Body className="p-0">
        <div className="bg-light text-center p-5">
          <p className="mb-0 text-muted">Interactive map would be displayed here.</p>
          <p className="text-muted">(Placeholder for Google Maps integration)</p>
        </div>
      </Card.Body>
    </Card>
  );
};

export default RouteMap;