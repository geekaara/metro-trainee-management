import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, MenuItem, Select, Paper, Container } from '@mui/material';
import useScheduleData from '../services/ScheduleService';
import "../css/ViewSchedule.css";

const ViewSchedules = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const { scheduleData, loading, error } = useScheduleData(currentMonth, currentYear);

  const handleMonthChange = (event) => {
    setCurrentMonth(event.target.value);
  };

  const handleYearChange = (event) => {
    setCurrentYear(event.target.value);
  };

  const renderTableHeaders = () => {
    const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();
    const headers = [<TableCell style={{ minWidth: "120px" }} key="instructor">Instructor ID</TableCell>];

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
    if (loading || error || !scheduleData) {
      return (
        <TableRow>
          <TableCell colSpan={32} align="center">Loading...</TableCell>
        </TableRow>
      );
    }
  
    const instructors = new Set(scheduleData.map(entry => entry.entries.map(e => e.instructorId)).flat());
    const rows = [];
  
    instructors.forEach(instructorId => {
      const rowData = [instructorId];
      for (let i = 1; i <= 31; i++) {
        const currentDate = new Date(currentYear, currentMonth - 1, i).toISOString().split('T')[0];
        const schedule = scheduleData.find(entry => entry.date === currentDate);
        const entry = schedule?.entries.find(e => e.instructorId === instructorId);
  
        
        if (entry) {
          rowData.push(entry);
        } else {
          rowData.push('');
        }
      }
      rows.push(rowData);
    });
  
    return rows.map((row, index) => (
      <TableRow key={index}>
        {row.map((cell, index) => (
          <TableCell key={index} className={getCellClassName(cell)}>{getCellContent(cell)}</TableCell>
        ))}
      </TableRow>
    ));
  };

  
  const getCellClassName = (cell) => {
    if (cell && cell.type === 'module') {
      return 'module-cell';
    } else if (cell && cell.type === 'leave') {
      return 'leave-cell';
    } else {
      return ''; 
    }
  };

  
  const getCellContent = (cell) => {
    if (cell && cell.type === 'module') {
      return cell.name;
    } else if (cell && cell.type === 'leave') {
      return cell.reason;
    } else {
      return '';
    }
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
                  {renderTableHeaders()}
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
