// instructorService.js
import axios from "axios";

//base API URL for qualifications
const API_URL = "http://localhost:3001/qualification"; 
// Function to add a new qualification
export const addQualification = async (qualifiation_name) => {
  try {
    // Send a POST request to the create endpoint with the qualification name
    const response = await axios.post(`${API_URL}/create`, {qualification_name:qualifiation_name});
    return response.data;
  } catch (error) {
    console.error("Error adding qualification:", error);
    throw error;
  }
};

// Function to fetch all qualifications
export const getQualification = async () => {
  try {
    // Send a GET request to the fetch endpoint
    const response = await axios.get(`${API_URL}/fetch`);
    return response.data;
  } catch (error) {
    console.error("Error getting qualification:", error);
    throw error;
  }
};
