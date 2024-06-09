import { render, screen, waitFor, act, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import AddInstructorAvailability from '../pages/AddInstructorAvailability';

const saveAvailabilityDetailsMock = jest.fn();

describe('AddInstructorAvailability Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  test('renders AddInstructorAvailability component and interacts with form', async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <AddInstructorAvailability saveAvailabilityDetails={saveAvailabilityDetailsMock} />
        </BrowserRouter>
      );
    });

    // Verify the component renders specific elements
    expect(screen.getByRole('heading', { level: 4, name: /availability/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/start date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/end date/i)).toBeInTheDocument();
    dayNames.forEach(day => {
      expect(screen.getByLabelText(day)).toBeInTheDocument();
    });

    // Simulate filling in start and end dates
    await act(async () => {
      userEvent.type(screen.getByLabelText(/start date/i), '2023-06-01');
      userEvent.type(screen.getByLabelText(/end date/i), '2023-12-31');
    });

    // Simulate selecting availability
    await act(async () => {
      userEvent.click(screen.getByLabelText('Monday'));
      userEvent.click(screen.getByLabelText('Wednesday'));
      userEvent.click(screen.getByLabelText('Friday'));
    });

    // Verify the state updates and function call
    await waitFor(() => {
      expect(saveAvailabilityDetailsMock).toHaveBeenCalledWith(
        { availability: { Monday: true, Wednesday: true, Friday: true } },
        { startDate: '2023-06-01', endDate: '2023-12-31' }
      );
    });
  });
});
