// instructorService.js
import axios from "axios";

const API_URL = "http://localhost:3001/instructor"; // Your API URL

export const addInstructor = async (instructorData) => {
  try {
    const response = await axios.post(`${API_URL}/create`, 
    {
        empId: instructorData.employeeID,
        title: instructorData.title,
        first_name: instructorData.firstName,
        last_name: instructorData.lastName,
        other_name: instructorData.formalName,
        gender: instructorData.gender,
        contact_no: instructorData.contactNo,
        email: instructorData.email,
        qualifications: instructorData.qualifications,
        availability: instructorData.availability,
        start_date: instructorData.startDate,
        end_date: instructorData.endDate
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      throw new Error(error.response.data.error);
    } else {
      console.error("Error adding instructor:", error);
      throw error;
    }
  }
};


export const updateInstructor = async (instructorData) => {
  try {
    const response = await axios.put(`${API_URL}/update`, 
    {
        empId: instructorData.employeeID,
        title: instructorData.title,
        first_name: instructorData.firstName,
        last_name: instructorData.lastName,
        other_name: instructorData.formalName,
        gender: instructorData.gender,
        contact_no: instructorData.contactNo,
        email: instructorData.email,
        qualifications: instructorData.qualifications,
        availability: instructorData.availability,
        start_date: instructorData.startDate,
        end_date: instructorData.endDate,
        id:instructorData.id
    });
    return response.data;
  } catch (error) {
    console.error("Error updating instructor:", error);
    throw error;
  }
};

export const deleteInstructor = async (instructorId) => {
  try {
    const response = await axios.delete(`${API_URL}/delete}`,{id:instructorId});
    return response.data;
  } catch (error) {
    console.error("Error deleting instructor:", error);
    throw error;
  }
};

export const getInstructors = async () => {
  try {
    const response = await axios.get(`${API_URL}/fetch`);
    return response.data;
  } catch (error) {
    console.error("Error getting instructors:", error);
    throw error;
  }
};

export const getInstructorById = async (id) => {
    try {
      const response = await axios.post(`${API_URL}/fetchbyid`,{id:id});
     
      return response.data[0];
    } catch (error) {
      console.error("Error getting instructors:", error);
      throw error;
    }
};

export const checkEmpIdExists = async (empId) => {
  try {
    const response = await axios.get(`${API_URL}/check-empId`, { params: { empId } });
    return response.data.exists;
  } catch (error) {
    console.error("Error checking Employee ID:", error);
    throw error;
  }
};

export const checkEmailExists = async (email) => {
  try {
    const response = await axios.get(`${API_URL}/check-email`, { params: { email } });
    return response.data.exists;
  } catch (error) {
    console.error("Error checking Email:", error);
    throw error;
  }
};

