import React ,{useState,useEffect}from "react";
import { BrowserRouter as Router, Routes, Route,Outlet,Navigate } from "react-router-dom";
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

import AddInstructorAvailability from "./pages/AddInstructorAvailability";
import { ToastContainer } from "react-toastify";

import './css/style.css';
import EditInstructor from "./pages/EditInstructor";
import useAuth from "./services/AuthService";
import NewQualification from "./pages/NewQualification";




function App() {

    

    return (
        
        <Router>
             <ToastContainer />
             <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />

                <Route exact path="/" element={<PrivateRoute/>}>
                    <Route path="/dashboard" element={<WithNavbar><Dashboard /></WithNavbar>} />
                    <Route path="/add-instructors" element={<WithNavbar><AddInstructor /></WithNavbar>} />
                    <Route path="/add-qualification" element={<WithNavbar><NewQualification /></WithNavbar>} />
                    {/* <Route path="/availability" element={<WithNavbar><AddInstructorAvailability /></WithNavbar>} />  */}
                    <Route path="/view-instructors" element={<WithNavbar><ViewInstructors /></WithNavbar>} />
                    <Route path="/view-instructors/:id" element={<WithNavbar><EditInstructor /></WithNavbar>} />
                    <Route path="/:id/manage-leaves" element={<WithNavbar><ManageLeaves /></WithNavbar>} />
                    <Route path="/view-schedules" element={<WithNavbar><ViewSchedules /></WithNavbar>} />
                    <Route path="/add-courses" element={<WithNavbar><AddCourse /></WithNavbar>} />
                    <Route path="/edit-courses" element={<WithNavbar><EditCourse /></WithNavbar>} />
                </Route>
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

const PrivateRoute = () => {

    const { currentUser } = useAuth(); 
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        if (currentUser) {
            setAuthenticated(true);
        }
       
    }, [currentUser]);

    
    if (!currentUser) {
        return <Navigate to="/login" />;
    }
   
  
    return <Outlet/>;
}

export default App;


