import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Divider,
  Paper,
} from "@material-ui/core";
import "../css/AddCourse.css";

function AddCourse() {
  const [courseName, setCourseName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [numberOfStudents, setNumberOfStudents] = useState("");
  const [generatedSchedule, setGeneratedSchedule] = useState([]);
  const [publicHolidays, setPublicHolidays] = useState([]);

  useEffect(() => {
    fetchPublicHolidays();
  }, []);

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
        if (!isHoliday) {
          dayCount++;
          const dateString = currentDate.toLocaleDateString("en-US");
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
        currentDate.setDate(currentDate.getDate() + 1);
      }

      setGeneratedSchedule(schedule);
    } catch (error) {
      console.error("Error generating schedule:", error);
    }
  };

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

  const handleSave = async () => {
    try {
      const response = await axios.post("http://localhost:3001/courses/add", {
        courseName,
        startDate,
        endDate,
        numberOfStudents,
      });
      alert("Course saved successfully!");
    } catch (error) {
      console.error("Error saving the course:", error);
      alert("Failed to save the course.");
    }
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
            Generated Schedule
          </Typography>
          {generatedSchedule.map((item, index) => (
            <Paper
              key={index}
              elevation={3}
              style={{
                padding: "20px",
                marginBottom: "20px",
                display: "flex",
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              <Typography variant="h6" gutterBottom>
                Day {item.day}
              </Typography>
              <Typography variant="h6" gutterBottom>
                Date: {item.date}
              </Typography>
              <Typography variant="h6" gutterBottom>
                Weekday: {item.weekday}
              </Typography>
              <TextField
                label="Description"
                multiline
                value={item.description}
                onChange={(e) => {
                  const updatedSchedule = [...generatedSchedule];
                  updatedSchedule[index].description = e.target.value;
                  setGeneratedSchedule(updatedSchedule);
                }}
              />
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
