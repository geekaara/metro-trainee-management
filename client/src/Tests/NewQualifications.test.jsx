import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import NewQualification from '../pages/NewQualification';
import { getQualification, addQualification } from '../services/QualificationService';

jest.mock('../services/QualificationService');

describe('NewQualification Component', () => {
  // Clear all mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });
  // Mock data for qualifications
  const mockQualifications = [
    { id: 1, qualification_name: 'Qualification 1' },
    { id: 2, qualification_name: 'Qualification 2' },
  ];

  test('renders NewQualification component and fetches qualifications', async () => {
    // Test case to check if the NewQualification component renders correctly and fetches qualifications
    getQualification.mockResolvedValueOnce(mockQualifications);

    render(<NewQualification />);

    // Check for initial render
    expect(screen.getByText(/Add New Qualification/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Qualification Name/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Save/i })).toBeInTheDocument();

    // Wait for the qualifications to be fetched and displayed
    await waitFor(() => {
      mockQualifications.forEach((qualification) => {
        expect(screen.getByText(qualification.qualification_name)).toBeInTheDocument();
      });
    });
  });

  test('allows adding a new qualification', async () => {
    // Test case to check if the component allows adding a new qualification
    getQualification.mockResolvedValueOnce(mockQualifications);
    addQualification.mockResolvedValueOnce({ id: 3, qualification_name: 'Qualification 3' });
    getQualification.mockResolvedValueOnce([...mockQualifications, { id: 3, qualification_name: 'Qualification 3' }]);

    render(<NewQualification />);

    // Wait for the initial qualifications to be fetched and displayed
    await waitFor(() => {
      mockQualifications.forEach((qualification) => {
        expect(screen.getByText(qualification.qualification_name)).toBeInTheDocument();
      });
    });

    // Add a new qualification
    fireEvent.change(screen.getByLabelText(/Qualification Name/i), { target: { value: 'Qualification 3' } });
    fireEvent.click(screen.getByRole('button', { name: /Save/i }));

    // Wait for the new qualification to be saved and displayed
    await waitFor(() => {
      expect(screen.getByText('Qualification 3')).toBeInTheDocument();
    });

    // Ensure the addQualification function was called with the correct argument
    expect(addQualification).toHaveBeenCalledWith('Qualification 3');
  });

  test('handles error when fetching qualifications fails', async () => {
      // Test case to check if the component handles errors when fetching qualifications fails
    getQualification.mockRejectedValueOnce(new Error('Error fetching qualifications'));

    render(<NewQualification />);

    // Wait for the error to be logged
    await waitFor(() => {
      expect(screen.getByText(/No data found/i)).toBeInTheDocument();
    });
  });

  
});
