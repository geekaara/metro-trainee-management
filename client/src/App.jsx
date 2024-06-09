import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import Dashboard from "./pages/Dashboard";
import AddInstructor from "./pages/AddInstructor";
import ViewInstructors from "./pages/ViewInstructors";
import ManageLeaves from "./pages/ManageLeaves";
import ViewSchedules from "./pages/ViewSchedules";
import AddCourse from "./pages/AddCourse";
import EditCourse from "./pages/EditCourse";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage"; 
import AddQualifications from "./pages/AddQualifications";
import AddInstructorAvailability from "./pages/AddInstructorAvailability";
import { ToastContainer } from "react-toastify";

import './css/style.css';


function App() {
    return (
        
        <Router>
             <ToastContainer />
            <Routes>
            <Route path="/" element={<LoginPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/dashboard" element={<WithNavbar><Dashboard /></WithNavbar>} />
                <Route path="/add-instructors" element={<WithNavbar><AddInstructor /></WithNavbar>} />
                {/* <Route path="/qualifications" element={<WithNavbar><AddQualifications /></WithNavbar>} />
                <Route path="/availability" element={<WithNavbar><AddInstructorAvailability /></WithNavbar>} /> */}
                <Route path="/view-instructors" element={<WithNavbar><ViewInstructors /></WithNavbar>} />
                <Route path="/:id/manage-leaves" element={<WithNavbar><ManageLeaves /></WithNavbar>} />
                <Route path="/view-schedules" element={<WithNavbar><ViewSchedules /></WithNavbar>} />
                <Route path="/add-courses" element={<WithNavbar><AddCourse /></WithNavbar>} />
                <Route path="/edit-courses" element={<WithNavbar><EditCourse /></WithNavbar>} />

                {/* <Route path="/add-qualification" element={<WithNavbar><AddQualification /></WithNavbar>} /> */}
            </Routes>
        </Router>
    );
}

function WithNavbar({ children }) {
    return (
        <div style={{ display: "flex" }}>
            <Navbar />
            <div className="content-container">
                {children}
            </div>
        </div>
    );
}

export default App;


