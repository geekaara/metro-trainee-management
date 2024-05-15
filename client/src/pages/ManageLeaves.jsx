import React from "react";
import "../css/ManageLeaves.css";

import { makeStyles } from '@mui/material/styles';

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
  MenuItem
} from '@mui/material';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     marginBottom:20
//   }
 
// }));

function ManageLeaves() {
  
  //const classes = useStyles();

  
  

  return (
    <div className="manageLeaves"> 
      <p className="heading">Manage Leaves</p>
      <p className="subheading">Manage instructor leaves here</p>

      <form noValidate autoComplete="off">
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            id="outlined-basic" 
            variant="outlined"
            label="Employee number"
            size="small"
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
        <Button variant="contained" color="primary">Search</Button>
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="outlined-basic" 
            variant="outlined"
            label="First Name"
            size="small"
            fullWidth
            disabled
          />
        </Grid>
        <Grid item xs={6}>
        <TextField
            id="outlined-basic" 
            variant="outlined"
            label="Last Name"
            size="small"
            fullWidth
            disabled
            />
        </Grid>
      </Grid>

    </form>

    <div className="currentLeaves">
      <p className="heading">Current Leaves</p>

      <div className="currentLeavesList">
        <Card>
          <CardContent>
            <Grid container spacing={2}>
            <Grid item xs={4}>
          <TextField
            id="outlined-basic" 
            variant="outlined"
            label="Start Date"
            size="small"
            fullWidth
            disabled
          />
        </Grid>
        <Grid item xs={4}>
        <TextField
            id="outlined-basic" 
            variant="outlined"
            label="End Date"
            size="small"
            fullWidth
            disabled
            />
        </Grid>
        <Grid item xs={4}>
        <TextField
            id="outlined-basic" 
            variant="outlined"
            label="Type"
            size="small"
            fullWidth
            disabled
            />
        </Grid>
  
            </Grid>
            
          </CardContent>
          <CardActions>
            <Button style={{marginLeft:'auto'}} variant="contained" size="small">Edit</Button>
      </CardActions>
        </Card>

  
      </div>
    </div>

    <div className="addNewLeave">

    <p className="heading">Add New Leave</p>

    <form noValidate autoComplete="off">
      <Grid container spacing={2}>
       
        <Grid item xs={6}>
          <TextField
            id="outlined-basic" 
            variant="outlined"
            label="Start Date"
            size="small"
            defaultValue="2017-05-24"
            type="date"
            fullWidth
            
          />
        </Grid>
        <Grid item xs={6}>
        <TextField
            id="outlined-basic" 
            variant="outlined"
            label="End Date"
            type="date"
            size="small"
            defaultValue="2017-05-24"
            fullWidth
            
            />
        </Grid>
        <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel 
            id="type-select-label"
             size="small" >Leave Type</InputLabel>
          <Select
            labelId="type-select-label"
            id="type-select"
            label="Leave Type"
            size="small"
          >
            <MenuItem value="Casual">Casual</MenuItem>
            <MenuItem value="Annual">Annual</MenuItem>
            <MenuItem value="Sick">Sick</MenuItem>
          </Select>
        </FormControl>
        </Grid>
        <Grid item xs={6}></Grid>
        <Grid item xs={12}>
        <TextField
            id="outlined-basic" 
            variant="outlined"
            label="Remarks"
            multiline
            size="small"
            minRows={2}
            fullWidth
            
            />
       
        </Grid>

        <Grid item xs={12}>
          <Button style={{float:'right'}} variant="contained" color="primary">Save</Button>
        </Grid>
      </Grid>

    </form>
    </div> 

    </div>
  );
}

export default ManageLeaves;
