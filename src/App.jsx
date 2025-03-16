import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Auth Context
import { AuthProvider, useAuth } from './context/AuthContext';

// Pages
import LoginPage from './pages/Login';
import DashboardPage from './pages/DashboardPage';
import RoutesPage from './pages/RoutesPage';
import StudentsPage from './pages/StudentsPage';
import FeesPage from './pages/FeesPage';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

function AppContent() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route 
            path="/login" 
            element={isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage />} 
          />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <DashboardPage onLogout={logout} />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/routes" 
            element={
              <ProtectedRoute>
                <RoutesPage onLogout={logout} />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/students" 
            element={
              <ProtectedRoute>
                <StudentsPage onLogout={logout} />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/fees" 
            element={
              <ProtectedRoute>
                <FeesPage onLogout={logout} />
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
        </Routes>
      </div>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;