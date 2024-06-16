import { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:3001/users";

const useAuth = () => {
  // Initialize the currentUser state with the value from localStorage
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const user = localStorage.getItem("currentUser");
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error("Error parsing currentUser from localStorage:", error);
      localStorage.removeItem("currentUser"); // Ensure invalid JSON is removed
      return null;
    }
  });
  // Function to handle login
  const login = async (credentials) => {
    try {
      const response = await axios.post(`${API_URL}/login`, credentials);
      localStorage.setItem("currentUser", JSON.stringify(response.data.user));
      setCurrentUser(response.data.user);
      return response;
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  };
// Function to handle logout
  const logout = async () => {
    try {
      setCurrentUser(null);
      localStorage.removeItem("currentUser");
    } catch (error) {
      console.error("Error logging out:", error);
      throw error;
    }
  };
 // Return the currentUser state and authentication functions
  return { currentUser, login, logout };
};

export default useAuth;
