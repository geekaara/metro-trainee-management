import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Grid,
    Container,
    Paper,
    Box,
    Typography,
    Button,
    TextField,
    FormControlLabel,
    Checkbox,
    IconButton
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import "../css/AddQualifications.css";
import { useEffect } from 'react';
import { getQualification } from '../services/QualificationService';

export default function AddQualifications({saveQualificationDetails}) {
    // const navigate = useNavigate();
    const [qualifications, setQualifications] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const qualificationData = await getQualification();
            console.log(qualificationData)
            setQualifications(qualificationData);
          } catch (error) {
            console.error("Error fetching qualification data:", error);
          }
        };
    
        fetchData();
      }, []);

    

    const [selectedQualifications, setSelectedQualifications] = useState([]);

    const handleQualificationChange = (event) => {
        const { name, checked } = event.target;
    
        console.log(name);
        // Find the qualification by id
        const qualification = qualifications.find((qualification) => qualification.id === parseInt(name));
    
        if (!qualification) {
            return; // Qualification not found
        }
    
        // Update the checked state of the qualification
        qualification.checked = checked;
    
        // Update the state with the updated qualifications
        setQualifications([...qualifications]);
    
        // Filter the selected qualifications
        const selectedIds = qualifications.filter((qualification) => qualification.checked).map((qualification) => qualification.id);
    
        // Update the selectedQualifications state with the selected IDs
        setSelectedQualifications(selectedIds);
    
        // Pass the selected qualifications to the parent component
        saveQualificationDetails({ qualifications: selectedIds });
    };
    

    

    

    return (
        <Container maxWidth="md">
            <Paper elevation={3} sx={{ padding: 3, marginTop: 3 }}>
                <Typography variant="h4" gutterBottom>
                    Qualifications
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Please complete the following form.
                </Typography>
                <Box component="form" noValidate>
                    <Grid container spacing={3}>
                    {qualifications.map((qualification) => (
                            <Grid item xs={12} key={qualification.id}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                        
                                            checked={qualification.checked || false}
                                            onChange={handleQualificationChange}
                                            name={`${qualification.id}`}
                                            color="primary"
                                        />
                                    }
                                    label={qualification.qualification_name}
                                />
                            </Grid>
                        ))}
                       
                       
                    </Grid>
                </Box>
            </Paper>
        </Container>
    );
}


