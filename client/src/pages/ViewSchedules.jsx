import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, MenuItem, Select, Paper, Container } from '@mui/material';
import useScheduleData from '../services/ScheduleService';
import "../css/ViewSchedule.css";

const ViewSchedules = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const { scheduleData, loading, error } = useScheduleData(currentMonth, currentYear);
// Handle month change
  const handleMonthChange = (event) => {
    setCurrentMonth(event.target.value);
  };
 // Handle year change
  const handleYearChange = (event) => {
    setCurrentYear(event.target.value);
  };
// Render table cells based on schedule data
  const renderTableCells = () => {
    if (loading || error || !scheduleData) {
      return (
        <TableRow>
          <TableCell colSpan={32} align="center">Loading...</TableCell>
        </TableRow>
      );
    }
  
    return scheduleData.map((instructorData, index) => (
      <TableRow key={index}>
        <TableCell>{instructorData.instructor}</TableCell>
        {[...Array(31)].map((_, i) => {
          const currentDate = `${currentYear}-${currentMonth.toString().padStart(2, '0')}-${(i + 1).toString().padStart(2, '0')}`;
          const leave = instructorData.leaves ? instructorData.leaves.find(item => item.date === currentDate) : null;
          const module = instructorData.modules ? instructorData.modules.find(item => item.date === currentDate) : null;
          const content = leave ? leave.reason : (module ? module.title : '');
          
          // Define the background and font color based on cell type
          const cellStyle = {
            backgroundColor: leave ? 'black' : '', // Set background color to black for leave cells
            color: leave ? 'white' : 'inherit' // Set font color to white for leave cells
          };
          
          return <TableCell key={i} style={cellStyle}>{content}</TableCell>;
        })}
      </TableRow>
    ));
  };
  
  

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ padding: 3, marginTop: 3, width: 1025 }}>
        <div className='viewSchedule'>
          <p className='heading'>View Instructor Schedule</p>

          <div className='viewSchedule-dateControls'>
            <Select size='small' value={currentMonth} onChange={handleMonthChange}>
              {Array.from({ length: 12 }, (_, i) => (
                <MenuItem key={i + 1} value={i + 1}>
                  {new Date(currentYear, i).toLocaleString('default', { month: 'long' })}
                </MenuItem>
              ))}
            </Select>
            <Select size='small' value={currentYear} onChange={handleYearChange}>
              {Array.from({ length: 10 }, (_, i) => (
                <MenuItem key={currentYear - 5 + i} value={currentYear - 5 + i}>
                  {currentYear - 5 + i}
                </MenuItem>
              ))}
            </Select>
          </div>

          <TableContainer style={{ minHeight: '400px', backgroundColor: 'lightgray', minWidth: 'auto' }} component={Paper}>
            <Table style={{ backgroundColor: '#FFF' }} >
              <TableHead>
                <TableRow>
                  <TableCell>Instructor</TableCell>
                  {[...Array(31)].map((_, i) => (
                    <TableCell key={i + 1}>{`${new Date(currentYear, currentMonth - 1, i + 1).toLocaleString('default', { day: '2-digit', weekday: 'short' })}`}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {renderTableCells()}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </Paper>
    </Container>
  );
};

export default ViewSchedules;
