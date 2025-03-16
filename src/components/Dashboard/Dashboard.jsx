import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { FaBus, FaUserGraduate, FaRupeeSign, FaRoute } from 'react-icons/fa';

const Dashboard = () => {
  // Mock data for dashboard
  const dashboardData = {
    totalStudents: 845,
    totalBuses: 15,
    totalRoutes: 12,
    pendingFees: '₹ 2,45,000',
    recentPayments: [
      { id: 1, student: 'Rahul Sharma', amount: '₹ 4,500', date: '10 Mar 2025' },
      { id: 2, student: 'Priya Patel', amount: '₹ 4,500', date: '9 Mar 2025' },
      { id: 3, student: 'Ajay Kumar', amount: '₹ 4,500', date: '8 Mar 2025' }
    ]
  };

  return (
    <>
      <h4 className="mb-4">Dashboard</h4>
      
      {/* Summary Cards */}
      <Row className="g-4 mb-4">
        <Col md={6} lg={3}>
          <Card className="h-100 border-0 shadow-sm">
            <Card.Body className="d-flex align-items-center">
              <div className="rounded-circle bg-primary bg-opacity-10 p-3 me-3">
                <FaUserGraduate className="text-primary fs-3" />
              </div>
              <div>
                <h6 className="text-muted mb-1">Total Students</h6>
                <h3 className="mb-0">{dashboardData.totalStudents}</h3>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={6} lg={3}>
          <Card className="h-100 border-0 shadow-sm">
            <Card.Body className="d-flex align-items-center">
              <div className="rounded-circle bg-success bg-opacity-10 p-3 me-3">
                <FaBus className="text-success fs-3" />
              </div>
              <div>
                <h6 className="text-muted mb-1">Total Buses</h6>
                <h3 className="mb-0">{dashboardData.totalBuses}</h3>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={6} lg={3}>
          <Card className="h-100 border-0 shadow-sm">
            <Card.Body className="d-flex align-items-center">
              <div className="rounded-circle bg-info bg-opacity-10 p-3 me-3">
                <FaRoute className="text-info fs-3" />
              </div>
              <div>
                <h6 className="text-muted mb-1">Active Routes</h6>
                <h3 className="mb-0">{dashboardData.totalRoutes}</h3>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={6} lg={3}>
          <Card className="h-100 border-0 shadow-sm">
            <Card.Body className="d-flex align-items-center">
              <div className="rounded-circle bg-warning bg-opacity-10 p-3 me-3">
                <FaRupeeSign className="text-warning fs-3" />
              </div>
              <div>
                <h6 className="text-muted mb-1">Pending Fees</h6>
                <h3 className="mb-0">{dashboardData.pendingFees}</h3>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      {/* Recent Payments */}
      <Row>
        <Col md={12} lg={6}>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white">
              <h5 className="mb-0">Recent Payments</h5>
            </Card.Header>
            <Card.Body>
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead className="table-light">
                    <tr>
                      <th>Student</th>
                      <th>Amount</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dashboardData.recentPayments.map(payment => (
                      <tr key={payment.id}>
                        <td>{payment.student}</td>
                        <td>{payment.amount}</td>
                        <td>{payment.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={12} lg={6}>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white">
              <h5 className="mb-0">Bus Occupancy</h5>
            </Card.Header>
            <Card.Body>
              <p className="text-muted">
                This section would display a chart showing bus occupancy statistics.
                (Placeholder for chart component)
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Dashboard;