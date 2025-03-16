import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { FaTachometerAlt, FaBus, FaUserGraduate, FaRupeeSign } from 'react-icons/fa';

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="sidebar">
      <div className="sidebar-sticky">
        <Nav className="flex-column pt-3">
          <Nav.Item>
            <Nav.Link
              as={Link}
              to="/dashboard"
              className={`${location.pathname === '/dashboard' ? 'active' : ''} d-flex align-items-center py-3 px-3`}
            >
              <FaTachometerAlt className="me-2" />
              Dashboard
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              as={Link}
              to="/routes"
              className={`${location.pathname === '/routes' ? 'active' : ''} d-flex align-items-center py-3 px-3`}
            >
              <FaBus className="me-2" />
              Bus Routes
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              as={Link}
              to="/students"
              className={`${location.pathname === '/students' ? 'active' : ''} d-flex align-items-center py-3 px-3`}
            >
              <FaUserGraduate className="me-2" />
              Students
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              as={Link}
              to="/fees"
              className={`${location.pathname === '/fees' ? 'active' : ''} d-flex align-items-center py-3 px-3`}
            >
              <FaRupeeSign className="me-2" />
              Fee Management
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;