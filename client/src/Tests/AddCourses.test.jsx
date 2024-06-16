import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AddCourse from '../pages/AddCourse';
import axios from 'axios';

jest.mock('axios');

describe('AddCourse Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockModules = [
    { id: 1, name: 'Module 1' },
    { id: 2, name: 'Module 2' },
  ];

  const mockPublicHolidays = {
    dates: [
      { date: '2023-01-01' },
      { date: '2023-06-05' },
    ],
  };

  test('renders AddCourse component', async () => {
    // Test case to check if the AddCourse component renders correctly
    await act(async () => {
    render(<AddCourse />);
  });
  // Check if the main elements of the AddCourse component are rendered
    expect(screen.getByText(/Add New Course Details/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Course Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Start Date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/End Date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Number of Students/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Group/i)).toBeInTheDocument();
    expect(screen.getByText(/Generate Schedule/i)).toBeInTheDocument();
  });

  
  test('fetches and displays modules', async () => {
     // Test case to check if modules are fetched and displayed correctly
    axios.get.mockResolvedValueOnce({ data: mockModules });

    await act(async () => {
      render(<AddCourse />);
    });

    // Check if axios.get is called with the correct URL
    expect(axios.get).toHaveBeenCalledWith('http://localhost:3001/modules/fetch');
     // Check if the AddCourse component is rendered
    expect(screen.getByText(/Add New Course Details/i)).toBeInTheDocument();
  });

  test('handles input changes', async () => {
    // Test case to check if input changes are handled correctly
    await act(async () => {
    render(<AddCourse />);
  });
  // Simulate user input changes
    fireEvent.change(screen.getByLabelText(/Course Name/i), { target: { value: 'Test Course' } });
    fireEvent.change(screen.getByLabelText(/Start Date/i), { target: { value: '2023-06-01' } });
    fireEvent.change(screen.getByLabelText(/End Date/i), { target: { value: '2023-06-07' } });
    fireEvent.change(screen.getByLabelText(/Number of Students/i), { target: { value: '30' } });
// Check if the input values are updated correctly
    expect(screen.getByLabelText(/Course Name/i).value).toBe('Test Course');
    expect(screen.getByLabelText(/Start Date/i).value).toBe('2023-06-01');
    expect(screen.getByLabelText(/End Date/i).value).toBe('2023-06-07');
    expect(screen.getByLabelText(/Number of Students/i).value).toBe('30');
  });


});
