import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Grid,
    Container,
    Paper,
    Box,
    Typography,
    FormControlLabel,
    Checkbox
} from '@mui/material';
import { getQualification } from '../services/QualificationService';

export default function AddQualifications({ fetchedInstructorDetails = { qualifications: [] }, saveQualificationDetails }) {
    
    const navigate = useNavigate();
    // State for qualifications
    const [qualifications, setQualifications] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch qualification data
                const qualificationData = await getQualification();
                const updatedQualifications = qualificationData.map(qualification => ({
                    ...qualification,
                    checked: fetchedInstructorDetails.qualifications.includes(qualification.id)
                }));
                setQualifications(updatedQualifications);
            } catch (error) {
                console.error("Error fetching qualification data:", error);
            }
        };
        fetchData();
        // Fetch qualifications when component mounts or fetchedInstructorDetails changes
    }, [fetchedInstructorDetails]);
    
 // Handle qualification checkbox change
    const handleQualificationChange = (event) => {
        const { name, checked } = event.target;
        const qualification = qualifications.find(q => q.id === parseInt(name));
        if (!qualification) return;

        qualification.checked = checked;
        setQualifications([...qualifications]);

        const selectedIds = qualifications.filter(q => q.checked).map(q => q.id);
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
                        {qualifications.map(qualification => (
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
