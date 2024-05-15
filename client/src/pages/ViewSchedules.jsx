import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, MenuItem, Select } from '@mui/material';
import useScheduleData from '../services/ScheduleService';
import "../css/ViewSchedule.css";

const ViewSchedules = () => {
  const scheduleData = useScheduleData(); 

  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const handleMonthChange = (event) => {
    setCurrentMonth(event.target.value);
  };

  const handleYearChange = (event) => {
    setCurrentYear(event.target.value);
  };

  const renderTableHeaders = () => {
    const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();
    const headers = [<TableCell style={{ minWidth: "120px" }} key="instructor">Trainer Name</TableCell>];
  
    for (let i = 1; i <= daysInMonth; i++) {
      const currentDate = new Date(currentYear, currentMonth - 1, i);
      const formattedDate = currentDate.toLocaleDateString('en-US', { day: '2-digit', month: 'short' });
      const dayOfWeek = currentDate.toLocaleDateString('en-US', { weekday: 'short' });
      const headerText = `${formattedDate} (${dayOfWeek})`;
      headers.push(<TableCell style={{ minWidth: "130px" }} key={i}>{headerText}</TableCell>);
    }
  
    return headers;
  };
  
  const renderTableCells = () => {
    const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();
    const cells = [];
  
    if (Array.isArray(scheduleData) && scheduleData.length > 0) {
      const uniqueInstructors = [...new Set(scheduleData.map(item => item.instructor))];
  
      uniqueInstructors.forEach((instructor, index) => {
        const rowCells = [];
  
        rowCells.push(
          <TableCell  key={`instructor-${index}`} style={{ fontWeight: 'bold',minWidth:'120px' }}>
            {instructor}
          </TableCell>
        );
  
        const instructorSchedule = Array(daysInMonth).fill(null);
  
        scheduleData.forEach(schedule => {
          if (schedule.instructor === instructor) {
            schedule.courses.forEach(course => {
              const courseDate = new Date(course.date);
              if (courseDate.getMonth() + 1 === currentMonth && courseDate.getFullYear() === currentYear) {
                const dayOfMonth = courseDate.getDate();
                instructorSchedule[dayOfMonth - 1] = (
                  <TableCell style={{ minWidth: "120px" }} key={`${instructor}-${dayOfMonth}`}>
                    {course.title}
                  </TableCell>
                );
              }
            });
  
            schedule.leaves.forEach(leave => {
              const leaveDate = new Date(leave.date);
              if (leaveDate.getMonth() + 1 === currentMonth && leaveDate.getFullYear() === currentYear) {
                const dayOfMonth = leaveDate.getDate();
                instructorSchedule[dayOfMonth - 1] = (
                  <TableCell key={`${instructor}-leave-${dayOfMonth}`} style={{ backgroundColor: 'black', color: 'white',width:'120px' }}>
                    {leave.reason}
                  </TableCell>
                );
              }
            });
          }
        });
  
        for (let j = 0; j < daysInMonth; j++) {
          rowCells.push(instructorSchedule[j] || <TableCell style={{ width: "120px" }} key={`${index}-${j}`}></TableCell>);
        }
  
        cells.push(<TableRow key={index}>{rowCells}</TableRow>);
      });
    } else {
      cells.push(
        <TableRow key="empty">
          <TableCell colSpan={daysInMonth + 1} align="center">No schedule data available</TableCell>
        </TableRow>
      );
    }
  
    return cells;
  };
  

  return (
    <div className='viewSchedule'>
      <p className='heading'> View Instructor Schedule</p>
      
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
        
      
      <TableContainer style={{minHeight:'400px',backgroundColor:'lightgray'}} component={Paper}>
        <Table style={{backgroundColor:'#FFF'}} >
          <TableHead>
            <TableRow>
              {renderTableHeaders()}
            </TableRow>
          </TableHead>
          <TableBody>
            {renderTableCells()}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ViewSchedules;
