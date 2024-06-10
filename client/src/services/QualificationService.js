// instructorService.js
import axios from "axios";

const API_URL = "http://localhost:3001/qualification"; 

export const addQualification = async (qualifiation_name) => {
  try {
    const response = await axios.post(`${API_URL}/create`, {qualification_name:qualifiation_name});
    return response.data;
  } catch (error) {
    console.error("Error adding qualification:", error);
    throw error;
  }
};


export const getQualification = async () => {
  try {
    const response = await axios.get(`${API_URL}/fetch`);
    return response.data;
  } catch (error) {
    console.error("Error getting qualification:", error);
    throw error;
  }
};
