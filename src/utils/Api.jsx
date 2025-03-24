// Updated getStudents function with more diverse student data
/**
 * Get all students with diverse branches and years
 * @returns {Promise} - Promise with students data
 */

/**
 * Mock API call that simulates a server response
 * @param {any} data - Data to be returned by the mock API
 * @returns {Promise} - Promise that resolves with the data
 */
const mockApiCall = (data) => {
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      resolve(data);
    }, 800);
  });
};


// Bus routes data - exported as a let so it can be modified
export let busRoutes = [
  {
    id: 'bus1',
    busNumber: "BUS NO-1",
    route: [
      "Tarakarampuram",
      "Gandhi Nagar",
      "Chowdamma Temple",
      "Vasavi College",
      "Kadiri Gate",
      "Bathalapalli",
      "Sanjeevapuram",
      "Mannela",
      "Krsihnamreddypalli",
      "SKU",
      "Akuthotapalli",
      "Sethu school",
      "SVIT"
    ],
    capacity: 48,
    driver: {
      name: 'Ramesh Kumar',
      licenseNumber: 'TN1420150008542',
      contact: '9876543210'
    },
    schedule: {
      morningDeparture: '07:30 AM',
      morningArrival: '09:00 AM',
      eveningDeparture: '05:00 PM',
      eveningArrival: '06:30 PM'
    }
  },
  {
    id: 'bus6',
    busNumber: "BUS NO-6",
    route: [
      "Yashoda School",
      "Yerragunta",
      "Kethireddy colony",
      "Sai Baba Temple",
      "RTC Bus stand",
      "DMM PS",
      "Pothukunta PS",
      "Pothukunta Colony",
      "Kunuthuru",
      "Mammilapalli",
      "Mukthapuram",
      "Parvadevarapalli",
      "Maruru",
      "Gollapalli",
      "SVIT"
    ],
    capacity: 52,
    driver: {
      name: 'Suresh Reddy',
      licenseNumber: 'TN1420160007689',
      contact: '9876543211'
    },
    schedule: {
      morningDeparture: '07:15 AM',
      morningArrival: '09:00 AM',
      eveningDeparture: '05:00 PM',
      eveningArrival: '06:45 PM'
    }
  },
  {
    id: 'bus4',
    busNumber: "BUS NO-4",
    route: [
      "Sangameshwara cicle",
      "I-Town PS",
      "Poola Angadi/TDP BUSTOP",
      "Post office",
      "Gooty Road Marramma Gudi",
      "Venugopal Nagar",
      "Sreenivasa Nagar",
      "Bus Stand",
      "Ravi petrol bunk",
      "SVIT"
    ],
    capacity: 45,
    driver: {
      name: 'Venkat R',
      licenseNumber: 'TN1420180004532',
      contact: '9876543212'
    },
    schedule: {
      morningDeparture: '07:45 AM',
      morningArrival: '08:45 AM',
      eveningDeparture: '05:10 PM',
      eveningArrival: '06:10 PM'
    }
  },
  {
    id: 'bus5',
    busNumber: "BUS NO-5",
    route: [
      "Somuladoddi",
      "Bellary Bypass",
      "Syndicate Nagar",
      "Kalyanadurgam Bypass",
      "St.Anns School",
      "U-turn",
      "Rudrampeta",
      "D-mart",
      "Shakshi office",
      "SVIT"
    ],
    capacity: 45,
    driver: {
      name: 'Krishna L',
      licenseNumber: 'TN1420170005467',
      contact: '9876543213'
    },
    schedule: {
      morningDeparture: '07:30 AM',
      morningArrival: '08:30 AM',
      eveningDeparture: '05:00 PM',
      eveningArrival: '06:00 PM'
    }
  },
  {
    id: 'bus7',
    busNumber: "BUS NO-7",
    route: [
      "Nayak Nagar Gate",
      "Gampanna Apartments",
      "Vidyut nagar circle",
      "Housing Board",
      "RTO Office",
      "Saradha Nagar",
      "Collector Office",
      "Pangal Road",
      "Rapthadu",
      "SVIT"
    ],
    capacity: 48,
    driver: {
      name: 'Prakash S',
      licenseNumber: 'TN1420190006798',
      contact: '9876543214'
    },
    schedule: {
      morningDeparture: '07:00 AM',
      morningArrival: '08:00 AM',
      eveningDeparture: '05:00 PM',
      eveningArrival: '06:00 PM'
    }
  },
  {
    id: 'bus9',
    busNumber: "BUS NO-9",
    route: [
      "Vidyuth Nagar",
      "Jesus nagar",
      "Sai Nagar",
      "KSR Clg",
      "Municipal Office",
      "Raghuveera Towers",
      "Tower Clock",
      "PTC Grounds",
      "Kovvur nagar",
      "Lakshmi nagar nagulakatta",
      "Vidyaranga school",
      "Renuka yellamma temple",
      "Triveni homes",
      "Nalanda college",
      "Y T Shiva Reddy House",
      "Garlica",
      "SVIT"
    ],
    capacity: 52,
    driver: {
      name: 'Mohammed K',
      licenseNumber: 'TN1420160004321',
      contact: '9876543215'
    },
    schedule: {
      morningDeparture: '07:10 AM',
      morningArrival: '09:00 AM',
      eveningDeparture: '05:00 PM',
      eveningArrival: '06:50 PM'
    }
  },
  {
    id: 'bus2',
    busNumber: "BUS NO-02",
    route: [
      "Chinmayi nagar",
      "JNTU",
      "Sangamesh circle",
      "Pallavi towers",
      "Surya nagar",
      "Srikanta circle",
      "Bus stand",
      "TTD Kalyanamandapam",
      "2nd Road Mitra Hotel",
      "3rd Road GR function Hall",
      "4th Bangaramma Temople",
      "Santhi Nagar",
      "Somnath Nagar",
      "Tapovanam",
      "SVIT"
    ],
    capacity: 48,
    driver: {
      name: 'Shiva Prasad',
      licenseNumber: 'TN1420170007865',
      contact: '9876543216'
    },
    schedule: {
      morningDeparture: '07:20 AM',
      morningArrival: '08:50 AM',
      eveningDeparture: '05:00 PM',
      eveningArrival: '06:30 PM'
    }
  }
];

