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

function AddQualification() {
  const [qualificationName, setQualificationName] = useState("");
  const [qualifications, setQualifications] = useState([]);

  useEffect(() => {
    fetchQualifications();
  }, []);

  const fetchQualifications = async () => {
    try {
      const response = await axios.get("http://localhost:3001/qualification/all");
      setQualifications(response.data);
    } catch (error) {
      console.error("Error fetching qualifications:", error);
    }
  };

  const handleSave = async () => {
    try {
      const response = await axios.post("http://localhost:3001/qualification/add", {
        qualificationName: qualificationName
      });
      console.log("Qualification saved successfully:", response.data);
      setQualificationName("");
      fetchQualifications();
    } catch (error) {
      console.error("Error saving qualification:", error);
      alert("Error saving qualification. Please try again.");
    }
  };

  const handleEdit = async (qualificationId, newName) => {
    try {
      await axios.put(`http://localhost:3001/qualification/update/${qualificationId}`, {
        qualificationName: newName
      });
      console.log("Qualification updated successfully:", qualificationId);
      fetchQualifications();
    } catch (error) {
      console.error("Error updating qualification:", error);
      alert("Error updating qualification. Please try again.");
    }
  };

  const handleDelete = async (qualificationId) => {
    try {
      await axios.delete(`http://localhost:3001/qualification/delete/${qualificationId}`);
      console.log("Qualification deleted successfully:", qualificationId);
      fetchQualifications();
    } catch (error) {
      console.error("Error deleting qualification:", error);
      alert("Error deleting qualification. Please try again.");
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
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {qualifications.map((qualification) => (
              <TableRow key={qualification.id}>
                <TableCell>{qualification.name}</TableCell>
                <TableCell align="right">
                  <Button onClick={() => handleEdit(qualification.id, "New Qualification Name")}>Edit</Button>
                  <Button onClick={() => handleDelete(qualification.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default AddQualification;
