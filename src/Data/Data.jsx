// Sidebar imports
import {
    UilEstate,
    UilClipboardAlt,
    UilUsersAlt,
    UilPackage,
    UilChart,
    UilSignOutAlt,
    UilMoneyBill,
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
    {
        icon: UilMoneyBill, // Updated icon
        heading: 'Fees Payment',
        path: '/fee-payment', // Adjust path as needed
      },
  ];
  import AccountCircleIcon from "@mui/icons-material/AccountCircle";
  import SchoolIcon from "@mui/icons-material/School";
  import EventIcon from "@mui/icons-material/Event";
  import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
  
  export const cardsData = [
    {
      title: "Student Profile",
      description: "View and manage student profiles",
      color: {
        backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
        boxShadow: "0px 10px 20px 0px #e0c6f5",
      },
      png: AccountCircleIcon, // Material UI Icon for student profile
      link: "/student-profile",
    },
    {
      title: "Faculty Info",
      description: "View faculty information and manage records",
      color: {
        backGround: "linear-gradient(180deg, #ff919d 0%, #fc929d 100%)",
        boxShadow: "0px 10px 20px 0px #fdc0c7",
      },
      png: SchoolIcon, // Material UI Icon for faculty info
      link: "/faculty-info",
    },
    {
      title: "Holidays Festives",
      description: "View upcoming holidays",
      color: {
        backGround: "linear-gradient(180deg, #ffb74d 0%, #ff8a65 100%)",
        boxShadow: "0px 10px 20px 0px #ffd3b5",
      },
      png: EventIcon, // Material UI Icon for holidays
      link: "/holidays",
    },
    {
      title: "Events Activities",
      description: "Manage and view extracurricular activities",
      color: {
        backGround: "linear-gradient(180deg, #4caf50 0%, #81c784 100%)",
        boxShadow: "0px 10px 20px 0px #a5d6a7",
      },
      png: SportsSoccerIcon, // Material UI Icon for extracurricular activities
      link: "/extracurricular-activities",
    },
  ];
  
  
// Updated College Notifications and Announcements Data
// export const UpdatesData = [
//     {
//       img: img1, // Replace with actual image path
//       title: "Semester Exam Schedule Released",
//       description: "The exam schedule for the upcoming semester has been published.",
//       time: "25 seconds ago",
//     },
//     {
//       img: img2, // Replace with actual image path
//       title: "New Library Hours",
//       description: "The library will now be open from 8 AM to 8 PM..",
//       time: "30 minutes ago",
//     },
//     {
//       img: img3, // Replace with actual image path
//       title: "Guest Lecture on AI",
//       description: "A guest lecture on Artificial Intelligence will be held on Friday.",
//       time: "2 hours ago",
//     },
//   ];

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
      image: course1Img,
    },
    {
      id: 2,
      title: 'React JS',
      image: course2Img,
    },
    {
      id: 3,
      title: 'Cloud Computing with AWS',
      image: course3Img,
    },
    {
      id: 4,
      title: 'Python Data Science',
      image: course4Img,
    },
    {
      id: 5,
      title: 'User Interface Design',
      image: course5Img,
    },
    {
      id: 6,
      title: 'Web Development with Django',
      image: course6Img,
    },
  ];
  