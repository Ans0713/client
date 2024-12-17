import React, { useState } from "react";
import "./Sidebar.css";
import Logo from "../imgs/logo.png";
import { UilSignOutAlt } from "@iconscout/react-unicons";
import { SidebarData } from "../Data/Data"; // Ensure relevant SidebarData
import { UilBars } from "@iconscout/react-unicons";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Sidebar = () => {
  const [selected, setSelected] = useState(0);
  const [expanded, setExpanded] = useState(true); // To handle toggling on all screens
  const navigate = useNavigate(); // Hook to programmatically navigate

  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/login"); // Redirect to login after logout
  };

  // Sidebar slide animation
  const sidebarVariants = {
    true: { left: "0" }, // Visible sidebar
    false: { left: "-250px" }, // Hidden off-screen
  };

  // Function to navigate to different pages
  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <>
      {/* Toggle button for mobile and large screens */}
      <div
        className="bars"
        style={{ right: expanded ? "5vw" : "0" }} // Adjust based on sidebar width
        onClick={() => setExpanded(!expanded)}
      >
        <UilBars />
      </div>

      {/* Sidebar with motion for animation */}
      <motion.div
        className="sidebar"
        variants={sidebarVariants}
        animate={`${expanded}`} // Animate on both large and small screens
      >
        {/* Logo Section */}
        <div className="logo">
          <img src={Logo} alt="logo" />
          <span>
            Col<span>lege</span>
          </span>
        </div>

        {/* Menu Items */}
        <div className="menu">
          {SidebarData.map((item, index) => (
            <div
              key={index}
              className={selected === index ? "menuItem active" : "menuItem"}
              onClick={() => {
                handleNavigation(item.path);
                setSelected(index);
              }}
            >
              <item.icon />
              <span>{item.heading}</span>
            </div>
          ))}

          {/* Logout Button */}
          <div className="menuItem" onClick={handleLogout}>
            <UilSignOutAlt />
            <span>Logout</span>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;
