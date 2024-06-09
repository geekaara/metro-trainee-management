import { render, screen, waitFor, act, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import AddQualifications from '../pages/AddQualifications';
import { getQualification } from '../services/QualificationService';

// Mock the API call using jest functions
jest.mock('../services/QualificationService', () => ({
  getQualification: jest.fn(),
}));

const saveQualificationDetailsMock = jest.fn();

describe('AddQualifications Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  const mockQualifications = [
    { id: 1, qualification_name: 'Phase 1' },
    { id: 2, qualification_name: 'Phase 2' },
  ];

  test('renders AddQualifications component and interacts with form', async () => {
    // Mock the API response
    getQualification.mockResolvedValue(mockQualifications);

    await act(async () => {
      render(
        <BrowserRouter>
          <AddQualifications saveQualificationDetails={saveQualificationDetailsMock} />
        </BrowserRouter>
      );
    });

    // Verify that the qualifications are fetched and rendered
    await waitFor(() => {
      expect(screen.getByText(/phase 1/i)).toBeInTheDocument();
      expect(screen.getByText(/phase 2/i)).toBeInTheDocument();
    });

    // Simulate selecting qualifications
    await act(async () => {
      userEvent.click(screen.getByLabelText(/phase 1/i));
    });
    await act(async () => {
      userEvent.click(screen.getByLabelText(/phase 2/i));
    });

    // Verify the state updates and function call
    await waitFor(() => {
      expect(saveQualificationDetailsMock).toHaveBeenCalledWith({ qualifications: [1] });
    });
    await waitFor(() => {
      expect(saveQualificationDetailsMock).toHaveBeenCalledWith({ qualifications: [1, 2] });
    });
  });
});
