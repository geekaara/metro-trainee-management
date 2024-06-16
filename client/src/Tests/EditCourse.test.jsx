import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import EditCourse from '../pages/EditCourse';
import axios from 'axios';

jest.mock('axios');

describe('EditCourse Component', () => {
  // Clear all mocks and setup alert mock before each test
  beforeEach(() => {
    jest.clearAllMocks();
    window.alert = jest.fn();
  });
 // Mock data for course details
  const mockCourseData = {
    course: {
      course_name: 'Test Course',
      start_date: '2023-06-01',
      end_date: '2023-12-31',
      number_of_students: 30,
      group_name: 'North',
    },
    schedule: [
      {
        date: '2023-06-01',
        module_name: 'Module 1',
        instructor_name: 'Instructor 1',
      },
      {
        date: '2023-06-02',
        module_name: 'Module 2',
        instructor_name: 'Instructor 2',
      },
    ],
  };

  test('renders EditCourse component and performs search', async () => {
      // Test case to check if the EditCourse component renders correctly and performs a course search
    axios.get.mockResolvedValueOnce({ data: mockCourseData });

    render(<EditCourse />);

    // Search for the course
    fireEvent.change(screen.getByLabelText(/Search Courses/i), { target: { value: 'Test Course' } });
    fireEvent.click(screen.getByLabelText('search'));

    // Wait for the course details to be fetched and displayed
    await waitFor(() => {
      expect(screen.getByText(/Editing Course: Test Course/i)).toBeInTheDocument();
    });
  });

  



  test('handles error when course not found', async () => {
     // Test case to check if the component handles error when a course is not found
    axios.get.mockRejectedValueOnce({ response: { status: 404 } });

    render(<EditCourse />);

    // Search for a non-existent course
    fireEvent.change(screen.getByLabelText(/Search Courses/i), { target: { value: 'Non-existent Course' } });
    fireEvent.click(screen.getByLabelText('search'));

    // Wait for the error message
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('Course not found');
    });
  });

  test('handles error when saving changes fails', async () => {
    axios.get.mockResolvedValueOnce({ data: mockCourseData });
    axios.post.mockRejectedValueOnce(new Error('Error saving changes'));

    render(<EditCourse />);

    // Search for the course
    fireEvent.change(screen.getByLabelText(/Search Courses/i), { target: { value: 'Test Course' } });
    fireEvent.click(screen.getByLabelText('search'));

    // Wait for the course details to be fetched and displayed
    await waitFor(() => {
      expect(screen.getByText(/Editing Course: Test Course/i)).toBeInTheDocument();
    });

    // Save changes
    fireEvent.click(screen.getByRole('button', { name: /Save Changes/i }));

    // Wait for the error message
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('Error saving changes: Error saving changes');
    });
  });
});
