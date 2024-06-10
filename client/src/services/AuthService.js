import { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:3001/users";

const useAuth = () => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("currentUser")) || null
  );

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

  const logout = async () => {
    try {
      setCurrentUser(null);
      localStorage.removeItem("currentUser");
    } catch (error) {
      console.error("Error logging out:", error);
      throw error;
    }
  };

  return { currentUser, login, logout };
};

export default useAuth;


// {
//     "success": true,
//     "user": {
//       "id": 123,
//       "username": "example_user",
//       "email": "user@example.com",
//       "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
//     }
//   }
  

// {
//     "success": false,
//     "message": "Invalid credentials"
//   }
  