import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import Dashboard from "./pages/Dashboard";
import AddInstructor from "./pages/AddInstructor";
import ViewInstructor from "./pages/ViewInstructor";
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
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/dashboard" element={<WithNavbar><Dashboard /></WithNavbar>} />
                <Route path="/add-instructors" element={<WithNavbar><AddInstructor /></WithNavbar>} />
                <Route path="/qualifications" element={<WithNavbar><AddQualifications /></WithNavbar>} />
                <Route path="/availability" element={<WithNavbar><AddInstructorAvailability /></WithNavbar>} />
                <Route path="/view-instructors" element={<WithNavbar><ViewInstructor /></WithNavbar>} />
                <Route path="/manage-leaves" element={<WithNavbar><ManageLeaves /></WithNavbar>} />
                <Route path="/view-schedules" element={<WithNavbar><ViewSchedules /></WithNavbar>} />
                <Route path="/add-courses" element={<WithNavbar><AddCourse /></WithNavbar>} />
                <Route path="/edit-courses" element={<WithNavbar><EditCourse /></WithNavbar>} />
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




// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./components/NavBar";
// import Dashboard from "./pages/Dashboard";
// import AddInstructor from "./pages/AddInstructor";
// import ViewInstructor from "./pages/ViewInstructor";
// import ManageLeaves from "./pages/ManageLeaves";
// import ViewSchedules from "./pages/ViewSchedules";
// import AddCourse from "./pages/AddCourse";
// import EditCourse from "./pages/EditCourse";
// import LoginPage from "./pages/LoginPage";
// import SignupPage from "./pages/SignupPage"; 
// import AddQualifications from "./pages/AddQualifications";
// import AddInstructorAvailability from "./pages/AddInstructorAvailability";


// import './css/style.css';

// function App() {
//     return (
//         <Router>
//             <Routes>
//                 <Route path="/" element={<LoginPage />} />
//                 <Route path="/signup" element={<SignupPage />} />
//                 <Route path="/dashboard" element={<WithNavbar><Dashboard /></WithNavbar>} />
//                 <Route path="/add-instructors" element={<WithNavbar><AddInstructor /></WithNavbar>} />
//                 <Route path="/qualifications" element={<WithNavbar><AddQualifications /></WithNavbar>} />
//                 <Route path="/availability" element={<WithNavbar><AddInstructorAvailability /></WithNavbar>} />
//                 <Route path="/view-instructors" element={<WithNavbar><ViewInstructor /></WithNavbar>} />
//                 <Route path="/manage-leaves" element={<WithNavbar><ManageLeaves /></WithNavbar>} />
//                 <Route path="/view-schedules" element={<WithNavbar><ViewSchedules /></WithNavbar>} />
//                 <Route path="/add-courses" element={<WithNavbar><AddCourse /></WithNavbar>} />
//                 <Route path="/edit-courses" element={<WithNavbar><EditCourse /></WithNavbar>} />
//             </Routes>
//         </Router>
//     );
// }

// function WithNavbar({ children }) {
//     return (
//         <div style={{ display: "flex" }}>
//             <Navbar />
//             <div className="content-container">
//                 {children}
//             </div>
//         </div>
//     );
// }

// export default App;

//
// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./components/NavBar";
// import Dashboard from "./pages/Dashboard";
// import AddInstructor from "./pages/AddInstructor";
// import ViewInstructor from "./pages/ViewInstructor";
// import ManageLeaves from "./pages/ManageLeaves";
// import ViewSchedules from "./pages/ViewSchedules";
// import AddCourse from "./pages/AddCourse";
// import ScheduleCourse from "./pages/ScheduleCourse"
//
// function App() {
//     return (
//         <Router>
//             <div style={{ display: "flex" }}>
//                 <Navbar />
//                 <div className="content-container">
//                     <Routes >
//                         <Route exact path="/" element={<Dashboard />} />
//                         <Route exact path="/add-instructors" element={<AddInstructor />} />
//                         <Route exact path="/view-instructors" element={<ViewInstructor />} />
//                         <Route exact path="/manage-leaves" element={<ManageLeaves />} />
//                         <Route exact path="/view-schedules" element={<ViewSchedules />} />
//                         <Route exact path="/add-courses" element={<AddCourse />} />
//                         <Route exact path="/schedule-courses" element={<ScheduleCourse />} />
//                     </Routes>
//                 </div>
//             </div>
//         </Router>
//     );
// }
//
// export default App;
