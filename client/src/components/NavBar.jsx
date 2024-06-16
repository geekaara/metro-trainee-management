import "../css/NavBar.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import metroImage from "../images/Banner.png";
import { Box, Icon } from "@mui/material";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import useAuth from "../services/AuthService";
import { useNavigate } from "react-router-dom";

function Navbar(props) {
// Destructure logout function from useAuth hook
  const { logout } = useAuth();
// State for toggling dropdown
  const [showInstructorDropdown, setShowInstructorDropdown] = useState(false);
  const [showModuleDropdown, setShowModuleDropdown] = useState(false);
  const [showCourseDropdown, setShowCourseDropdown] = useState(false);
  const [showAdminDropDown, setShowAdminDropDown] = useState(false);

   // Toggle function for instructor dropdown
  const toggleInstructorDropdown = () => {
    setShowInstructorDropdown(!showInstructorDropdown);
    setShowCourseDropdown(false); 
  };

  // Toggle function for module dropdown
  const toggleModuleDropdown = () => {
    setShowModuleDropdown(!showModuleDropdown);
    setShowCourseDropdown(false); 
  };

  // Toggle function for course dropdown
  const toggleCourseDropdown = () => {
    setShowCourseDropdown(!showCourseDropdown);
    setShowModuleDropdown(false); 
  };
// Toggle function for admin dropdown
  const toggleAdminDropdown = () => {
    setShowAdminDropDown(!showAdminDropDown);
    setShowCourseDropdown(false); // Close the module dropdown when opening course dropdown
  };
  const navigate = useNavigate();

  // Logout function
  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-green">
      <ul className="navbar-nav flex-column">
        <li className="nav-item">
            <img
              src={metroImage} 
              alt="Metro Image"
              style={{
                width: "250px", 
                height: "auto", 
                borderRadius: "5%", 
              }}
            />

            <Box
              
              borderRadius="40%" 
             
            >
              <CgProfile style={{
                width: "60px", // Set width to 200px
                height: "auto", // Auto adjust height to maintain aspect ratio
                borderRadius: "5%", // Circular shape
                marginLeft: "90px",
                color:"white"
              }}/>
               {/* Profile icon */}
            </Box>
            <h1 className="Profile-heading" style={{ color: "white", fontSize: "20px", marginLeft: "95px" }}>
              Admin
            </h1>
     
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
                <Link className="nav-link" to="/view-instructors">
                  <span style={{ marginRight: "20px" }}>View Instructors</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/add-instructors">
                  <span style={{ marginRight: "0px" }}>Add New Instructor</span>
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
                as={showCourseDropdown ? FaChevronUp : FaChevronDown}
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

        <li className="nav-item">
          <span className="nav-link" onClick={toggleAdminDropdown}>
            <div style={{ display: "flex", alignItems: "center" }}>
              Config
              <Icon
                as={showAdminDropDown ? FaChevronUp : FaChevronDown}
                style={{ marginLeft: "90px" }}
              />
            </div>
          </span>

          {showAdminDropDown && (
            <ul className="navbar-nav flex-column">
              <li className="nav-item">
                <Link className="nav-link" to="/add-qualification">
                  <span style={{ marginRight: "15px" }}>Add Qualification</span>
                </Link>
              </li>
             
            </ul>
          )}
        </li>
       
       
        <li className="nav-item">
          <Link className="nav-link" onClick={handleLogout}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <span style={{ marginRight: "120px", marginTop:"100px" }}>Logout</span>
            </div>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;