/**
 * Get all bus routes
 * @returns {Promise} - Promise that resolves with the bus routes array
 */
export const getAllBusRoutes = () => {
  return mockApiCall(busRoutes);
};

/**
 * Get a specific bus route by ID
 * @param {string} id - The route ID to look for
 * @returns {Promise} - Promise that resolves with the found route or null
 */
export const getBusRouteById = (id) => {
  return new Promise((resolve) => {
    const route = busRoutes.find(route => route.id === id);
    
    // Simulate network delay
    setTimeout(() => {
      resolve(route || null);
    }, 500);
  });
};

/**
 * Get a specific bus route by bus number
 * @param {string} busNumber - The bus number to look for
 * @returns {Promise} - Promise that resolves with the found route or null
 */
export const getBusRouteByNumber = (busNumber) => {
  return new Promise((resolve) => {
    const route = busRoutes.find(
      route => route.busNumber.toLowerCase() === busNumber.toLowerCase()
    );
    
    // Simulate network delay
    setTimeout(() => {
      resolve(route || null);
    }, 500);
  });
};

/**
 * Add a new bus route or update an existing one
 * @param {Object} newRoute - The new route to add or update
 * @returns {Promise} - Promise that resolves with the updated busRoutes array
 */
export const addOrUpdateBusRoute = (newRoute) => {
  return new Promise((resolve, reject) => {
    try {
      // Validate the new route
      if (!newRoute || !newRoute.busNumber || !newRoute.route || newRoute.route.length < 2) {
        throw new Error('Invalid route data');
      }
      
      // Check if this is an update (has ID) or new route
      if (newRoute.id) {
        // Update existing route
        const existingIndex = busRoutes.findIndex(route => route.id === newRoute.id);
        
        if (existingIndex >= 0) {
          busRoutes[existingIndex] = {
            ...busRoutes[existingIndex],
            ...newRoute
          };
        } else {
          throw new Error('Route ID not found');
        }
      } else {
        // Check if bus number already exists
        const existingBusIndex = busRoutes.findIndex(
          route => route.busNumber.toLowerCase() === newRoute.busNumber.toLowerCase()
        );
        
        if (existingBusIndex >= 0) {
          // Update existing route
          busRoutes[existingBusIndex] = {
            ...busRoutes[existingBusIndex],
            ...newRoute
          };
        } else {
          // Add new route with a new ID
          const routeWithId = {
            id: `bus${busRoutes.length + 1}`,
            ...newRoute,
            capacity: newRoute.capacity || 45,
            driver: newRoute.driver || {
              name: 'New Driver',
              licenseNumber: 'TN' + (142000000 + Math.floor(Math.random() * 1000000)),
              contact: '987654' + Math.floor(Math.random() * 10000)
            },
            schedule: newRoute.schedule || {
              morningDeparture: '07:30 AM',
              morningArrival: '08:30 AM',
              eveningDeparture: '05:00 PM',
              eveningArrival: '06:00 PM'
            }
          };
          
          busRoutes.push(routeWithId);
        }
      }
      
      // Simulate network delay
      setTimeout(() => {
        resolve(busRoutes);
      }, 800);
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * Delete a bus route
 * @param {string} busNumberOrId - Bus number or ID to delete
 * @returns {Promise} - Promise that resolves with the updated busRoutes array
 */
export const deleteBusRoute = (busNumberOrId) => {
  return new Promise((resolve, reject) => {
    try {
      // First try to find by ID
      let routeIndex = busRoutes.findIndex(route => route.id === busNumberOrId);
      
      // If not found by ID, try by bus number
      if (routeIndex === -1) {
        routeIndex = busRoutes.findIndex(
          route => route.busNumber.toLowerCase() === busNumberOrId.toLowerCase()
        );
      }
      
      if (routeIndex === -1) {
        throw new Error('Route not found');
      }
      
      // Remove the route
      busRoutes.splice(routeIndex, 1);
      
      // Simulate network delay
      setTimeout(() => {
        resolve(busRoutes);
      }, 800);
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * For backwards compatibility with existing code
 */
export const addNewBusRoute = (newRoute) => {
  return addOrUpdateBusRoute(newRoute);
};

export const getStudents = () => {
  return mockApiCall([
    // CSE Department - All 4 years
    { id: 1, regNo: 'BT20001', name: 'Amit Kumar', department: 'CSE', year: 3, route: 'BUS NO-1', pickupPoint: 'Anantapur Bus Stand', contactNo: '9876543210' },
    { id: 2, regNo: 'BT21015', name: 'Priya Sharma', department: 'CSE', year: 2, route: 'BUS NO-6', pickupPoint: 'Hindupur Road', contactNo: '9876543211' },
    { id: 3, regNo: 'BT22032', name: 'Rahul Singh', department: 'CSE', year: 1, route: 'BUS NO-4', pickupPoint: 'Ramnagar Circle', contactNo: '9876543212' },
    { id: 4, regNo: 'BT19048', name: 'Anjali Patel', department: 'CSE', year: 4, route: 'BUS NO-1', pickupPoint: 'Saptagiri Circle', contactNo: '9876543213' },
    
    // ECE Department - All 4 years
    { id: 5, regNo: 'BT22055', name: 'Karthik Rajan', department: 'ECE', year: 1, route: 'BUS NO-5', pickupPoint: 'Kalyandurg Road', contactNo: '9876543214' },
    { id: 6, regNo: 'BT21066', name: 'Shreya Reddy', department: 'ECE', year: 2, route: 'BUS NO-6', pickupPoint: 'Tadipatri Road', contactNo: '9876543215' },
    { id: 7, regNo: 'BT20077', name: 'Vijay Kumar', department: 'ECE', year: 3, route: 'BUS NO-4', pickupPoint: 'Gooty Junction', contactNo: '9876543216' },
    { id: 8, regNo: 'BT19088', name: 'Meena Kumari', department: 'ECE', year: 4, route: 'BUS NO-7', pickupPoint: 'Dharmavaram Road', contactNo: '9876543217' },
    
    // MECH Department - All 4 years
    { id: 9, regNo: 'BT22099', name: 'Rajesh Khanna', department: 'MECH', year: 1, route: 'BUS NO-1', pickupPoint: 'Kanekal Junction', contactNo: '9876543218' },
    { id: 10, regNo: 'BT21100', name: 'Surya Prakash', department: 'MECH', year: 2, route: 'BUS NO-5', pickupPoint: 'Bathalapalli', contactNo: '9876543219' },
    { id: 11, regNo: 'BT20111', name: 'Akash Patel', department: 'MECH', year: 3, route: 'BUS NO-7', pickupPoint: 'Pamidi', contactNo: '9876543220' },
    { id: 12, regNo: 'BT19122', name: 'Dinesh Kumar', department: 'MECH', year: 4, route: 'BUS NO-6', pickupPoint: 'Guntakal Junction', contactNo: '9876543221' },
    
    // CIVIL Department - All 4 years
    { id: 13, regNo: 'BT22133', name: 'Anand Raj', department: 'CIVIL', year: 1, route: 'BUS NO-4', pickupPoint: 'Kadiri Bus Stand', contactNo: '9876543222' },
    { id: 14, regNo: 'BT21144', name: 'Lakshmi Narayan', department: 'CIVIL', year: 2, route: 'BUS NO-1', pickupPoint: 'Penukonda', contactNo: '9876543223' },
    { id: 15, regNo: 'BT20155', name: 'Venkatesh S', department: 'CIVIL', year: 3, route: 'BUS NO-5', pickupPoint: 'Sri Sathya Sai Puttaparthi', contactNo: '9876543224' },
    { id: 16, regNo: 'BT19166', name: 'Divya Prakash', department: 'CIVIL', year: 4, route: 'BUS NO-7', pickupPoint: 'Rayadurg', contactNo: '9876543225' },
    
    // IT Department - All 4 years
    { id: 17, regNo: 'BT22177', name: 'Ravi Shankar', department: 'IT', year: 1, route: 'BUS NO-6', pickupPoint: 'JNTU Road', contactNo: '9876543226' },
    { id: 18, regNo: 'BT21188', name: 'Swathi Reddy', department: 'IT', year: 2, route: 'BUS NO-4', pickupPoint: 'Anantapur Old Town', contactNo: '9876543227' },
    { id: 19, regNo: 'BT20199', name: 'Kiran Kumar', department: 'IT', year: 3, route: 'BUS NO-1', pickupPoint: 'Tapovanam Circle', contactNo: '9876543228' },
    { id: 20, regNo: 'BT19200', name: 'Pooja Hegde', department: 'IT', year: 4, route: 'BUS NO-5', pickupPoint: 'Singanamala', contactNo: '9876543229' },
    
    // EEE Department - All 4 years
    { id: 21, regNo: 'BT22211', name: 'Mohammed Ali', department: 'EEE', year: 1, route: 'BUS NO-7', pickupPoint: 'Uravakonda', contactNo: '9876543230' },
    { id: 22, regNo: 'BT21222', name: 'Ananya Singh', department: 'EEE', year: 2, route: 'BUS NO-1', pickupPoint: 'Kalyanadurg', contactNo: '9876543231' },
    { id: 23, regNo: 'BT20233', name: 'Rakesh Mishra', department: 'EEE', year: 3, route: 'BUS NO-6', pickupPoint: 'Atmakur Village', contactNo: '9876543232' },
    { id: 24, regNo: 'BT19244', name: 'Neha Sharma', department: 'EEE', year: 4, route: 'BUS NO-4', pickupPoint: 'Kuderu', contactNo: '9876543233' },
  ]);
};

/**
 * Updated function to get student details by ID with more detailed information
 * @param {number} id - Student ID
 * @returns {Promise} - Promise with detailed student information
 */
export const getStudentById = (id) => {
  return new Promise((resolve) => {
    // Find the student in our mock data
    getStudents()
      .then(allStudents => {
        const student = allStudents.find(s => s.id === id);
        
        if (!student) {
          resolve(null);
          return;
        }
        
        // Find the bus route for this student
        const busRoute = busRoutes.find(route => 
          route.busNumber === student.route
        );
        
        // Create a more detailed student record
        const detailedStudent = {
          ...student,
          department: mapDepartmentFullName(student.department),
          section: 'A',
          dob: '15 Jun ' + (2005 - student.year),
          gender: student.id % 2 === 0 ? 'Female' : 'Male',
          bloodGroup: ['A+', 'B+', 'O+', 'AB+'][Math.floor(Math.random() * 4)],
          address: `${123 + student.id}, ${['Anna Nagar', 'Gandhi Road', 'Nehru Street', 'Patel Avenue'][Math.floor(Math.random() * 4)]}, Anantapur, Andhra Pradesh - ${517500 + student.id % 100}`,
          email: `${student.name.toLowerCase().replace(' ', '.')}@example.com`,
          fatherName: `${['Rajesh', 'Suresh', 'Mahesh', 'Ramesh'][Math.floor(Math.random() * 4)]} ${student.name.split(' ')[1]}`,
          fatherContactNo: `987654${3200 + student.id}`,
          motherName: `${['Sunita', 'Anita', 'Kavita', 'Savita'][Math.floor(Math.random() * 4)]} ${student.name.split(' ')[1]}`,
          motherContactNo: `987654${3300 + student.id}`,
          route: {
            routeNumber: student.route,
            name: busRoute ? `${busRoute.route[0]} to ${busRoute.route[busRoute.route.length - 1]}` : 'Unknown Route'
          },
          feeStatus: {
            isPaid: student.id % 3 !== 0, // Every 3rd student has unpaid fees
            paidAmount: student.id % 3 !== 0 ? 10000 : 0,
            paidDate: student.id % 3 !== 0 ? `${(student.id % 28) + 1} Mar 2025` : '-',
            dueAmount: student.id % 3 !== 0 ? 0 : 10000
          },
          academicDetails: {
            batch: `${2023 - student.year}-${2027 - student.year}`,
            cgpa: (7 + (student.id % 30) / 10).toFixed(1),
            attendance: `${80 + (student.id % 20)}%`,
            mentor: `Dr. ${['Subramaniam', 'Patel', 'Sharma', 'Kumar', 'Reddy'][Math.floor(Math.random() * 5)]}`
          }
        };
        
        resolve(detailedStudent);
      });
  });
};

/**
 * Get students assigned to a specific bus route
 * @param {string} busNumber - The bus number to find students for
 * @returns {Promise} - Promise that resolves with array of students
 */
export const getStudentsByBusNumber = (busNumber) => {
  return new Promise((resolve) => {
    getStudents()
      .then(allStudents => {
        const filteredStudents = allStudents.filter(student => student.route === busNumber);
        resolve(filteredStudents);
      });
  });
};

/**
 * Helper function to map department abbreviations to full names
 */
function mapDepartmentFullName(dept) {
  const deptMap = {
    'CSE': 'Computer Science Engineering',
    'ECE': 'Electronics & Communication Engineering',
    'MECH': 'Mechanical Engineering',
    'CIVIL': 'Civil Engineering',
    'IT': 'Information Technology',
    'EEE': 'Electrical & Electronics Engineering'
  };
  
  return deptMap[dept] || dept;
}

// Add these functions to your Api.jsx file

// Mock payment data storage (in a real app, this would be on the server)
let studentPayments = [];

/**
 * Initialize the payments data if needed
 * Creates a few initial payments based on the student ID patterns in getStudents
 */
const initializePaymentsIfNeeded = async () => {
  if (studentPayments.length > 0) {
    return;
  }

  try {
    const students = await getStudents();
    const currentYear = new Date().getFullYear();
    
    // Create initial payments for some students (those with isPaid = true in getStudentById)
    const initialPayments = [];
    
    for (const student of students) {
      // Every 3rd student has unpaid fees per the API logic
      if (student.id % 3 !== 0) {
        // Create a payment record
        const paymentDate = new Date();
        paymentDate.setDate((student.id % 28) + 1); // Match the paidDate logic in getStudentById
        paymentDate.setMonth(2); // March
        
        initialPayments.push({
          id: `payment-${Date.now()}-${student.id}`,
          studentId: student.id,
          transactionId: `TXN${currentYear.toString().slice(-2)}${student.id.toString().padStart(4, '0')}`,
          amount: 10000, // Standard fee amount
          date: paymentDate.toLocaleDateString('en-US', { 
            day: '2-digit', 
            month: 'short', 
            year: 'numeric' 
          }),
          academicYear: `${currentYear-1}-${currentYear}`,
          semester: 'Even',
          paymentMode: ['Online', 'Cash', 'Cheque', 'UPI'][Math.floor(Math.random() * 4)],
          status: 'Success'
        });
      }
    }
    
    studentPayments = initialPayments;
  } catch (error) {
    console.error('Error initializing payments data:', error);
  }
};

// Add these functions to your Api.jsx file

// Mock payments data - predefined to ensure consistent data
export const dummyPaymentsData = [
  // Student 1 - Amit Kumar (id: 1) - CSE Year 3
  {
    id: 'payment-1-1',
    studentId: 1,
    transactionId: 'TXN230001',
    amount: 10000,
    date: '15 Mar 2025',
    academicYear: '2024-2025',
    semester: 'Even',
    paymentMode: 'Online',
    status: 'Success'
  },
  {
    id: 'payment-1-2',
    studentId: 1,
    transactionId: 'TXN220001',
    amount: 10000,
    date: '12 Sep 2024',
    academicYear: '2024-2025',
    semester: 'Odd',
    paymentMode: 'Online',
    status: 'Success'
  },
  {
    id: 'payment-1-3',
    studentId: 1,
    transactionId: 'TXN210001',
    amount: 10000,
    date: '18 Mar 2024',
    academicYear: '2023-2024',
    semester: 'Even',
    paymentMode: 'Cash',
    status: 'Success'
  },
  {
    id: 'payment-1-4',
    studentId: 1,
    transactionId: 'TXN200001',
    amount: 10000,
    date: '05 Sep 2023',
    academicYear: '2023-2024',
    semester: 'Odd',
    paymentMode: 'UPI',
    status: 'Success'
  },
  
  // Student 2 - Priya Sharma (id: 2) - CSE Year 2
  {
    id: 'payment-2-1',
    studentId: 2,
    transactionId: 'TXN230002',
    amount: 10000,
    date: '10 Mar 2025',
    academicYear: '2024-2025',
    semester: 'Even',
    paymentMode: 'UPI',
    status: 'Success'
  },
  {
    id: 'payment-2-2',
    studentId: 2,
    transactionId: 'TXN220002',
    amount: 10000,
    date: '07 Sep 2024',
    academicYear: '2024-2025',
    semester: 'Odd',
    paymentMode: 'Cheque',
    status: 'Success'
  },
  {
    id: 'payment-2-3',
    studentId: 2,
    transactionId: 'TXN210002',
    amount: 10000,
    date: '12 Mar 2024',
    academicYear: '2023-2024',
    semester: 'Even',
    paymentMode: 'Cash',
    status: 'Success'
  },
  
  // Student 4 - Anjali Patel (id: 4) - CSE Year 4
  {
    id: 'payment-4-1',
    studentId: 4,
    transactionId: 'TXN230004',
    amount: 10000,
    date: '05 Mar 2025',
    academicYear: '2024-2025',
    semester: 'Even',
    paymentMode: 'Online',
    status: 'Success'
  },
  {
    id: 'payment-4-2',
    studentId: 4,
    transactionId: 'TXN220004',
    amount: 10000,
    date: '02 Sep 2024',
    academicYear: '2024-2025',
    semester: 'Odd',
    paymentMode: 'Online',
    status: 'Success'
  },
  {
    id: 'payment-4-3',
    studentId: 4,
    transactionId: 'TXN210004',
    amount: 10000,
    date: '08 Mar 2024',
    academicYear: '2023-2024',
    semester: 'Even',
    paymentMode: 'Cash',
    status: 'Success'
  },
  {
    id: 'payment-4-4',
    studentId: 4,
    transactionId: 'TXN200004',
    amount: 10000,
    date: '12 Sep 2023',
    academicYear: '2023-2024',
    semester: 'Odd',
    paymentMode: 'UPI',
    status: 'Success'
  },
  {
    id: 'payment-4-5',
    studentId: 4,
    transactionId: 'TXN190004',
    amount: 10000,
    date: '15 Mar 2023',
    academicYear: '2022-2023',
    semester: 'Even',
    paymentMode: 'Cheque',
    status: 'Success'
  },
  {
    id: 'payment-4-6',
    studentId: 4,
    transactionId: 'TXN180004',
    amount: 10000,
    date: '04 Sep 2022',
    academicYear: '2022-2023',
    semester: 'Odd',
    paymentMode: 'Cash',
    status: 'Success'
  },
  {
    id: 'payment-4-7',
    studentId: 4,
    transactionId: 'TXN170004',
    amount: 10000,
    date: '18 Mar 2022',
    academicYear: '2021-2022',
    semester: 'Even',
    paymentMode: 'Online',
    status: 'Success'
  },
  
  // Student 5 - Karthik Rajan (id: 5) - ECE Year 1
  {
    id: 'payment-5-1',
    studentId: 5,
    transactionId: 'TXN230005',
    amount: 10000,
    date: '18 Mar 2025',
    academicYear: '2024-2025',
    semester: 'Even',
    paymentMode: 'Online',
    status: 'Success'
  },
  {
    id: 'payment-5-2',
    studentId: 5,
    transactionId: 'TXN220005',
    amount: 10000,
    date: '22 Sep 2024',
    academicYear: '2024-2025',
    semester: 'Odd',
    paymentMode: 'UPI',
    status: 'Success'
  },
  
  // Student 7 - Vijay Kumar (id: 7) - ECE Year 3
  {
    id: 'payment-7-1',
    studentId: 7,
    transactionId: 'TXN230007',
    amount: 10000,
    date: '08 Mar 2025',
    academicYear: '2024-2025',
    semester: 'Even',
    paymentMode: 'Cash',
    status: 'Success'
  },
  {
    id: 'payment-7-2',
    studentId: 7,
    transactionId: 'TXN220007',
    amount: 10000,
    date: '10 Sep 2024',
    academicYear: '2024-2025',
    semester: 'Odd',
    paymentMode: 'Cheque',
    status: 'Success'
  },
  {
    id: 'payment-7-3',
    studentId: 7,
    transactionId: 'TXN210007',
    amount: 10000,
    date: '05 Mar 2024',
    academicYear: '2023-2024',
    semester: 'Even',
    paymentMode: 'Online',
    status: 'Success'
  },
  {
    id: 'payment-7-4',
    studentId: 7,
    transactionId: 'TXN200007',
    amount: 10000,
    date: '12 Sep 2023',
    academicYear: '2023-2024',
    semester: 'Odd',
    paymentMode: 'UPI',
    status: 'Success'
  },
  
  // Add pending payments for students with IDs divisible by 3
  // Student 3 - Rahul Singh (id: 3) - CSE Year 1
  {
    id: 'pending-3',
    studentId: 3,
    transactionId: '-',
    amount: 10000,
    date: '-',
    academicYear: '2024-2025',
    semester: 'Even',
    paymentMode: '-',
    status: 'Pending'
  },
  
  // Student 6 - Shreya Reddy (id: 6) - ECE Year 2
  {
    id: 'pending-6',
    studentId: 6,
    transactionId: '-',
    amount: 10000,
    date: '-',
    academicYear: '2024-2025',
    semester: 'Even',
    paymentMode: '-',
    status: 'Pending'
  },
  
  // Student 9 - Rajesh Khanna (id: 9) - MECH Year 1
  {
    id: 'pending-9',
    studentId: 9,
    transactionId: '-',
    amount: 10000,
    date: '-',
    academicYear: '2024-2025',
    semester: 'Even',
    paymentMode: '-',
    status: 'Pending'
  },
  
  // Student 12 - Dinesh Kumar (id: 12) - MECH Year 4
  {
    id: 'pending-12',
    studentId: 12,
    transactionId: '-',
    amount: 10000,
    date: '-',
    academicYear: '2024-2025',
    semester: 'Even',
    paymentMode: '-',
    status: 'Pending'
  }
];

/**
 * Get payments for a specific student
 * @param {number} studentId - Student ID to get payments for
 * @returns {Promise} - Promise that resolves with student payments
 */
export const getStudentPayments = (studentId) => {
  return new Promise((resolve) => {
    const payments = dummyPaymentsData.filter(
      payment => payment.studentId === parseInt(studentId)
    );
    
    setTimeout(() => {
      resolve(payments);
    }, 500);
  });
};

/**
 * Get all payments (can be filtered by status)
 * @param {string} status - Optional status filter ('Success', 'Pending', 'Failed')
 * @returns {Promise} - Promise that resolves with filtered payments
 */
export const getAllPayments = (status = null) => {
  return new Promise((resolve) => {
    let result = [...dummyPaymentsData];
    
    if (status) {
      result = result.filter(payment => payment.status === status);
    }
    
    setTimeout(() => {
      resolve(result);
    }, 800);
  });
};

/**
 * Add a new payment
 * @param {Object} payment - Payment object with studentId, amount, etc.
 * @returns {Promise} - Promise that resolves with the newly added payment
 */
export const addPayment = (payment) => {
  return new Promise((resolve, reject) => {
    try {
      // Validate payment
      if (!payment || !payment.studentId || !payment.amount) {
        throw new Error('Invalid payment data');
      }
      
      // Generate a unique ID
      const newPayment = {
        ...payment,
        id: `payment-${Date.now()}-${payment.studentId}`,
        status: payment.status || 'Success' // Default to success
      };
      
      // Add to payment records
      dummyPaymentsData.push(newPayment);
      
      // Simulate network delay
      setTimeout(() => {
        resolve(newPayment);
      }, 800);
    } catch (error) {
      reject(error);
    }
  });
};