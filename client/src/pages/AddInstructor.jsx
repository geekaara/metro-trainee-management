import React, { useState } from 'react';
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
import {useNavigate} from "react-router-dom";

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
    const [group, setGroup] = useState("");
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
                            <FormControl fullWidth variant="outlined">
                                <InputLabel id="group-label">Title</InputLabel>
                                <Select
                                labelId="group-label"
                                value={group}
                                onChange={(e) => setGroup(e.target.value)}
                                label="Group"
                                >
                                <MenuItem value="North" >Mr</MenuItem>
                                <MenuItem value="South">Mrs</MenuItem>
                                <MenuItem value="South">Ms</MenuItem>
                                <MenuItem value="South">Dr</MenuItem>
                                </Select>
                            </FormControl>

                                {/* <FormControl fullWidth variant="outlined">
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
                                </FormControl> */}
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

                            <FormControl fullWidth variant="outlined">
                                <InputLabel id="group-label">Gender</InputLabel>
                                <Select
                                labelId="group-label"
                                value={group}
                                onChange={(e) => setGroup(e.target.value)}
                                label="Group"
                                >
                                <MenuItem value="Male">Male</MenuItem>
                                <MenuItem value="Female">Female</MenuItem>
                                <MenuItem value="Other">Other</MenuItem>
                                
                                </Select>
                            </FormControl>

                                {/* <FormControl fullWidth>
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
                                </FormControl> */}
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





// import React, { useState } from 'react';
// import { Container, Box, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
// import "../css/AddInstructor.css"
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
//         console.log(instructorDetails);  // Output to console for now
//         // In a real scenario, you would send this data to a server here
//     };
//
//     return (
//         <Container component="main" maxWidth="md" className="container-main">
//             <Typography variant="h6" gutterBottom className="title">
//                 Add New Instructor
//             </Typography>
//             <form onSubmit={handleSubmit} noValidate>
//                 <Box className="flex-box">
//                     <FormControl fullWidth className="form-control">
//                         <InputLabel id="title-label">Title</InputLabel>
//                         <Select
//                             labelId="title-label"
//                             id="title"
//                             name="title"
//                             value={instructorDetails.title}
//                             onChange={handleInputChange}
//                             variant="outlined"
//                         >
//                             <MenuItem value="Mr">Mr</MenuItem>
//                             <MenuItem value="Mrs">Mrs</MenuItem>
//                             <MenuItem value="Ms">Ms</MenuItem>
//                             <MenuItem value="Dr">Dr</MenuItem>
//                         </Select>
//                     </FormControl>
//                     <TextField
//                         required
//                         name="firstName"
//                         label="First Name"
//                         value={instructorDetails.firstName}
//                         onChange={handleInputChange}
//                         variant="outlined"
//                         className="input-field"
//                     />
//                     <TextField
//                         required
//                         name="lastName"
//                         label="Last Name"
//                         value={instructorDetails.lastName}
//                         onChange={handleInputChange}
//                         variant="outlined"
//                         className="input-field"
//                     />
//                 </Box>
//                 <Box className="flex-box">
//                     <TextField
//                         name="otherName"
//                         label="Other Name"
//                         value={instructorDetails.otherName}
//                         onChange={handleInputChange}
//                         fullWidth
//                         variant="outlined"
//                         className="select-field"
//                     />
//                     <FormControl fullWidth>
//                         <InputLabel id="gender-label">Gender</InputLabel>
//                         <Select
//                         labelId="gender-label"
//                         id="gender"
//                         name="gender"
//                         value={instructorDetails.gender}
//                         onChange={handleInputChange}
//                         variant="outlined"
//                     >
//                         <MenuItem value="Male">Male</MenuItem>
//                         <MenuItem value="Female">Female</MenuItem>
//                         <MenuItem value="Other">Other</MenuItem>
//                     </Select>
//                 </FormControl>
//             </Box>
//             <Box className="flex-box">
//                 <TextField
//                     required
//                     name="contactNo"
//                     label="Primary Contact No"
//                     value={instructorDetails.contactNo}
//                     onChange={handleInputChange}
//                     fullWidth
//                     variant="outlined"
//                     className="select-field"
//                 />
//                 <TextField
//                     required
//                     name="email"
//                     label="Primary Email"
//                     value={instructorDetails.email}
//                     onChange={handleInputChange}
//                     fullWidth
//                     variant="outlined"
//                 />
//             </Box>
//             <Box display="flex" justifyContent="flex-end">
//                 <Button type="submit" variant="contained" color="primary" className="submit-button">
//                     Next
//                 </Button>
//             </Box>
//         </form>
// </Container>
// );
// }
//
// export default AddInstructor;



