import { render, screen, waitFor, fireEvent, act, cleanup } from '@testing-library/react';
import BasicDetails from '../pages/BasicDetails';
import { checkEmpIdExists, checkEmailExists } from '../services/InstructorService';
import userEvent from '@testing-library/user-event';

// Mock the API calls using jest functions
jest.mock('../services/InstructorService', () => ({
  checkEmpIdExists: jest.fn(),
  checkEmailExists: jest.fn(),
}));

const saveBasicDetailsMock = jest.fn();

describe('BasicDetails Component', () => {
  const validBasicDetails = {
    firstName: 'John',
    lastName: 'Doe',
    formalName: 'John Doe',
    contactNo: '1234567890',
    employeeID: 'E123',
    email: 'john.doe@metrotrains.com.au'
  };

  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test('renders BasicDetails component and fills in the form', async () => {
    await act(async () => {
      render(<BasicDetails saveBasicDetails={saveBasicDetailsMock} />);
    });

    // Fill in the form fields one by one and check the function call
    await act(async () => {
      userEvent.type(screen.getByLabelText(/first name/i), validBasicDetails.firstName);
    });
    await waitFor(() => {
      expect(saveBasicDetailsMock).toHaveBeenLastCalledWith(expect.objectContaining({
        firstName: validBasicDetails.firstName,
      }));
    });

    await act(async () => {
      userEvent.type(screen.getByLabelText(/last name/i), validBasicDetails.lastName);
    });
    await waitFor(() => {
      expect(saveBasicDetailsMock).toHaveBeenLastCalledWith(expect.objectContaining({
        lastName: validBasicDetails.lastName,
      }));
    });

    await act(async () => {
      userEvent.type(screen.getByLabelText(/formal name/i), validBasicDetails.formalName);
    });
    await waitFor(() => {
      expect(saveBasicDetailsMock).toHaveBeenLastCalledWith(expect.objectContaining({
        formalName: validBasicDetails.formalName,
      }));
    });

    await act(async () => {
      userEvent.type(screen.getByLabelText(/primary contact no/i), validBasicDetails.contactNo);
    });
    await waitFor(() => {
      expect(saveBasicDetailsMock).toHaveBeenLastCalledWith(expect.objectContaining({
        contactNo: validBasicDetails.contactNo,
      }));
    });

    await act(async () => {
      userEvent.type(screen.getByLabelText(/employee id/i), validBasicDetails.employeeID);
    });
    await waitFor(() => {
      expect(saveBasicDetailsMock).toHaveBeenLastCalledWith(expect.objectContaining({
        employeeID: validBasicDetails.employeeID,
      }));
    });

    await act(async () => {
      userEvent.type(screen.getByLabelText(/primary email/i), validBasicDetails.email);
    });
    await waitFor(() => {
      expect(saveBasicDetailsMock).toHaveBeenLastCalledWith(expect.objectContaining({
        email: validBasicDetails.email,
      }));
    });

    // Mock Employee ID check
    checkEmpIdExists.mockResolvedValue(true);
    await act(async () => {
      fireEvent.change(screen.getByLabelText(/employee id/i), { target: { value: 'E124' } });
    });
    await waitFor(() => {
      expect(checkEmpIdExists).toHaveBeenCalledWith('E124');
      expect(screen.getByText(/employee id already exists/i)).toBeInTheDocument();
    });

    // Mock Email check
    checkEmailExists.mockResolvedValue(true);
    await act(async () => {
      fireEvent.change(screen.getByLabelText(/primary email/i), { target: { value: 'jane.doe@metrotrains.com.au' } });
    });
    await waitFor(() => {
      expect(checkEmailExists).toHaveBeenCalledWith('jane.doe@metrotrains.com.au');
      expect(screen.getByText(/email already exists/i)).toBeInTheDocument();
    });
  });
});
