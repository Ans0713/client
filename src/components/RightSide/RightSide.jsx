import React from "react";
import CustomerReview from "../StudentPerformance/StudentPerformance";
import Updates from "../Updates/Updates";
import "./RightSide.css";

const RightSide = () => {
  return (
    <div className="RightSide">
      <div>
        <h3>Announcements</h3>
        <Updates />
      </div>
      <div>
        <h3></h3>
        <CustomerReview />
      </div>
    </div>
  );
};

export default RightSide;
