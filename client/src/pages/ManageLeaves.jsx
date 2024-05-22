import React from "react";
import {
  TextField,
  Grid,
  Card,
  CardContent,
  Paper,
  Container,
  CardActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  InputAdornment,
  IconButton,
  Box,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import "../css/ManageLeaves.css";

function ManageLeaves() {
    return (
        <Container maxWidth="md">
            <Paper elevation={3} sx={{ padding: 3, marginTop: 3, width:800 }}>
            <Typography variant="h4" gutterBottom>
                Manage Leaves
            </Typography>
        <Box className="container">
            

            {/* <Typography variant="subtitle1" gutterBottom>
                Add Instructor Absence
            </Typography>
            <Typography variant="body1" gutterBottom>
                Search Employee and set absence dates
            </Typography> */}

            <form noValidate autoComplete="off">
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={8}>
                        <TextField
                            variant="outlined"
                            label="Employee Number"
                            // size="small"
                            fullWidth
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                    <IconButton>
                                      <SearchIcon />
                                    </IconButton>
                                  </InputAdornment>
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

            <Box sx={{ marginTop: '20px' }}>
                <Typography variant="h6" gutterBottom>
                    Current Leaves
                </Typography>

                <Box>
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
                            <Button variant="contained" size="small">
                                Edit
                            </Button>
                        </CardActions>
                    </Card>
                </Box>
            </Box>

            <Box sx={{ marginTop: '20px' }}>
                <Typography variant="h6" gutterBottom>
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
                                    <MenuItem value="Sick">Professional Development</MenuItem>
                                    <MenuItem value="Sick">Driving weeks</MenuItem>
                                    <MenuItem value="Sick">Drivers Day off</MenuItem>
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
                            <Button variant="contained" color="primary">
                                Add New Absence
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </Box>
        </Paper>
        </Container>
    );
}

export default ManageLeaves;
