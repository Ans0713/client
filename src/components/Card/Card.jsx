import React, { useState, useEffect } from "react";
import "./Card.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { motion } from "framer-motion";
import { UilTimes } from "@iconscout/react-unicons";
import { Link } from "react-router-dom";

// Parent Card
const Card = (props) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      className={`CardContainer ${flipped ? "flipped" : ""}`}
      layoutId="flipCard"
      onClick={() => setFlipped(!flipped)}
    >
      {!flipped ? (
        <CompactCard param={props} />
      ) : (
        <BacksideCard param={props} setFlipped={() => setFlipped(false)} />
      )}
    </motion.div>
  );
};

// Compact Card (Front Side)
function CompactCard({ param }) {
  const Png = param.png;
  const progressValues = [50, 75, 30, 45]; // Define specific values
  const [progressValue, setProgressValue] = useState(progressValues[0]); // Start with the first value

  useEffect(() => {
    // Function to animate progress to a specific value
    const animateProgress = (endValue) => {
      let start = progressValue;
      const duration = 1000; // animation duration in ms
      const stepTime = 50; // time between each step in ms

      const step = () => {
        start += ((endValue - progressValue) / duration) * stepTime;
        if (start >= endValue) {
          setProgressValue(endValue);
        } else {
          setProgressValue(Math.round(start));
          requestAnimationFrame(step);
        }
      };

      step();
    };

    // Cycle through the progressValues
    let index = 0;
    const cycleProgress = () => {
      if (index < progressValues.length) {
        animateProgress(progressValues[index]);
        index++;
        setTimeout(cycleProgress, 1500); // Delay before next value, adjust as needed
      }
    };

    cycleProgress(); // Start the cycle

  }, [param.barValue]); // Depend on param.barValue to restart animation if it changes

  return (
    <div
      className="CompactCard"
      style={{
        background: param.color.backGround,
        boxShadow: param.color.boxShadow,
      }}
    >
      <div className="radialBar">
        <CircularProgressbar
          value={progressValue}
          text={`${progressValue}%`}
          styles={buildStyles({
            pathTransitionDuration: 1, // Smooth transition
            pathColor: `rgba(62, 152, 199, ${progressValue / 100})`,
            textColor: "#fff",
            trailColor: "#d6d6d6",
            backgroundColor: "#3e98c7",
          })}
        />
        <span className="cardTitle">{param.title}</span>
      </div>
      <div className="detail">
        <Png style={{ fontSize: "40px", color: "#fff" }} />
        <span className="cardSubtitle">Last 24 hours</span>
      </div>
    </div>
  );
}

// Backside Card
function BacksideCard({ param, setFlipped }) {
  return (
    <div
      className="BacksideCard"
      style={{
        background: param.color.backGround,
        boxShadow: param.color.boxShadow,
      }}
    >
      <div style={{ alignSelf: "flex-end", cursor: "pointer", color: "white" }}>
        <UilTimes onClick={setFlipped} />
      </div>
      <span className="backTitle">{param.title}</span>
      <div className="backContent">
        <Link to="/student-profile" className="linkToPage">
          <span className="linkText">Go to {param.title}</span>
        </Link>
      </div>
    </div>
  );
}

export default Card;
