import "../css/NavBar.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import metroImage from "../images/Banner.png";
import { Box, Icon } from "@material-ui/core";
import { CgProfile } from "react-icons/cg";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

function Navbar(props) {
  const [showInstructorDropdown, setShowInstructorDropdown] = useState(false);
  const [showModuleDropdown, setShowModuleDropdown] = useState(false);
  const [showCourseDropdown, setShowCourseDropdown] = useState(false);

  const toggleInstructorDropdown = () => {
    setShowInstructorDropdown(!showInstructorDropdown);
    setShowCourseDropdown(false); // Close the course dropdown when opening instructor dropdown
  };

  const toggleModuleDropdown = () => {
    setShowModuleDropdown(!showModuleDropdown);
    setShowCourseDropdown(false); // Close the course dropdown when opening module dropdown
  };

  const toggleCourseDropdown = () => {
    setShowCourseDropdown(!showCourseDropdown);
    setShowModuleDropdown(false); // Close the module dropdown when opening course dropdown
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-green">
      <ul className="navbar-nav flex-column">
        <li className="nav-item">
          <Link className="navbar-brand" to="/">
            <img
              src={metroImage}
              style={{
                width: "250px",
                height: "auto",
                borderRadius: "5%",
              }}
            />

            <Box
              bgcolor="white"
              borderRadius="40%"
              p={4}
              mr={7}
              color="white"
              display="flex"
              alignItems="center"
              justifyContent="center"
              width={100}
              height={100}
              marginLeft={90}
              marginRight={100}
            >
              <CgProfile style={{
                width: "60px",
                height: "auto",
                borderRadius: "5%",
                marginLeft: "90px",
              }}/>
            </Box>
            <h1 className="Profile-heading" style={{ color: "white", fontSize: "20px", marginLeft: "95px" }}>
              Admin
            </h1>
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
                component={showInstructorDropdown ? ExpandLessIcon : ExpandMoreIcon}
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
              Courses
              <Icon
                component={showCourseDropdown ? ExpandLessIcon : ExpandMoreIcon}
                style={{ marginLeft: "90px" }}
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
                <Link className="nav-link" to="/edit-courses">
                  <span style={{ marginRight: "50px" }}>Edit Course</span>
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
