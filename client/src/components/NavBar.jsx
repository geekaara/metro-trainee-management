import "../css/NavBar.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import metroImage from "../images/Banner.png";
import { Icon } from "@chakra-ui/react";
import { AiOutlineHome } from "react-icons/ai";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

function Navbar(props) {
  const [showInstructorDropdown, setShowInstructorDropdown] = useState(false);
  const [showCourseDropdown, setShowCourseDropdown] = useState(false);

  const toggleInstructorDropdown = () => {
    setShowInstructorDropdown(!showInstructorDropdown);
    setShowCourseDropdown(false); // Close the course dropdown when opening instructor dropdown
  };

  const toggleCourseDropdown = () => {
    setShowCourseDropdown(!showCourseDropdown);
    setShowInstructorDropdown(false); // Close the instructor dropdown when opening course dropdown
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-green">
      <ul className="navbar-nav flex-column">
        <li className="nav-item">
          <Link className="navbar-brand" to="/">
            <img
              src={metroImage}
              style={{ width: "200px", height: "auto" }}
            />
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/">
            <div style={{ display: "flex", alignItems: "center" }}>
              <span style={{ marginRight: "90px" }}>Dashboard</span>
            </div>
          </Link>
        </li>

        <li className="nav-item">
          <span className="nav-link" onClick={toggleInstructorDropdown}>
            <div style={{ display: "flex", alignItems: "center" }}>
              Instructor
              <Icon
                as={showInstructorDropdown ? FaChevronUp : FaChevronDown}
                style={{ marginLeft: "80px" }}
              />
            </div>
          </span>

          {showInstructorDropdown && (
            <ul className="navbar-nav flex-column">
              <li className="nav-item">
                <Link className="nav-link" to="/add-instructors">
                  <span style={{ marginRight: "0px" }}>Add New Instructor</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/manage-leaves">
                  <span style={{ marginRight: "26px" }}>Manage Leaves</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/view-schedules">
                  <span style={{ marginRight: "25px" }}>View Schedules</span>
                </Link>
              </li>
            </ul>
          )}
        </li>

        <li className="nav-item">
          <span className="nav-link" onClick={toggleCourseDropdown}>
            <div style={{ display: "flex", alignItems: "center" }}>
              Course
              <Icon
                as={showCourseDropdown ? FaChevronUp : FaChevronDown}
                style={{ marginLeft: "100px" }}
              />
            </div>
          </span>

          {showCourseDropdown && (
            <ul className="navbar-nav flex-column">
              <li className="nav-item">
                <Link className="nav-link" to="/add-courses">
                  <span style={{ marginRight: "15px" }}>Add New Course</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/view-courses">
                  <span style={{ marginRight: "35px" }}>View Courses</span>
                </Link>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
