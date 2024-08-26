import React from "react";
import "./Updates.css";
import { UpdatesData } from "../../Data/Data"; // Ensure this data reflects notifications and announcements

const Updates = () => {
  return (
    <div className="Updates">
      {UpdatesData.map((update) => (
        <div className="update" key={update.id}> {/* Ensure each item has a unique key */}
          <div className="update-content">
            <div className="update-header">
              <img src={update.img} alt="profile" className="update-img" />
              <div className="update-info">
                <span className="update-title">{update.title}</span>
                <span className="update-description">{update.description}</span>
              </div>
            </div>
            <span className="update-time">{update.time}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Updates;

