import React, { useState } from 'react';
import { Card, Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // For demo purposes, using hardcoded credentials
      if (username === 'admin' && password === 'password') {
        // Pass the token and user data to the login function
        login('fake-token-12345', {
          username: 'admin',
          name: 'Administrator',
          role: 'admin'
        });
      } else {
        setError('Invalid username or password');
      }
      setLoading(false);
    }, 1000);
  };
  
  return (
    <Card className="shadow-lg border-0 rounded-lg">
      <Card.Body className="p-4">
        <div className="text-center mb-4">
          <h2 className="fw-bold text-primary mb-1">BTech Bus Management</h2>
          <p className="text-muted">South India College of Engineering</p>
          <div className="border-bottom mb-3 mt-4"></div>
        </div>
        
        {error && (
          <Alert variant="danger" className="py-2 mb-3">
            <i className="bi bi-exclamation-circle me-2"></i>
            {error}
          </Alert>
        )}
        
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label className="small fw-bold">Username</Form.Label>
            <div className="input-group">
              <span className="input-group-text bg-light">
                <i className="bi bi-person"></i>
              </span>
              <Form.Control
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="py-2"
              />
            </div>
          </Form.Group>
          
          <Form.Group className="mb-4">
            <div className="d-flex justify-content-between align-items-center">
              <Form.Label className="small fw-bold">Password</Form.Label>
              <a href="#" className="small text-primary">Forgot password?</a>
            </div>
            <div className="input-group">
              <span className="input-group-text bg-light">
                <i className="bi bi-lock"></i>
              </span>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="py-2"
              />
            </div>
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              label="Remember me"
              className="small"
            />
          </Form.Group>
          
          <Button
            variant="primary"
            type="submit"
            className="w-100 py-2 mb-3"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Logging in...
              </>
            ) : 'Sign In'}
          </Button>
        </Form>
        
        <div className="text-center mt-3">
          <p className="small text-muted">
            Don't have an account? <a href="#" className="text-primary">Contact Administrator</a>
          </p>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Login;