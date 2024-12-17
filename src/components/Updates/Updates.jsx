import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Updates.css";

const Updates = () => {
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/updates");
        console.log("API Response:", response.data.data.updates); // Log the response data
        
        // Access the updates array from the response
        if (response.data && response.data.data.updates && Array.isArray(response.data.data.updates)) {
          console.log("m andr hu");
          setUpdates(response.data.data.updates);
        } else {
          console.log("m bhar hu");
          
          setError("Unexpected response format");
        }
      } catch (error) {
        console.error("Error fetching updates:", error); // Log the error details
        setError("Failed to load updates. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUpdates();
  }, []);

  if (loading) {
    return <div>Loading updates...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="Updates">
      {updates.length > 0 ? (
        updates.map((update) => (
          <div className="update" key={update._id}>
            <div className="update-content">
              <div className="update-header">
                {update.img && <img src={update.img} alt="profile" className="update-img" />}
                <div className="update-info">
                  <span className="update-title">{update.title}</span>
                  <span className="update-description">{update.description}</span>
                </div>
              </div>
              <span className="update-time">{update.time}</span>
            </div>
          </div>
        ))
      ) : (
        <div>No updates available.</div>
      )}
    </div>
  );
};

export default Updates;
