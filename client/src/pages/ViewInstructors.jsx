import * as React from 'react';
import { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { getInstructors } from '../services/InstructorService';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import '../css/ViewInstructor.css'; // Import the CSS file

const columns = [
  { id: 'empId', label: 'EmployeeId', minWidth: 100 },
  { id: 'first_name', label: 'Name', minWidth: 170 },
  { id: 'contact_no', label: 'Contact No.', minWidth: 170 },
  { id: 'email', label: 'Email', minWidth: 170 },
  { id: 'actions', label: 'Actions', minWidth: 100 }
];

function ViewInstructor() {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const instructorResponse = await getInstructors(); // Renamed response variable
        console.log("Instructor data:", instructorResponse);
        setInstructors(instructorResponse);
      } catch (error) {
        console.error("Error getting instructors:", error);
      }
    };

    fetchData();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleInstructorLeaves = (id) => {
    console.log("Clicked Instructor ID:", id);
    navigate(`/${id}/manage-leaves`);
  };

  const handleEditInstructor = (id) => {
    console.log("Clicked Instructor ID:", id);
    navigate(`${id}`);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
      <div className="view-instructor-container"> {/* Add this div */}
        <Typography variant="h4" gutterBottom>
          Instructors
        </Typography>
        <Paper sx={{ width: '100%', overflow: 'hidden', margin: '16px 0' }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Contact No</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell align='right'>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {instructors.map(instructor => (
                    <TableRow key={instructor.id}>
                      <TableCell>{`${instructor.title} ${instructor.first_name} ${instructor.last_name}`}</TableCell>
                      <TableCell>{instructor.contact_no}</TableCell>
                      <TableCell>{instructor.email}</TableCell>
                      <TableCell style={{}}>
                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                          <IconButton aria-label="edit" onClick={() => handleEditInstructor(instructor.id)}>
                            <EditIcon />
                          </IconButton>
                          <IconButton onClick={() => handleInstructorLeaves(instructor.id)} aria-label="leaves">
                            <ExitToAppIcon />
                          </IconButton>
                          <IconButton aria-label="delete">
                            <DeleteIcon />
                          </IconButton>
                        </div>
                      </TableCell>
                    </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={instructors.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
  );
}

export default ViewInstructor;


// import * as React from 'react';
// import {useEffect,useState} from 'react';
// import Paper from '@mui/material/Paper';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TablePagination from '@mui/material/TablePagination';
// import TableRow from '@mui/material/TableRow';
// import IconButton from '@mui/material/IconButton';
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';
// import ExitToAppIcon from '@mui/icons-material/ExitToApp';
// import { getInstructors } from '../services/InstructorService';
// import { useNavigate } from 'react-router-dom';
//
// const columns = [
//   { id: 'empId', label: 'EmployeeId', minWidth: 100 },
//   { id: 'first_name', label: 'Name', minWidth: 170 },
//   { id: 'contact_no', label: 'Contact No.', minWidth: 170 },
//   { id: 'email', label: 'Email', minWidth: 170 },
//   { id: 'actions', label: 'Actions', minWidth: 100 }
// ];
//
//
// function ViewInstructor() {
//
//   const navigate = useNavigate();
//   const [page, setPage] = React.useState(0);
//   const [rowsPerPage, setRowsPerPage] = React.useState(10);
//   const [instructors, setInstructors] = useState([]);
//
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//
//         const instructorResponse = await getInstructors(); // Renamed response variable
//         console.log("Instructor data:", instructorResponse);
//         setInstructors(instructorResponse);
//       } catch (error) {
//         console.error("Error getting instructors:", error);
//       }
//     };
//
//     fetchData();
//   }, []);
//
//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };
//
//   const handleInstructorLeaves=(id)=>{
//     console.log("Clicked Instructor ID:", id);
//     navigate(`/${id}/manage-leaves`);
//   }
//
//   const handleEditInstructor=(id)=>{
//     console.log("Clicked Instructor ID:", id);
//     navigate(`${id}`);
//   }
//
//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//   };
//   return (
//     <Paper sx={{ width: '100%', overflow: 'hidden' }}>
//       <TableContainer sx={{ maxHeight: 440 }}>
//         <Table stickyHeader aria-label="sticky table">
//           <TableHead>
//           <TableRow>
//               <TableCell>Name</TableCell>
//               <TableCell>Contact No</TableCell>
//               <TableCell>Email</TableCell>
//               <TableCell align='right'>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//           {instructors.map(instructor => (
//               <TableRow key={instructor.id}>
//                 <TableCell>{`${instructor.title} ${instructor.first_name} ${instructor.last_name}`}</TableCell>
//                 <TableCell>{instructor.contact_no}</TableCell>
//                 <TableCell>{instructor.email}</TableCell>
//                 <TableCell style={{}}>
//                   <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
//                     <IconButton aria-label="edit" onClick={() => handleEditInstructor(instructor.id)}>
//                       <EditIcon/>
//                     </IconButton>
//                     <IconButton onClick={() => handleInstructorLeaves(instructor.id)} aria-label="leaves">
//                       <ExitToAppIcon/>
//                     </IconButton>
//                     <IconButton aria-label="delete">
//                       <DeleteIcon/>
//                     </IconButton>
//                   </div>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <TablePagination
//   rowsPerPageOptions={[10, 25, 100]}
//   component="div"
//   count={instructors.length}
//   rowsPerPage={rowsPerPage}
//   page={page}
//   onPageChange={handleChangePage}
//   onRowsPerPageChange={handleChangeRowsPerPage}
// />
//     </Paper>
//   );
// }
//
// export default ViewInstructor;
