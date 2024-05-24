import React, { useState, useEffect } from "react";
import {
  Grid,
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import axios from "axios";

const ScheduleItem = ({ item, modules, instructors, onModuleChange, onInstructorChange, index, onDescriptionChange }) => {
  const [localInstructors, setLocalInstructors] = useState([]);
  const [selectedModule, setSelectedModule] = useState("");
  const [selectedInstructor, setSelectedInstructor] = useState("");

  useEffect(() => {
    setSelectedModule("");
    setSelectedInstructor("");
  }, [item]);

  const handleModuleChange = async (e) => {
    const moduleId = e.target.value;
    setSelectedModule(moduleId);
    onModuleChange(moduleId, item.date, index);
    await fetchInstructors(moduleId, item.date);
  };

  const handleInstructorChange = (e) => {
    const instructorId = e.target.value;
    setSelectedInstructor(instructorId);
    onInstructorChange(instructorId, item.date, index);
  };

  const fetchInstructors = async (moduleId, date) => {
    try {
      const formattedDate = date.split("/").reverse().join("-");
      const response = await axios.post("http://localhost:3001/courses/fetchinstructor", {
        moduleid: moduleId,
        date: formattedDate,
      });
      setLocalInstructors(response.data);
    } catch (error) {
      console.error("Error fetching instructors:", error);
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={6} sm={2}>
          <Typography variant="body1">{item.date}</Typography>
        </Grid>
        <Grid item xs={6} sm={2}>
          <Typography variant="body1">{item.weekday}</Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Module</InputLabel>
            <Select
              label="Module"
              value={selectedModule}
              onChange={handleModuleChange}
            >
              {modules.map((module) => (
                <MenuItem key={module.id} value={module.id}>
                  {module.module_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Instructor</InputLabel>
            <Select
              label="Instructor"
              value={selectedInstructor}
              onChange={handleInstructorChange}
            >
              {localInstructors.map((instructor) => (
                <MenuItem key={instructor.id} value={instructor.id}>
                  {`${instructor.title} ${instructor.first_name} ${instructor.last_name}`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6} sm={20} sx={{ textAlign: "right", marginLeft: "320px" }}>
          <TextField
            label="Description"
            multiline
            fullWidth
            value={item.description}
            onChange={(e) => onDescriptionChange(e.target.value, index)}
            variant="outlined"
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ScheduleItem;
