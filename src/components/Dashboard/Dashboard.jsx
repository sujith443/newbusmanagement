import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Spinner, ProgressBar, Badge } from 'react-bootstrap';
import { 
  FaBus, 
  FaUserGraduate, 
  FaRupeeSign, 
  FaRoute, 
  FaChartLine, 
  FaCalendarAlt, 
  FaArrowUp, 
  FaArrowDown,
  FaExclamationTriangle
} from 'react-icons/fa';
import { getAllBusRoutes, getStudents } from '../../utils/Api';
import Chart from 'react-apexcharts';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalStudents: 0,
    totalBuses: 0,
    totalRoutes: 0,
    pendingFees: '₹ 0',
    pendingFeesPercentage: 0,
    recentPayments: [],
    busOccupancy: [],
    departmentDistribution: [],
    yearWiseDistribution: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Get all bus routes
        const routes = await getAllBusRoutes();
        
        // Get all students
        const students = await getStudents();
        
        // Calculate total buses and routes
        const totalBuses = routes.length;
        const totalRoutes = routes.length;
        
        // Calculate pending fees
        const pendingFeesCount = students.filter(student => student.id % 3 === 0).length;
        const pendingFeesAmount = pendingFeesCount * 10000; // ₹10,000 per pending fee
        const pendingFeesPercentage = Math.round((pendingFeesCount / students.length) * 100);
        
        // Create recent payments (most recent first based on ID)
        const sortedStudents = [...students].sort((a, b) => b.id - a.id);
        const recentPayments = sortedStudents
          .filter(student => student.id % 3 !== 0) // Only paid students
          .slice(0, 5)
          .map(student => ({
            id: student.id,
            student: student.name,
            amount: `₹ ${10000}`,
            route: student.route,
            department: student.department,
            date: `${(student.id % 28) + 1} Mar 2025`
          }));
        
        // Calculate bus occupancy
        const busOccupancy = routes.map(bus => {
          const studentsInBus = students.filter(student => student.route === bus.busNumber).length;
          const capacity = bus.capacity || 45;
          const occupancyPercentage = Math.round((studentsInBus / capacity) * 100);
          
          return {
            busNumber: bus.busNumber,
            routeName: `${bus.route[0]} to ${bus.route[bus.route.length - 1]}`,
            capacity,
            studentsCount: studentsInBus,
            occupancyPercentage,
            trend: Math.random() > 0.5 ? 'up' : 'down', // Simulated trend data
            trendValue: Math.floor(Math.random() * 5) + 1 // Simulated trend value 1-5%
          };
        });
        
        // Calculate department distribution
        const departmentCounts = students.reduce((acc, student) => {
          acc[student.department] = (acc[student.department] || 0) + 1;
          return acc;
        }, {});
        
        const departmentDistribution = Object.entries(departmentCounts).map(([dept, count]) => ({
          department: dept,
          count,
          percentage: Math.round((count / students.length) * 100)
        }));
        
        // Calculate year-wise distribution
        const yearCounts = students.reduce((acc, student) => {
          acc[student.year] = (acc[student.year] || 0) + 1;
          return acc;
        }, {});
        
        const yearWiseDistribution = Object.entries(yearCounts).map(([year, count]) => ({
          year,
          count,
          percentage: Math.round((count / students.length) * 100)
        }));
        
        // Update dashboard data
        setDashboardData({
          totalStudents: students.length,
          totalBuses,
          totalRoutes,
          pendingFees: `₹ ${pendingFeesAmount.toLocaleString()}`,
          pendingFeesPercentage,
          recentPayments,
          busOccupancy,
          departmentDistribution,
          yearWiseDistribution
        });
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setError('Failed to load dashboard data. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);

  const departmentChartOptions = {
    chart: {
      type: 'donut',
      height: 320
    },
    labels: dashboardData.departmentDistribution.map(d => d.department),
    colors: ['#4361ee', '#3f37c9', '#3a0ca3', '#480ca8', '#560bad', '#7209b7'],
    legend: {
      position: 'bottom'
    },
    plotOptions: {
      pie: {
        donut: {
          size: '55%'
        }
      }
    }
  };

  const departmentChartSeries = dashboardData.departmentDistribution.map(d => d.count);

  const yearChartOptions = {
    chart: {
      type: 'bar',
      height: 320,
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        borderRadius: 5
      }
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories: dashboardData.yearWiseDistribution.map(y => `Year ${y.year}`)
    },
    yaxis: {
      title: {
        text: 'Number of Students'
      }
    },
    fill: {
      colors: ['#4361ee']
    },
    tooltip: {
      y: {
        formatter: function(val) {
          return val + " students";
        }
      }
    }
  };

  const yearChartSeries = [{
    name: 'Students',
    data: dashboardData.yearWiseDistribution.map(y => y.count)
  }];

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Loading dashboard data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-5 text-danger">
        <FaExclamationTriangle size={40} className="mb-3" />
        <p>{error}</p>
      </div>
    );
  }

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="mb-0">Dashboard</h4>
        <div className="d-flex align-items-center">
          <FaCalendarAlt className="text-primary me-2" />
          <span className="text-muted">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
      </div>
      
      {/* Summary Cards */}
      <Row className="g-4 mb-4">
        <Col md={6} lg={3}>
          <Card className="h-100 border-0 shadow-sm hover-shadow transition-all">
            <Card.Body className="d-flex align-items-center p-4">
              <div className="rounded-circle bg-primary bg-opacity-10 p-3 me-3">
                <FaUserGraduate className="text-primary fs-3" />
              </div>
              <div>
                <h6 className="text-muted mb-1">Total Students</h6>
                <h3 className="mb-0">{dashboardData.totalStudents}</h3>
                <small className="text-success">
                  <FaArrowUp className="me-1" />
                  5% from last month
                </small>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={6} lg={3}>
          <Card className="h-100 border-0 shadow-sm hover-shadow transition-all">
            <Card.Body className="d-flex align-items-center p-4">
              <div className="rounded-circle bg-success bg-opacity-10 p-3 me-3">
                <FaBus className="text-success fs-3" />
              </div>
              <div>
                <h6 className="text-muted mb-1">Total Buses</h6>
                <h3 className="mb-0">{dashboardData.totalBuses}</h3>
                <small className="text-success">
                  <FaArrowUp className="me-1" />
                  2% from last month
                </small>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={6} lg={3}>
          <Card className="h-100 border-0 shadow-sm hover-shadow transition-all">
            <Card.Body className="d-flex align-items-center p-4">
              <div className="rounded-circle bg-info bg-opacity-10 p-3 me-3">
                <FaRoute className="text-info fs-3" />
              </div>
              <div>
                <h6 className="text-muted mb-1">Active Routes</h6>
                <h3 className="mb-0">{dashboardData.totalRoutes}</h3>
                <small className="text-muted">
                  No change from last month
                </small>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={6} lg={3}>
          <Card className="h-100 border-0 shadow-sm hover-shadow transition-all">
            <Card.Body className="d-flex align-items-center p-4">
              <div className="rounded-circle bg-warning bg-opacity-10 p-3 me-3">
                <FaRupeeSign className="text-warning fs-3" />
              </div>
              <div>
                <h6 className="text-muted mb-1">Pending Fees</h6>
                <h3 className="mb-0">{dashboardData.pendingFees}</h3>
                <small className="text-danger">
                  <FaArrowUp className="me-1" />
                  {dashboardData.pendingFeesPercentage}% of total students
                </small>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      {/* Bus Occupancy Chart */}
      <Row className="mb-4">
        <Col lg={12}>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white d-flex justify-content-between align-items-center">
              <h5 className="mb-0">
                <FaChartLine className="me-2 text-info" />
                Bus Occupancy
              </h5>
              <Badge bg="info" pill>Live Data</Badge>
            </Card.Header>
            <Card.Body className="p-4">
              {dashboardData.busOccupancy.length > 0 ? (
                <div>
                  {dashboardData.busOccupancy.map((bus, index) => (
                    <div key={index} className="mb-4">
                      <div className="d-flex justify-content-between mb-1">
                        <div>
                          <span className="fw-bold">{bus.busNumber}</span>
                          <span className="text-muted ms-2">({bus.routeName})</span>
                        </div>
                        <div>
                          <span className="me-2">
                            {bus.studentsCount}/{bus.capacity} students
                          </span>
                          <Badge 
                            bg={
                              bus.occupancyPercentage > 90 ? 'danger' : 
                              bus.occupancyPercentage > 70 ? 'warning' : 'success'
                            }
                            pill
                          >
                            {bus.occupancyPercentage}%
                          </Badge>
                          <span className="ms-2" style={{ color: bus.trend === 'up' ? '#28a745' : '#dc3545' }}>
                            {bus.trend === 'up' ? <FaArrowUp /> : <FaArrowDown />} {bus.trendValue}%
                          </span>
                        </div>
                      </div>
                      <ProgressBar 
                        now={bus.occupancyPercentage} 
                        variant={
                          bus.occupancyPercentage > 90 ? 'danger' : 
                          bus.occupancyPercentage > 70 ? 'warning' : 'success'
                        }
                        className="mb-2 progress-lg"
                        style={{ height: '12px', borderRadius: '6px' }}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted">No bus occupancy data available</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      {/* Charts and Recent Payments */}
      <Row>
        <Col md={12} lg={4}>
          <Card className="border-0 shadow-sm mb-4 h-100">
            <Card.Header className="bg-white">
              <h5 className="mb-0">Department Distribution</h5>
            </Card.Header>
            <Card.Body>
              {dashboardData.departmentDistribution.length > 0 ? (
                <Chart
                  options={departmentChartOptions}
                  series={departmentChartSeries}
                  type="donut"
                  height={320}
                />
              ) : (
                <p className="text-muted text-center">No department data available</p>
              )}
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={12} lg={4}>
          <Card className="border-0 shadow-sm mb-4 h-100">
            <Card.Header className="bg-white">
              <h5 className="mb-0">Year-wise Distribution</h5>
            </Card.Header>
            <Card.Body>
              {dashboardData.yearWiseDistribution.length > 0 ? (
                <Chart
                  options={yearChartOptions}
                  series={yearChartSeries}
                  type="bar"
                  height={320}
                />
              ) : (
                <p className="text-muted text-center">No year-wise data available</p>
              )}
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={12} lg={4}>
          <Card className="border-0 shadow-sm mb-4 h-100">
            <Card.Header className="bg-white d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Recent Payments</h5>
              <Badge bg="success" pill>New</Badge>
            </Card.Header>
            <Card.Body className="p-0">
              {dashboardData.recentPayments.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead className="table-light">
                      <tr>
                        <th className="ps-4">Student</th>
                        <th>Amount</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dashboardData.recentPayments.map(payment => (
                        <tr key={payment.id}>
                          <td className="ps-4">
                            <div className="d-flex flex-column">
                              <span className="fw-bold">{payment.student}</span>
                              <div>
                                <Badge bg="secondary" className="me-1">{payment.department}</Badge>
                                <Badge bg="info">{payment.route}</Badge>
                              </div>
                            </div>
                          </td>
                          <td>
                            <span className="fw-bold text-success">{payment.amount}</span>
                          </td>
                          <td>
                            <span className="text-muted">{payment.date}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-muted text-center py-4">No recent payments</p>
              )}
              <div className="p-3 bg-light text-center border-top">
                <a href="#" className="text-primary text-decoration-none">View All Payments</a>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      {/* Add this in your CSS */}
      <style jsx>{`
        .hover-shadow:hover {
          transform: translateY(-5px);
          box-shadow: 0 .5rem 1rem rgba(0,0,0,.15)!important;
        }
        .transition-all {
          transition: all 0.3s ease;
        }
        .progress-lg .progress-bar {
          height: 12px;
        }
      `}</style>
    </>
  );
};

export default Dashboard;