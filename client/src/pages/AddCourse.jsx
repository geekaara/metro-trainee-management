import "../css/AddCourse.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Divider,
  Paper,
} from "@mui/material";

function AddCourse() {
  const [courseName, setCourseName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [numberOfStudents, setNumberOfStudents] = useState("");
  const [generatedSchedule, setGeneratedSchedule] = useState([]);
  const [publicHolidays, setPublicHolidays] = useState([]);

  useEffect(() => {
    // Fetch public holidays for Victoria when the component mounts
    fetchPublicHolidays();
  }, []);

  // Function to fetch public holidays
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
      console.log(holidays);
      return holidays;
    } catch (error) {
      console.error("Error fetching public holidays:", error);
      return [];
    }
  };

  const handleGenerateSchedule = async () => {
    // Resetting the generated schedule before regenerating
    setGeneratedSchedule([]);

    // Parse start and end dates into Date objects
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);

    try {
      // Fetch public holidays for the specified year
      const holidays = await fetchPublicHolidays(
        startDateObj.getFullYear() + "-01-01",
        endDateObj.getFullYear() + "-12-31"
      );
      console.log(holidays);
      // Logic to generate schedule based on start and end dates
      const schedule = [];
      let currentDate = new Date(startDateObj);
      let endDateFormatted = new Date(endDateObj);
      let dayCount = 0; // Initialize day count

      // Loop through each day between start and end dates
      while (currentDate <= endDateFormatted) {
        const isHoliday = isPublicHoliday(currentDate, publicHolidays);
        // Check if the current day is not Saturday, Sunday, or a public holiday
        if (!isHoliday) {
          dayCount++;
          const dateString = currentDate.toLocaleDateString("en-US"); // Format date consistently
          schedule.push({
            day: dayCount,
            date: dateString,
            weekday: new Date(currentDate).toLocaleDateString("en-US", {
              weekday: "long",
            }),
            description: "",
            isHoliday: false,
          });
        } else {
          schedule.push({
            day: "",
            date: new Date(currentDate).toLocaleDateString("en-US"),
            weekday: new Date(currentDate).toLocaleDateString("en-US", {
              weekday: "long",
            }),
            description: isHoliday,
            isHoliday: true,
          });
        }
        // Move to the next day
        currentDate.setDate(currentDate.getDate() + 1);
      }

      setGeneratedSchedule(schedule);
    } catch (error) {
      console.error("Error generating schedule:", error);
    }
  };

  // Function to check if a given date is a public holiday
  const isPublicHoliday = (date, publicHolidays) => {
    if (date.getDay() === 0) {
      return "Day off";
    } else if (date.getDay() === 6) {
      return "Day off";
    }

    // Format the date as 'yyyy-MM-dd' to match the holiday date format
    const formattedDate = date.toISOString().slice(0, 10);

    // Check if publicHolidays is defined and not empty
    if (publicHolidays && publicHolidays.length > 0) {
      // Loop through each holiday
      for (const holiday of publicHolidays) {
        // Compare the holiday date with the formatted date
        if (holiday.date === formattedDate) {
          console.log(" Public holiday", date);
          return "Public holiday"; // The given date is a public holiday
        }
      }
    }
    console.log("Not Public holiday", date);
    return false; // The given date is not a public holiday
  };

  const handleSave = () => {
    // Logic to save the generated schedule
    console.log("Saved schedule:", generatedSchedule);
  };

  return (
    <div className="container">
      <h1>Add New Course Details</h1>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Course Name"
            fullWidth
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
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
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Number of Students"
            type="number"
            fullWidth
            value={numberOfStudents}
            onChange={(e) => setNumberOfStudents(e.target.value)}
          />
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

      {generatedSchedule.length > 0 && (
        <>
          <Divider />
          <Typography variant="h6" style={{ margin: "20px 0" }}>
            <h1>Generated Schedule</h1>
          </Typography>
          {generatedSchedule.map((item, index) => (
  <Paper key={index} elevation={3} style={{ padding: "20px", marginBottom: "20px", height: "150px", display: "flex", flexDirection: "row", justifyContent: "space-around" , width:"950px",}}>
    <Typography variant="h6" gutterBottom>
      <span>Day {item.day}</span> 
      </Typography>
      <Typography variant="h6"gutterBottom>
      <span>Date: {item.date}</span> 
      </Typography>
      <Typography variant="h6" gutterBottom>
       <span>Weekday: {item.weekday}</span>
    </Typography>
    <Typography variant="h6" gutterBottom>
    <TextField
      label="Description"
      
      multiline
      
      value={item.description}
      onChange={(e) => {
        const updatedSchedule = [...generatedSchedule];
        updatedSchedule[index].description = e.target.value;
        setGeneratedSchedule(updatedSchedule);
      }}
      // disabled={item.isHoliday}
    />
    </Typography>
  </Paper>
))}

          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            style={{ marginTop: "20px" }}
          >
            Save
          </Button>
        </>
      )}
    </div>
  );
}

export default AddCourse;
