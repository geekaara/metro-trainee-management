import axios from "axios";

const API_URL = "http://localhost:3001/leaves";

export const getLeavesById = async (id) => {
    try {
      const response = await axios.post(`${API_URL}/fetchbyid`,{instructorId:id});
      return response.data;
    } catch (error) {
      console.error("Error getting instructor leaves:", error);
      throw error;
    }
  };