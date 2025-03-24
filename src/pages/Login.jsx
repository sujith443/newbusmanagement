import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Login from '../components/Auth/Login';

const LoginPage = ({ onLogin }) => {
  return (
    <Container fluid className="login-bg min-vh-100 d-flex align-items-center justify-content-center">
      <Row className="justify-content-center w-100">
        <Col xs={12} sm={10} md={8} lg={12} xl={4}>
          <Login onLogin={onLogin} />
          
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;