// import React, { useState } from 'react';
// import { Container, Box, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
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
//         console.log(instructorDetails);  // Output to console for now
//         // In a real scenario, you would send this data to a server here
//     };
//
//     return (
//         <Container component="main" maxWidth="md">
//             <Typography variant="h6" gutterBottom>
//                 Add New Instructor
//             </Typography>
//             <form onSubmit={handleSubmit} noValidate>
//                 <Box display="flex" justifyContent="space-between" mb={2}>
//                     <FormControl fullWidth style={{ marginRight: 16 }}>
//                         <InputLabel id="title-label">Title</InputLabel>
//                         <Select
//                             labelId="title-label"
//                             id="title"
//                             name="title"
//                             value={instructorDetails.title}
//                             onChange={handleInputChange}
//                         >
//                             <MenuItem value="Mr">Mr</MenuItem>
//                             <MenuItem value="Mrs">Mrs</MenuItem>
//                             <MenuItem value="Ms">Ms</MenuItem>
//                             <MenuItem value="Dr">Dr</MenuItem>
//                         </Select>
//                     </FormControl>
//                     <TextField
//                         required
//                         name="firstName"
//                         label="First Name"
//                         value={instructorDetails.firstName}
//                         onChange={handleInputChange}
//                         style={{ flex: 1, marginLeft: 8 }}
//                     />
//                     <TextField
//                         required
//                         name="lastName"
//                         label="Last Name"
//                         value={instructorDetails.lastName}
//                         onChange={handleInputChange}
//                         style={{ flex: 1, marginLeft: 8 }}
//                     />
//                 </Box>
//                 <Box display="flex" justifyContent="space-between" mb={2}>
//                     <TextField
//                         name="otherName"
//                         label="Other Name"
//                         value={instructorDetails.otherName}
//                         onChange={handleInputChange}
//                         fullWidth
//                         style={{ marginRight: 16 }}
//                     />
//                     <FormControl fullWidth>
//                         <InputLabel id="gender-label">Gender</InputLabel>
//                         <Select
//                             labelId="gender-label"
//                             id="gender"
//                             name="gender"
//                             value={instructorDetails.gender}
//                             onChange={handleInputChange}
//                         >
//                             <MenuItem value="Male">Male</MenuItem>
//                             <MenuItem value="Female">Female</MenuItem>
//                             <MenuItem value="Other">Other</MenuItem>
//                         </Select>
//                     </FormControl>
//                 </Box>
//                 <Box display="flex" justifyContent="space-between" mb={2}>
//                     <TextField
//                         required
//                         name="contactNo"
//                         label="Primary Contact No"
//                         value={instructorDetails.contactNo}
//                         onChange={handleInputChange}
//                         fullWidth
//                         style={{ marginRight: 16 }}
//                     />
//                     <TextField
//                         required
//                         name="email"
//                         label="Primary Email"
//                         value={instructorDetails.email}
//                         onChange={handleInputChange}
//                         fullWidth
//                     />
//                 </Box>
//                 <Box display="flex" justifyContent="flex-end">
//                     <Button type="submit" variant="contained" color="primary">
//                         Next
//                     </Button>
//                 </Box>
//             </form>
//         </Container>
//     );
// }
//
// export default AddInstructor;
//
//
//
