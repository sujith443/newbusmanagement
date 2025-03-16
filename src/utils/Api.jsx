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


  // Bus routes data
export const busRoutes = [
  {
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
    ]
  },
  {
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
    ]
  },
  {
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
    ]
  },
  {
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
    ]
  },
  {
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
    ]
  },
  {
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
    ]
  },
  {
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
    ]
  }
];




export const getStudents = () => {
    return mockApiCall([
      // CSE Department - All 4 years
      { id: 1, regNo: 'BT20001', name: 'Amit Kumar', department: 'CSE', year: 3, route: 'R001', pickupPoint: 'Anantapur Bus Stand', contactNo: '9876543210' },
      { id: 2, regNo: 'BT21015', name: 'Priya Sharma', department: 'CSE', year: 2, route: 'R002', pickupPoint: 'Hindupur Road', contactNo: '9876543211' },
      { id: 3, regNo: 'BT22032', name: 'Rahul Singh', department: 'CSE', year: 1, route: 'R003', pickupPoint: 'Ramnagar Circle', contactNo: '9876543212' },
      { id: 4, regNo: 'BT19048', name: 'Anjali Patel', department: 'CSE', year: 4, route: 'R001', pickupPoint: 'Saptagiri Circle', contactNo: '9876543213' },
      
      // ECE Department - All 4 years
      { id: 5, regNo: 'BT22055', name: 'Karthik Rajan', department: 'ECE', year: 1, route: 'R004', pickupPoint: 'Kalyandurg Road', contactNo: '9876543214' },
      { id: 6, regNo: 'BT21066', name: 'Shreya Reddy', department: 'ECE', year: 2, route: 'R002', pickupPoint: 'Tadipatri Road', contactNo: '9876543215' },
      { id: 7, regNo: 'BT20077', name: 'Vijay Kumar', department: 'ECE', year: 3, route: 'R003', pickupPoint: 'Gooty Junction', contactNo: '9876543216' },
      { id: 8, regNo: 'BT19088', name: 'Meena Kumari', department: 'ECE', year: 4, route: 'R005', pickupPoint: 'Dharmavaram Road', contactNo: '9876543217' },
      
      // MECH Department - All 4 years
      { id: 9, regNo: 'BT22099', name: 'Rajesh Khanna', department: 'MECH', year: 1, route: 'R001', pickupPoint: 'Kanekal Junction', contactNo: '9876543218' },
      { id: 10, regNo: 'BT21100', name: 'Surya Prakash', department: 'MECH', year: 2, route: 'R004', pickupPoint: 'Bathalapalli', contactNo: '9876543219' },
      { id: 11, regNo: 'BT20111', name: 'Akash Patel', department: 'MECH', year: 3, route: 'R005', pickupPoint: 'Pamidi', contactNo: '9876543220' },
      { id: 12, regNo: 'BT19122', name: 'Dinesh Kumar', department: 'MECH', year: 4, route: 'R002', pickupPoint: 'Guntakal Junction', contactNo: '9876543221' },
      
      // CIVIL Department - All 4 years
      { id: 13, regNo: 'BT22133', name: 'Anand Raj', department: 'CIVIL', year: 1, route: 'R003', pickupPoint: 'Kadiri Bus Stand', contactNo: '9876543222' },
      { id: 14, regNo: 'BT21144', name: 'Lakshmi Narayan', department: 'CIVIL', year: 2, route: 'R001', pickupPoint: 'Penukonda', contactNo: '9876543223' },
      { id: 15, regNo: 'BT20155', name: 'Venkatesh S', department: 'CIVIL', year: 3, route: 'R004', pickupPoint: 'Sri Sathya Sai Puttaparthi', contactNo: '9876543224' },
      { id: 16, regNo: 'BT19166', name: 'Divya Prakash', department: 'CIVIL', year: 4, route: 'R005', pickupPoint: 'Rayadurg', contactNo: '9876543225' },
      
      // IT Department - All 4 years
      { id: 17, regNo: 'BT22177', name: 'Ravi Shankar', department: 'IT', year: 1, route: 'R002', pickupPoint: 'JNTU Road', contactNo: '9876543226' },
      { id: 18, regNo: 'BT21188', name: 'Swathi Reddy', department: 'IT', year: 2, route: 'R003', pickupPoint: 'Anantapur Old Town', contactNo: '9876543227' },
      { id: 19, regNo: 'BT20199', name: 'Kiran Kumar', department: 'IT', year: 3, route: 'R001', pickupPoint: 'Tapovanam Circle', contactNo: '9876543228' },
      { id: 20, regNo: 'BT19200', name: 'Pooja Hegde', department: 'IT', year: 4, route: 'R004', pickupPoint: 'Singanamala', contactNo: '9876543229' },
      
      // EEE Department - All 4 years
      { id: 21, regNo: 'BT22211', name: 'Mohammed Ali', department: 'EEE', year: 1, route: 'R005', pickupPoint: 'Uravakonda', contactNo: '9876543230' },
      { id: 22, regNo: 'BT21222', name: 'Ananya Singh', department: 'EEE', year: 2, route: 'R001', pickupPoint: 'Kalyanadurg', contactNo: '9876543231' },
      { id: 23, regNo: 'BT20233', name: 'Rakesh Mishra', department: 'EEE', year: 3, route: 'R002', pickupPoint: 'Atmakur Village', contactNo: '9876543232' },
      { id: 24, regNo: 'BT19244', name: 'Neha Sharma', department: 'EEE', year: 4, route: 'R003', pickupPoint: 'Kuderu', contactNo: '9876543233' },
      
    ]);
  };
  
  /**
   * Updated function to get student details by ID with more detailed information
   * @param {number} id - Student ID
   * @returns {Promise} - Promise with detailed student information
   */
  export const getStudentById = (id) => {
    // This would typically use the id parameter to fetch specific student
    // For demo, returning a static detailed record
    return mockApiCall({
      id: 1,
      regNo: 'BT20001',
      name: 'Amit Kumar',
      department: 'Computer Science Engineering',
      year: 3,
      section: 'A',
      dob: '15 Jun 2002',
      gender: 'Male',
      bloodGroup: 'B+',
      address: '123, Anna Nagar, Tirupati, Andhra Pradesh - 517501',
      contactNo: '9876543210',
      email: 'amit.kumar@example.com',
      fatherName: 'Rajesh Kumar',
      fatherContactNo: '9876543220',
      motherName: 'Sunita Kumar',
      motherContactNo: '9876543230',
      route: {
        routeNumber: 'R001',
        name: 'College to Tirupati'
      },
      pickupPoint: 'Tirupati Main Road',
      feeStatus: {
        isPaid: true,
        paidAmount: 10000,
        paidDate: '05 Mar 2025',
        dueAmount: 0
      },
      academicDetails: {
        batch: '2020-2024',
        cgpa: 8.7,
        attendance: '92%',
        mentor: 'Dr. Subramaniam'
      }
    });
  };