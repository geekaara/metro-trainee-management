import React from "react";
import {
    TextField,
    Grid,
    Card,
    CardContent,
    CardActions,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Typography,
    Box,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import "../css/ManageLeaves.css";

function ManageLeaves() {
    return (
        <Box className="manageLeaves" sx={{ padding: 3 }}>
            <Typography variant="h5" className="heading" gutterBottom>
                Add Instructor Absence
            </Typography>
            <Typography variant="subtitle1" className="subheading" gutterBottom>
                Search Employee and set absence dates
            </Typography>

            <form noValidate autoComplete="off">
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={8}>
                        <TextField
                            variant="outlined"
                            label="Employee Number"
                            size="small"
                            fullWidth
                            InputProps={{
                                endAdornment: (
                                    <Button variant="contained" color="primary">
                                        <SearchIcon />
                                    </Button>
                                )
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4} />
                    <Grid item xs={12} sm={4}>
                        <TextField
                            variant="outlined"
                            label="First Name"
                            size="small"
                            fullWidth
                            value="John"
                            disabled
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            variant="outlined"
                            label="Last Name"
                            size="small"
                            fullWidth
                            value="Doe"
                            disabled
                        />
                    </Grid>
                </Grid>
            </form>

            <Box className="currentLeaves" sx={{ mt: 4 }}>
                <Typography variant="h6" className="heading" gutterBottom>
                    Current Leaves
                </Typography>

                <Box className="currentLeavesList" sx={{ mt: 2 }}>
                    <Card variant="outlined">
                        <CardContent>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        variant="outlined"
                                        label="Start Date"
                                        size="small"
                                        fullWidth
                                        value="2023-05-01"
                                        disabled
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        variant="outlined"
                                        label="End Date"
                                        size="small"
                                        fullWidth
                                        value="2023-05-10"
                                        disabled
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        variant="outlined"
                                        label="Type"
                                        size="small"
                                        fullWidth
                                        value="Annual"
                                        disabled
                                    />
                                </Grid>
                            </Grid>
                        </CardContent>
                        <CardActions>
                            <Button style={{ marginLeft: 'auto' }} variant="contained" size="small">
                                Edit
                            </Button>
                        </CardActions>
                    </Card>
                </Box>
            </Box>

            <Box className="addNewLeave" sx={{ mt: 4 }}>
                <Typography variant="h6" className="heading" gutterBottom>
                    Add New Absence
                </Typography>

                <form noValidate autoComplete="off">
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                label="Start Date"
                                type="date"
                                size="small"
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                label="End Date"
                                type="date"
                                size="small"
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth variant="outlined" size="small">
                                <InputLabel>Leave Type</InputLabel>
                                <Select label="Leave Type">
                                    <MenuItem value="Casual">Casual</MenuItem>
                                    <MenuItem value="Annual">Annual</MenuItem>
                                    <MenuItem value="Sick">Sick</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} />
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                label="Remarks"
                                multiline
                                minRows={2}
                                fullWidth
                                size="small"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button style={{ float: 'right' }} variant="contained" color="primary">
                                Add New Absence
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </Box>
    );
}

export default ManageLeaves;


// import React from "react";
// import "../css/ManageLeaves.css";
//
// import { makeStyles } from '@mui/material/styles';
//
// import {
//   TextField,
//   Grid,
//   Card,
//   CardContent,
//   CardActions,
//   Button,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem
// } from '@mui/material';
//
// // const useStyles = makeStyles((theme) => ({
// //   root: {
// //     marginBottom:20
// //   }
//
// // }));
//
// function ManageLeaves() {
//
//   //const classes = useStyles();
//
//
//
//
//   return (
//     <div className="manageLeaves">
//       <p className="heading">Manage Leaves</p>
//       <p className="subheading">Manage instructor leaves here</p>
//
//       <form noValidate autoComplete="off">
//       <Grid container spacing={2}>
//         <Grid item xs={6}>
//           <TextField
//             id="outlined-basic"
//             variant="outlined"
//             label="Employee number"
//             size="small"
//             fullWidth
//           />
//         </Grid>
//         <Grid item xs={6}>
//         <Button variant="contained" color="primary">Search</Button>
//         </Grid>
//         <Grid item xs={6}>
//           <TextField
//             id="outlined-basic"
//             variant="outlined"
//             label="First Name"
//             size="small"
//             fullWidth
//             disabled
//           />
//         </Grid>
//         <Grid item xs={6}>
//         <TextField
//             id="outlined-basic"
//             variant="outlined"
//             label="Last Name"
//             size="small"
//             fullWidth
//             disabled
//             />
//         </Grid>
//       </Grid>
//
//     </form>
//
//     <div className="currentLeaves">
//       <p className="heading">Current Leaves</p>
//
//       <div className="currentLeavesList">
//         <Card>
//           <CardContent>
//             <Grid container spacing={2}>
//             <Grid item xs={4}>
//           <TextField
//             id="outlined-basic"
//             variant="outlined"
//             label="Start Date"
//             size="small"
//             fullWidth
//             disabled
//           />
//         </Grid>
//         <Grid item xs={4}>
//         <TextField
//             id="outlined-basic"
//             variant="outlined"
//             label="End Date"
//             size="small"
//             fullWidth
//             disabled
//             />
//         </Grid>
//         <Grid item xs={4}>
//         <TextField
//             id="outlined-basic"
//             variant="outlined"
//             label="Type"
//             size="small"
//             fullWidth
//             disabled
//             />
//         </Grid>
//
//             </Grid>
//
//           </CardContent>
//           <CardActions>
//             <Button style={{marginLeft:'auto'}} variant="contained" size="small">Edit</Button>
//       </CardActions>
//         </Card>
//
//
//       </div>
//     </div>
//
//     <div className="addNewLeave">
//
//     <p className="heading">Add New Leave</p>
//
//     <form noValidate autoComplete="off">
//       <Grid container spacing={2}>
//
//         <Grid item xs={6}>
//           <TextField
//             id="outlined-basic"
//             variant="outlined"
//             label="Start Date"
//             size="small"
//             defaultValue="2017-05-24"
//             type="date"
//             fullWidth
//
//           />
//         </Grid>
//         <Grid item xs={6}>
//         <TextField
//             id="outlined-basic"
//             variant="outlined"
//             label="End Date"
//             type="date"
//             size="small"
//             defaultValue="2017-05-24"
//             fullWidth
//
//             />
//         </Grid>
//         <Grid item xs={6}>
//         <FormControl fullWidth>
//           <InputLabel
//             id="type-select-label"
//              size="small" >Leave Type</InputLabel>
//           <Select
//             labelId="type-select-label"
//             id="type-select"
//             label="Leave Type"
//             size="small"
//           >
//             <MenuItem value="Casual">Casual</MenuItem>
//             <MenuItem value="Annual">Annual</MenuItem>
//             <MenuItem value="Sick">Sick</MenuItem>
//           </Select>
//         </FormControl>
//         </Grid>
//         <Grid item xs={6}></Grid>
//         <Grid item xs={12}>
//         <TextField
//             id="outlined-basic"
//             variant="outlined"
//             label="Remarks"
//             multiline
//             size="small"
//             minRows={2}
//             fullWidth
//
//             />
//
//         </Grid>
//
//         <Grid item xs={12}>
//           <Button style={{float:'right'}} variant="contained" color="primary">Save</Button>
//         </Grid>
//       </Grid>
//
//     </form>
//     </div>
//
//     </div>
//   );
// }
//
// export default ManageLeaves;
