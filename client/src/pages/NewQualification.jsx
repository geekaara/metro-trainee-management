import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Paper,
  Container,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { getQualification,addQualification } from "../services/QualificationService";

function NewQualification() {
  const [qualificationName, setQualificationName] = useState("");
  const [qualifications, setQualifications] = useState([]);


  // Fetch qualifications when component mounts
  useEffect(() => {
    fetchQualifications();
  }, []);
// Function to fetch qualifications from the server
  const fetchQualifications = async () => {
    try {
      const qualificationData = await getQualification();
      console.log("Fetched qualifications:", qualificationData);
      setQualifications(qualificationData);
    } catch (error) {
      console.error("Error fetching qualifications:", error);
    }
  };
// Function to handle saving a new qualification
  const handleSave = async () => {
    try {
      const response =  await addQualification(qualificationName)
      console.log("Qualification saved successfully:", response);
      setQualificationName("");
      fetchQualifications();
    } catch (error) {
      console.error("Error saving qualification:", error);
      alert("Error saving qualification. Please try again.");
    }
  };

  

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ padding: 3, marginTop: 3, width: 1025 }}>
        <Typography variant="h4" gutterBottom>
          Add New Qualification
        </Typography>
        <Box component="form" noValidate>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Qualification Name"
                fullWidth
                value={qualificationName}
                onChange={(e) => setQualificationName(e.target.value)}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSave}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>

      <TableContainer component={Paper} sx={{ marginTop: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Qualification Name</TableCell>
             
            </TableRow>
          </TableHead>
          <TableBody>
          {qualifications && qualifications.length > 0 ? (
              qualifications.map((qualification) => (
                <TableRow key={qualification.id}>
                  <TableCell>{qualification.qualification_name}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={1}>No data found.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default NewQualification;
