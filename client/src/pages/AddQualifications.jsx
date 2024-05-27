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

export default function AddQualifications() {
    const navigate = useNavigate();
    const [qualifications, setQualifications] = useState({
        'Phase 1': false,
        'Phase 2': false,
        'Phase 3': false,
        'Phase 4': false,
        'Phase 5': false,
        'Phase 6': false,
        'Other': false
    });
    const [customQualifications, setCustomQualifications] = useState(['']);

    const handleQualificationChange = (event) => {
        const { name, checked } = event.target;
        setQualifications(prevState => ({
            ...prevState,
            [name]: checked
        }));

        if (name === 'Other' && !checked) {
            setCustomQualifications(['']);
        }
    };

    const handleCustomQualificationChange = (index, event) => {
        const newCustomQualifications = [...customQualifications];
        newCustomQualifications[index] = event.target.value;
        setCustomQualifications(newCustomQualifications);
    };

    const addCustomQualification = () => {
        setCustomQualifications([...customQualifications, '']);
    };

    const removeCustomQualification = (index) => {
        const newCustomQualifications = [...customQualifications];
        newCustomQualifications.splice(index, 1);
        setCustomQualifications(newCustomQualifications);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const selectedQualifications = Object.keys(qualifications).filter(key => qualifications[key]);
        const validCustomQualifications = customQualifications.filter(q => q.trim() !== '');
        const finalQualifications = [...selectedQualifications, ...validCustomQualifications];
        console.log(finalQualifications);
        // Handle form submission with finalQualifications
        navigate('/availability');  // Navigate to the next step
    };

    const handleBack = () => {
        navigate('/add-instructors');
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
                <Box component="form" onSubmit={handleSubmit} noValidate>
                    <Grid container spacing={3}>
                        {Object.keys(qualifications).map((key) => (
                            <Grid item xs={12} key={key}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={qualifications[key]}
                                            onChange={handleQualificationChange}
                                            name={key}
                                            color="primary"
                                        />
                                    }
                                    label={key}
                                />
                            </Grid>
                        ))}
                        {qualifications['Other'] && (
                            <Grid item xs={12}>
                                <Typography variant="body1" gutterBottom>
                                    Enter Qualifications
                                </Typography>
                                {customQualifications.map((customQualification, index) => (
                                    <Box key={index} display="flex" alignItems="center" mb={2}>
                                        <TextField
                                            margin="normal"
                                            variant="outlined"
                                            fullWidth
                                            label={`Other Qualification ${index + 1}`}
                                            value={customQualification}
                                            onChange={(e) => handleCustomQualificationChange(index, e)}
                                        />
                                        <IconButton
                                            color="secondary"
                                            onClick={() => removeCustomQualification(index)}
                                            disabled={customQualifications.length === 1}
                                        >
                                            <RemoveIcon />
                                        </IconButton>
                                    </Box>
                                ))}
                                <Button
                                    variant="contained"
                                    color="primary"
                                    startIcon={<AddIcon />}
                                    onClick={addCustomQualification}
                                >
                                    Add Another Qualification
                                </Button>
                            </Grid>
                        )}
                        <Grid item xs={12}>
                            <Box display="flex" justifyContent="space-between">
                                <Button variant="contained" color="secondary" onClick={handleBack}>
                                    Back
                                </Button>
                                <Button type="submit" variant="contained" color="primary">
                                    Next
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Container>
    );
}


// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//     Grid,
//     Container,
//     Paper,
//     Box,
//     Typography,
//     Button,
//     FormControlLabel,
//     Checkbox
// } from '@mui/material';
// import "../css/AddQualifications.css";
//
// export default function AddQualifications() {
//     const navigate = useNavigate();
//
//     const handleSubmit = (event) => {
//         event.preventDefault();
//         // Handle form submission
//         navigate('/availability');  // Navigate to the next step
//     };
//
//     const handleBack = () => {
//         navigate('/add-instructors');
//     };
//
//     return (
//         <Container maxWidth="md">
//             <Paper elevation={3} sx={{ padding: 3, marginTop: 3 }}>
//                 <Typography variant="h4" gutterBottom>
//                     Qualifications
//                 </Typography>
//                 <Typography variant="body1" gutterBottom>
//                     Please complete the following form.
//                 </Typography>
//                 <Box component="form" onSubmit={handleSubmit} noValidate>
//                     <Grid container spacing={3}>
//                         {['Phase 1', 'Phase 2', 'Phase 3', 'Phase 4', 'Phase 5', 'Phase 6'].map((phase, index) => (
//                             <Grid container item xs={12} key={index}>
//                                 <Grid item xs={6}>
//                                     <Typography variant="body1">{phase}</Typography>
//                                 </Grid>
//                                 <Grid item xs={6}>
//                                     <FormControlLabel
//                                         control={<Checkbox name={phase} color="primary" />}
//                                         label="Status"
//                                     />
//                                 </Grid>
//                             </Grid>
//                         ))}
//                         <Grid item xs={12}>
//                             <Box display="flex" justifyContent="space-between">
//                                 <Button variant="contained" color="secondary" onClick={handleBack}>
//                                     Back
//                                 </Button>
//                                 <Button type="submit" variant="contained" color="primary">
//                                     Next
//                                 </Button>
//                             </Box>
//                         </Grid>
//                     </Grid>
//                 </Box>
//             </Paper>
//         </Container>
//     );
// }


// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//     Grid,
//     CssBaseline,
//     Box,
//     Paper,
//     Typography,
//     Button,
//     FormControlLabel,
//     Checkbox
// } from '@mui/material';
// import "../css/AddQualifications.css";
//
// export default function AddQualifications() {
//     const navigate = useNavigate();
//
//     const handleSubmit = (event) => {
//         event.preventDefault();
//         // Handle form submission
//         navigate('/availability');
//     };
//
//     return (
//         <Grid container component="main" className="main-grid">
//             <CssBaseline />
//             <Grid item xs={12} component={Paper} elevation={6} square>
//                 <Box className="paper-grid" sx={{ padding: 4 }}>
//                     <Typography component="h1" variant="h5" style={{ fontWeight: 'bold' }}>
//                         Qualifications
//                     </Typography>
//                     <Typography variant="body1" gutterBottom>
//                         Please complete the following form.
//                     </Typography>
//                     <form noValidate onSubmit={handleSubmit}>
//                         <Grid container spacing={2}>
//                             {['Phase 1', 'Phase 2', 'Phase 3', 'Phase 4', 'Phase 5', 'Phase 6'].map((phase, index) => (
//                                 <Grid item xs={12} key={index}>
//                                     <Grid container spacing={2}>
//                                         <Grid item xs={6}>
//                                             <Typography variant="body1">{phase}</Typography>
//                                         </Grid>
//                                         <Grid item xs={6}>
//                                             <FormControlLabel
//                                                 control={<Checkbox name={phase} color="primary" />}
//                                                 label="Status"
//                                             />
//                                         </Grid>
//                                     </Grid>
//                                 </Grid>
//                             ))}
//                         </Grid>
//                         <Box display="flex" justifyContent="flex-end" sx={{ mt: 3 }}>
//                             <Button type="submit" variant="contained" color="primary">
//                                 Next
//                             </Button>
//                         </Box>
//                     </form>
//                 </Box>
//             </Grid>
//         </Grid>
//     );
// }
