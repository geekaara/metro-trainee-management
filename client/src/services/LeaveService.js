import axios from "axios";

const API_URL = "http://localhost:3001/instructor";

export const getLeavesById = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/fetch/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error getting instructor leaves:", error);
      throw error;
    }
  };