import React, { useState } from "react";
import "./Sidebar.css";
import Logo from "../imgs/logo.png";
import { UilSignOutAlt } from "@iconscout/react-unicons";
import { SidebarData } from "../Data/Data"; // Update this with relevant data
import { UilBars } from "@iconscout/react-unicons";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Sidebar = () => {
  const [selected, setSelected] = useState(0);
  const [expanded, setExpanded] = useState(true);
  const navigate = useNavigate(); // Hook to programmatically navigate

  const { userData, logout } = useAuth();

    const handleLogout = async () => {
        await logout();
        navigate('/login'); // Redirect to login after logout
    };

  const sidebarVariants = {
    true: { left: '0' },
    false: { left: '-250px' } // Adjust for the width of your sidebar
  };

  const handleNavigation = (path) => {
    navigate(path); // Navigate to the path when the item is clicked
  };

  return (
    <>
      <div
        className="bars"
        style={{ right: expanded ? '5vw' : '0' }} // Adjust according to your sidebar width
        onClick={() => setExpanded(!expanded)}
      >
        <UilBars />
      </div>
      <motion.div
        className='sidebar'
        variants={sidebarVariants}
        animate={window.innerWidth <= 768 ? `${expanded}` : ''}
      >
        {/* logo */}
        <div className="logo">
          <img src={Logo} alt="logo" />
          <span>
            Col<span>lege</span>
          </span>
        </div>

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
          {/* signoutIcon */}
          <div className="menuItem" onClick={handleLogout}>
          Logout
          </div>
          <div className="menuItem">
            <UilSignOutAlt />
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;

