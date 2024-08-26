import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./Table.css";

// Sample data for live courses
function createData(courseName, courseId, instructor, status) {
  return { courseName, courseId, instructor, status };
}

const rows = [
  createData("Introduction to Computer Science", 101, "Dr. Alice Johnson", "Ongoing"),
  createData("Calculus I", 102, "Prof. Mark Smith", "Upcoming"),
  createData("Modern Physics", 103, "Dr. Emily Brown", "Completed"),
  createData("Organic Chemistry", 104, "Dr. Lisa White", "Cancelled"),
];

const makeStyle = (status) => {
  switch (status) {
    case "Ongoing":
      return {
        background: 'rgba(144, 238, 144, 0.3)', // Light green background
        color: 'green',
      };
    case "Upcoming":
      return {
        background: 'rgba(255, 165, 0, 0.3)', // Light orange background
        color: 'orange',
      };
    case "Completed":
      return {
        background: 'rgba(173, 216, 230, 0.3)', // Light blue background
        color: 'blue',
      };
    case "Cancelled":
      return {
        background: 'rgba(255, 99, 71, 0.3)', // Light tomato background
        color: 'red',
      };
    default:
      return {};
  }
};

export default function CourseTable() {
  return (
    <div className="Table">
      <h3>Live Courses</h3>
      <TableContainer
        component={Paper}
        style={{ boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)" }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="live courses table">
          <TableHead>
            <TableRow>
              <TableCell>Course Name</TableCell>
              <TableCell align="left">Course ID</TableCell>
              <TableCell align="left">Instructor</TableCell>
              <TableCell align="left">Status</TableCell>
              <TableCell align="left"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.courseId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.courseName}
                </TableCell>
                <TableCell align="left">{row.courseId}</TableCell>
                <TableCell align="left">{row.instructor}</TableCell>
                <TableCell align="left">
                  <span className="status" style={makeStyle(row.status)}>{row.status}</span>
                </TableCell>
                <TableCell align="left" className="Details">Details</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

