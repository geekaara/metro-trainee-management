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
  // Clear all mocks and clean up the DOM after each test
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  const mockQualifications = [
    { id: 1, qualification_name: 'Phase 1' },
    { id: 2, qualification_name: 'Phase 2' },
  ];


  test('handles API error correctly', async () => {
    // Test case to check if API errors are handled correctly
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    // Mock the getQualification function to throw an error
    getQualification.mockRejectedValue(new Error('API error'));
    await act(async () => {
      render(
        <BrowserRouter>
          <AddQualifications saveQualificationDetails={saveQualificationDetailsMock} />
        </BrowserRouter>
      );
    });

    // Verify that an error is logged
    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith("Error fetching qualification data:", expect.any(Error));
    });

    consoleErrorSpy.mockRestore();
  });


});
