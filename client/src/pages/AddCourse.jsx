import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Divider,
  Paper,
  Container,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import "../css/AddCourse.css";
import ScheduleItem from "./ScheduleItem";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddCourse() {
  // State variables for course details
  const [courseName, setCourseName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [numberOfStudents, setNumberOfStudents] = useState("");
  const [classId, setClassId] = useState("");
  const [group, setGroup] = useState("");
  const [generatedSchedule, setGeneratedSchedule] = useState([]);
  const [publicHolidays, setPublicHolidays] = useState([]);
  const [modules, setModules] = useState([]);
  const [instructors, setInstructors] = useState([]);



// useEffect to fetch public holidays and modules on component mount
  useEffect(() => {
    fetchPublicHolidays();
    fetchModules();
  }, []);
// Function to fetch modules from the server
  const fetchModules = async () => {
    try {
      const response = await axios.get("http://localhost:3001/modules/fetch");
      setModules(response.data);
    } catch (error) {
      console.error("Error fetching modules:", error);
    }
  };
// Function to handle module change in schedule
  const handleModuleChange = (moduleId, date, index) => {
    const updatedSchedule = [...generatedSchedule];
    updatedSchedule[index].moduleId = moduleId;
    setGeneratedSchedule(updatedSchedule);
  };
// Function to handle instructor change in schedule
  const handleInstructorChange = (instructorId, date, index) => {
    const updatedSchedule = [...generatedSchedule];
    updatedSchedule[index].instructorId = instructorId;
    setGeneratedSchedule(updatedSchedule);
  };
// Function to handle description change in schedule
  const handleDescriptionChange = (description, index) => {
    const updatedSchedule = [...generatedSchedule];
    updatedSchedule[index].description = description;
    setGeneratedSchedule(updatedSchedule);
  };
  

// Function to fetch public holidays from API
  const fetchPublicHolidays = async (fromDate, toDate) => {
    try {
      const response = await axios.get(
        `https://wovg-community.gateway.prod.api.vic.gov.au/vicgov/v2.0/dates?type=PUBLIC_HOLIDAY&from_date=${fromDate}&to_date=${toDate}&format=json`,
        {
          headers: {
            Accept: "application/json",
            apikey: "fa96f42f-e41c-4193-862e-0dbba2aa43ac",
          },
        }
      );
      const holidays = response.data.dates;
      setPublicHolidays(holidays);
      return holidays;
    } catch (error) {
      console.error("Error fetching public holidays:", error);
      return [];
    }
  };
// Function to generate course schedule
  const handleGenerateSchedule = async () => {
    setGeneratedSchedule([]);
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);

    try {
      const holidays = await fetchPublicHolidays(
        startDateObj.getFullYear() + "-01-01",
        endDateObj.getFullYear() + "-12-31"
      );
      const schedule = [];
      let currentDate = new Date(startDateObj);
      let endDateFormatted = new Date(endDateObj);
      let dayCount = 0;

      while (currentDate <= endDateFormatted) {
        const isHoliday = isPublicHoliday(currentDate, holidays);
        const isWeekend = currentDate.getDay() === 0 || currentDate.getDay() === 6;
        
        if (!isHoliday) {
          dayCount++;
          const dateString = currentDate.toLocaleDateString("en-AU");
          schedule.push({
            day: dayCount,
            date: dateString,
            weekday: new Date(currentDate).toLocaleDateString("en-AU", { weekday: "long" }),
            type: isWeekend ? "Weekend" : "Weekday",
            description: "",
            isHoliday: false,
          });
        } else {
          schedule.push({
            day: "",
            date: new Date(currentDate).toLocaleDateString("en-AU"),
            weekday: new Date(currentDate).toLocaleDateString("en-AU", { weekday: "long" }),
            type: isWeekend ? "Weekend" : "Weekday",
            description: isHoliday,
            isHoliday: true,
          });
        }
        currentDate.setDate(currentDate.getDate() + 1);
      }

      setGeneratedSchedule(schedule);
    } catch (error) {
      console.error("Error generating schedule:", error);
    }
  };
// Function to check if a date is a public holiday
  const isPublicHoliday = (date, publicHolidays) => {
    if (date.getDay() === 0 || date.getDay() === 6) {
      return "Day off";
    }
    const formattedDate = date.toISOString().slice(0, 10);

    if (publicHolidays && publicHolidays.length > 0) {
      for (const holiday of publicHolidays) {
        if (holiday.date === formattedDate) {
          return "Public holiday";
        }
      }
    }
    return false;
  };
// Function to save the course details
  const handleSave = async () => {
    try {
      const payload = {
        courseName,
        startDate,
        endDate,
        groupName: group,
        numberOfStudents,
        schedule: generatedSchedule
          .filter(item => item.instructorId) // Filter out items with no instructor selected
          .map((item) => ({
            date: item.date.split("/").reverse().join("-"),
            moduleId: item.moduleId || 1,
            instructorId: item.instructorId || 1,
          })),
      };
  
      const response = await axios.post("http://localhost:3001/courses/add", payload);
      alert("Course saved successfully!");

    } catch (error) {
      console.error("Error saving the course:", error);
      alert("Error saving the course!");
    }
  };
  
  

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ padding: 3, marginTop: 3, width:1025 }}>
        <Typography variant="h4" gutterBottom>
          Add New Course Details
        </Typography>
        <Box component="form" noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Course Name"
                fullWidth
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                variant="outlined"
              />
            </Grid>
            
            <Grid item xs={6}>
              <TextField
                label="Start Date"
                type="date"
                fullWidth
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="End Date"
                type="date"
                fullWidth
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Number of Students"
                type="number"
                fullWidth
                value={numberOfStudents}
                onChange={(e) => setNumberOfStudents(e.target.value)}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="group-label">Group</InputLabel>
                <Select
                  labelId="group-label"
                  value={group}
                  onChange={(e) => setGroup(e.target.value)}
                  label="Group"
                >
                  <MenuItem value="North" >NORTH</MenuItem>
                  <MenuItem value="South">SOUTH</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleGenerateSchedule}
              >
                Generate Schedule
              </Button>
            </Grid>
          </Grid>
        </Box>

        {generatedSchedule.length > 0 && (
          <>
            <Divider sx={{ margin: "20px 0" }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <Typography variant="h6" ml={4} >Date</Typography>
              <Typography variant="h6" ml={-35} >Day</Typography>
              <Typography variant="h6" mr={35}>Details</Typography>
            </Box>
            <Box sx={{ marginTop: 2, marginBottom: 2 }}>
  {generatedSchedule.map((item, index) => (
     <ScheduleItem
     key={index}
     item={item}
     modules={modules}
     instructors={instructors}
     onModuleChange={handleModuleChange}
     onInstructorChange={handleInstructorChange}
     index={index}
     onDescriptionChange={handleDescriptionChange}
   />
  ))}
</Box>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSave}
              sx={{ marginTop: "20px" }}
            >
              Save
            </Button>
          </>
        )}
      </Paper>
    </Container>
  );
}

export default AddCourse;
