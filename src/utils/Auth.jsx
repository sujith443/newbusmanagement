// This file would contain authentication utilities for a real application
// For demo purposes, we're implementing simple functions

/**
 * Login user with credentials
 * @param {string} username - The username
 * @param {string} password - The password
 * @returns {Promise} - Promise with token on success or error message
 */
export const loginUser = (username, password) => {
    return new Promise((resolve, reject) => {
      // Simulate API request delay
      setTimeout(() => {
        // For demo purposes only - hardcoded credentials
        if (username === 'admin' && password === 'password') {
          const token = generateFakeToken();
          localStorage.setItem('token', token);
          resolve({ token });
        } else {
          reject({ message: 'Invalid username or password' });
        }
      }, 1000);
    });
  };
  
  /**
   * Logout user
   */
  export const logoutUser = () => {
    localStorage.removeItem('token');
  };
  
  /**
   * Check if user is authenticated
   * @returns {boolean} - True if authenticated, false otherwise
   */
  export const isAuthenticated = () => {
    return !!localStorage.getItem('token');
  };
  
  /**
   * Generate a fake JWT token for demo purposes
   * @returns {string} - Fake token
   */
  const generateFakeToken = () => {
    const header = { alg: 'HS256', typ: 'JWT' };
    const payload = { 
      sub: '1234567890', 
      name: 'Admin User', 
      role: 'admin',
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + (60 * 60) // 1 hour
    };
    
    const encodedHeader = btoa(JSON.stringify(header));
    const encodedPayload = btoa(JSON.stringify(payload));
    
    // In a real app, this would be signed with a secret
    return `${encodedHeader}.${encodedPayload}.fake_signature`;
  };