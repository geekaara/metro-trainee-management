import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ViewSchedules from '../pages/ViewSchedules';
import useScheduleData from '../services/ScheduleService';

// Mock the useScheduleData hook
jest.mock('../services/ScheduleService');

describe('ViewSchedules Component', () => {
  // Setup the mock return value for useScheduleData before each test
  beforeEach(() => {
    useScheduleData.mockReturnValue({
      scheduleData: null,
      loading: true,
      error: null,
    });
  });

  test('renders ViewSchedules component and shows loading initially', () => {
    // Test case to check if the ViewSchedules component renders correctly and shows loading initially
    render(
      <BrowserRouter>
        <ViewSchedules />
      </BrowserRouter>
    );

    // Verify the heading
    expect(screen.getByText(/View Instructor Schedule/i)).toBeInTheDocument();

    // Verify the loading message
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });
});

