import React from "react";
import Chart from "react-apexcharts";
import "./CustomerReview.css"; // Ensure to create or update this CSS file for styling

const CollegePerformance = () => {
  const data = {
    series: [
      {
        name: "Student Performance",
        data: [85, 90, 78, 88, 92, 95, 87], // Example data: percentage scores or grades
      },
    ],
    options: {
      chart: {
        type: "area",
        height: "auto",
      },
      fill: {
        colors: ["#1E90FF"], // Change color to a professional blue
        type: "gradient",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        colors: ["#1E90FF"], // Match stroke color to fill color
      },
      tooltip: {
        x: {
          format: "dd/MM/yy",
        },
      },
      grid: {
        show: true,
        borderColor: "#e0e0e0", // Light border for grid lines
      },
      xaxis: {
        type: "datetime",
        categories: [
          "2024-08-01T00:00:00.000Z",
          "2024-08-02T00:00:00.000Z",
          "2024-08-03T00:00:00.000Z",
          "2024-08-04T00:00:00.000Z",
          "2024-08-05T00:00:00.000Z",
          "2024-08-06T00:00:00.000Z",
          "2024-08-07T00:00:00.000Z",
        ],
        labels: {
          format: "dd/MM", // Short date format for readability
        },
      },
      yaxis: {
        show: true,
        title: {
          text: "Performance (%)", // Y-axis title
        },
        labels: {
          formatter: (value) => `${value}%`, // Percentage formatting
        },
      },
      toolbar: {
        show: false,
      },
    },
  };

  return (
    <div className="CollegePerformance">
      <Chart options={data.options} series={data.series} type="area" />
    </div>
  );
};

export default CollegePerformance;
