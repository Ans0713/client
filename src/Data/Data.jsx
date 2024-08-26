// Sidebar imports
import {
    UilEstate,
    UilClipboardAlt,
    UilUsersAlt,
    UilPackage,
    UilChart,
    UilSignOutAlt,
  } from "@iconscout/react-unicons";
  
  // Analytics Cards imports
  import { UilUsdSquare, UilMoneyWithdrawal } from "@iconscout/react-unicons";
  
  // Recent Card Imports
  import img1 from "../imgs/img1.png";
  import img2 from "../imgs/img2.png";
  import img3 from "../imgs/img3.png";
  export const SidebarData = [
    {
      icon: UilEstate,
      heading: "Dashboard",
      path: "/", // Change this to your dashboard path
    },
    {
      icon: UilClipboardAlt,
      heading: "Courses",
      path: "/courses", // Path to your Courses page
    },
    {
      icon: UilUsersAlt,
      heading: "Attendance",
      path: "/attendance", // Adjust path as needed
    },
    {
      icon: UilPackage,
      heading: 'Upload Leave Application',
      path: '/leave-application', // Adjust path as needed
    },
    {
      icon: UilChart,
      heading: 'Calendar & Events',
      path: '/calendar', // Adjust path as needed
    },
  ];
  
  /// Analytics Cards Data for College Admin Portal
  import {
    UilUniversity,
    UilBookOpen,
    UilCalendarAlt,
    UilUserCheck,
    UilBookReader,
  } from "@iconscout/react-unicons";
export const cardsData = [
    {
      title: "Student Admissions",
      color: {
        backGround: "linear-gradient(180deg, #1E90FF 0%, #00BFFF 100%)",
        boxShadow: "0px 10px 20px 0px #A0C4FF",
      },
      barValue: 75,
      value: "1,250",
      description: "New Admissions This Month",
      png: UilUniversity, // Icon representing admissions
      series: [
        {
          name: "Admissions",
          data: [150, 200, 250, 300, 350, 400, 450],
        },
      ],
    },
    {
      title: "Faculty Performance",
      color: {
        backGround: "linear-gradient(180deg, #32CD32 0%, #7CFC00 100%)",
        boxShadow: "0px 10px 20px 0px #98FB98",
      },
      barValue: 85,
      value: "A+",
      description: "Average Faculty Rating",
      png: UilBookOpen, // Icon representing faculty performance
      series: [
        {
          name: "Performance",
          data: [90, 85, 88, 92, 95, 89, 94],
        },
      ],
    },
    {
      title: "Campus Events",
      color: {
        backGround: "linear-gradient(180deg, #FFA500 0%, #FF6347 100%)",
        boxShadow: "0px 10px 20px 0px #FFB347",
      },
      barValue: 50,
      value: "12",
      description: "Upcoming Events",
      png: UilCalendarAlt, // Icon representing campus events
      series: [
        {
          name: "Events",
          data: [2, 3, 1, 5, 2, 4, 3],
        },
      ],
    },
    {
      title: "Student Attendance",
      color: {
        backGround: "linear-gradient(180deg, #8A2BE2 0%, #9370DB 100%)",
        boxShadow: "0px 10px 20px 0px #D8BFD8",
      },
      barValue: 90,
      value: "95%",
      description: "Average Attendance",
      png: UilUserCheck, // Icon representing student attendance
      series: [
        {
          name: "Attendance",
          data: [95, 94, 96, 97, 95, 93, 96],
        },
      ],
    },
    {
      title: "Library Usage",
      color: {
        backGround: "linear-gradient(180deg, #FF4500 0%, #FF6347 100%)",
        boxShadow: "0px 10px 20px 0px #FFA07A",
      },
      barValue: 65,
      value: "8,570",
      description: "Books Issued This Month",
      png: UilBookReader, // Icon representing library usage
      series: [
        {
          name: "Library Usage",
          data: [750, 820, 780, 900, 850, 870, 940],
        },
      ],
    },
  ];
  
// Updated College Notifications and Announcements Data
export const UpdatesData = [
    {
      img: img1, // Replace with actual image path
      title: "Semester Exam Schedule Released",
      description: "The exam schedule for the upcoming semester has been published.",
      time: "25 seconds ago",
    },
    {
      img: img2, // Replace with actual image path
      title: "New Library Hours",
      description: "The library will now be open from 8 AM to 8 PM..",
      time: "30 minutes ago",
    },
    {
      img: img3, // Replace with actual image path
      title: "Guest Lecture on AI",
      description: "A guest lecture on Artificial Intelligence will be held on Friday.",
      time: "2 hours ago",
    },
  ];

  import course1Img from '../assets/Advanced JavaScript.jpeg';
import course2Img from '../assets/React JS.jpg';
import course3Img from '../assets/Cloud Computing with AWS.jpg';
import course4Img from '../assets/Python Data Science.jpeg';
import course5Img from '../assets/user interface.jpg';
import course6Img from '../assets/Web Development with Django.jpg';

export const coursesData = [
  {
    id: 1,
    title: 'Advanced JavaScript',
    description: 'Deepen your understanding of JavaScript with advanced concepts and techniques.',
    instructor: 'John Doe',
    image: course1Img,
  },
  {
    id: 2,
    title: 'React JS',
    description: 'Master React JS and build powerful front-end applications with this comprehensive course.',
    instructor: 'Jane Smith',
    image: course2Img,
  },
  {
    id: 3,
    title: 'Cloud Computing with AWS',
    description: 'Learn about cloud computing and AWS to manage scalable applications and infrastructure.',
    instructor: 'Emily Johnson',
    image: course3Img,
  },
  {
    id: 4,
    title: 'Python Data Science',
    description: 'Explore data science concepts using Python and learn how to analyze and visualize data.',
    instructor: 'Michael Brown',
    image: course4Img,
  },
  {
    id: 5,
    title: 'User Interface Design',
    description: 'Design intuitive and attractive user interfaces with principles of UI/UX design.',
    instructor: 'Sarah Davis',
    image: course5Img,
  },
  {
    id: 6,
    title: 'Web Development with Django',
    description: 'Build robust web applications with Django, a powerful Python web framework.',
    instructor: 'David Wilson',
    image: course6Img,
  },
];
