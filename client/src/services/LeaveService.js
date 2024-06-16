import axios from "axios";
//base API URL for leaves
const API_URL = "http://localhost:3001/leaves";
// Function to fetch leaves by instructor ID
export const getLeavesById = async (id) => {
    try {
      // Send a POST request to the fetchbyid endpoint with the instructor ID
      const response = await axios.post(`${API_URL}/fetchbyid`,{instructorId:id});
      return response.data;
    } catch (error) {
      console.error("Error getting instructor leaves:", error);
      throw error;
    }
  };