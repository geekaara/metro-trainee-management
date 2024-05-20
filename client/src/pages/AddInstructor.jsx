import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Box,
    Typography,
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Grid,
    Paper
} from '@mui/material';
import "../css/AddInstructor.css";

function AddInstructor() {
    const navigate = useNavigate();
    const [instructorDetails, setInstructorDetails] = useState({
        title: '',
        firstName: '',
        lastName: '',
        formalName: '',
        gender: '',
        contactNo: '',
        preferredName: '',
        employeeID: '',
        email: '',
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setInstructorDetails(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(instructorDetails);
        // send this data to a server
        navigate('/qualifications');
    };

    return (
        <Container maxWidth="md">
            <Paper elevation={3} sx={{ padding: 3, marginTop: 3 }}>
                <Typography variant="h4" gutterBottom>
                    Basic Details
                </Typography>
                <form onSubmit={handleSubmit} noValidate>
                    <Box sx={{ mt: 2 }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={4}>
                                <FormControl fullWidth>
                                    <InputLabel id="title-label">Title</InputLabel>
                                    <Select
                                        labelId="title-label"
                                        id="title"
                                        name="title"
                                        value={instructorDetails.title}
                                        onChange={handleInputChange}
                                    >
                                        <MenuItem value="Mr">Mr</MenuItem>
                                        <MenuItem value="Mrs">Mrs</MenuItem>
                                        <MenuItem value="Ms">Ms</MenuItem>
                                        <MenuItem value="Dr">Dr</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    required
                                    name="firstName"
                                    label="First Name"
                                    value={instructorDetails.firstName}
                                    onChange={handleInputChange}
                                    fullWidth
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    name="lastName"
                                    label="Last Name"
                                    value={instructorDetails.lastName}
                                    onChange={handleInputChange}
                                    fullWidth
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="formalName"
                                    label="Formal Name"
                                    value={instructorDetails.formalName}
                                    onChange={handleInputChange}
                                    fullWidth
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <InputLabel id="gender-label">Gender</InputLabel>
                                    <Select
                                        labelId="gender-label"
                                        id="gender"
                                        name="gender"
                                        value={instructorDetails.gender}
                                        onChange={handleInputChange}
                                    >
                                        <MenuItem value="Male">Male</MenuItem>
                                        <MenuItem value="Female">Female</MenuItem>
                                        <MenuItem value="Other">Other</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    name="contactNo"
                                    label="Primary Contact No"
                                    value={instructorDetails.contactNo}
                                    onChange={handleInputChange}
                                    fullWidth
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    name="preferredName"
                                    label="Preferred Name"
                                    value={instructorDetails.preferredName}
                                    onChange={handleInputChange}
                                    fullWidth
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    name="employeeID"
                                    label="Employee ID"
                                    value={instructorDetails.employeeID}
                                    onChange={handleInputChange}
                                    fullWidth
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    name="email"
                                    label="Primary Email"
                                    value={instructorDetails.email}
                                    onChange={handleInputChange}
                                    fullWidth
                                    variant="outlined"
                                />
                            </Grid>
                        </Grid>
                        <Box display="flex" justifyContent="flex-end" sx={{ mt: 3 }}>
                            <Button type="submit" variant="contained" color="primary">
                                Next
                            </Button>
                        </Box>
                    </Box>
                </form>
            </Paper>
        </Container>
    );
}

export default AddInstructor;



// import React, { useState } from 'react';
// import {
//     Container,
//     Box,
//     Typography,
//     TextField,
//     Button,
//     FormControl,
//     InputLabel,
//     Select,
//     MenuItem,
//     Grid
// } from '@mui/material';
// import "../css/AddInstructor.css";
//
// function AddInstructor() {
//     const [instructorDetails, setInstructorDetails] = useState({
//         title: '',
//         firstName: '',
//         lastName: '',
//         otherName: '',
//         gender: '',
//         contactNo: '',
//         email: '',
//     });
//
//     const handleInputChange = (event) => {
//         const { name, value } = event.target;
//         setInstructorDetails(prevState => ({
//             ...prevState,
//             [name]: value,
//         }));
//     };
//
//     const handleSubmit = (event) => {
//         event.preventDefault();
//         console.log(instructorDetails);
//         // send this data to a server
//     };
//
//     return (
//         <Container maxWidth="sm" className="container">
//             <Typography variant="h6" gutterBottom className="typography-h6" component="h1">
//                 Basic Details
//             </Typography>
//             <form onSubmit={handleSubmit} noValidate>
//                 <Box sx={{ mt: 2 }}>
//                     <Grid container spacing={2}>
//                         <Grid item xs={12} sm={4} className="grid-item">
//                             <FormControl fullWidth className="formControl">
//                                 <InputLabel id="title-label">Title</InputLabel>
//                                 <Select
//                                     labelId="title-label"
//                                     id="title"
//                                     name="title"
//                                     value={instructorDetails.title}
//                                     onChange={handleInputChange}
//                                     className="selectInput"
//                                 >
//                                     <MenuItem value="Mr">Mr</MenuItem>
//                                     <MenuItem value="Mrs">Mrs</MenuItem>
//                                     <MenuItem value="Ms">Ms</MenuItem>
//                                     <MenuItem value="Dr">Dr</MenuItem>
//                                 </Select>
//                             </FormControl>
//                         </Grid>
//                         <Grid item xs={12} sm={4} className="grid-item">
//                             <TextField
//                                 required
//                                 name="firstName"
//                                 label="First Name"
//                                 value={instructorDetails.firstName}
//                                 onChange={handleInputChange}
//                                 variant="outlined"
//                                 className="input-field"
//                             />
//                         </Grid>
//                         <Grid item xs={12} sm={4} className="grid-item">
//                             <TextField
//                                 name="lastName"
//                                 label="Last Name"
//                                 value={instructorDetails.lastName}
//                                 onChange={handleInputChange}
//                                 variant="outlined"
//                                 className="input-field"
//                             />
//                         </Grid>
//                         <Grid item xs={12} className="grid-item">
//                             <TextField
//                                 name="formalName"
//                                 label="Formal Name"
//                                 value={instructorDetails.otherName}
//                                 onChange={handleInputChange}
//                                 fullWidth
//                                 variant="outlined"
//                                 className="input-field"
//                             />
//                         </Grid>
//                         <Grid item xs={12} sm={6} className="grid-item">
//                             <FormControl fullWidth className="formControl">
//                                 <InputLabel id="gender-label">Gender</InputLabel>
//                                 <Select
//                                     labelId="gender-label"
//                                     id="gender"
//                                     name="gender"
//                                     value={instructorDetails.gender}
//                                     onChange={handleInputChange}
//                                     variant="outlined"
//                                     className="selectInput"
//                                 >
//                                     <MenuItem value="Male">Male</MenuItem>
//                                     <MenuItem value="Female">Female</MenuItem>
//                                     <MenuItem value="Other">Other</MenuItem>
//                                 </Select>
//                             </FormControl>
//                         </Grid>
//                         <Grid item xs={12} sm={6} className="grid-item">
//                             <TextField
//                                 required
//                                 name="contactNo"
//                                 label="Primary Contact No"
//                                 value={instructorDetails.contactNo}
//                                 onChange={handleInputChange}
//                                 fullWidth
//                                 variant="outlined"
//                                 className="input-field"
//                             />
//                         </Grid>
//                         <Grid item xs={12} sm={6} className="grid-item">
//                             <TextField
//                                 required
//                                 name="preferredName"
//                                 label="Preferred Name"
//                                 value={instructorDetails.contactNo}
//                                 onChange={handleInputChange}
//                                 fullWidth
//                                 variant="outlined"
//                                 className="input-field"
//                             />
//                         </Grid>
//                         <Grid item xs={12} sm={6} className="grid-item">
//                             <TextField
//                                 required
//                                 name="employeeID"
//                                 label="Employee ID"
//                                 value={instructorDetails.contactNo}
//                                 onChange={handleInputChange}
//                                 fullWidth
//                                 variant="outlined"
//                                 className="input-field"
//                             />
//                         </Grid>
//                         <Grid item xs={12} className="grid-item">
//                             <TextField
//                                 required
//                                 name="email"
//                                 label="Primary Email"
//                                 value={instructorDetails.email}
//                                 onChange={handleInputChange}
//                                 fullWidth
//                                 variant="outlined"
//                                 className="input-field"
//                             />
//                         </Grid>
//                     </Grid>
//                     <Box display="flex" justifyContent="flex-end">
//                         <Button type="submit" variant="contained" color="primary" className="button-primary">
//                             Next
//                         </Button>
//                     </Box>
//                 </Box>
//             </form>
//         </Container>
//     );
// }
//
// export default AddInstructor;
